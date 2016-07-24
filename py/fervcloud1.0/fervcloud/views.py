# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.core.serializers.json import DjangoJSONEncoder
from django.db import connection
import json
def to_json(data):return HttpResponse(json.dumps(data, cls=DjangoJSONEncoder), content_type='application/json')
def listToJson(cms,r):return [{cms[i]:m for i,m in enumerate(n)} for n in r] #数组列表变json列表
pubTitle='杭州炽云科技'
def index(req):
    seoTitle='黑侠_车载智能HUD_'+pubTitle
    index = 1
    lg = req.GET.get('lg','')
    if not lg:
	    lg = '1'
    return render_to_response('index.html',locals())

def about(req):
    index = 3
    seoTitle='关于我们_'+pubTitle
    lg = req.GET.get('lg','')
    if not lg:
	    lg = '1'
    return render_to_response('about.html',locals())

def xhx(req):
    index = 1
    lg = req.GET.get('lg','')
    if lg == '2':
        enDir = 'en'
    else:
        enDir = 'cn'
    if not lg:
	    lg = '1'
    seoTitle='小黑侠_'+pubTitle
    return render_to_response('xhx.html',locals())

def admin(req):
    return HttpResponse('<script>location.href="/static/jadmin/index.html"</script>')

def get99(req):
    cur = connection.cursor()
    model = 'id,name,age,sex,mobile,email,tp,company,job,advice,ischeck'
    sql = 'select '+model+' from `99`'
    cur.execute(sql)
    return to_json(listToJson(model.split(','),cur.fetchall()))

def submit99(req):
    name = req.GET.get('name','')
    age = req.GET.get('age','20')
    sex = req.GET.get('sex','1')
    tp = req.GET.get('tp','1')
    company = req.GET.get('company','')
    mobile = req.GET.get('mobile','')
    email = req.GET.get('email','')
    job = req.GET.get('job','')
    advice = req.GET.get('advice','')
    sql = 'insert into `99`(name,age,sex,mobile,email,tp,company,job,advice) values(%s,%s,%s,%s,%s,%s,%s,%s,%s)'
    cur = connection.cursor()
    cur.execute(sql,[name,age,sex,mobile,email,tp,company,job,advice])
    return HttpResponse('1')