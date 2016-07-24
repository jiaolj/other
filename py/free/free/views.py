# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.core.serializers.json import DjangoJSONEncoder
from django.db import connection
import json,urllib2,datetime
def to_json(data):return HttpResponse(json.dumps(data, cls=DjangoJSONEncoder), content_type='application/json')
def listToJson(cms,r):return [{cms[i]:m for i,m in enumerate(n)} for n in r] #数组列表变json列表

def index(req):
    return render_to_response('index.html')

def check(req):
    cur = connection.cursor()
    room = req.GET.get('room')
    back = {'state':'1','error':'','log':'','data':''}
    field = 'id,word,date,is_view,is_hide'
    cur.execute('select '+field+' from words where room=%s',[room])
    r = cur.fetchall()
    if r :
        back['data'] = listToJson(field.split(','),r)
    return to_json(back)

def clear(req):
    cur = connection.cursor()
    back = {'state':'1','error':'','log':''}
    room = req.GET.get('room')
    cur.execute('delete from words where room=%s',[room])
    #cur.execute('update words set is_hide=1')
    return to_json(back)

def add(req):
    cur = connection.cursor()
    word = req.GET.get('word')
    room = req.GET.get('room')
    date = datetime.datetime.now()
    back = {'state':'1','error':'','log':''}
    cur.execute('insert into words(room,word,date) values(%s,%s,%s)',[room,word,date])
    return to_json(back)

def get(req):
    url = req.GET.get('url')
    datas = urllib2.urlopen(url).read()
    data = datas.split('</div>')[1]
    return to_json(json.loads(data))
