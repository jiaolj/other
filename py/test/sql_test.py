# -*- coding: utf-8 -*-
import MySQLdb,operator



conn = MySQLdb.connect(host='192.168.1.251', user='udms',passwd='123456',db="nbdata2.0",charset="utf8")
cur = conn.cursor()

listall = []
cur.execute('select count(topic_id),topic_id from news_topic group by topic_id order by count(topic_id) desc limit 0,50')
jlist = {}
sonlist = []
for r in cur.fetchall():
    count = r[0]
    topic_id = r[1]
    cur.execute('select pid from topic where id=%s',[topic_id])
    r = cur.fetchone()
    pid = r[0]
    if pid==0:
        jlist[str(topic_id)] = count
    else:
        sonlist.append([topic_id,pid,count])
for s in sonlist:
    if jlist.get(str(s[1])):
        jlist[str(s[1])] += s[2]
    else:
        jlist[str(s[1])] = s[2]

for (k,v) in  jlist.items():
    listall.append({'did':k,'value':v})
listall = sorted(listall, key=operator.itemgetter('value'), reverse=True)  
print listall

conn.close()
