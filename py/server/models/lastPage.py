# -- coding: utf8 --
from django.db import models

class lastPage(models.Model):
    page = models.CharField()
    from_user = models.CharField()
    to_user = models.CharField()
    did = models.IntegerField()
    class Meta:
        db_table = 'last_page'

