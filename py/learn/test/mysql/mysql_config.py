#-*- coding:utf-8 -*-
def get_db_config(host,db):
    conn={
	'151':{'host':'172.21.1.151','user':'xli','passwd':'123456','db':db,'charset':'utf8'},
	'251':{'host':'192.168.42.128','user':'root','passwd':'10534jun','db':db,'charset':'utf8'},
	}
    return conn[host]

conn_151_news_about_IT=get_db_config('251','news_about_IT')
conn_151_project973V3=get_db_config('251','project973V3')
conn_151_DInsight=get_db_config('251','D-Insight-2')