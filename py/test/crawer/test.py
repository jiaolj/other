import urllib2
url='http://google.com'
print urllib2.urlopen(url, timeout=5).read()