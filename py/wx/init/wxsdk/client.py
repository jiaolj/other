#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by 'lijian' on 19/8/15
import threading
import time
import requests

import hashlib
import json
import cgi
from StringIO import StringIO
from xml.dom import minidom

from messages import MESSAGE_TYPES, UnknownMessage
from error import ParseError, NeedParseError, NeedParamError, OfficialAPIError
from reply import TextReply, ImageReply, VoiceReply, VideoReply, MusicReply, Article, ArticleReply, TransferCustomerServiceReply


class WechatConfig(object):

    @classmethod
    def init(clz, app_id, app_secret, dev_token, parter_id=None, partner_key=None, paysign_key=None):
        clz.APP_ID = app_id
        clz.APP_SECRET = app_secret
        clz.DEV_TOKEN = dev_token
        clz.PARTNER_ID = parter_id
        clz.PARTNER_KEY = partner_key
        clz.PAYSIGN_KEY = paysign_key

    APP_ID = None
    APP_SECRET = None

    DEV_TOKEN = None
    PARTNER_ID = None
    PARTNER_KEY = None

    PAYSIGN_KEY = None

    @classmethod
    def check_appid_appsecret(clz):
        """
        检查 AppID 和 AppSecret 是否存在
        :raises NeedParamError: AppID 或 AppSecret 参数没有在初始化的时候完整提供
        """
        if not clz.APP_ID or not clz.APP_SECRET:
            raise Exception('Please provide app_id and app_secret parameters in the construction of class.')

def check_official_error(json_data):
    """
    检测微信公众平台返回值中是否包含错误的返回码
    :raises OfficialAPIError: 如果返回码提示有错误，抛出异常；否则返回 True
    """
    if "errcode" in json_data and json_data["errcode"] != 0:
        raise Exception("%s %s" % (json_data.get('errcode'), json_data.get('errmsg')))

token_lock = threading.RLock()
class TokenService(object):

    def __init__(self):
        self.__access_token = None
        self.__access_token_expires_at = None
        self.__jsapi_ticket = None
        self.__jsapi_ticket_expires_at = None

    def access_token(self, force_refresh=False):
        """
        access_token是公众号的全局唯一票据，公众号调用各接口时都需使用access_token。开发者需要进行妥善保存。
        access_token的存储至少要保留512个字符空间。access_token的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的access_token失效。

        1、为了保密appsecrect，第三方需要一个access_token获取和刷新的中控服务器。而其他业务逻辑服务器所使用的access_token均来自于该中控服务器，
           不应该各自去刷新，否则会造成access_token覆盖而影响业务；
        2、目前access_token的有效期通过返回的expire_in来传达，目前是7200秒之内的值。中控服务器需要根据这个有效时间提前去刷新新access_token。
           在刷新过程中，中控服务器对外输出的依然是老access_token，此时公众平台后台会保证在刷新短时间内，新老access_token都可用，这保证了第三方业务的平滑过渡；
        3、access_token的有效时间可能会在未来有调整，所以中控服务器不仅需要内部定时主动刷新，还需要提供被动刷新access_token的接口，
           这样便于业务服务器在API调用获知access_token已超时的情况下，可以触发access_token的刷新流程。
        :return:
        """
        WechatConfig.check_appid_appsecret()

        if not force_refresh and self.__access_token:
            now = time.time()
            if self.__access_token_expires_at - now > 60:
                return self.__access_token

        with token_lock:
            response_json = self.grant_token()
            self.__access_token = response_json['access_token']
            self.__access_token_expires_at = int(time.time()) + response_json['expires_in']

            return self.__access_token

    def grant_token(self):
        return self._get(
            "https://api.weixin.qq.com/cgi-bin/token",
            **{
                "grant_type": "client_credential",
                "appid": WechatConfig.APP_ID,
                "secret": WechatConfig.APP_SECRET,
            }
        )

    def jsapi_ticket(self):
        WechatConfig.check_appid_appsecret()

        if self.__jsapi_ticket:
            now = time.time()
            if self.__jsapi_ticket_expires_at - now > 60:
                return self.__jsapi_ticket

        with token_lock:
            response_json = self.grant_jsapi_ticket()
            self.__jsapi_ticket = response_json['ticket']
            self.__jsapi_ticket_expires_at = int(time.time()) + response_json['expires_in']
            return self.__jsapi_ticket

    def grant_jsapi_ticket(self):
        """
        获取 Jsapi Ticket
        详情请参考 http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html#.E9.99.84.E5.BD.951-JS-SDK.E4.BD.BF.E7.94.A8.E6.9D.83.E9.99.90.E7.AD.BE.E5.90.8D.E7.AE.97.E6.B3.95
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败

        生成签名之前必须先了解一下jsapi_ticket，jsapi_ticket是公众号用于调用微信JS接口的临时票据。
        正常情况下，jsapi_ticket的有效期为7200秒，通过access_token来获取。由于获取jsapi_ticket的api调用次数非常有限，
        频繁刷新jsapi_ticket会导致api调用受限，影响自身业务，开发者必须在自己的服务全局缓存jsapi_ticket 。
        """
        # self._check_appid_appsecret()

        return self._get(
            "https://api.weixin.qq.com/cgi-bin/ticket/getticket",
            **{
                "access_token": self.access_token(),
                "type": "jsapi",
            }
        )


    def _get(self, url, **kwargs):
        r = requests.request(
                method='GET',
                url=url,
                params=kwargs
        )
        r.raise_for_status()
        response_json = r.json()

        print 'response_json: ', response_json
        check_official_error(response_json)
        return response_json

    def get_client(self):
        return WechatClient(self)

class WechatClient(object):
    """
    微信基本功能类

    仅包含官方 API 中所包含的内容, 如需高级功能支持请移步 ext.py 中的 WechatExt 类
    """
    def __init__(self, token_service):
        self.__token_service = token_service
        self.__is_parse = False
        self.__message = None

    def check_signature(self, signature, timestamp, nonce):
        """
        验证微信消息真实性
        :param signature: 微信加密签名
        :param timestamp: 时间戳
        :param nonce: 随机数
        :return: 通过验证返回 True, 未通过验证返回 False
        """
        if not signature or not timestamp or not nonce:
            return False

        tmp_list = [WechatConfig.DEV_TOKEN, timestamp, nonce]
        tmp_list.sort()
        print 'List===', tmp_list
        tmp_str = ''.join(tmp_list)
        if signature == hashlib.sha1(tmp_str).hexdigest():
            return True
        else:
            return False

    def generate_jsapi_signature(self, timestamp, noncestr, url, jsapi_ticket=None):
        """
        使用 jsapi_ticket 对 url 进行签名
        :param timestamp: 时间戳
        :param noncestr: 随机数
        :param url: 要签名的 url，不包含 # 及其后面部分
        :param jsapi_ticket: (可选参数) jsapi_ticket 值 (如不提供将自动通过 appid 和 appsecret 获取)
        :return: 返回sha1签名的hexdigest值
        """
        if not jsapi_ticket:
            jsapi_ticket = self.__token_service.jsapi_ticket()

        data = {
            'jsapi_ticket': jsapi_ticket,
            'noncestr': noncestr,
            'timestamp': timestamp,
            'url': url,
        }
        keys = data.keys()
        keys.sort()
        data_str = '&'.join(['%s=%s' % (key, data[key]) for key in keys])
        signature = hashlib.sha1(data_str).hexdigest()
        return signature

    def parse_data(self, data):
        """
        解析微信服务器发送过来的数据并保存类中
        :param data: HTTP Request 的 Body 数据
        :raises ParseError: 解析微信服务器数据错误, 数据不合法
        """
        result = {}
        if type(data) == unicode:
            data = data.encode('utf-8')
        elif type(data) == str:
            pass
        else:
            raise ParseError()

        try:
            doc = minidom.parseString(data)
        except Exception:
            raise ParseError()

        params = [ele for ele in doc.childNodes[0].childNodes
                  if isinstance(ele, minidom.Element)]

        for param in params:
            if param.childNodes:
                text = param.childNodes[0]
                result[param.tagName] = text.data

        result['raw'] = data
        result['type'] = result.pop('MsgType').lower()

        message_type = MESSAGE_TYPES.get(result['type'], UnknownMessage)
        self.__message = message_type(result)
        self.__is_parse = True

    def get_message(self):
        """
        获取解析好的 WechatMessage 对象
        :return: 解析好的 WechatMessage 对象
        """
        self._check_parse()

        return self.__message

    def response_text(self, content, escape=False):
        """
        将文字信息 content 组装为符合微信服务器要求的响应数据
        :param content: 回复文字
        :param escape: 是否转义该文本内容 (默认不转义)
        :return: 符合微信服务器要求的 XML 响应数据
        """
        self._check_parse()
        content = self._transcoding(content)
        if escape:
            content = cgi.escape(content)

        return TextReply(message=self.__message, content=content).render()

    def response_transfer_customer_service(self):
        """
        如果公众号处于开发模式，普通微信用户向公众号发消息时，微信服务器会先将消息POST到开发者填写的url上，
        如果希望将消息转发到多客服系统，则需要开发者在响应包中返回MsgType为transfer_customer_service的消息，
        微信服务器收到响应后会把当次发送的消息转发至多客服系统。
        :return:
        """
        self._check_parse()
        return TransferCustomerServiceReply(message=self.__message).render()

    def response_image(self, media_id):
        """
        将 media_id 所代表的图片组装为符合微信服务器要求的响应数据
        :param media_id: 图片的 MediaID
        :return: 符合微信服务器要求的 XML 响应数据
        """
        self._check_parse()

        return ImageReply(message=self.__message, media_id=media_id).render()

    def response_voice(self, media_id):
        """
        将 media_id 所代表的语音组装为符合微信服务器要求的响应数据
        :param media_id: 语音的 MediaID
        :return: 符合微信服务器要求的 XML 响应数据
        """
        self._check_parse()

        return VoiceReply(message=self.__message, media_id=media_id).render()

    def response_video(self, media_id, title=None, description=None):
        """
        将 media_id 所代表的视频组装为符合微信服务器要求的响应数据
        :param media_id: 视频的 MediaID
        :param title: 视频消息的标题
        :param description: 视频消息的描述
        :return: 符合微信服务器要求的 XML 响应数据
        """
        self._check_parse()
        title = self._transcoding(title)
        description = self._transcoding(description)

        return VideoReply(message=self.__message, media_id=media_id, title=title, description=description).render()

    def response_music(self, music_url, title=None, description=None, hq_music_url=None, thumb_media_id=None):
        """
        将音乐信息组装为符合微信服务器要求的响应数据
        :param music_url: 音乐链接
        :param title: 音乐标题
        :param description: 音乐描述
        :param hq_music_url: 高质量音乐链接, WIFI环境优先使用该链接播放音乐
        :param thumb_media_id: 缩略图的 MediaID
        :return: 符合微信服务器要求的 XML 响应数据
        """
        self._check_parse()
        music_url = self._transcoding(music_url)
        title = self._transcoding(title)
        description = self._transcoding(description)
        hq_music_url = self._transcoding(hq_music_url)

        return MusicReply(message=self.__message, title=title, description=description, music_url=music_url,
                          hq_music_url=hq_music_url, thumb_media_id=thumb_media_id).render()

    def response_news(self, articles):
        """
        将新闻信息组装为符合微信服务器要求的响应数据
        :param articles: list 对象, 每个元素为一个 dict 对象, key 包含 `title`, `description`, `picurl`, `url`
        :return: 符合微信服务器要求的 XML 响应数据
        """
        self._check_parse()
        for article in articles:
            if article.get('title'):
                article['title'] = self._transcoding(article['title'])
            if article.get('description'):
                article['description'] = self._transcoding(article['description'])
            if article.get('picurl'):
                article['picurl'] = self._transcoding(article['picurl'])
            if article.get('url'):
                article['url'] = self._transcoding(article['url'])

        news = ArticleReply(message=self.__message)
        for article in articles:
            article = Article(**article)
            news.add_article(article)
        return news.render()

    def create_menu(self, menu_data):
        """
        创建自定义菜单 ::

            wechat = WechatBasic(appid='appid', appsecret='appsecret')
            wechat.create_menu({
                'button':[
                    {
                        'type':'click',
                        'name':u'今日歌曲',
                        'key':'V1001_TODAY_MUSIC'
                    },
                    {
                        'type':'click',
                        'name':u'歌手简介',
                        'key':'V1001_TODAY_SINGER'
                    },
                    {
                        'name':u'菜单',
                        'sub_button':[
                            {
                                'type':'view',
                                'name':u'搜索',
                                'url':'http://www.soso.com/'
                            },
                            {
                                'type':'view',
                                'name':u'视频',
                                'url':'http://v.qq.com/'
                            },
                            {
                                'type':'click',
                                'name':u'赞一下我们',
                                'key':'V1001_GOOD'
                            }
                        ]
                    }
                ]})

        详情请参考 http://mp.weixin.qq.com/wiki/13/43de8269be54a0a6f64413e4dfa94f39.html
        :param menu_data: Python 字典
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        return self._post(
            url='https://api.weixin.qq.com/cgi-bin/menu/create',
            data=menu_data
        )

    def get_menu(self):
        """
        查询自定义菜单
        详情请参考 http://mp.weixin.qq.com/wiki/16/ff9b7b85220e1396ffa16794a9d95adc.html
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        return self._get('https://api.weixin.qq.com/cgi-bin/menu/get')

    def delete_menu(self):
        """
        删除自定义菜单
        详情请参考 http://mp.weixin.qq.com/wiki/16/8ed41ba931e4845844ad6d1eeb8060c8.html
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        return self._get('https://api.weixin.qq.com/cgi-bin/menu/delete')

    def upload_media(self, media_type, media_file, extension=''):
        """
        上传多媒体文件
        详情请参考 http://mp.weixin.qq.com/wiki/10/78b15308b053286e2a66b33f0f0f5fb6.html
        :param media_type: 媒体文件类型，分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）
        :param media_file: 要上传的文件，一个 File object 或 StringIO object
        :param extension: 如果 media_file 传入的为 StringIO object，那么必须传入 extension 显示指明该媒体文件扩展名，如 ``mp3``, ``amr``；如果 media_file 传入的为 File object，那么该参数请留空
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        if not isinstance(media_file, file) and not isinstance(media_file, StringIO):
            raise ValueError('Parameter media_file must be file object or StringIO.StringIO object.')
        if isinstance(media_file, StringIO) and extension.lower() not in ['jpg', 'jpeg', 'amr', 'mp3', 'mp4']:
            raise ValueError('Please provide \'extension\' parameters when the type of \'media_file\' is \'StringIO.StringIO\'.')
        if isinstance(media_file, file):
            extension = media_file.name.split('.')[-1]
            if extension.lower() not in ['jpg', 'jpeg', 'amr', 'mp3', 'mp4']:
                raise ValueError('Invalid file type.')

        ext = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'amr': 'audio/amr',
            'mp3': 'audio/mpeg',
            'mp4': 'video/mp4',
        }
        if isinstance(media_file, StringIO):
            filename = 'temp.' + extension
        else:
            filename = media_file.name

        return self._post(
            url='http://file.api.weixin.qq.com/cgi-bin/media/upload',
            params={
                'access_token': self.__token_service.access_token(),
                'type': media_type,
            },
            files={
                'media': (filename, media_file, ext[extension])
            }
        )

    def download_media(self, media_id):
        """
        下载多媒体文件
        详情请参考 http://mp.weixin.qq.com/wiki/10/78b15308b053286e2a66b33f0f0f5fb6.html
        :param media_id: 媒体文件 ID
        :return: requests 的 Response 实例
        """
        return requests.get(
            'http://file.api.weixin.qq.com/cgi-bin/media/get',
            params={
                'access_token': self.__token_service.access_token(),
                'media_id': media_id,
            },
            stream=True,
        )

    def create_group(self, name):
        """
        创建分组
        详情请参考 http://mp.weixin.qq.com/wiki/13/be5272dc4930300ba561d927aead2569.html
        :param name: 分组名字（30个字符以内）
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        return self._post(
            url='https://api.weixin.qq.com/cgi-bin/groups/create',
            data={
                'group': {
                    'name': name,
                },
            }
        )

    def get_groups(self):
        """
        查询所有分组
        详情请参考 http://mp.weixin.qq.com/wiki/13/be5272dc4930300ba561d927aead2569.html
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        return self._get('https://api.weixin.qq.com/cgi-bin/groups/get')

    def get_group_by_id(self, openid):
        """
        查询用户所在分组
        详情请参考 http://mp.weixin.qq.com/wiki/13/be5272dc4930300ba561d927aead2569.html
        :param openid: 用户的OpenID
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        return self._post(
            url='https://api.weixin.qq.com/cgi-bin/groups/getid',
            data={
                'openid': openid,
            }
        )

    def update_group(self, group_id, name):
        """
        修改分组名
        详情请参考 http://mp.weixin.qq.com/wiki/13/be5272dc4930300ba561d927aead2569.html
        :param group_id: 分组id，由微信分配
        :param name: 分组名字（30个字符以内）
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        return self._post(
            url='https://api.weixin.qq.com/cgi-bin/groups/update',
            data={
                'group': {
                    'id': int(group_id),
                    'name': name,
                }
            }
        )

    def move_user(self, user_id, group_id):
        """
        移动用户分组
        详情请参考 http://mp.weixin.qq.com/wiki/13/be5272dc4930300ba561d927aead2569.html
        :param user_id: 用户 ID 。 就是你收到的 WechatMessage 的 source
        :param group_id: 分组 ID
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        return self._post(
            url='https://api.weixin.qq.com/cgi-bin/groups/members/update',
            data={
                'openid': user_id,
                'to_groupid': group_id,
            }
        )

    def get_user_info(self, user_id, lang='zh_CN'):
        """
        获取用户基本信息
        详情请参考 http://mp.weixin.qq.com/wiki/14/bb5031008f1494a59c6f71fa0f319c66.html
        :param user_id: 用户 ID, 就是你收到的 WechatMessage 的 source
        :param lang: 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        return self._get(
            url='https://api.weixin.qq.com/cgi-bin/user/info',
            params={
                'access_token': self.__token_service.access_token(),
                'openid': user_id,
                'lang': lang,
            }
        )

    def get_followers(self, first_user_id=None):
        """
        获取关注者列表
        详情请参考 http://mp.weixin.qq.com/wiki/3/17e6919a39c1c53555185907acf70093.html
        :param first_user_id: 可选。第一个拉取的OPENID，不填默认从头开始拉取
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        params = {
            'access_token': self.__token_service.access_token(),
        }
        if first_user_id:
            params['next_openid'] = first_user_id
        return self._get('https://api.weixin.qq.com/cgi-bin/user/get', params=params)


    def send_template_message(self, user_id, template_id, content, url='', topcolor="#FF0000"):
        """
        发送模板消息
        详情参考:http://mp.weixin.qq.com/wiki/17/304c1885ea66dbedf7dc170d84999a9d.html#.E5.8F.91.E9.80.81.E6.A8.A1.E6.9D.BF.E6.B6.88.E6.81.AF
        :param user_id:
        :return:
        """
        return self._post(
            url='https://api.weixin.qq.com/cgi-bin/message/template/send',
            data={
                "touser": user_id,
                "template_id": template_id,
                "url": url,
                "topcolor": topcolor,
                "data": content,
            }
        )


    def send_text_message(self, user_id, content):
        """
        发送文本消息
        详情请参考 http://mp.weixin.qq.com/wiki/7/12a5a320ae96fecdf0e15cb06123de9f.html
        :param user_id: 用户 ID, 就是你收到的 WechatMessage 的 source
        :param content: 消息正文
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        return self._post(
            url='https://api.weixin.qq.com/cgi-bin/message/custom/send',
            data={
                'touser': user_id,
                'msgtype': 'text',
                'text': {
                    'content': content,
                },
            }
        )

    def send_image_message(self, user_id, media_id):
        """
        发送图片消息
        详情请参考 http://mp.weixin.qq.com/wiki/7/12a5a320ae96fecdf0e15cb06123de9f.html
        :param user_id: 用户 ID, 就是你收到的 WechatMessage 的 source
        :param media_id: 图片的媒体ID。 可以通过 :func:`upload_media` 上传。
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        return self._post(
            url='https://api.weixin.qq.com/cgi-bin/message/custom/send',
            data={
                'touser': user_id,
                'msgtype': 'image',
                'image': {
                    'media_id': media_id,
                },
            }
        )

    def send_voice_message(self, user_id, media_id):
        """
        发送语音消息
        详情请参考 http://mp.weixin.qq.com/wiki/7/12a5a320ae96fecdf0e15cb06123de9f.html
        :param user_id: 用户 ID, 就是你收到的 WechatMessage 的 source
        :param media_id: 发送的语音的媒体ID。 可以通过 :func:`upload_media` 上传。
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        return self._post(
            url='https://api.weixin.qq.com/cgi-bin/message/custom/send',
            data={
                'touser': user_id,
                'msgtype': 'voice',
                'voice': {
                    'media_id': media_id,
                },
            }
        )

    def send_video_message(self, user_id, media_id, title=None, description=None):
        """
        发送视频消息
        详情请参考 http://mp.weixin.qq.com/wiki/7/12a5a320ae96fecdf0e15cb06123de9f.html
        :param user_id: 用户 ID, 就是你收到的 WechatMessage 的 source
        :param media_id: 发送的视频的媒体ID。 可以通过 :func:`upload_media` 上传。
        :param title: 视频消息的标题
        :param description: 视频消息的描述
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        video_data = {
            'media_id': media_id,
        }
        if title:
            video_data['title'] = title
        if description:
            video_data['description'] = description

        return self._post(
            url='https://api.weixin.qq.com/cgi-bin/message/custom/send',
            data={
                'touser': user_id,
                'msgtype': 'video',
                'video': video_data,
            }
        )

    def send_music_message(self, user_id, url, hq_url, thumb_media_id, title=None, description=None):
        """
        发送音乐消息
        详情请参考 http://mp.weixin.qq.com/wiki/7/12a5a320ae96fecdf0e15cb06123de9f.html
        :param user_id: 用户 ID, 就是你收到的 WechatMessage 的 source
        :param url: 音乐链接
        :param hq_url: 高品质音乐链接，wifi环境优先使用该链接播放音乐
        :param thumb_media_id: 缩略图的媒体ID。 可以通过 :func:`upload_media` 上传。
        :param title: 音乐标题
        :param description: 音乐描述
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        music_data = {
            'musicurl': url,
            'hqmusicurl': hq_url,
            'thumb_media_id': thumb_media_id,
        }
        if title:
            music_data['title'] = title
        if description:
            music_data['description'] = description

        return self._post(
            url='https://api.weixin.qq.com/cgi-bin/message/custom/send',
            data={
                'touser': user_id,
                'msgtype': 'music',
                'music': music_data,
            }
        )

    def send_article_message(self, user_id, articles):
        """
        发送图文消息
        详情请参考 http://mp.weixin.qq.com/wiki/7/12a5a320ae96fecdf0e15cb06123de9f.html
        :param user_id: 用户 ID, 就是你收到的 WechatMessage 的 source
        :param articles: list 对象, 每个元素为一个 dict 对象, key 包含 `title`, `description`, `picurl`, `url`
        :return: 返回的 JSON 数据包
        """
        articles_data = []
        for article in articles:
            article = Article(**article)
            articles_data.append({
                'title': article.title,
                'description': article.description,
                'url': article.url,
                'picurl': article.picurl,
            })
        return self._post(
            url='https://api.weixin.qq.com/cgi-bin/message/custom/send',
            data={
                'touser': user_id,
                'msgtype': 'news',
                'news': {
                    'articles': articles_data,
                },
            }
        )

    def create_shorturl(self, long_url):
        """
        将一条长链接转成短链接。
        主要使用场景： 开发者用于生成二维码的原链接（商品、支付二维码等）太长导致扫码速度和成功率下降，
        将原长链接通过此接口转成短链接再生成二维码将大大提升扫码速度和成功率。
        :param data:
        :return:
        """
        return self._post(
            url='https://api.weixin.qq.com/cgi-bin/shorturl',
            data={
                'action': 'long2short',
                'long_url': long_url,
            }
        )

    def create_qrcode(self, **data):
        """
        创建二维码
        详情请参考 http://mp.weixin.qq.com/wiki/18/28fc21e7ed87bec960651f0ce873ef8a.html
        :param data: 你要发送的参数 dict
        :return: 返回的 JSON 数据包
        :raise HTTPError: 微信api http 请求失败
        """
        return self._post(
            url='https://api.weixin.qq.com/cgi-bin/qrcode/create',
            data=data
        )

    def show_qrcode(self, ticket):
        """
        通过ticket换取二维码
        详情请参考 http://mp.weixin.qq.com/wiki/18/28fc21e7ed87bec960651f0ce873ef8a.html
        :param ticket: 二维码 ticket 。可以通过 :func:`create_qrcode` 获取到
        :return: 返回的 Request 对象
        """
        return requests.get(
            url='https://mp.weixin.qq.com/cgi-bin/showqrcode',
            params={
                'ticket': ticket
            }
        )

    def _check_token(self):
        """
        检查 Token 是否存在
        :raises NeedParamError: Token 参数没有在初始化的时候提供
        """
        # if not self.__token:
        #     raise NeedParamError('Please provide Token parameter in the construction of class.')
        pass

    def _check_appid_appsecret(self):
        """
        检查 AppID 和 AppSecret 是否存在
        :raises NeedParamError: AppID 或 AppSecret 参数没有在初始化的时候完整提供
        """
        # if not self.__appid or not self.__appsecret:
        #     raise NeedParamError('Please provide app_id and app_secret parameters in the construction of class.')
        pass

    def _check_parse(self):
        """
        检查是否成功解析微信服务器传来的数据
        :raises NeedParseError: 需要解析微信服务器传来的数据
        """
        if not self.__is_parse:
            raise NeedParseError()

    def _check_official_error(self, json_data):
        """
        检测微信公众平台返回值中是否包含错误的返回码
        :raises OfficialAPIError: 如果返回码提示有错误，抛出异常；否则返回 True
        """
        if "errcode" in json_data and json_data["errcode"] != 0:
            raise OfficialAPIError("%s %s" % (json_data.get('errcode'), json_data.get('errmsg')))
            # raise OfficialAPIError("{}: {}".format(json_data["errcode"], json_data["errmsg"]))

    def _request(self, method, url, **kwargs):
        """
        向微信服务器发送请求
        :param method: 请求方法
        :param url: 请求地址
        :param kwargs: 附加数据
        :return: 微信服务器响应的 json 数据
        :raise HTTPError: 微信api http 请求失败
        """
        if "params" not in kwargs:
            kwargs["params"] = {
                "access_token": self.__token_service.access_token(),
            }
        if isinstance(kwargs.get("data", ""), dict):
            body = json.dumps(kwargs["data"], ensure_ascii=False)
            body = body.encode('utf8')
            kwargs["data"] = body

        r = requests.request(
            method=method,
            url=url,
            **kwargs
        )
        r.raise_for_status()
        response_json = r.json()
        print 'response_json: ', response_json
        self._check_official_error(response_json)
        return response_json

    def _get(self, url, **kwargs):
        """
        使用 GET 方法向微信服务器发出请求
        :param url: 请求地址
        :param kwargs: 附加数据
        :return: 微信服务器响应的 json 数据
        :raise HTTPError: 微信api http 请求失败
        """
        return self._request(
            method="get",
            url=url,
            **kwargs
        )

    def _post(self, url, **kwargs):
        """
        使用 POST 方法向微信服务器发出请求
        :param url: 请求地址
        :param kwargs: 附加数据
        :return: 微信服务器响应的 json 数据
        :raise HTTPError: 微信api http 请求失败
        """
        return self._request(
            method="post",
            url=url,
            **kwargs
        )

    def _transcoding(self, data):
        """
        编码转换
        :param data: 需要转换的数据
        :return: 转换好的数据
        """
        if not data:
            return data

        result = None
        if type(data) == unicode:
            result = data.encode('utf-8')
        elif type(data) == str:
            #result = data.decode('utf-8')
            result = data
        else:
            raise ParseError()
        return result

    def get_user_access_token(self, code):
        url = 'https://api.weixin.qq.com/sns/oauth2/access_token'
        params = {
            'grant_type' : 'authorization_code',
            'code': code,
            'appid': WechatConfig.APP_ID,
            'secret': WechatConfig.APP_SECRET,
        }

        return self._request(method='get', url=url, params=params)

    def refresh_token(self, rtoken):
        url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token'
        params = {
            'appid' : WechatConfig.APP_ID,
            'grant_type' : 'refresh_token',
            'refresh_token': rtoken
        }
        return self._request(method='get', url=url, params=params)


    def is_valid_token(self, access_token, openid):
        url = 'https://api.weixin.qq.com/sns/auth'
        params={'access_token':access_token, 'openid':openid}

        return self._request(method='get', url=url, params=params)

    def generate_jsapi_signature(self, timestamp, noncestr, url, jsapi_ticket=None):
        """
        使用 jsapi_ticket 对 url 进行签名
        :param timestamp: 时间戳
        :param noncestr: 随机数
        :param url: 要签名的 url，不包含 # 及其后面部分
        :param jsapi_ticket: (可选参数) jsapi_ticket 值 (如不提供将自动通过 appid 和 appsecret 获取)
        :return: 返回sha1签名的hexdigest值
        """
        if not jsapi_ticket:
            jsapi_ticket = self.__token_service.jsapi_ticket()
        data = {
            'jsapi_ticket': jsapi_ticket,
            'noncestr': noncestr,
            'timestamp': timestamp,
            'url': url,
        }
        keys = data.keys()
        keys.sort()
        data_str = '&'.join(['%s=%s' % (key, data[key]) for key in keys])
        signature = hashlib.sha1(data_str).hexdigest()
        return signature

# -*- coding: utf-8 -*-

if __name__ == '__main__':
    WechatConfig.init('wxfea0974313d0ac88',
                      'b4a94232c7f7a46625c0394c03219087',
                      'Gn4hJI23RgAWFSrO5Zcrhod',
                      )

    token_service = TokenService()

    token_service.get_client().send_text_message('oHi8wt6o23p0UVULIoJIlQ2SMxVE', 'hello you')
    # for i in range(1, 20):
    #     print token_service.access_token()
    #
    # print token_service.access_token(True)
    #
    # print token_service.jsapi_ticket()
