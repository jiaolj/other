#-*- coding:utf-8 -*-
#----获得html
def getwebhtml(baidu_url):
    html=urllib.urlopen(baidu_url).read()
    return html