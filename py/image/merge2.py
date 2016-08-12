#coding:utf-8
from PIL import Image
#图片重叠合成
def imgMerge(image1,image2,image3):
    img1 = Image.open(image1)
    img2 = Image.open(image2)
    img1.paste(img2,(0,0),mask=img2) #透明背景+不透明背景
    #img  = Image.blend(img1,img2,0.5) #不透明背景+不透明背景
    #img1.show()
    img1.save(image3)
    
if __name__=='__main__':
    imgMerge('echarts.png','echarts2.png','echarts3.png')
