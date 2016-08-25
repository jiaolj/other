#coding: utf-8
import paramiko

def ssh2(ip,username,passwd,cmd):
    ssh=paramiko.SSHClient()
    ssh.load_system_host_keys()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect (ip,22,username,passwd)
    chan = ssh.get_transport().open_session()
    chan.get_pty()
    console = []
    for m in cmd:
        chan.exec_command(m)
        recv = chan.recv(4096)
        chan.send(passwd+'\n')
        while True:
            recv = chan.recv(4096)
            cv = recv.replace('\r\n','')
            if cv:
                console.append(cv)
            if not recv:
                break
    ssh.close()
    return console

HOST = {
    '253' : {
        'ip' : '192.168.1.253',
        'username' : 'liangzhi',
        'passwd' : 'liangzhi'
    }
}
PROJECT = {
    'analyze' : {
        'update' : 'sudo sh ningboProject/web/sh/analysis.sh'
    }
}

def start_analyze():
    host = HOST['253']
    project = PROJECT['analyze']
    result = ssh2(host['ip'],host['username'],host['passwd'],[project['update']])
    return result

if __name__=='__main__':
    host = HOST['253']
    project = PROJECT['analyze']
    result = ssh2(host['ip'],host['username'],host['passwd'],[project['update']])
    for r in result:
        print r
