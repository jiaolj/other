# -*- coding: utf-8 -*-
import pymongo,datetime,time,MySQLdb,mail,xsl

ip = '192.168.0.31'
MONGODB = {
    'host': ip,
    'port': 27017,
    'name': 'udms',
    'passwd': 'udms1234',
}
MSQL = {
    'host': ip,
    'name': 'root',
    'passwd': 'udms1234',
}
#----第前几天
def getPastOneDay(numb):
    today=datetime.date.today()
    days=datetime.timedelta(days=numb)
    nowday=today-days
    return nowday
#----分组统计数量
def getGroupNum(result,key):
    cols = set()
    rs = []
    for ret in result:
        cols.add(ret[key])
        rs.append(ret)
    r = []
    for name in cols:
        count = 0
        for r1 in rs:
            if name==r1[key]:
                count += 1
        r.append({'name':name,'count':count})
    return r

def main():
    conn = MySQLdb.connect(host=MSQL['host'], user=MSQL['name'],passwd=MSQL['passwd'],db="nbdata2.0",charset="utf8")
    cur = conn.cursor()
    time3 = getPastOneDay(7).strftime('%Y-%m-%d')
    time3all = time3.split('-')
    time3y = int(time3all[0])
    time3m = int(time3all[1])
    time3d = int(time3all[2])
    client = pymongo.MongoClient(MONGODB['host'], MONGODB['port'])
    db = client.nbCrawler2    #连接数据库
    db.authenticate(MONGODB['name'], MONGODB['passwd']) #账户验证
    col = db.webNews    #连接表
    result = col.find({'pubDate':{'$gte':datetime.datetime(time3y, time3m, time3d, 0, 0, 0)}})
    today = time.strftime('%Y-%m-%d',time.localtime(time.time()))
    rs = getGroupNum(result,'column_id')
    '''
    f = open(today+'.txt','w')
    for ret in rs:
        name,siteName = getColumnName(ret['name'],cur)
        if name:
            f.write('网站：'+siteName.encode('utf-8')+' 栏目：'+name.encode('utf-8')+'  数量：'+str(ret['count'])+' \n')
    f.close()
    conn.close()
    '''
    xsl.export(rs,today,cur)
    mail.sendSubjectMail(today)

if __name__ == '__main__':
    main()