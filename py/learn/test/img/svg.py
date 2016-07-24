# -*- coding: utf-8 -*-
import os,time,random
#command ="inkscape --without-gui --file=cirsle.svg --export-png=cirsle.png"
#os.system(command)

def genPNG():
    svgText = '''
    <?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
    "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    
    <svg width="100%" height="100%" version="1.1"
    xmlns="http://www.w3.org/2000/svg">
    
    <circle cx="100" cy="50" r="40" stroke="black"
    stroke-width="2" fill="red"/>
    </svg>
    '''

    svgText=svgText.strip()
    randomName=str(time.time()).replace('.', '_')+str(random.randint(1,100))
    svgName=randomName+'.svg'
    dirName='F:\\jiaolj\\163\\code\\jiaolj\\test\img\\'
    svgPath=dirName+svgName
    
    file_object = open(svgPath,'w')
    file_object.write(svgText)
    file_object.close( )
    
    pngName=randomName+".png"
    pngPath=dirName+pngName

    systemText='inkscape --without-gui --file='+svgPath+' --export-png='+pngPath

    os.system(systemText)
    

genPNG()