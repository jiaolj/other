# _*_ coding:utf-8 _*_
__author__ = 'Patrick'
import socket,threading,sys,base64,hashlib,struct,json
# from server import DataProcessing
# import os
# import MySQLdb

# ====== config ======
connectionlist={}
umessage={'abc':'0','def':'0'}
uthread={'abc':'','def':''}
isbegin=0

HOST = '10.13.91.222'
PORT = 1234
listenNumb = 1000
MAGIC_STRING = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
HANDSHAKE_STRING = "HTTP/1.1 101 Switching Protocols\r\n" \
      "Upgrade:websocket\r\n" \
      "Connection: Upgrade\r\n" \
      "Sec-WebSocket-Accept: {1}\r\n" \
      "WebSocket-Location: ws://{2}/chat\r\n" \
      "WebSocket-Protocol:chat\r\n\r\n"
  
class Th(threading.Thread):
    def __init__(self,connection):
        threading.Thread.__init__(self)
        self.con = connection
  
    def run(self):
        while True:
            pass
        self.con.close()
  
    def recv_data(self,num):
        try:
            all_data = self.con.recv(num)
            if not len(all_data):
                return False
        except:
            return False
        else:
            code_len = ord(all_data[1]) & 127
            if code_len == 126:
                masks = all_data[4:8]
                data = all_data[8:]
            elif code_len == 127:
                masks = all_data[10:14]
                data = all_data[14:]
            else:
                masks = all_data[2:6]
                data = all_data[6:]
            raw_str = ""
            i = 0
            for d in data:
                raw_str += chr(ord(d) ^ ord(masks[i % 4]))
                i += 1
            return raw_str
        
    # send data
    def send_data(self, data):
        if data:
            data = str(data)
        else:
            return False
        token = "\x81"
        length = len(data)
        if length < 126:
            token += struct.pack("B", length)
        elif length <= 0xFFFF:
            token += struct.pack("!BH", 126, length)
        else:
            token += struct.pack("!BQ", 127, length)
        #struct为Python中处理二进制数的模块，二进制流为C，或网络流的形式。
        data = '%s%s' % (token, data)
        self.con.send(data)
        return True
    
# handshake
def handshake(con):
    headers = {}
    shake = con.recv(1024)
    
    if not len(shake):
        return False
    
    header,data = shake.split('\r\n\r\n', 1)
#     print 'data is '+data
    for line in header.split('\r\n')[1:]:
        key, val = line.split(': ', 1)
        headers[key] = val
    
    if 'Sec-WebSocket-Key' not in headers:
        print ('This socket is not websocket, client close.')
        con.close()
        return False
    
    sec_key = headers['Sec-WebSocket-Key']
    res_key = base64.b64encode(hashlib.sha1(sec_key + MAGIC_STRING).digest())
    
    str_handshake = HANDSHAKE_STRING.replace('{1}', res_key).replace('{2}', HOST + ':' + str(PORT))
#     print str_handshake
    con.send(str_handshake)
    return True

def new_service():
    """start a service socket and listen
    when coms a connection, start a new thread to handle it"""
    
#     userPoint={'mytank1':{'left':'','top':''},'mytank2':{'left':'','top':''}}
    
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        sock.bind((HOST,PORT))
        sock.listen(listenNumb)
        #链接队列大小
        print 'bind '+HOST+':'+str(PORT)
    except:
        print("Server is already running,quit")
        sys.exit()
    i=0
    bidNumb=0
    userList=[]
    while True:
        connection,address = sock.accept()
        #返回元组（socket,add），accept调用时会进入waite状态
        #print "Got connection from ",address
        if handshake(connection):
            t = Th(connection)
            t.start()
            i+=1
            connectionlist['t'+str(i)]=t
#             print connectionlist
            recvData=t.recv_data(1024)
            print recvData
#             while True:
            #----处理接收数据
            try:
                jsonData=json.loads(recvData)
                ids=jsonData['id']
                uname=jsonData['uname']
                uthread[uname]=i
                #print uthread
                if uname=='':continue
                if uname not in userList:userList.append(uname)
                unumb=userList.index(uname)
                count=len(userList)
                if count==2:
                    if unumb==0:ouser=userList[1]
                    else:ouser=userList[0]
                if ids=='1':
                    listDir={'id':ids,'ulist':userList,'numb':unumb+1,'count':count}
                    data_string = json.dumps(listDir)
                    if count==2: connectionlist['t'+str(uthread[ouser])].send_data(data_string)
                    t.send_data(data_string)
                elif ids=='2':
                    #t.send_data(recvData)
                    connectionlist['t'+str(uthread[ouser])].send_data(recvData)
                elif ids=='5':
                    bidNumb+=1
                    jsonData['bid']='mb'+str(bidNumb)
                    data_string = json.dumps(jsonData)
                    connectionlist['t'+str(uthread[ouser])].send_data(data_string)
                    t.send_data(data_string)
                elif ids=='6':
                    connectionlist['t'+str(uthread[ouser])].send_data(recvData)
                elif ids=='7':
                    userList=[]
            except:
                pass
            



if __name__ == '__main__':
    new_service()
