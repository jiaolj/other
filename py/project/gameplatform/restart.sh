export PYTHONTEMP="/var/www/pythoncode/gameplatform/"
pid=`ps -ef|grep "python"|grep "$PYTHONTEMP"|grep -v "grep"|awk '{print $2}'`
if [ "$pid" = "" ] ; then
  echo "no tomcat pid alive"
else
  echo "kill pid $pid now"
  kill -9 $pid
fi
nohup python -u manage.py runserver 192.168.204.128:8007 &
