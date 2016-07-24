#-*- coding:utf-8 -*-
import neo4jrestclient.client as client
import json,re
#查看python对象的属性
#def prn_obj(obj):
#    return ', '.join(['%s:%s' % item for item in obj.__dict__.items()])
def getNeo4jData():
    gdb=client.GraphDatabase('http://localhost:7474/db/data/')
    result=gdb.query('START n=node(532046) match n-[r]-m return n,r',returns=(client.Node, unicode, client.Relationship))
    linksList=[]
    nodesList=[]
    for i in result[:10]:
        code='532046'
        linedata=i[1]
        data=re.findall("node/(.*?)'",linedata)
        start=data[1]
        category=gdb.query('START n=node('+start+') return n',returns=(unicode))
        resourceID=re.findall("{u'resourceID': u'(.*?)'}",category[0][0])
        organizationID=re.findall("{u'organizationID': u'(.*?)'}",category[0][0])
        peopleID=re.findall("{u'peopleID': u'(.*?)'}",category[0][0])
        if resourceID:
            category=1
        elif resourceID:
            category=2
        elif peopleID:
            category=3
#        print category
        end=data[0]
        lsitdir={'source':start,'target':end,'weight':10}
        linksList.append(lsitdir)
        lsitdir2={'category':category,'name':code,'value':10}
        nodesList.append(lsitdir2)
    
    datalist={'heart':'-532046-','nodes':nodesList,'links':linksList}
    return datalist
    
print getNeo4jData()