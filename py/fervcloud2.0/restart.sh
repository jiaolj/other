export PYTHONTEMP="/home/jiaolj/py/fervcloud1.0/"
pid=`ps -ef|grep "python"|grep "$PYTHONTEMP"|grep -v "grep"|awk '{print $2}'`
if [ "$pid" = "" ] ; then
  echo "no tomcat pid alive"
else
  echo "kill pid $pid now"
  kill -9 $pid
fi
python /home/jiaolj/py/fervcloud1.0/manage.py runfcgi host=120.27.28.149 port=8002 --settings=fervcloud.settings
