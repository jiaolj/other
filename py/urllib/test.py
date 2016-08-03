# -*- coding: utf-8 -*-
import urllib,re

def getBaiduNumber(numb):
    html = urllib.urlopen('http://www.baidu.com/s?wd='+numb).read().replace('\n','')
    areas =  re.findall('<div class="op_mobilephone_r">.*?<span>.*?</span>.*?<span>(.*?)</span>.*?</div>',html)[0].split('&nbsp;')
    print areas[0],areas[1]
    
getBaiduNumber('13818710911')