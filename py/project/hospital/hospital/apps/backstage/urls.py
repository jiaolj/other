from django.conf.urls import patterns, include,url
mulu='backstage'

urlpatterns = patterns('apps.'+mulu+'.views',
    url(r'^$', 'home', name='home'),
    url(r'^loginpage.html$', 'loginpage', name='loginpage'),                  
    url(r'^login/$', 'login', name='login'), 
    url(r'^logout/$', 'logout', name='logout'), 
	url(r'^newslist.html$', 'newslist', name='newslist'), 
)