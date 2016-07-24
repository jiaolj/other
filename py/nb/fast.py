# -*- coding: utf-8 -*-
import MySQLdb,datetime

#----第前几天
def getPastOneDay(numb=1):
    today=datetime.date.today()
    days=datetime.timedelta(days=numb)
    nowday=today-days
    return nowday

def getLocationId(cur,code):
    cur.execute('select id from location where formalcode=%s',[code])
    result = cur.fetchone()
    if result:
        return result[0]

def getlocation(cur,pk):
    cur.execute('select formalcode from location where id=%s',[pk])
    result = cur.fetchone()
    country_id = None
    province_id = None
    if result:
        result = result[0]
        if len(result)>=4:
            country_id = getLocationId(cur,result[:4])
        if len(result)>=8:
            province_id = getLocationId(cur,result[:8])
    return country_id,province_id

def main():
    conn=MySQLdb.connect(host="192.168.0.31",user="root",passwd="udms1234",db="nbdata2.0",charset="utf8")    
    cur = conn.cursor()
    #date = '2016-07-14'
    date = None
    if not date:
        date = getPastOneDay()
    cur.execute('select id,pubDate,location from news where pubDate>=%s order by pubDate',[date])
    result = cur.fetchall()
    for r in result:
        news_id = r[0]
        date = r[1].strftime('%Y-%m-%d')
        location_id = r[2]
        if location_id!=-1:
            print date
            country_id,province_id = getlocation(cur,location_id)
            cur.execute('select id from news_location where id=%s',[news_id])
            if not cur.fetchone():
                cur.execute('insert into news_location(news_id,date,location_id,country_id,province_id) values(%s,%s,%s,%s,%s)',[news_id,date,location_id,country_id,province_id])
                conn.commit()
    cur.close()
    conn.close()
if __name__ == '__main__':
    main()