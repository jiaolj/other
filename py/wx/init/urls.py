from django.conf.urls import patterns, url
from conf.settings import STATIC_ROOT

urlpatterns = patterns('init.views',
    url(r'^$', 'index'),
    url(r'^zjc$', 'zjc'),
)
urlpatterns += patterns('',url(r'^static/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)