import base64
from pyDes import *
from binascii import b2a_hex,a2b_hex
Des_Key = "20150811"
Des_IV = "20150811"

def DesEncrypt(str):
	k = des(Des_Key, CBC, Des_IV, pad=None, padmode=PAD_PKCS5)
	EncryptStr = k.encrypt(str)
	#print EncryptStr
	Encrypy_hex = b2a_hex(EncryptStr)
	#print Encrypy_hex
	Decrypy_byte = a2b_hex(Encrypy_hex)
	#print Decrypy_byte
	Decrypystr = k.decrypt(Decrypy_byte)
	#print Decrypystr
	return Encrypy_hex
print DesEncrypt('46762')
