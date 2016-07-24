from django.conf.urls import patterns, url
from conf.settings import STATIC_ROOT

urlpatterns = patterns('init.views',
    url(r'^$', 'index'),
    url(r'^getLocation$', 'getLocation'),
    url(r'^save$', 'save'),
)
urlpatterns += patterns('views.goods',
    url(r'^goods/get$', 'get'),
    url(r'^goods/save$', 'save'),
)
urlpatterns += patterns('views.lastPage',
    url(r'^lastPage/get$', 'get'),
    url(r'^lastPage/save$', 'save'),
)
urlpatterns += patterns('',url(r'^static/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)