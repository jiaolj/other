from django.conf.urls import patterns, url
from settings import STATIC_ROOT

urlpatterns = patterns('cct.views',
    url(r'^(.*?)$', 'img', name='img'),
)
urlpatterns += patterns('',url(r'^static/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)