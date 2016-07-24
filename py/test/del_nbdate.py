# -*- coding: utf-8 -*-
import MySQLdb

conn = MySQLdb.connect(host='192.168.1.251', user='udms',passwd='123456',db="nbdata2.0",charset="utf8")
cur = conn.cursor()
date = '2015-11-20'
cur.execute('delete from concept_heat where date >=%s',[date])
cur.execute('delete from country_heat where date >=%s',[date])
cur.execute('delete from depart_heat where date >=%s',[date])
cur.execute('delete from loc_heat where date >=%s',[date])
cur.execute('delete from province_heat where date >=%s',[date])
cur.execute('delete from topic_heat where date >=%s',[date])

cur.execute('select * from news where pubDate >=%s',[date])
for r in cur.fetchall():
    news_id = r[0]
    cur.execute('delete from news where id=%s',[news_id])
    cur.execute('delete from images where news_id=%s',[news_id])
    cur.execute('delete from news_department where news_id=%s',[news_id])
    cur.execute('delete from news_topic where news_id=%s',[news_id])
    cur.execute('select event_id from event_news where new_id=%s',[news_id])
    event_id = cur.fetchone()
    if event_id:
        event_id = event_id[0]
        cur.execute('delete from event_news where event_id=%s',[event_id])
        cur.execute('delete from events where id=%s',[event_id])

conn.commit()
conn.close()
