#-*- coding:utf-8 -*-
from sphinxapi import SphinxClient,SPH_MATCH_BOOLEAN 
sphinxconfig={'serverid': '192.168.204.128' ,'port': 9312}


def getpricelist(keywords='',frompageCount= '',limitNum='',allnum=200000):
	cl = SphinxClient()
	cl.SetServer ( sphinxconfig[ 'serverid'], sphinxconfig['port'] )
	cl.SetMatchMode ( SPH_MATCH_BOOLEAN )
#		cl.SetSortMode( SPH_SORT_ATTR_DESC ,'postdate desc' )
	cl.SetLimits (frompageCount,limitNum,allnum)
	if keywords:
		res = cl.Query ('@(title) '+keywords,'news_pages')
	else:
		res = cl.Query ('','news_pages' )
	listall=[]
	count=0
	if res:
		count=res['total']
		listall=[m['id'] for m in res['matches']]
	return {'listall':listall,'count':count}

print getpricelist(keywords='',frompageCount=0,limitNum=10)