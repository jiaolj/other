#-*- coding:utf-8 -*-
from django.conf.urls import patterns, include, url
from settings import STATIC_ROOT

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('gongjx.views',
    (r'^$', 'index'),
    (r'^shoulu/$', 'shoulu'),
    (r'^shoulu/(?P<kltype>\w+)/$', 'shoulu'),
    (r'^shouluquery(?P<kltype>\w+).html$', 'shouluquery'),
    
    (r'^phone/$', 'phone'),
    (r'^phone/(?P<kltype>\w+)/$', 'phone'),
    (r'^phonequery(?P<kltype>\w+).html$', 'phonequery'),
    
    (r'^chart/$', 'chart'),
    (r'^chart/(?P<kltype>\w+)/$', 'chart'),
    (r'^chartquery(?P<kltype>\w+).html$', 'chartquery'),
    (r'^chart/chartxml.html$', 'chartxml'),
    #鎺ュ彛
    (r'^ichart/$', 'ichart'),
    (r'^ichart/ichartxml.html$', 'ichartxml'),

#    (r'^typing/$', 'typing'),
#    (r'^typing/(?P<kltype>\w+)/$', 'typing'),
#    (r'^typingquery(?P<kltype>\w+).html$', 'typingquery'),
)
urlpatterns += patterns('gongjx.views',
    (r'^typing/$', 'typing'),
    (r'^typing/(?P<kltype>\w+)/$', 'typing'),
    (r'^typingquery(?P<kltype>\w+).html$', 'typingquery'),
)
urlpatterns += patterns('',
    (r'^(?!admin)(?P<path>.*)$','django.views.static.serve',{'document_root':STATIC_ROOT}),
)
