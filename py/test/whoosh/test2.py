# -*- coding: UTF-8 -*-
#pip install tornado==4.2.1
#pip install whoosh==2.7.0
#pip install jieba==0.37
#nohup python -u test2.py &
from whoosh.index import create_in
from whoosh.fields import *
from whoosh.analysis import RegexAnalyzer
import jieba,json
from whoosh.analysis import Tokenizer,Token
class ChineseTokenizer(Tokenizer):
    def __call__(self, value, positions=False, chars=False,
                 keeporiginal=False, removestops=True,
                 start_pos=0, start_char=0, mode='', **kwargs):
        assert isinstance(value, text_type), '%r is not unicode' % value
        t = Token(positions, chars, removestops=removestops, mode=mode,
            **kwargs)
        seglist=jieba.cut(value,cut_all=False)#使用结巴分词库进行分词
        for w in seglist:
            t.original = t.text = w
            t.boost = 1.0
            if positions:
                t.pos=start_pos+value.find(w)
            if chars:
                t.startchar=start_char+value.find(w)
                t.endchar=start_char+value.find(w)+len(w)
            yield t#通过生成器返回每个分词的结果token
def ChineseAnalyzer():
    return ChineseTokenizer()
analyzer=ChineseAnalyzer()
schema = Schema(title=TEXT(stored=True), path=ID(stored=True), content=TEXT(stored=True, analyzer=analyzer))
ix = create_in('indexdir', schema)
writer = ix.writer()
writer.add_document(title=u'First document',content=u"This is the first document we've added!")
writer.add_document(title=u'Second document',content=u'The second one 你 中文测试中文 is even more interesting!')
writer.commit()
searcher = ix.searcher()
import tornado.web
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        arg=self.request.arguments
        kwd=arg.get('kwd','')
        if kwd:kwd=kwd[0]
        t=searcher.find('content', kwd)
        if t:
            listall=[]
            for i in t:listall.append({'title':i['title'],'content':i['content']})
            self.write(json.dumps(listall))
        else:self.write('没找到')
application = tornado.web.Application([
    (r'/', MainHandler),
])
if __name__ == '__main__':
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()