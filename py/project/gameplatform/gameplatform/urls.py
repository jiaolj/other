from django.conf.urls import patterns, include, url

urlpatterns = patterns('gameplatform.views',
    url(r'^$', 'home', name='home'),
    url(r'^reg/$', 'reg', name='reg'),
    url(r'^loginPage/$', 'loginPage', name='loginPage'),
    url(r'^login/$', 'login', name='login'),
    url(r'^clientLogin/$', 'clientLogin', name='clientLogin'),
    url(r'^logout/$', 'logout', name='logout'),
)

urlpatterns += patterns('',
    url(r'^tank/', include('apps.tank.urls', namespace='tank')),
)
