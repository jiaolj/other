a = ['a','b','c','d','e','f','g']

def getArray(r,l):
    '''
    (['a','b','c','d','e','f','g'])
    >
    [['a', 'b'], ['c', 'd'], ['e', 'f'], ['g']]
    '''
    ln = len(r)
    f = 0
    e = ln/l
    b = []
    for i in range(0,e+2):
        s = r[f:f+l]
        if s:
            b.append(s)
        f += l
    return b

#print getArray(a,3)

def getArray2(r):
    '''
    a = ['a','b','c','c']
    b = ['d','e','f','f','f','f']
    c = ['g','h','i']
    ([a,b,c])
    >
    [['a', 'd', 'g'], ['b', 'e', 'h'], ['c', 'f', 'i'], ['c', 'f', ''], ['', 'f', ''], ['', 'f', '']]
    '''
    l = 0
    for i in r:
        if l<len(i):
            l = len(i)
    nl = []
    for i in r:
        c = i
        for j in range(l-len(i)):
            c.append('')
        nl.append(c)
    b = []
    for k in range(l):
        d = []
        for n in nl:
            d.append(n[k])
        b.append(d)
    print b
    return b

a = ['a','b','c','c']
b = ['d','e','f','f','f','f']
c = ['g','h','i']
getArray2([a,b,c])