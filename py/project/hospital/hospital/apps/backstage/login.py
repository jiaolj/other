#-*- coding:utf-8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.core.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt
import re

permissions=[
             {'zhanghao':'xs','mima':'123456'},
             ]

def loginpage(request):
    return render_to_response('login/index.html',locals())
@csrf_exempt
def login(request):
    uname=''
    pwd=''
    error=''
    uname=request.GET.get('uname')
    pwd=request.GET.get('pwd')
    if not uname:error=1
    if not pwd:error=1
    if error:return HttpResponse('0')
    for pm in permissions:
        un=pm['zhanghao']
        pw=pm['mima']
        if uname==un and pwd==pw:
            request.session['username']=uname
            return HttpResponse('1')
    return HttpResponse('0')

def logout(request):
    request_url = request.META.get('HTTP_REFERER', '/')
    request.session.delete()
    return HttpResponseRedirect('/loginpage.html')
