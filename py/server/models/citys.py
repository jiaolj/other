# -- coding: utf8 --
from django.db import models

class Citys(models.Model):
    code = models.CharField()
    name = models.CharField()
    name_en = models.CharField()
    tp = models.CharField()
    pid = models.IntegerField()
    x = models.FloatField(verbose_name=u'纬度')
    y = models.FloatField(verbose_name=u'经度')
    class Meta:
        db_table = 'citys'

class Cityss(models.Model):
    code = models.CharField()
    name = models.CharField()
    name_en = models.CharField()
    tp = models.CharField()
    pid = models.IntegerField()
    x = models.FloatField(verbose_name=u'纬度')
    y = models.FloatField(verbose_name=u'经度')
    class Meta:
        db_table = 'citys_simp'