#-*- coding:utf-8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.core.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt
from django.core.cache import cache
import json
#from zz91tools import getToday,getYesterday,date_to_str
#from zz91page import *
from pubconn import database_gongjx
from pubdb_mysql import mysqldb
import datetime,time,sys,urllib,os
dbg=mysqldb(database_gongjx())
reload(sys)
sys.setdefaultencoding('UTF-8')
#from func.gongjx_class import *
#from func.gongjx_tools import *
#from func.gongjx_function import *
nowpath=os.path.dirname(__file__)
execfile(nowpath+"/func/gongjx_class.py")
execfile(nowpath+"/func/gongjx_tools.py")
execfile(nowpath+"/func/gongjx_function.py")
gjph=gjphonenumb()

def getlmselected(nid):
    listdir={'n1':'','n2':'','n3':'','n4':'','n5':'','n6':'','n7':'','n8':'','n9':'','n10':'','n185':''}
    listdir[nid]={'css1':'class=selected','css2':'style=color:#FF0'}
    return listdir

#----收录查询
sousuoyq=[
          {'name':'baidu','n1':'style=color:blue','url':'http://www.baidu.com/s?wd=','imgurl':'/imgs/logo/baidu_logo.gif','queryurl':'0'},
          {'name':'360','n2':'style=color:blue','url':'http://www.so.com/s?q=','imgurl':'/imgs/logo/360_logo.jpg','queryurl':'1'},
          {'name':'sougou','n3':'style=color:blue','url':'http://www.sogou.com/web?query=','imgurl':'/imgs/logo/sougou_logo.png','queryurl':'2'},
          {'name':'soso','n4':'style=color:blue','url':'http://www.soso.com/q?query=','imgurl':'/imgs/logo/soso_logo.png','queryurl':'3'},
          ]
def getlmselectedshoulu(kltype):
    num=0
    for sousuo in sousuoyq:
        if kltype in sousuo['name']:
            return sousuoyq[num]
        num+=1
def index(request):
    lmselected=getlmselected("n1")
    return render_to_response('index.html',locals())
def shoulu(request,kltype=''):
    lmselected=getlmselected("n2")
    shouludir=sousuoyq[0]
    if kltype:
        shouludir=getlmselectedshoulu(kltype)
        if not shouludir:
            return render_to_response('404.html',locals())
    return render_to_response('baidushoulu/index.html',locals())
def shouluquery(request,kltype=''):
    queryurl=request.GET.get('queryurl')
    baidus=request.GET.get('baidus')
    baidurl='http://'+baidus
    baidurl=baidurl.replace('<br />','')
    for sousuo in sousuoyq:
        if queryurl==sousuo['queryurl']:
            baidu_url=sousuo['url']+baidurl+'&ie=utf-8'
            html=getwebhtml(baidu_url)
            if not '抱歉，没有找到与' in html and not '没有找到该URL' in html and not '找不到该URL' in html and not '未收录？' in html:
                return HttpResponse('1')
    return HttpResponse('0')

#----号码查询
telephonetype=[
               {'name':'mobile','n1':'style=color:blue','text':'请输入您的手机号码','numb':'15167195189'},
               {'name':'tel','n2':'style=color:blue','text':'请输入您的座机号码(请加上区号)','numb':'027-4036892'},
               ]
def gettelephonetype(kltype):
    num=0
    for tele in telephonetype:
        if kltype in tele['name']:
            return telephonetype[num]
        num+=1
def phone(request,kltype=''):
    lmselected=getlmselected("n3")
    telephone=telephonetype[0]
    if kltype:
        telephone=gettelephonetype(kltype)
        if not telephone:
            return render_to_response('404.html',locals())
    return render_to_response('phone/index.html',locals())

#@csrf_exempt
def phonequery(request,kltype=''):
    phonenumb=''
    phonenumb=request.GET.get('phonenumb1')
    #if request.POST.has_key('phonenumb1'):
        #phonenumb=request.POST['phonenumb1']
    if phonenumb:
        if kltype=='mobile':
            phonenumb7=phonenumb[:7]
            sql='select province,city,type,areacode from mobile_number where numb=%s'
            result=dbg.fetchone(sql,[phonenumb7])
            if result:
                province=result[0]
                city=result[1]
                type=result[2]
                areacode=result[3]
                listdir={'province':province,'city':city,'type':type,'areacode':areacode}
                return HttpResponse(json.dumps(listdir,ensure_ascii=False))
        elif kltype=='tel':
            if phonenumb[:1]=='0':
                phonenumb3=phonenumb[:3]
                phonenumb4=phonenumb[:4]
            else:
                phonenumb3=phonenumb[:2]
                phonenumb4=phonenumb[:3]
            sql='select province,city,zipcode from tel_guoneinumb where numb=%s'
            result=dbg.fetchone(sql,[phonenumb3])
            if result:
                province=result[0]
                city=result[1]
                zipcode=result[2]
                listdir={'province':province,'city':city,'zipcode':zipcode}
                return HttpResponse(json.dumps(listdir,ensure_ascii=False))
            sql='select province,city,zipcode from tel_guoneinumb where numb=%s'
            result=dbg.fetchone(sql,[phonenumb4])
            if result:
                province=result[0]
                city=result[1]
                zipcode=result[2]
                listdir={'province':province,'city':city,'zipcode':zipcode}
                return HttpResponse(json.dumps(listdir,ensure_ascii=False))
    #return HttpResponse(json.dumps({'province':''},ensure_ascii=False))

#----走势图类型
charttype=[
           {'name':'example','n1':'style=color:blue','text':'走势图示例'},
           {'name':'interface','n2':'style=color:blue','text':'调用接口'},
           ]
def getcharttype(kltype):
    num=0
    for tele in charttype:
        if kltype in tele['name']:
            return charttype[num]
        num+=1
#走势图
def chart(request,kltype=''):
    lmselected=getlmselected("n4")
    chartdata=charttype[0]
    if kltype:
        chartdata=getcharttype(kltype)
        if not chartdata:
            return render_to_response('404.html',locals())
        if kltype=='interface':
            return render_to_response('chart/interface.html',locals())
    return render_to_response('chart/index.html',locals())

def chartxml(request):
    datall=request.GET.get('datall')
    if datall:
        datalllist=datall.split(',')
        name=datalllist[0]
        kind=datalllist[1]
        kind2=datalllist[2]
        unit=datalllist[3]
        datelist1=datalllist[4]
        datelist2=datalllist[5]
        datelist3=datalllist[6]
        datelist4=datalllist[7]
        datelist5=datalllist[8]
        datalist1=datalllist[9]
        datalist2=datalllist[10]
        datalist3=datalllist[11]
        datalist4=datalllist[12]
        datalist5=datalllist[13]
        datalist21=datalllist[14]
        datalist22=datalllist[15]
        datalist23=datalllist[16]
        datalist24=datalllist[17]
        datalist25=datalllist[18]
    else:
        name='水果销售量'
        kind='苹果'
        kind2='梨子'
        unit='个'
        datelist1='11-05'
        datelist2='11-06'
        datelist3='11-07'
        datelist4='11-08'
        datelist5='11-09'
        datalist1='100'
        datalist2='200'
        datalist3='300'
        datalist4='200'
        datalist5='100'
        datalist21='300'
        datalist22='400'
        datalist23='500'
        datalist24='400'
        datalist25='500'
    return render_to_response('chart/chartxml.html',locals())

def ichart(request):
    name=request.GET.get('name')
    tp=request.GET.get('tp')
    timelist=request.GET.get('timelist')
    datalist=request.GET.get('datalist')
    listall=name+'|'+timelist+'|'+datalist
    width=request.GET.get('w')
    width2=int(width)-50
    height=request.GET.get('h')
    height2=int(height)-50
    return render_to_response('chart/ichart.html',locals())

def ichartxml(request):
    listall=request.GET.get('listall')
    #listall='水果走势图|11-05,11-06,11-07,11-08,11-09|苹果:100,100,100,100,100-梨子:100,100,100,100,100'
    listalls=listall.split('|')
    name=listalls[0]
    timelist=listalls[1]
    datalist=listalls[2]
#    name=request.GET.get('name')
#    datalist=request.GET.get('datalist')
#    timelist=request.GET.get('timelist')
    datadir=datalist.split(')')
    listall=[]
    for dir in datadir[:-1]:
        dirlist=dir.split('(')
        listdir={'label':dirlist[0],'values':dirlist[1]}
        listall.append(listdir)
    unit='个'
    return render_to_response('chart/ichartxml.html',locals())
#----打字练习类型
typingtype=[
           {'name':'ch','n1':'style=color:blue','text':'走势图示例'},
           {'name':'en','n2':'style=color:blue','text':'走势图数据'},
           {'name':'chen','n3':'style=color:blue','text':'走势图数据'},
           ]
def gettypingtype(kltype):
    num=0
    for typt in typingtype:
        if kltype in typt['name']:
            return typingtype[num]
        num+=1
def typing(request,kltype=''):
    lmselected=getlmselected("n5")
    typingdata=typingtype[0]
    if kltype:
        typingdata=gettypingtype(kltype)
        if not typingdata:
            return render_to_response('404.html',locals())
    return render_to_response('typing/index.html',locals())