# -*- coding: utf-8 -*-
class b(object):
    def __init__(self):
        self.t=2
    def getb(self):
        self.t+=1

class a(b):
    #----如果不声明init函数,会继承基类init属性。声明init是为了加一些自定义属性
    def __init__(self):
        b.__init__(self)
    def get(self):
        print 1

temp=a()
temp.getb()
print temp.t