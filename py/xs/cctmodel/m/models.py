# -*- coding: utf-8 -*-
from django.db import models
#一对多
class Column(models.Model):
    name=models.CharField(max_length=255)
    def __unicode__(self):
        return self.name
class News(models.Model):
    name=models.CharField(max_length=255)
    column=models.ForeignKey(Column)
    def __unicode__(self):
        return self.name
#多对多
class Auther(models.Model):
    name=models.CharField(max_length=255)
    def __unicode__(self):
        return self.name
class Book(models.Model):
    name=models.CharField(max_length=255)
    authers=models.ManyToManyField(Auther)
    def __unicode__(self):
        return self.name