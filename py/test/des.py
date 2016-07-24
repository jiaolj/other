#coding:utf-8  
import binascii,base64,pyDes  

class DES(object):  
    def __init__(self, iv, key):  
        self.iv = iv  
        self.key = key  
    def encrypt(self, data):  
        iv = binascii.unhexlify(self.iv)  
        key = binascii.unhexlify(self.key)  
        k = pyDes.triple_des(key, pyDes.CBC, iv, pad=None, padmode=pyDes.PAD_PKCS5)  
        d = k.encrypt(data)  
        d = base64.encodestring(d)  
        return d  
    def decrypt(self, data):  
        iv = binascii.unhexlify(self.iv)  
        key = binascii.unhexlify(self.key)  
        k = pyDes.triple_des(key, pyDes.CBC, iv, pad=None, padmode=pyDes.PAD_PKCS5)  
        try:  
            data = base64.decodestring(data)  
            d = k.decrypt(data)  
        except:  
            d = ''  
        return d
if __name__ == '__main__':  
    data = "mf"  
    des = DES('3132333435363738','313233343536373839303132333435363738393031323334')  
    encryptdata = des.encrypt(data.encode('utf-8'))  
    print encryptdata
    decryptdata = des.decrypt(encryptdata)
    print decryptdata.decode('utf-8')