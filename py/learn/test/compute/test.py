#-*- coding:utf-8 -*-
def a(arg):
    print arg
def b(arg):
    print arg
def c(arg):
    print arg

lista=[a,b,c]
print lista

num=0
for i in lista:
    num+=1
    i(num)

for i in lista:
    num+=1
    i(num)

listb=lista[:1]
print listb

