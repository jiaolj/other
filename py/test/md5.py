import hashlib   

m2 = hashlib.md5()   
m2.update('123')   
print m2.hexdigest()   