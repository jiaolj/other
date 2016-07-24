#-*- coding:utf-8 -*-
#如果需要使用多个表可用多继承
class gjphonenumb(object):
    def __init__ (self):
        self.dbg=dbg
    #获得新闻栏目id列表
    def getcolumnid(self):
        sql='select id,typename,keywords from dede_arctype where reid=184 order by sortrank limit 0,8'
        resultlist=self.dbn.fetchalldb(sql)
        listall=[]
        for result in resultlist:
            listall.append(result[0])
        return listall
