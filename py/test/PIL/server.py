# -*- coding: UTF-8 -*-
import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        f=open('m.png', 'rb')
        data = f.read()
        self.render(data)
        f.close()

application = tornado.web.Application([
    (r"/", MainHandler),
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()