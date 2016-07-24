# -*- coding: utf-8 -*-
import top.api

def sendMessage(code):
    url = 'gw.api.taobao.com'
    port = 80
    appkey = '23356057'
    secret = '17dd649f70bea80ef54fa5574d7ced00'
    
    req=top.api.AlibabaAliqinFcSmsNumSendRequest(url,port)
    req.set_app_info(top.appinfo(appkey,secret))
     
    req.extend="123456"
    req.sms_type="normal"
    req.sms_free_sign_name="注册验证"
    req.sms_param="{\"code\":\""+code+"\",\"product\":\"量知科技\"}"
    req.rec_num="15167195189"
    req.sms_template_code="SMS_8341189"
    try:
        resp= req.getResponse()
        print(resp)
    except Exception,e:
        print(e)

sendMessage('5864')