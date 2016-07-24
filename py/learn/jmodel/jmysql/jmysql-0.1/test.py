#-*- coding:utf-8 -*-
from JMysql import JMysql
from mysql_config import conn_151_project973V3
class Event(object):
    def __init__(self):
        self.db=JMysql(conn_151_project973V3)
    def open(self):
        self.db.open()
    def close(self):
        self.db.close()
    def getData(self):
        sql='select id,title from events limit 0,1'
        result=self.db.fetchone(sql)
        print result

event=Event()
event.open()
event.getData()
event.close()