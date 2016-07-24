# -*- coding: utf-8 -*-
import MySQLdb,pymongo
conn=MySQLdb.connect(host="192.168.1.251",user="udms",passwd="123456",db="nbdata2.0",charset="utf8")    
cur = conn.cursor()

client = pymongo.MongoClient('192.168.1.251', 27017)
db = client.nbCrawler2   #连接数据库
db.authenticate('udms', '123456') #账户验证
col = db.webNews    #连接表
result2=col.find().sort('pubDate',pymongo.DESCENDING).limit(10)
for lt in result2:
    title = lt['title']
    url = lt['url']
    column_id = lt['column_id']
    pubDate = lt['pubDate']
    content = lt['content']
    print title,url,column_id,pubDate
    cur.execute('insert into craler_news(title,url,`column`,pubDate,content) values(%s,%s,%s,%s,%s)',[title,url,column_id,pubDate,content])
conn.commit()
cur.close()
conn.close()