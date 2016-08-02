# -*- coding: utf-8 -*-
import MySQLdb,pcity



conn = MySQLdb.connect(host='jiaolj.com', user='jiaolj',passwd='10534jun',db="db",charset="utf8")
cur = conn.cursor()
def getAll():
    f = open('number.txt','r')
    for line in f.readlines():
        lines = line.split('\t')
        numb = lines[0]
        province,city = pcity.getpc(lines[1].replace('"',''))
        cur.execute('select id from mb_number_area where numb=%s and province=%s and city=%s',[numb,province,city])
        r = cur.fetchone()
        if not r:
            cur.execute('insert into mb_number_area(numb,province,city) values(%s,%s,%s)',[numb,province,city])
            conn.commit()
            print province,city,'insert ok'
    f.close()
getAll()
conn.close()
