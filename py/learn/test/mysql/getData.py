#-*- coding:utf-8 -*-
from mysql_config import conn_151_DInsight
from JMysql import JMysql


db=JMysql(conn_151_DInsight)
db.open()
listc=[]

def getjson():
#     data={}
    data=''
    result=db.fetchall('select c,el,nl from latitude_longitude')
    for rst in result:
        if rst[0] not in listc:
            listc.append(rst[0])
            data+="'"+rst[0]+"':["+str(rst[1])+","+str(rst[2])+"], \n"
    return '{'+data+'}'

def getjson2():
    kwd='澳大利亚'
    data=''
    result=db.fetchall('select nm,el,nl from latitude_longitude where c=%s',[kwd])
    for rst in result:
        if rst[0] not in listc:
            listc.append(rst[0])
            data+="'"+rst[0]+"':["+str(rst[1])+","+str(rst[2])+"], \n"
    return '{'+data+'}'

print getjson2()
db.close()