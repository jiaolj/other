#-*- coding:utf-8 -*-

class TimeTools(object):
    def __init__(self):
        import time,datetime,re
        self.tm=time
        self.dtm=datetime
        self.re=re
    #----20140101连续格式时间分割
    def getSpliTime(self,timedate):
        timedate=str(timedate)
        return timedate[:4]+'-'+timedate[4:6]+'-'+timedate[6:8]
    #----获得昨天datetime类型
    def getYesterday(self):
        today=self.dtm.date.today()   
        oneday=self.dtm.timedelta(days=1)   
        yesterday=today-oneday    
        return yesterday
    #----获得明天datetime类型
    def getTomorrow(self):
        today=self.dtm.date.today()   
        oneday=self.dtm.timedelta(days=1)   
        yesterday=today+oneday    
        return yesterday
    #----获得今天datetime类型
    def getToday(self):
        return self.dtm.date.today()
    #----获得上月最后一天
    def getLastMonthLastDay(self):
        return self.dtm.date(self.dtm.date.today().year,self.dtm.date.today().month,1)-self.dtm.timedelta(1) #实现方式本月1号减1天
    #----获得当前是哪一年
    def getNowYear(self):
        return self.tm.strftime('%Y',self.tm.localtime(self.tm.time()))
    #----获得当前是哪个月
    def getNowMonth(self):
        return self.tm.strftime('%m',self.tm.localtime(self.tm.time()))
    #----获得当前是哪天
    def getNowDay(self):
        return self.tm.strftime('%d',self.tm.localtime(self.tm.time()))
    #----获得2014-01-01格式日期
    def getStrTime(self,arg=''):
        strTime=self.tm.strftime('%Y-%m-%d',self.tm.localtime(self.tm.time()))
        if arg==1:strTime=self.timeRemoveZero(strTime)
        return strTime
    #----获得2014-01-01 00:00:00格式日期
    def getStrTimeAll(self):
        strTime=self.tm.strftime('%Y-%m-%d %H:%M:%S',self.tm.localtime(self.tm.time()))
        return strTime
    #---获得某年某月的总天数
    def getMonthDays(self,year,month):
        import calendar
        monthRange = calendar.monthrange(int(year),int(month))
        return monthRange[1]
    #----获得某一天的明天,参数格式2014-10-10
    def getNextDate(self,timeData,arg=''):
        if isinstance(timeData,str):timeData=self.strToDate(timeData)
        days=self.dtm.timedelta(days=1)
        rdates=timeData+days
        if arg==1:rdates=self.dateToStr(rdates)#返回date类型或者str类型
        return rdates
    #----获得过去几天的列表
    def getPastDays(self,numb,arg=''):
        listnumb=range(1,numb+1)
        today=self.dtm.date.today()
        listall=[]
        for lnumb in listnumb:
            days=self.dtm.timedelta(days=lnumb)
            ddays=today-days
            if arg==1:ddays=ddays.strftime('%Y-%m-%d')#是否格式化字符串
            elif arg==2:ddays=ddays.strftime('%m-%d')
            listall.append(ddays)
        return listall
    #----第前几天
    def getPastOneDay(self,numb):
        today=self.dtm.date.today()
        days=self.dtm.timedelta(days=numb)
        nowday=today-days
        return nowday
    #----获得过去相差一天时间列表字典
    def getDateList(self,numb):
        listnumb=range(1,numb+1)
        today=self.dtm.date.today()
        listall=[]
        for lnumb in listnumb[::-1]:
            days=self.dtm.timedelta(days=lnumb)
            gmt_begin=today-days
            gmt_end=gmt_begin+self.dtm.timedelta(days=1)
            list={'timeBegin':self.dateToStr(gmt_begin),'timeEnd':self.dateToStr(gmt_end)}
            listall.append(list)
        return listall
    #----获得两段时间差的列表(返回时间字符串列表)
    def getDifTimeList(self,datebegin,dateend):
        if isinstance(datebegin,str):datebegin=self.strToInt(datebegin)
        elif isinstance(datebegin,self.dtm.datetime):datebegin=self.dateToInt(datebegin)
        if isinstance(dateend,str):dateend=self.strToInt(dateend)
        elif isinstance(dateend,self.dtm.datetime):dateend=self.dateToInt(dateend)
        timelist2=[]
        datebegin2=datebegin
        for tl in range(1,(dateend-datebegin)/(3600*24)+1):
            timelist2.append(self.intToStr(datebegin2))
            datebegin2=datebegin2+3600*24
        timelist2.append(self.intToStr(dateend))
        return timelist2
    #----所有时间转换函数
    def strToDate(self,stringDate):
        if not ':' in stringDate:stringDate=stringDate+' 00:00:00'
        return self.dtm.datetime.strptime(stringDate,"%Y-%m-%d %H:%M:%S").date()
    def strToDatetime(self,stringDate):
        if not ':' in stringDate:stringDate=stringDate+' 00:00:00'
        return self.dtm.datetime.fromtimestamp(self.tm.mktime(self.tm.strptime(stringDate,"%Y-%m-%d %H:%M:%S")))
    def strToInt(self,stringDate):
        if not ':' in stringDate:stringDate=stringDate+' 00:00:00'
        return int(self.tm.mktime(self.tm.strptime(stringDate,"%Y-%m-%d %H:%M:%S")))
    def intToStr(self,intDate):
        return self.tm.strftime('%Y-%m-%d',self.tm.localtime(int(intDate)))
    def intToStrYearMonth(self,intDate):
        return self.tm.strftime('%Y-%m',self.tm.localtime(int(intDate)))
    def intToStrMonthDay(self,intDate):
        return self.tm.strftime('%m-%d',self.tm.localtime(int(intDate)))
    def intToStrAll(self,intDate):
        return self.tm.strftime('%Y-%m-%d %H:%M:%S',self.tm.localtime(int(intDate)))
    def intToDate(self,intDate):
        return self.strToDate(self.intToStrAll(intDate))
    def intToDatetime(self,intDate):
        return self.strToDatetime(self.intToStrAll(intDate))
    def dateToStr(self,dttime):
        return dttime.strftime('%Y-%m-%d')
    def dateToStrall(self,dttime):
        return dttime.strftime('%Y-%m-%d %H:%M:%S')
    def dateToInt(self,dttime):
        return self.strToInt(self.dateToStrall(dttime))
    #----时间字符串转为2015-1-1不带前缀0的格式
    def timeRemoveZero(self,timeData):
        timeData=utf8ToUnicode(timeData)
        numlist=self.re.findall('\d+',timeData)
        connector=self.re.sub('\d+','',timeData)
        if len(numlist)==2:return removeZero(numlist[0])+connector[:1]+removeZero(numlist[1])+connector[1:]
        elif len(numlist)==3:return removeZero(numlist[0])+connector[:1]+removeZero(numlist[1])+connector[1:2]+removeZero(numlist[2])+connector[2:]
    #----秒数转化为00:00:00类型或0:0:0
    def nubToTime(self,s,arg='',unit='::'):
        if unit==1:unit=u'时分秒'
        s=int(s)
        d=s%60
        m=s/60
        h=m/60
        if h>0:m=m-(h*60)
        #if arg==1: numb=str(h)+':'+str(m)+':'+str(d)
        numb=addZero(h)+unit[:1]+addZero(m)+unit[1:2]+addZero(d)+unit[2:3]
        if arg==1 and h==0:numb=addZero(m)+unit[1:2]+addZero(d)+unit[2:3]
        elif arg==2:numb=str(h)+unit[:1]+str(m)+unit[1:2]+str(d)+unit[2:3]
        elif arg==3 and h==0:numb=str(m)+unit[1:2]+str(d)+unit[2:3]
        return numb
    def getFormatApi(self):
        text='''
        time.strftime() 
                        格式命令:
            %a 星期几的简写   
            %A 星期几的全称   
            %b 月分的简写   
            %B 月份的全称   
            %c 标准的日期的时间串   
            %C 年份的后两位数字   
            %d 十进制表示的每月的第几天   
            %D 月/天/年   
            %e 在两字符域中，十进制表示的每月的第几天   
            %F 年-月-日   
            %g 年份的后两位数字，使用基于周的年   
            %G 年分，使用基于周的年   
            %h 简写的月份名   
            %H 24小时制的小时   
            %I 12小时制的小时   
            %j 十进制表示的每年的第几天   
            %m 十进制表示的月份   
            %M 十时制表示的分钟数   
            %n 新行符   
            %p 本地的AM或PM的等价显示   
            %r 12小时的时间   
            %R 显示小时和分钟：hh:mm   
            %S 十进制的秒数   
            %t 水平制表符   
            %T 显示时分秒：hh:mm:ss   
            %u 每周的第几天，星期一为第一天 （值从0到6，星期一为0）   
            %U 第年的第几周，把星期日做为第一天（值从0到53）   
            %V 每年的第几周，使用基于周的年   
            %w 十进制表示的星期几（值从0到6，星期天为0）   
            %W 每年的第几周，把星期一做为第一天（值从0到53）   
            %x 标准的日期串   
            %X 标准的时间串   
            %y 不带世纪的十进制年份（值从0到99）   
            %Y 带世纪部分的十制年份   
            %z，%Z 时区名称，如果不能得到时区名称则返回空字符。   
            %% 百分号
        '''
        return text