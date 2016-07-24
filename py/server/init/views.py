# -*- coding: utf-8 -*-
from models.citys import Citys,Cityss
from tools.func import to_json
import jieba

def index(req):
    return to_json('hello word')

def getloc(kwd):
    lst = []
    data ={}
    ss = jieba.cut(kwd, cut_all = True)
    for s in ss:
        lst.append(s)
    for s in lst:
        province = Cityss.objects.filter(name=s,tp='province')
        if province:
            data['province_id'] = province[0].pk
            data['province_name'] = province[0].name
    for s in lst:
        city = Cityss.objects.filter(name=s,tp='city')
        if city:
            data['city_id'] = city[0].pk
            data['city_name'] = city[0].name
            data['city_pid'] = city[0].pid
    for s in lst:
        area = Cityss.objects.filter(name=s,tp='area')
        if area:
            data['area_id'] = area[0].pk
            data['area_name'] = area[0].name
            data['area_pid'] = area[0].pid
    if data.get('province_name') and data.get('area_name') and data.get('province_name')==data.get('area_name'):
        del data['area_id']
        del data['area_name']
        del data['area_pid']
    if data.get('province_name') and data.get('city_name') and data.get('province_name')==data.get('city_name'):
        del data['city_id']
        del data['city_name']
        del data['city_pid']
    if data.get('city_name') and data.get('area_name') and data.get('city_name')==data.get('area_name'):
        del data['area_id']
        del data['area_name']
        del data['area_pid']
    if data.get('area_id'):
        city = Cityss.objects.filter(pk=data.get('area_pid'))
        data['city_id'] = city[0].pk
        data['city_name'] = city[0].name
        data['city_pid'] = city[0].pid
        province = Cityss.objects.filter(pk=city[0].pid)
        data['province_id'] = province[0].pk
        data['province_name'] = province[0].name
    if data.get('city_id'):
        province = Cityss.objects.filter(pk=data.get('city_pid'))
        data['province_id'] = province[0].pk
        data['province_name'] = province[0].name
    return data

def getLocation(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    spt = q.get('spt',u'到')
    kwd = q.get('kwd')
    if kwd:
        kwds = kwd.split(spt)
        if len(kwds)==2:
            back['from'] = getloc(kwds[0])
            back['to'] = getloc(kwds[1])
        else:
            w = getloc(kwds[0])
            if w:
                back['from'] = w
            else:
                back['msg']='no city'
    else:
        back['status']='error'
        back['msg']='need kwd'
    return to_json(back)

def getId(name):
    return Citys.objects.filter(name=name)[0].pk

def save(req):
    q = req.GET or req.POST
    name = q.get('name')
    name_en = q.get('name_en')
    num = q.get('num')
    tp = q.get('tp')
    p = q.get('p')
    pid = getId(p)
    if name:
        kwargs = {'name':name,'name_en':name_en,'code':'1000'+num,'tp':tp,'pid':pid}
        if not Citys.objects.filter(**kwargs):
            c = Citys(**kwargs)
            c.save()
    return to_json(name)