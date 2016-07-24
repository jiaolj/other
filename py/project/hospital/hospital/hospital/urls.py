from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'apps.views.home', name='home'),
    url(r'^organization/$', 'apps.views.organization', name='organization'),
    url(r'^ourServices/$', 'apps.views.ourServices', name='ourServices'),
    url(r'^ourDoctors/$', 'apps.views.ourDoctors', name='ourDoctors'),
    url(r'^corperate/$', 'apps.views.corperate', name='corperate'),
    url(r'^service/$', 'apps.views.service', name='service'),
    url(r'^promotion/$', 'apps.views.promotion', name='promotion'),
    url(r'^news/$', 'apps.views.news', name='news'),
    url(r'^contactus/$', 'apps.views.contactus', name='contactus'),
    url(r'^backstage/', include('apps.backstage.urls', namespace='backstage')),                              
)