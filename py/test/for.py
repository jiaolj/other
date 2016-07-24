# -*- coding: utf-8 -*-
kwd = '地区 中国 北京'.split(' ') #r = {地区:{中国:{北京：{}}}}
r = {}

def get(kd):
    for k in kd:
        if not r.has_key(k):
            r[k] = {}
    print r
get(kwd)