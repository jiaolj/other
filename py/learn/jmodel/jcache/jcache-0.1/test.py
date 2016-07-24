#-*- coding:utf-8 -*-
from JCache import JCache
import datetime

para={"daysBefore":60,"event_type":"媒体评论类"}
ck=''
for k,v in para.items():ck+=k+'_'+str(v)
data='hello'

jc=JCache(datetime)
if jc.has_key(ck):val=jc.get(ck)
else: 
    jc.set(ck,data)
    val=data


print jc.j

import datetime

today=datetime.date.today()
if today!=datetime.date.today():
    print 1