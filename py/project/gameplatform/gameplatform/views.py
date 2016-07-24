#-*- coding:utf-8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
import json,socket
#from middleware import logindirector
serverConfig=('10.13.91.222',1111)
permissions=[
             {'account':'abc','pwd':'123'},
             {'account':'def','pwd':'123'},
             ]

def home(request):
    uname=request.session.get('username')
    return render_to_response('home.html',locals())

def reg(request):
    return render_to_response('reg.html',locals())

def loginPage(request):
    return render_to_response('login.html',locals())

def getUserLogin(jsonData):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        sock.connect(serverConfig)
        sock.send(jsonData)
        backData=sock.recv(1024)
        sock.close()
        return backData
    except:
        return '帐号服务器已关闭'

@csrf_exempt
def clientLogin(request):
    errorText=''
    uname=request.GET.get('uname')
    pwd=request.GET.get('pwd')
    if not uname or not pwd:return HttpResponse('账号或密码为空')
    for pm in permissions:
        un=pm['account']
        pw=pm['pwd']
        if uname==un and pwd==pw:
            jsonData={'id':1,'uname':uname}
            data_string = json.dumps(jsonData)
            errorText=getUserLogin(data_string)
            if errorText=='1':
                request.session['username']=uname
                return HttpResponse('1')
    if not errorText:errorText='账号或密码错误'
    return HttpResponse(errorText)


#----登陆验证
@csrf_exempt
def login(request):
    uname=''
    pwd=''
    error=''
    uname=request.POST.get('uname')
    pwd=request.POST.get('pwd')
    
    if not uname:error=1
    if not pwd:error=1
    if error:return HttpResponse('0')
    for pm in permissions:
        un=pm['account']
        pw=pm['pwd']
        if uname==un and pwd==pw:
            request.session['username']=uname
            return HttpResponse('1')
    return HttpResponse('0')
def logout(request):
    uname=request.session.get('username')
    jsonData={'id':2,'uname':uname}
    data_string = json.dumps(jsonData)
    text=accountLogin.getUserLogin(data_string)
    request.session.delete()
    return HttpResponseRedirect('/')