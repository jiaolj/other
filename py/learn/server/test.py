import forkcore
if __name__=="__main__":
    def worker(conn,addr):
        print "Message from ("+str(addr[0])+":"+str(addr[1])+"): "+conn.recv(1024)[0:-1]

    forkcore.ds_forkcore(worker,port=5555)