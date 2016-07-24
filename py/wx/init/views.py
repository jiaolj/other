# -*- coding: utf-8 -*-
from tools.func import to_json
from django.http import HttpResponse
from models.client import Wechat
from django.views.decorators.csrf import csrf_exempt

from .wxsdk.client import TokenService, WechatConfig

wxconfig = Wechat.objects.get(id=1)
print "WEIXIN:  id=%s, secret=%s, token=%s " % (wxconfig.app_id, wxconfig.app_secret, wxconfig.token)
WechatConfig.init(wxconfig.app_id, wxconfig.app_secret, wxconfig.token, wxconfig.parterner_id, wxconfig.parterner_key)

token_service = TokenService()

def new_wechat_client():
    return token_service.get_client()

@csrf_exempt
def zjc(request):
    def do_get():
        i = request.GET
        #return HttpResponse(i.get('echostr'))
        wechat_client = new_wechat_client()
        if wechat_client.check_signature(signature=i.get('signature'), timestamp=i.get('timestamp'), nonce=i.get('nonce')):
            return HttpResponse(i.get('echostr'))
        else:
            return HttpResponse('error, not wechat call')
    def do_post():
        i = request.POST
        q = request.GET
        print 'receive wechat message: %s' % request.body
        wechat_client = new_wechat_client()
        # 对签名进行校验
        if wechat_client.check_signature(signature=q.get('signature'), timestamp=q.get('timestamp'), nonce=q.get('nonce')):
            # 对 XML 数据进行解析 (必要, 否则不可执行 response_text, response_image 等操作)
            # wxmsg_crypt = WXBizMsgCrypt(wechatDO.config.token, wechatDO.config.encoding_aes_key, wechatDO.config.app_id)
            # ret, data = wxmsg_crypt.DecryptMsg(web.data(), i.msg_signature, i.timestamp, i.nonce)
            # print 'decrypt message:', ret, data
            try:
                data = request.body
                wechat_client.parse_data(data)

                # 获得解析结果, message 为 WechatMessage 对象 (wechat_sdk.messages中定义)
                message = wechat_client.get_message()
                # print 'received message:', message
                print 'wechat push message:', data, ', type:', message.type, ', toUserName:', message.target, ', FromUserName:', message.source

                # 获得解析结果, message 为 WechatMessage 对象 (wechat_sdk.messages中定义)
                if message.type == 'text':
                    if message.content == 'wechat':
                        response = wechat_client.response_text('^_^')
                    else:
                        content = '暂停服务'
                        if message.source == "ootWewtGtFR2CrnxhBqI0gjOICO0":
                            content = message.source
                        response = wechat_client.response_text(content)
                elif message.type == 'image':
                    response = wechat_client.response_text('图片')
                elif message.type == 'scan':
                    content = "与量知数据账号关联成功"
                    uid = message.key
                    ret = add_open_id(uid, message.source)
                    if not ret:
                        content = "与量知数据账号关联失败，请联系管理员"
                    response = wechat_client.response_text(content)
                return HttpResponse(response)
            except:
                return HttpResponse('fail to parse message')
        else:
            print 'invalid signature'
            # '消息签名不正确'
            return HttpResponse('invalid signature')

    if request.method == 'GET':
        return do_get()
    else:
        return do_post()

