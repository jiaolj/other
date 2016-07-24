# -*- coding: utf-8 -*-
from django.core.serializers.json import DjangoJSONEncoder
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.db import connection
from settings import BASE_DIR
import json,os,random,time,shutil,re
from func import getListToJson,getHptName,hcountry,filter_tags,cleartable

def to_json(data):
    return HttpResponse(json.dumps(data, cls=DjangoJSONEncoder), content_type='application/json')

def upload(request):
    return HttpResponse('''
        <body style="margin:0;position:relative">
        <form align="center" name="myform" id="myform" method="post" enctype="multipart/form-data" style="overflow:hidden;display:block;width:98%;height:24px" action="/fileload/" target='mailloadimg'>
        <input type="file" value="选择图片" name="file" id="file" style="opacity=0;position:relative;left:-60px;outline:none" />
        <input type="submit" value="上传文件" style="position:relative;left:-120px" />
        <iframe name='mailloadimg' style="z-index:1;position:absolute;left:300px;top:-5px;width:200px;height:30px;border:0;margin-top:5px"></iframe>
        </form>
        </body>
    ''')

def dirjoin(lst,dirs):
    for r in lst:os.path.join(dirs,r)
    return dirs
@csrf_exempt
def fileload(request):
    if request.FILES:
        files=request.FILES['file']
        base='/static/img/cache/'
        newpath=BASE_DIR+base
        filename=files.name
        suportFormat = ['BMP', 'GIF', 'JPG','JPGE', 'PNG','JPEG']
        officeFormat = ['CSV','DOC','DOCX', 'DOCM', 'DOTX','DOTM','XLS','XLSX','XLSM','XLTX','XLTM','XLSB','XLAM','PDF','TXT','ET']
        filetype=filename.split('.')[-1]
        filetype=filetype.upper()
        if filetype in suportFormat:
            imagetype=1
        elif filetype in officeFormat:
            officetype=1
        else:
            return HttpResponse('<body style="margin:0;width:200px;height:30px">请选择一个正确的office文件格式。</body>')
        nowtime=int(time.time())
        tmp = random.randint(100, 999)
        fname=str(tmp)+str(nowtime)+'.'+filetype.lower()
        imgpath=newpath+fname
        if not os.path.isdir(newpath):
            os.makedirs(newpath)
        des_origin_f = open(imgpath,"wb+")
        for chunk in files.chunks():
            des_origin_f.write(chunk)
        des_origin_f.close()
        picurl=base+fname
        cur = connection.cursor()
        cur.execute('select detail from admin where id=2')
        result=cur.fetchone()[0]
        if result:
            os.remove(BASE_DIR+result)
        cur.execute('update admin set detail=%s where id=2',[picurl])
        return HttpResponse('<body style="margin:0;width:200px;height:20px">sucess.<script>parent.parent.document.getElementById("litpic").src="'+picurl+'";</script></body>')
    return HttpResponse('<body style="margin:0;width:200px;height:30px">请选择一个文件。</body>')
@csrf_exempt
def fileload2(request):
    if request.FILES:
        files=request.FILES['file']
        base='/static/img/cache/'
        newpath=BASE_DIR+base
        filename=files.name
        suportFormat = ['BMP', 'GIF', 'JPG','JPGE', 'PNG','JPEG']
        officeFormat = ['CSV','DOC','DOCX', 'DOCM', 'DOTX','DOTM','XLS','XLSX','XLSM','XLTX','XLTM','XLSB','XLAM','PDF','TXT','ET']
        filetype=filename.split('.')[-1]
        filetype=filetype.upper()
        if filetype in suportFormat:
            imagetype=1
        elif filetype in officeFormat:
            officetype=1
        else:
            return HttpResponse('<body style="margin:0;width:200px;height:30px">请选择一个正确的office文件格式。</body>')
        nowtime=int(time.time())
        tmp = random.randint(100, 999)
        fname=str(tmp)+str(nowtime)+'.'+filetype.lower()
        imgpath=newpath+fname
        if not os.path.isdir(newpath):
            os.makedirs(newpath)
        des_origin_f = open(imgpath,"wb+")
        for chunk in files.chunks():
            des_origin_f.write(chunk)
        des_origin_f.close()
        picurl=base+fname
        return HttpResponse("<body style='margin:0;width:200px;height:20px'><img src='"+picurl+"' /><script>parent.parent.ue.execCommand('insertHtml', '<img src="+picurl+" />')</script></body>")
    return HttpResponse('<body style="margin:0;width:200px;height:30px">请选择一个文件。</body>')
def pubgethospital(hostp='',lg='',l=''):
    cur = connection.cursor()
    field='id,name'
    if lg=='1':field+=',cid,abs,ftime,rank,pic'
    sql='select '+field+' from hospital where del=0'
    arg=[]
    if hostp:
        sql+=' and cid=%s'
        arg.append(hostp)
    sql+=' order by rank desc,id'
    if l:sql+=' limit 0,'+str(l)
    cur.execute(sql,arg)
    return getListToJson(cur,field.split(','),cur.fetchall(),'hpt')
def gethospital(request):
    lg=request.GET.get('lg','1')
    c=int(request.GET.get('c','0'))
    hostp=int(request.GET.get('hostp','0'))
    return to_json({'d':pubgethospital(hostp,lg=lg),'c':c})
@csrf_exempt
def gethptdetail(request):
    did=request.POST.get('did')
    cur = connection.cursor()
    cur.execute('select name,cid,abs,ftime,rank,text,pic from hospital where id=%s',[did])
    m=cur.fetchone()
    return to_json({'name':m[0],'cid':m[1],'cname':hcountry[m[1]],'abs':m[2],'ftime':m[3],'rank':m[4],'text':m[5],'pic':m[6]})
@csrf_exempt
def uphospital(request):
    t=request.POST.get('t')
    name=request.POST.get('name')
    cid=request.POST.get('cid')
    abs=request.POST.get('abs','')
    ftime=request.POST.get('ftime')
    rank=request.POST.get('rank','0')
    text=request.POST.get('text','')
    pic=request.POST.get('pic','')
    did=request.POST.get('did')
    cur = connection.cursor()
    rdir=pic.replace('cache','upload')
    argument=[name,cid,abs,ftime,rank,text,rdir]
    if t=='add':
        if rdir: shutil.copy(BASE_DIR+pic,BASE_DIR+rdir)
        cur.execute('insert into hospital(name,cid,abs,ftime,rank,text,pic) values(%s,%s,%s,%s,%s,%s,%s)',argument)
    if t=='up':
        argument.append(did)
        cur.execute('select pic from hospital where id=%s',[did])
        ispic=cur.fetchone()
        picpath=ispic[0]
        if rdir:
            if picpath and picpath!=rdir:
                os.remove(BASE_DIR+picpath)
                shutil.copy(BASE_DIR+pic,BASE_DIR+rdir)
            if not picpath:shutil.copy(BASE_DIR+pic,BASE_DIR+rdir)
        cur.execute('update hospital set name=%s,cid=%s,abs=%s,ftime=%s,rank=%s,text=%s,pic=%s where id=%s',argument)
    if t=='del':
        cur.execute('select pic from hospital where id=%s',[did])
        ispic=cur.fetchone()[0]
        if ispic:
            picpath=BASE_DIR+ispic
            os.remove(picpath)
        cur.execute('delete from hospital where id=%s',[did])
    return HttpResponse('1')
def pubgetdoctor(hid,htp='',f=0,l=10,a=''):
    cur = connection.cursor()
    if htp:
        cur.execute('select id from hospital where cid=%s',[htp])
        idlist=''
        for m in cur.fetchall():idlist+=str(m[0])+','
        idlist=idlist[:-1]
    if a:
        sqlc='select count(0) from doctor'
        if htp:sqlc+=' where hid in ('+idlist+')'
        cur.execute(sqlc)
        count=cur.fetchone()[0]
    field='id,name,hid,pic,post,spec,lang,qua,sce,abs,text,rank'
    sql='select '+field+' from doctor'
    arg=[]
    if htp:
        sql+=' where hid in ('+idlist+')'
    elif hid:
        sql+=' where hid=%s'
        arg.append(hid)
    sql+=' order by rank desc,id limit '+str(f)+','+str(l)
    cur.execute(sql,arg)
    listall=getListToJson(cur,field.split(','),cur.fetchall(),'dct')
    if a:return {'list':listall,'count':count}
    return listall
def getdoctor(request):
    f=request.GET.get('f')
    l=request.GET.get('l')
    hostp=int(request.GET.get('hostp','0'))
    return to_json(pubgetdoctor(hostp,f=f,l=l,a=1))

def getdctdetail(request):
    did=request.GET.get('did')
    cur = connection.cursor()
    cur.execute('select name,hid,pic,post,spec,lang,qua,sce,abs,text,rank from doctor where id=%s',[did])
    m=cur.fetchone()
    return to_json({'name':m[0],'hid':m[1],'hname':getHptName(cur,m[1]),'pic':m[2],'post':m[3],'spec':m[4],'lang':m[5],'qua':m[6],'sce':m[7],'abs':m[8],'text':m[9],'rank':m[10]})
@csrf_exempt
def updoctor(request):
    t=request.GET.get('t')
    name=request.GET.get('name')
    hid=request.GET.get('hid')
    pic=request.GET.get('pic')
    post=request.GET.get('post','')
    spec=request.GET.get('spec','')
    lang=request.GET.get('lang','')
    qua=request.GET.get('qua','')
    sce=request.GET.get('sce','')
    abs=request.GET.get('abs','')
    text=request.GET.get('text','')
    rank=request.GET.get('rank','0')
    did=request.GET.get('did')
    cur = connection.cursor()
    rdir=pic.replace('cache','upload')
    tableName='doctor'
    argument=[name,hid,rdir,post,spec,lang,qua,sce,abs,text,rank]
    if t=='add':
        if rdir:shutil.copy(BASE_DIR+pic,BASE_DIR+rdir)
        cur.execute('insert into '+tableName+'(name,hid,pic,post,spec,lang,qua,sce,abs,text,rank) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)',argument)
    if t=='up':
        argument.append(did)
        cur.execute('select pic from '+tableName+' where id=%s',[did])
        ispic=cur.fetchone()
        picpath=ispic[0]
        if rdir:
            if picpath and picpath!=rdir:
                os.remove(BASE_DIR+picpath)
                shutil.copy(BASE_DIR+pic,BASE_DIR+rdir)
            if not picpath:shutil.copy(BASE_DIR+pic,BASE_DIR+rdir)
        cur.execute('update '+tableName+' set name=%s,hid=%s,pic=%s,post=%s,spec=%s,lang=%s,qua=%s,sce=%s,abs=%s,text=%s,rank=%s where id=%s',argument)
    if t=='del':
        cur.execute('select pic from '+tableName+' where id=%s',[did])
        ispic=cur.fetchone()[0]
        if ispic:
            picpath=BASE_DIR+ispic
            os.remove(picpath)
        cur.execute('delete from '+tableName+' where id=%s',[did])
    return HttpResponse('1')

def saveImg(req):
    pics=req.GET.get('pics')
    picdef=req.GET.get('picdef')
    piclist=json.loads(picdef)
    for pm in piclist[0]:
        pt=BASE_DIR+pm
        if os.path.exists(pt):
            os.remove(pt)
    if pics:
        if ',' in pics:
            for pth in pics.split(','):
                fpath=BASE_DIR+pth
                npath=fpath.replace('cache','upload')
                if os.path.exists(fpath):
                    if not os.path.exists(npath):
                        shutil.copy(fpath,npath)
        else:
            fpath=BASE_DIR+pics
            npath=fpath.replace('cache','upload')
            if os.path.exists(fpath):
                if not os.path.exists(npath):
                    shutil.copy(fpath,npath)
    return HttpResponse('1')
 
def pubgetnews(tbnm='',lg='',f=0,l=10,a=''):
    cur = connection.cursor()
    if a:
        cur.execute('select count(0) from '+tbnm)
        count=cur.fetchone()[0]
    field='id,name,pic,pdate,abs,rank'
    if lg=='1':field+=',text'
    sql='select '+field+' from '+tbnm+' where del=0 order by rank desc,id limit '+str(f)+','+str(l)
    cur.execute(sql)
    listall=getListToJson(cur,field.split(','),cur.fetchall())
    if a:return {'list':listall,'count':count}
    return listall
def getnews(request):
    f=request.GET.get('f')
    l=request.GET.get('l')
    #a=request.GET.get('a')
    tbnm=request.GET.get('tbnm')
    return to_json(pubgetnews(tbnm,f=f,l=l,a=1))
@csrf_exempt
def upnews(request):
    t=request.POST.get('t')
    did=request.POST.get('did')
    tbnm=request.POST.get('tbnm','')
    arg=request.POST.get('arg','')
    cur = connection.cursor()
    state=0
    if arg:
        jsd=json.loads(arg)
        field=','.join([m[0] for m in jsd.items()])
        argument=[m[1] for m in jsd.items()]
        args=('%s,'*len(argument))[:-1]
        if t=='add':
            cur.execute('insert into '+tbnm+'('+field+') values('+args+')',argument)
            state=1
        if t=='up':
            argument.append(did)
            upargs=','.join([m[0]+'=%s' for m in jsd.items()])
            cur.execute('update '+tbnm+' set '+upargs+' where id=%s',argument)
            state=1
    if t=='del':
        cur.execute('delete from '+tbnm+' where id=%s',[did])
        state=1
    return HttpResponse(state)
def pubgetnewsdetail(tbnm='',did='',field=''):
    if not field:field='name,pic,pdate,abs,rank,text'
    cur = connection.cursor()
    cur.execute('select '+field+' from '+tbnm+' where id=%s',[did])
    return cur.fetchone()
def getnewsdetail(request):
    tbnm=request.GET.get('tbnm','')
    did=request.GET.get('did')
    cur = connection.cursor()
    cur.execute('select * from '+tbnm+' where id=%s',[did])
    return to_json(cur.fetchone())
    #m=pubgetnewsdetail(tbnm,did)
    #return to_json({'title':m[0],'pic':m[1],'pdate':m[2],'abs':m[3],'rank':m[4],'text':m[5]})