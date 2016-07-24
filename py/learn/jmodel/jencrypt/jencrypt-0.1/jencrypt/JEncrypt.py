#-*- coding:utf-8 -*-

#j加密算法
class JEncrypt(object):
    def __init__(self):
        wordList=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-']
        threeList=[]
        num=''
        for i in wordList:
            num+='3'
            threeList.append(num)
        self.wl=wordList
        self.tl=threeList[::-1]
    def toCode(self,strword):
        return strword.encode('utf8','ignore').encode("hex")
    def fromCode(self,strword):
        return strword.decode("hex").decode('utf8','ignore')
    def toCompute(self,code):
        lcode=self.wl[len(code)]
        while True:
            code=self.toCode(code)
            if len(code)>99:break
        fullcode=self.toCode(self.toCode(lcode+code))
        numb=0
        for j in self.tl:
            if j in fullcode:
                fullcode=fullcode.replace(j,self.wl[numb])
            numb+=1
        return fullcode
    def fromCompute(self,code):
        for i,w in enumerate(self.wl):
            if w in code:
                code=code.replace(w,self.tl[i])
        code=self.fromCode(self.fromCode(code))
        code2=code[1:]
        codei=self.wl.index(code[:1])
        while True:
            code2=self.fromCode(code2)
            if len(code2)==codei:break
        return code2