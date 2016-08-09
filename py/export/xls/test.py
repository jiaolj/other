# coding=utf-8
from pyExcelerator import *
w = Workbook()     #创建一个工作簿
ws = w.add_sheet('Hey, Hades')     #创建一个工作表
style = XFStyle()
style2 = XFStyle()
fnt = Font()
fnt2 = Font()

al = Alignment()  #对齐方式
al.horz = Alignment.HORZ_CENTER  
al.vert = Alignment.VERT_CENTER  
style.alignment = al 

fnt.height = 200 #字体大小
style.font = fnt

ws.write(0,0,'bit',style)
ws.write(0,1,u'你好',style)
ws.col(0).width = 10000
ws.col(1).width = 8000

fnt2.height = 300
style2.font = fnt2 #行高
ws.row(0).set_style(style2)
w.save('mini.xls') #保存