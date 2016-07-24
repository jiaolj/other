from twisted.internet.protocol import Factory
from twisted.internet import reactor
from TwistedWebsocket.server import Protocol
import json

def prn_obj(obj):
    print ', '.join(['%s:%s' % item for item in obj.__dict__.items()])

connlist={}

class WebSocketHandler(Protocol):

    def onConnect(self):
        for _id, user in self.users.items():
            user.sendMessage("%s connected" % self.id)

    def onDisconnect(self):
        for _id, user in self.users.items():
            user.sendMessage("%s disconnected" % self.id)

    def onMessage(self, msg):
        jsonData=json.loads(msg)
        uname=jsonData['uname']
        if connlist.has_key(uname):
            print msg
            pass
        else:#first send data
            for _id, user in  self.users.items():
                connlist[uname]=user
                print connlist
                jsondd=msg
                data_string = json.dumps(jsondd)
                user.sendMessage(data_string)


class WebSocketFactory(Factory):
    def __init__(self):
        self.users = {}
    def buildProtocol(self, addr):
        prn_obj(addr)
        return WebSocketHandler(self.users)


reactor.listenTCP(9999, WebSocketFactory())
reactor.run()