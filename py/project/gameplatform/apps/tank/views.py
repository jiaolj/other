# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response

def home(request):
    uname=request.session.get('username')
    return render_to_response('tank/home.html',locals())

def double(request):
    uname=request.session.get('username')
    return render_to_response('tank/double.html',locals())

def learn(request):
    uname=request.session.get('username')
    return render_to_response('tank/learn.html',locals())