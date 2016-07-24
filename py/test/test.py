# -- coding: utf8 --
import MySQLdb
conn=MySQLdb.connect(host="121.40.87.203",user="jiaolj",passwd="10534jun",db="server",charset="utf8")
cur=conn.cursor()
'''
f=open('data/mtrees2015.txt')
for r in f.readlines():
    cur.execute('insert into kwd(name) values(%s)',[r.split('')[0]])
    
f.close()
'''

def simpCity(r):
    if len(r)>=6:
        r = r.replace('苏柯尔克孜','')
        r = r.replace('哈萨克族','')
    if len(r)>=5:
        r = r.replace('保安族 ','')
        r = r.replace('哈萨克','')
        r = r.replace('自治区','')
        r = r.replace('自治州','')
        r = r.replace('自治县','')
        r = r.replace('自治旗','')
        r = r.replace('联合旗','')
        r = r.replace('斡尔族','')
        r = r.replace('维吾尔','')
        r = r.replace('自治州','')
        r = r.replace('布依族','')
        r = r.replace('朝鲜族','')
        r = r.replace('土家族','')
        r = r.replace('蒙古族','')
        r = r.replace('仡佬族','')
        r = r.replace('仫佬族','')
        r = r.replace('毛南族','')
        r = r.replace('哈尼族','')
        r = r.replace('傈僳族','')
        r = r.replace('纳西族','')
        r = r.replace('拉祜族','')
        r = r.replace('布朗族','')
        r = r.replace('景颇族','')
        r = r.replace('独龙族','')
        r = r.replace('普米族','')
        r = r.replace('裕固族','')
        r = r.replace('撒拉族','')
    if len(r)>=5:
        r = r.replace('东乡族','')
    if len(r)>=4:
        r = r.replace('林区','')
        r = r.replace('前旗','')
        r = r.replace('沁旗','')
        r = r.replace('中旗','')
        r = r.replace('后旗','')
        r = r.replace('左旗','')
        r = r.replace('右旗','')
        r = r.replace('各族','')
        r = r.replace('畲族','')
        r = r.replace('满族','')
        r = r.replace('瑶族','')
        r = r.replace('侗族','')
        r = r.replace('苗族','')
        r = r.replace('壮族','')
        r = r.replace('回族','')
        r = r.replace('藏族','')
        r = r.replace('黎族','')
        r = r.replace('彝族','')
        r = r.replace('羌族','')
        r = r.replace('侗族','')
        r = r.replace('水族','')
        r = r.replace('傣族','')
        r = r.replace('白族','')
        r = r.replace('佤族','')
        r = r.replace('怒族','')
        r = r.replace('土族','')
        r = r.replace('土族','')
        r = r.replace('土族','')
        r = r.replace('地区','')
    if len(r)>=4:
        r = r.replace('左翼','')
        r = r.replace('右翼','')
        r = r.replace('蒙古','')
    if len(r)>=3:
        r = r.replace('县','')
        r = r.replace('省','')
    if len(r)>=3:
        r = r.replace('区','')
    if len(r)>=3:
        r = r.replace('市','')
    return r

cur.execute('select id,name from citys order by id')
rr = cur.fetchall()
for r in rr:
    id = r[0]
    name = simpCity(r[1])
    if len(name)>2:
        print id,name,len(name)
    cur.execute('update citys_simp set name=%s where id=%s',[name,id])
conn.commit()

conn.close()