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
    w = Workbook()  #创建一个工作簿
    ws = w.add_sheet('number')  #创建一个工作表
    
    style = XFStyle() #样式
    style2 = XFStyle()
    fnt = Font() #字体
    fnt2 = Font()
    al = Alignment()  #对齐方式
    al.horz = Alignment.HORZ_CENTER  
    al.vert = Alignment.VERT_CENTER  
    style.alignment = al
    h = 0
    fnt.height = 200 #字体大小
    style.font = fnt
    ws.write(h,0,u'网站',style)  #写入
    ws.write(h,1,u'栏目',style)
    ws.write(h,2,u'数量',style)
    fnt2.height = 300 #行高
    style2.font = fnt2
    ws.row(h).set_style(style)
    
    for ret in rs:
        name,siteName = getColumnName(ret['name'],cur)
        if name:
            h+=1

            ws.write(h,0,siteName,style) #写入
            ws.write(h,1,name,style)
            ws.write(h,2,ret['count'],style)
            ws.row(h).set_style(style2)

    ws.col(0).width = 10000 #列宽
    ws.col(1).width = 6000
    ws.col(2).width = 2000

    w.save(today+'.xls')     #保存
