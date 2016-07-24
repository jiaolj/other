# _*_ coding:utf-8 _*_
import json

serverConfig=('10.13.91.222',1111)
listenNumb = 1000
loginUserList=[]
userList=['abc','def']

if __name__ == '__main__':
    import socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind(serverConfig)
    sock.listen(listenNumb)
    print 'bind '+serverConfig[0]+':'+str(serverConfig[1])
    while True:
        connection,address = sock.accept()
        try:
            connection.settimeout(5)
            recvData = connection.recv(1024)
#             print recvData
            jsonData=json.loads(recvData)
            ids=jsonData['id']
            uname=jsonData['uname']
            if ids==1:
                if uname in userList:
                    if uname in loginUserList:
                        connection.send('此帐号已经在别处登录')
                    else:
                        loginUserList.append(uname)
                        print uname+' 已上线'
                        connection.send('1')
            elif ids==2:
                if uname in loginUserList:
                    indexs=loginUserList.index(uname)
                    del loginUserList[indexs]
                    print uname+' 已下线'
                connection.send('1')
        except socket.timeout:
            print 'time out'
            connection.close()

