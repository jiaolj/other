# -*- coding: utf-8 -*-
from django.views.decorators.csrf import csrf_exempt
from models.lastPage import lastPage
from tools.func import to_json

@csrf_exempt
def get(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    id = q.get('id')
    if id:
        rr = lastPage.objects.filter(pk=id)
    else:
        rr = lastPage.objects.all()
    r = [{'id':m.pk,'from_user':m.from_user,'to_user':m.to_user,'page':m.page,'did':m.did} for m in rr]
    back['data'] = r
    return to_json(back)

@csrf_exempt
def update(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    id = q.get('id')
    from_user = q.get('from_user')
    to_user = q.get('to_user')
    page = q.get('page')
    did = q.get('did')
    kwargs = {'from_user':from_user,'to_user':to_user,'page':page,'did':did}
    if id:
        lastPage.objects.filter(pk=id).update(**kwargs)
        back['id'] = id
    else:
        h = lastPage(**kwargs)
        h.save()
        back['id'] = h.id
    return to_json(back)

@csrf_exempt
def remove(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    id = q.get('id')
    lastPage.objects.filter(pk=id).delete()
    back['id'] = id
    return to_json(back)
