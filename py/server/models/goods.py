# -- coding: utf8 --
from django.db import models

class Goods(models.Model):
    phone = models.CharField()
    remark = models.CharField()
    start = models.CharField()
    end = models.CharField()
    date = models.DateTimeField()
    class Meta:
        db_table = 'goods'

