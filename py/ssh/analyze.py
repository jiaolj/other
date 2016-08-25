#coding: utf-8
import paramiko,threading


def ssh2(ip,username,passwd,cmd):
    #try:
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ip,22,username,passwd,timeout=5)
    for m in cmd:
        stdin, stdout, stderr = ssh.exec_command(m)
        #stdin.write("Y")   #简单交互，输入 'Y'
        stdin.write(passwd+'\n')
        stdin.flush()
        out = stdout.readlines()
        #屏幕输出
        for o in out:
            print o
    print '%s\tOK\n'%(ip)
    ssh.close()
    #except :
    #    print '%s\tError\n'%(ip)

if __name__=='__main__':
    cmd = ['sudo sh ningboProject/web/sh/analysis.sh']#你要执行的命令列表
    username = 'liangzhi'  #用户名
    passwd = 'liangzhi'    #密码
    threads = []   #多线程
    print 'Begin......'
    ip = '192.168.1.253'
    a = threading.Thread(target=ssh2,args=(ip,username,passwd,cmd))
    a.start()
