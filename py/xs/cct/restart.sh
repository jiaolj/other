export PYTHONTEMP="/home/jiaolj/test/cct/"
pid=`ps -ef|grep "python"|grep "$PYTHONTEMP"|grep -v "grep"|awk '{print $2}'`
if [ "$pid" = "" ] ; then
  echo "no tomcat pid alive"
else
  echo "kill pid $pid now"
  kill -9 $pid
fi
python /home/jiaolj/test/cct/manage.py runfcgi host=121.40.87.203 port=1000 --settings=cct.settings
