# -*- coding: utf-8 -*-
s = open('001_GLog.txt','r')
listall = []
names = set()
num = 0
for s1 in s.readlines():
	num += 1
	if num>1:
		s2 = s1.split('	')
		name = s2[3].strip()
		names.add(name)
		tms = s2[4].replace('  ',' ').replace('/','-').strip()+':00'
		listall.append({'name':name,'tms':tms})
#print listall,names

for nm in names:
	for lt in listall:
		if nm == lt['name']:
			print nm,lt['tms']

s.close()

f=open('people.txt','w')
f.write('123')
f.close()