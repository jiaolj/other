export PYTHONTEMP="/var/www/pythoncode/gongjx/"
pid=`ps -ef|grep "python"|grep "$PYTHONTEMP"|grep -v "grep"|awk '{print $2}'`
if [ "$pid" = "" ] ; then
  echo "no tomcat pid alive"
else
  echo "kill pid $pid now"
  kill -9 $pid
fi
python /var/www/pythoncode/gongjx/manage.py runfcgi host=115.29.139.163 port=8001 --settings=gongjx.settings
