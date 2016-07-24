from django.conf.urls import patterns, url
from settings import STATIC_ROOT

urlpatterns = patterns('blog.views',
    url(r'^$', 'index', name='index'),
    url(r'^get/$', 'get', name='get'),
)
urlpatterns += patterns('',url(r'^static/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)