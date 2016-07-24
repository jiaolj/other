# _*_ coding:utf-8 _*_
from apscheduler.scheduler import Scheduler 
import os

schedudler = Scheduler(daemonic = False)
 
@schedudler.cron_schedule(second='1/60', day_of_week='0,1,2,3,6', hour='22') 
def quote_send_sh_job():
    os.system('shutdown -s -f -t 10')

schedudler.start()