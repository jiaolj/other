#-*- coding:utf-8 -*-
from jencrypt.JEncrypt import JEncrypt

text='101012'
jec=JEncrypt()
print jec.toCompute(text.decode('utf-8'))
print jec.fromCompute(jec.toCompute(text.decode('utf-8')))


test='-6-7aaa*1aaa*0aaa*1aaa*0aaa*1aaa*2'
print jec.fromCompute(test)
