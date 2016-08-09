# coding=utf-8
from pyExcelerator import *

def getSiteName(id,cur):
    cur.execute('select site_name from crawler_site where id=%s',[id])
    rt = cur.fetchone()
    if rt:
        return rt[0]

def getColumnName(id,cur):
    cur.execute('select tag,site_id from crawler_column where id=%s',[id])
    rt = cur.fetchone()
    if rt:
        return rt[0],getSiteName(rt[1],cur)

def export(rs,today,cur):
    w = Workbook()     #创建一个工作簿
    ws = w.add_sheet('number')     #创建一个工作表
    h = 0
    ws.write(h,0,'网站')    #在1行1列写入bit
    ws.write(h,1,'栏目')  #在1行2列写入huang
    ws.write(h,2,'数量')  #在1行2列写入huang
    for ret in rs:
        name,siteName = getColumnName(ret['name'],cur)
        if name:
            h+=1
            ws.write(h,0,siteName)
            ws.write(h,1,name)
            ws.write(h,2,str(ret['count']))
    w.save(today+'.xls')     #保存
