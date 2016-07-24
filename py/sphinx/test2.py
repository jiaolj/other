#
# $Id$
#
from sphinxapi import *

sphinxConfig={'server': '192.168.42.128' ,'port': 9312}


def getNewslist(kwd='',fromNum=0,limitNum=10,allNum=''):
	cl = SphinxClient()
	cl.SetServer ( sphinxConfig[ 'server'], sphinxConfig['port'] )
	cl.SetMatchMode ( SPH_MATCH_BOOLEAN )
	#cl.SetSortMode( SPH_SORT_ATTR_DESC ,'postdate desc' )
	if allNum:cl.SetLimits (fromNum,limitNum,allNum)
	else:cl.SetLimits (fromNum,limitNum)
	if kwd:
		res = cl.Query ( '@(tname,lname) '+kwd,'events')
	else:
		res = cl.Query ( '','events' )
	if res:
		matches=res['matches']
		for m in matches:
			print m

getNewslist(0,10)