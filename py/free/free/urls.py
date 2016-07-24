from django.conf.urls import patterns, url
from settings import STATIC_ROOT

urlpatterns = patterns('free.views',
    url(r'^$', 'index', name='index'),
    url(r'^get/$', 'get', name='get'),
    url(r'^check/$', 'check', name='check'),
    url(r'^clear/$', 'clear', name='clear'),
    url(r'^add/$', 'add', name='add'),
)
urlpatterns += patterns('',url(r'^static/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)