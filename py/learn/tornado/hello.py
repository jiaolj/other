# _*_ coding:utf-8 _*_
import tornado.ioloop,tornado.web,os

class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie("user")
'''
#----异步，接到请求立即结束
class MainHandler(tornado.web.RequestHandler):
    @tornado.web.authenticated
    def get(self):
#         if not self.current_user: #用装饰器取代这种方法
#             self.redirect("/login")
#             return
        name = tornado.escape.xhtml_escape(self.current_user)
        self.write("Hello, " + name)
    def post(self):
        self.set_header("Content-Type", "text/plain")
        self.write("You wrote " + self.get_argument("message"))
'''
#----同步，接到请求等待后,除非调用self.finish()返回，否则浏览器一直处理等待响应
class MainHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    def get(self):
        self.write("Hello, world")
        self.finish()
class LoginHandler(BaseHandler):
    def get(self):
        self.write('<html><body><form action="/login" method="post">'
                   'Name: <input type="text" name="name">'
                   '<input type="submit" value="Sign in">'
                   '</form></body></html>')
        '''
        form里面加上{{ xsrf_form_html() }}
        '''
    def post(self):
        self.set_secure_cookie("user", self.get_argument("name"))
        self.redirect("/")
        '''//jQuery带上xsrf
        function getCookie(name) {
            var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
            return r ? r[1] : undefined;
        }
        
        jQuery.postJSON = function(url, args, callback) {
            args._xsrf = getCookie("_xsrf");
            $.ajax({url: url, data: $.param(args), dataType: "text", type: "POST",
                success: function(response) {
                callback(eval("(" + response + ")"));
            }});
        };
        '''
class StoryHandler(tornado.web.RequestHandler):
    def get(self, story_id):
        #if not self.user_is_logged_in(): #返回一个错误信息给客户端
            #raise tornado.web.HTTPError(403)
        #print self.request.arguments #get或post对象?a=1得到 {'a': ['1']}
        #print self.request.path  #返回url的？之前的部分/story/9包括host
        #print self.request.headers  #{'Accept-Language': 'zh-CN,zh;q=0.8', 'Accept-Encoding': 'gzip, deflate, sdch', 'Connection': 'keep-alive', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8', 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', 'Host': '10.21.31.138:8888', 'Cache-Control': 'max-age=0', 'If-None-Match': '"e4a0b050cb6d8b460d7705096bf0874de283ef52"'}
        #host=request.headers['Host'] #主机
        #host=request.headers['User-Agent'] #客户端类型
        #self.request.files #获取上传文件
#         self.write("You requested the story " + story_id) #打印字符串
        #self.redirect("/") 重定向
        if not self.get_cookie("mycookie"): #设置cookie
            self.set_cookie("mycookie", "myvalue")
            self.write("Your cookie was not set yet!")
        else:
            self.write("Your cookie was set!")
        items = ["Item 1", "Item 2", "Item 3"]
        self.render("template/detail.html", title="My title", items=items) #渲染模版
settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "static"), #<img src="{{ static_url("images/logo.png") }}"/>
    "cookie_secret": "61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
    "login_url": "/login",
    "xsrf_cookies": True,
}
application = tornado.web.Application([
    (r"/", MainHandler),
    (r"/login", LoginHandler),
    (r"/story/([0-9]+)", StoryHandler),
    (r"/story/detail([0-9]+).html", StoryHandler),
    (r"/(apple-touch-icon\.png)", tornado.web.StaticFileHandler, dict(path=settings['static_path'])),
], **settings) #设置cookie密钥

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()