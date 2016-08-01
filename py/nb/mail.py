# -*- coding: utf-8 -*-
'''
发送带附件邮件
'''

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib,time

def sendSubjectMail():
    #创建一个带附件的实例
    msg = MIMEMultipart()
    today = time.strftime('%Y-%m-%d',time.localtime(time.time()))
    #构造附件1
    att1 = MIMEText(open(today+'.txt', 'rb').read(), 'base64', 'utf-8')
    att1["Content-Type"] = 'application/octet-stream'
    att1["Content-Disposition"] = 'attachment; filename="'+today+'.txt"'#这里的filename可以任意写，写什么名字，邮件中显示什么名字
    msg.attach(att1)
    #加邮件头
    msg['to'] = '379348913@qq.com,522938692@qq.com,919325032@qq.com,15813829167@qq.com'
    msg['from'] = 'notice@quant-chi.com'
    msg['subject'] = today+' 栏目爬取数量'
    #发送邮件
    server = smtplib.SMTP()
    server.connect('smtp.mxhichina.com')
    server.login('notice@quant-chi.com','service123@')#XXX为用户名，XXXXX为密码
    server.sendmail(msg['from'], msg['to'],msg.as_string())
    server.quit()

