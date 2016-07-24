# _*_ coding:utf-8 _*_
from apscheduler.scheduler import Scheduler 
import os,shutil

schedudler = Scheduler(daemonic = False)
 
@schedudler.cron_schedule(second='*', day_of_week='0-6', hour='*') 
def quote_send_sh_job():
    rootdir = 'F:\\jiaolj\\xiaoyuan\\knowledegex\\knowledgex1\\apps\\analytics\\static\\analytics\\img\\png'
    newDir='F:\\jiaolj\\xiaoyuan\\svg\\knowledegex\\'
    for parent,dirnames,filenames in os.walk(rootdir):
        for filename in filenames:
            files=filename.split('.')
            ftype=files[1]
            fname=files[0]
            if ftype=='svg':
                print filename
                #os.system('inkscape --without-gui --file='+fname+'.svg --export-png='+fname+'.png --export-width=800 --export-height=500')
                os.system('inkscape --without-gui --file='+rootdir+'\\'+fname+'.svg --export-png='+rootdir+'\\'+fname+'.png')
                #os.remove(filename)
                shutil.move(rootdir+'\\'+filename,newDir+filename)

schedudler.start()

