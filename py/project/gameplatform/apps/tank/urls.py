from django.conf.urls import patterns,url

urlpatterns = patterns('apps.tank.views',
    url(r'^$', 'home', name='home'),
    url(r'^double/$', 'double', name='double'),
    url(r'^learn/$', 'learn', name='learn'),
    url(r'^getSocketMessage/$', 'getSocketMessage', name='getSocketMessage'),
    url(r'^getTankPoint/$', 'getTankPoint', name='getTankPoint'),
    url(r'^pushTankPoint/$', 'pushTankPoint', name='pushTankPoint'),
)

