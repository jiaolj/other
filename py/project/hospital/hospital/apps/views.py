#-*- coding:utf-8 -*-
from django.shortcuts import render,render_to_response
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.core.urlresolvers import reverse
import json,re,urllib2,urllib,random

def home(request):
    seoTitle='Bangpakok Hospital'
    index=1
    return render_to_response('home.html',locals())

def organization(request):
    seoTitle='organization'
    return render_to_response('organization.html',locals())

def ourServices(request):
    seoTitle='ourServices'
    return render_to_response('ourServices.html',locals())

def ourDoctors(request):
    seoTitle='ourDoctors'
    return render_to_response('ourDoctors.html',locals())

def corperate(request):
    seoTitle='corperate'
    index=2
    return render_to_response('corperate.html',locals())

def service(request):
    seoTitle='service'
    index=3
    return render_to_response('service.html',locals())

def promotion(request):
    seoTitle='promotion'
    index=4
    return render_to_response('promotion.html',locals())

def news(request):
    seoTitle='news'
    index=5
    return render_to_response('news.html',locals())

def contactus(request):
    seoTitle='contactus'
    index=6
    return render_to_response('contactus.html',locals())