from django.conf.urls import patterns, url
from settings import STATIC_ROOT

urlpatterns = patterns('fervcloud.views',
    url(r'^$', 'xhx', name='xhx'),
    url(r'^about/$', 'about', name='about'),
    url(r'^hx/$', 'index', name='index'),
    url(r'^admin/$', 'admin', name='admin'),
    url(r'^get99/$', 'get99', name='get99'),
    url(r'^submit99/$', 'submit99', name='submit99'),
)
urlpatterns += patterns('',url(r'^static/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)