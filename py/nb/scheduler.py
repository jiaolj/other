# -*- coding: utf-8 -*-
#安装 sudo  pip install APScheduler
from apscheduler.schedulers.blocking import BlockingScheduler
from datetime import datetime
import time,os,fast,week

def everyDay():
    fast.main()

def everyWeek():
    week.main()

if __name__ == '__main__':
    scheduler = BlockingScheduler()
    scheduler.add_job(everyDay,'cron', second='1', minute='5', hour='7,16')
    scheduler.add_job(everyWeek,'cron', second='1', minute='1', hour='16')
    print('Press Ctrl+{0} to exit'.format('Break' if os.name == 'nt' else 'C'))
try:
    scheduler.start()
except (KeyboardInterrupt, SystemExit):
    scheduler.shutdown()