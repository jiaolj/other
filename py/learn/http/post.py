#-*- coding:utf-8 -*-
def getimgurl(datadir):
    httpClient = None
    try:
        params = urllib.urlencode(datadir)
        headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}
        httpClient = httplib.HTTPConnection("10.214.145.223",3000, timeout=30)
        httpClient.request("POST", "/analytics/genpng", params, headers)
        response = httpClient.getresponse()
        #print response.reason
        content=response.read()
        #print response.getheaders() #获取头信息
    except Exception, e:
        print e
    finally:
        if httpClient:
            httpClient.close()
    return content

svg = request.POST.get('svg')
path = getimgurl({'svg':svg})