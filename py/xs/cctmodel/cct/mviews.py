from django.http import HttpResponse
from m.models import News
from django import forms
from django.shortcuts import render_to_response

def mtest(req):
    #News.objects.create(title='2')
    result=News.objects.all()
    return HttpResponse(result)

class UserForm(forms.Form):
    name=forms.CharField()

def reg(req):
    if req.method=='POST':
        form=UserForm(req.POST)
        if form.is_valid():
            print form.cleaned_data
            return HttpResponse('ok')
    else:
        form=UserForm()
    return render_to_response('reg.html',{'form':form})
            
    