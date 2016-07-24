#-*- coding:utf-8 -*-
#---操纵mysql数据库
class JMysql(object):
    #---初始化数据库连接
    def __init__(self,conn_config):
        import MySQLdb
        self.mysql=MySQLdb
        self.conn_config=conn_config
    def open(self):
        self.conn=self.mysql.connect(host=self.conn_config['host'], user=self.conn_config['user'], passwd=self.conn_config['passwd'],db=self.conn_config['db'],charset=self.conn_config['charset'])
        self.cursor=self.conn.cursor()
    def close(self):
        #self.cursor.close()
        self.conn.close()
    #----更新到数据库
    def update(self,sql,argument):
        self.cursor.execute(sql,argument)
        self.conn.commit()
    #----查询所有数据
    def fetchall(self,sql,argument=''):
        if argument:self.cursor.execute(sql,argument)
        else:self.cursor.execute(sql)
        resultlist=self.cursor.fetchall()
        if resultlist:return resultlist
        else:return []
    #----查询一条数据
    def fetchone(self,sql,argument='',num=''):
        if argument:self.cursor.execute(sql,argument)
        else:self.cursor.execute(sql)
        result=self.cursor.fetchone()
        if result:
            if num:return result[int(num)]
            return result