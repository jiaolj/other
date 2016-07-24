#-*- coding:utf-8 -*-
#---缓存模块
class JCache(object):
    def __init__(self,dtm):
        self.dtm=dtm
        self.j={}
        self.now=dtm.date.today()
    def set(self,key,val):self.j[key]={'val':val,'hot':1,'tm':self.dtm.date.today()}
    def get(self,key):
        self.j[key]['hot']=self.j[key]['hot']+1
        return self.j[key]['val']
    def has_key(self,k):return self.j.has_key(k)
    def clear(self):
        for k,v in self.j.items():
            if v['tm']<self.dtm.date.today():
                del self.j[k]
    def is_clear(self):
        todays=self.dtm.date.today()
        if self.now!=todays:
            self.now=todays
            self.clear()
            
        