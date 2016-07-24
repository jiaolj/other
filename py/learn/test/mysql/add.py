#-*- coding:utf-8 -*-
from mysql_config import conn_151_DInsight
from JMysql import JMysql
import re


db=JMysql(conn_151_DInsight)
db.open()

def getjson():
#     data={}
    data=''
    result=db.fetchall('select nm,el,nl from latitude_longitude')
    for rst in result:
        #data[rst[0]]=[rst[1],rst[2]]
        data+="'"+rst[0]+"':["+str(rst[1])+","+str(rst[2])+"], \n"
    return '{'+data+'}'

def get_format(dt,d,c):
    dt=dt.replace('　　　　','　　　')
    rl=dt.split('　　　')
    nm=rl[0]
    p=nm
    el=float(rl[1].replace('：','.'))
    nl=float(rl[2].replace('：','.'))
    print d,c,p,nm,el,nl
    #return
    argument=[d,c,p,nm,el,nl]
    ret=db.fetchone('select id from latitude_longitude where nm=%s',[nm])
    if not ret:
        db.update('insert into latitude_longitude(d,c,p,nm,el,nl) values(%s,%s,%s,%s,%s,%s)', argument)

def get_format2(dt,d):
    dt=re.sub('　　','~',dt)
    dt=re.sub('[~]+','~',dt)
    dt=re.sub('　　','~',dt)
    dt=dt.replace('　','').replace(' ','')
    rl=dt.split('~')
    print dt
    c=rl[0]
    nm=rl[1]
    p=nm
    el=float(rl[2].replace('：','.').replace('东经','').replace('西经','-'))
    nl=float(rl[3].replace('：','.').replace('北纬','').replace('南纬','-'))
    print d,c,p,nm,el,nl
    #return
    argument=[d,c,p,nm,el,nl]
    ret=db.fetchone('select id from latitude_longitude where nm=%s',[nm])
    if not ret:
        db.update('insert into latitude_longitude(d,c,p,nm,el,nl) values(%s,%s,%s,%s,%s,%s)', argument)

#添加中国各地区
files=open('1.txt','r')
n=0
for r in files:
    n+=1
    '''if n>3 and n<630:
        rl=r.split(' ')
        if len(rl)==4:
            p=rl[0]
            nm=rl[1]
            nl=float(rl[2].replace('北纬',''))
            el=float(rl[3].replace('东经',''))
            argument=['亚洲','中国',p,nm,el,nl]
            ret=db.fetchone('select id from latitude_longitude where nm=%s',[nm])
            if not ret:
                db.update('insert into latitude_longitude(d,c,p,nm,el,nl) values(%s,%s,%s,%s,%s,%s)', argument)
    if n==682:get_format(r,'亚洲','朝鲜')
    if n>=684 and n<689:get_format(r,'亚洲','韩国')
    if n>=690 and n<700:get_format(r,'亚洲','日本')
    if n>=702 and n<713:get_format2(r,'亚洲')
    if n>=718 and n<725:get_format2(r,'亚洲')
    if n>=726 and n<737:get_format2(r,'亚洲')
    if n>=739 and n<794:get_format2(r,'欧洲')
    if n>=796 and n<823:get_format2(r,'美洲')
    if n>=825 and n<853:get_format2(r,'美洲')
    if n>=855 and n<889:get_format2(r,'非洲')
    if n>=891 and n<898:get_format2(r,'大洋洲')
    if n>=900 and n<915:get_format2(r,'欧洲')
    if n>=917 and n<948:get_format2(r,'亚洲')
    if n>=949 and n<1004:get_format2(r,'欧洲')
    '''
files.close()

print getjson()
db.close()