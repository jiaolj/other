# -- coding: utf8 --
from django.db import models

# Create your models here.

class Wechat(models.Model):

    app_id = models.CharField(max_length=32, verbose_name=u'应用ID')
    app_secret = models.CharField(max_length=128, verbose_name=u'密钥')
    token = models.CharField(max_length=128, verbose_name=u'token')
    encoding_aes_key = models.CharField(max_length=128)
    token_update_interval = models.IntegerField()
    access_token = models.CharField(max_length=512, verbose_name=u'微信Token')
    token_expires = models.DateTimeField( verbose_name=u'token过期时间')
    expires_in = models.IntegerField(verbose_name=u'有效期')
    last_modified = models.DateTimeField(verbose_name=u'更新时间')
    jsapi_ticket = models.CharField(max_length=512, verbose_name=u'微信JS API TOKEN')
    jsapi_ticket_expires = models.DateTimeField(verbose_name=u'JS TICKET过期时间')
    parterner_id = models.IntegerField(verbose_name=u'微信商户ID')
    parterner_key = models.CharField(max_length=512, verbose_name=u'微信商户密钥')
    notify_url = models.CharField(max_length=64, verbose_name=u'支付回调URL')
    remark = models.CharField(max_length=64, verbose_name=u'备注')
    menu = models.CharField(max_length=1024, verbose_name=u'公众号菜单')

    class Meta:
        db_table = 'wechat'