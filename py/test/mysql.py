# -*- coding: utf-8 -*-
import MySQLdb

#conn = MySQLdb.connect(host='192.168.1.251', user='udms',passwd='123456',db="nbdata2.0",charset="utf8")
conn = MySQLdb.connect(host='localhost', user='root',passwd='10534jun',db="nbdata2.0",charset="utf8")
cur = conn.cursor()
def getPvc(pid='0'):
    cur.execute('select id,name from location where parent_location_id=%s',[pid])
    rt = cur.fetchall()
    for r in rt:
        print str(r[0])+':"'+r[1]+'",'
#getPvc()
def getAll():
    sql='select distinct `column` from news order by pubDate desc'
    cur.execute(sql)
    rt = cur.fetchall()
    for r in rt:
        cid=r[0]
        cur.execute('select column_id from column_department where column_id=%s and department_id=%s',[cid,5])
        rt = cur.fetchone()
        if rt:
            print 'ok'
        else:
            print rt[0]
            cur.execute('insert into column_department(column_id,department_id) values(%s,%s)',[cid,5])
            conn.commit()
getAll()
conn.close()
