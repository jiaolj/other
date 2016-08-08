#coding:utf-8
from PIL import Image
#图片重叠合成
def imgMerge(img1,img2,img3):
    img1 = Image.open('echarts.png')
    img2 = Image.open('echarts2.png')
    img1.paste(img2,(0,0),mask=img2) #透明背景+不透明背景
    #img  = Image.blend(img1,img2,0.5) #不透明背景+不透明背景
    #img1.show()
    img1.save(img3)
    
if __name__=='__main__':
    imgMerge('echarts.png','echarts.png','echarts3.png')
