#-*- coding:utf-8 -*-
from jtools.BaseTools import *
# from jtools.TimeTools import TimeTools
from jtools.jEncrypt import jEncrypt

jec=jEncrypt()
print jec.toCompute('公司的公司的根深蒂固')
# print jec.fromCompute(jec.toCompute(u'公司的公司的根深蒂固'))

# for i in flatten([[1,2,3],[1,2,3]]):print i

'''
tls=TimeTools()

print tls.getsplitime(20140101)
print tls.getnowyear()
print tls.getnowmonth()
print tls.getnowday()
print tls.getStrTime()
print tls.getStrTimeAll()
print tls.getMonthDays(2014,10)
print tls.strToInt('2014-10-10')
print tls.intToStr('1412870400')
print tls.strToDate('2014-10-10')
print tls.strToDatetime('2014-10-10')
print tls.getNextDate('2014-10-10',1)
print tls.getPastDays(2,1)
print tls.getPastOneDay(2)
print tls.getDateList(2)
import datetime
print type(datetime.datetime.now())
print tls.getDifTimeList('2014-10-10','2014-10-15')
print tls.getToday()
print tls.getYesterday()
print tls.getTomorrow()
print tls.getSimpTime('%m-,%d')
print tls.timeRemoveZero('2014年01月10日')
addPath('c:\\')
import sys
print sys.path
print tls.nubToTime(4000,1,1)
print tls.getLastMonthLastDay()
print tls.getFormatApi()
print tls.getLastMonthLastDay()
'''

# print [1,2,3].index(4)