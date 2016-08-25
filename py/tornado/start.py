import tornado.ioloop,tornado.web,os
from sudo import ssh2,start_analyze
import json
#pip install tornado==4.4.1

staticDir = 'static'
Global = {
    'static' : '/'+staticDir+'/'
}

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        #self.write('Hello, world')
        self.render('index.html',**Global)

class Update(tornado.web.RequestHandler):
    def get(self):
        back = {'state':'ok'}
        pk = self.get_argument('pk','')
        if pk=='1':
            back['console'] = start_analyze()
        self.write(json.dumps(back))


settings = {
    'static_path' : os.path.join(os.path.dirname(__file__), staticDir),
    'template_path' : os.path.join(os.path.dirname(__file__), 'templates'),
    'gzip' : True,
    'debug' : True,
}

def make_app():
    return tornado.web.Application([
        (r'/', MainHandler),
        (r'/update', Update),
    ], **settings)

if __name__ == '__main__':
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
