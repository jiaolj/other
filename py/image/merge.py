from PIL import Image

#图片4合1
def imgMerge(img1,img2,img3):
    arr = ['p1.png', 'p2.png', 'p3.png', 'p4.png']
    toImage = Image.new('RGBA',(400,400))
    for i in range(4):
        fromImge = Image.open(arr[i])
        loc = ((int(i/2) * 200), (i % 2) * 200)
        print(loc)
        toImage.paste(fromImge, loc)
    
    toImage.save('merged.png')
    
if __name__=='__main__':
    imgMerge('echarts.png','echarts.png','echarts3.png')