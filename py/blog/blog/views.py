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

def get(req):
    return to_json(json.loads(data))
