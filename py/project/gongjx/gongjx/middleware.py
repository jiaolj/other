#-*- coding:utf-8 -*-
'''
process_request  接受request之后确定所执行的view之前  
process_view  确定了所要执行的view之后 view真正执行之前
process_response   view 执行之后 
process_exception(self, request, exception)  view抛出异常
settings里面安装中间件MIDDLEWARE_CLASSES=()
这里指定的顺序和实际运行时运行的顺序相关，
在request阶段：process_request，process_view 按照其所在类在配置中的先后顺序进行，
在response阶段：process_response，process_exception 则按照相反的顺序进行。
还有一点就是在整个流程中，每一个process_response都会执行到，
而其余三种，都可能会因为其他的直接retuen response或者不发生异常而不被执行到。
'''

from django.http import HttpResponseRedirect 
#from django.contrib.auth import SESSION_KEY 
from urllib import quote
class QtsAuthenticationMiddleware(object): 
    def process_request(self, request):
        #print request.path 
        if request.path != '/login/': 
            if request.session.get('username'):
                pass
            else:
                return HttpResponseRedirect("/login/")
    
