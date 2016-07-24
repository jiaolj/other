from django.conf.urls import patterns, url
from settings import STATIC_ROOT

urlpatterns = patterns('cct.views',
    url(r'^$', 'index', name='index'),
)
urlpatterns += patterns('cct.mviews',
    url(r'^mtest/$', 'mtest', name='mtest'),        
)
urlpatterns += patterns('',url(r'^static/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)