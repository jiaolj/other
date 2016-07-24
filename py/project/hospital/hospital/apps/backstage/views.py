#-*- coding:utf-8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.core.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt
from django.core.cache import cache
from middleware import logindirector
import datetime,time,sys,urllib,json
reload(sys)
sys.setdefaultencoding('UTF-8')

@logindirector
def home(request):
    return render_to_response('backstage/home.html',locals())

@logindirector('admin')
def permission(request):
    return render_to_response('backstage/permission.html',locals())

def loginpage(request):
    return render_to_response('backstage/loginpage.html',locals())
	
def newslist(request):
	listall=[{'id':1,'title':'一个主要的心血管病中心有很多的心','tag':'推荐','time':'2015-03-22'},
	{'id':2,'title':'一个主要的心血管病中心有很多的心','tag':'推荐','time':'2015-03-22'},
	{'id':3,'title':'一个主要的心血管病中心有很多的心','tag':'置顶','time':'2015-03-22'},
	{'id':4,'title':'一个主要的心血管病中心有很多的心','tag':'','time':'2015-03-22'},
	{'id':5,'title':'一个主要的心血管病中心有很多的心','tag':'','time':'2015-03-22'},
	{'id':6,'title':'一个主要的心血管病中心有很多的心','tag':'','time':'2015-03-22'}
	]
	return render_to_response('backstage/newslist.html',locals())




#----登陆验证
permissions=[
             {'zhanghao':'xs','mima':'123'},
             ]
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
    return HttpResponseRedirect('/backstage/')