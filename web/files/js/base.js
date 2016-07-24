String.prototype.replaceAll=function(str1,str2){var str=this;var result=str.replace(eval("/"+str1+"/gi"),str2);return result} //全部替换
var json=function(k){return eval('('+k+')')} //字符串转json
var isIE=function(){if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) return 1;return 2} //判断是否ie浏览器
var ref=function(){location.href=""} //刷新页面
var log = function(){for(var arg in arguments) console && console.log(arguments[arg])},
var getFocus=function(id){document.getElementById(id).focus()} //对象加上光标
var random=function(arr,num){if(num){var rlist=[];for(var i=0;i<1000;i++){var index=Math.floor((Math.random()*arr.length));var val=arr[index];if(rlist.indexOf(val)==-1){rlist.push(val);if(rlist.length==4){return rlist}}}}else{var index=Math.floor((Math.random()*arr.length));return arr[index]}}; //从某个数字里面随机获取1到n个值
var getRandomColor=function(){return"rgb("+[Math.round(Math.random()*160),Math.round(Math.random()*160),Math.round(Math.random()*160)].join(",")+")"} //获取随机颜色
var sleep=function(numberMillis){var now=new Date();var exitTime=now.getTime()+numberMillis;while(true){now=new Date();if(now.getTime()>exitTime){return}}} //休眠一定时间
var getIntTime=function(){return(new Date()).getTime()} //获取当前时间戳
var toDouble=function(numb){numb=numb+"";if(numb.length==1){numb="0"+numb}return numb} //1转成01
var numb_to_time=function(numb){if(numb>3600){hour=parseInt(numb/3600);min=parseInt((numb-hour*3600)/60);sec=numb-hour*3600-min*60}else{if(numb>60){hour=0;min=parseInt(numb/60);sec=numb%60}else{hour=0;min=0;sec=numb}}text=toDouble(hour)+":"+toDouble(min)+":"+toDouble(sec);return text} //数字转字符串时间
var time_to_numb=function(tmdata){tmdataList=tmdata.split(":");hour=parseInt(tmdataList[0])*3600;min=parseInt(tmdataList[1])*60;sec=parseInt(tmdataList[2]);numbd=hour+min+sec;return numbd} //字符串时间转数字
var time_add_numb=function(tmdata,num){return numb_to_time(time_to_numb(tmdata)+num)}; // 字符串格式的时间增加 00:00:01→00:00:02
var getMonthDays=function(year,month){return new Date(year,month,0).getDate()}; //获得某年某月共有多少天
var date_to_str=function(dtstr){var ej={"Jan":"01","Feb":"01","Mar":"03","Apr":"04","May":"05","Jun":"06","Jul":"07","Aug":"08","Sep":"09","Oct":"10","Nov":"11","Dec":"12"},dstr=dtstr.replaceAll(",","").split(" "),month=ej[dstr[0]],day=dstr[1],year=dstr[2],dtstr=year+"-"+month+"-"+day;return dtstr} //date类型字符串转为2020-01-01格式
var AddDays=function(d,n){var t=new Date(d);t.setDate(t.getDate()+n);return t} //时间加减
var getLastTime=function(num){var dd=AddDays(new Date(),num);return getStrTime(undefined,dd)};//获取当前日期-多少天
var getStrTimeAll=function(con){if(!con){con="-"}var now=new Date();var year=now.getFullYear();var month=now.getMonth()+1;var day=now.getDate();var hh=now.getHours();var mm=now.getMinutes();var ss=now.getSeconds();var clock=year+con;if(month<10){clock+="0"}clock+=month+con;if(day<10){clock+="0"}clock+=day+" ";if(hh<10){clock+="0"}clock+=hh+":";if(mm<10){clock+="0"}clock+=mm+":";if(ss<10){clock+="0"}clock+=ss;return(clock)} //获取时间, 格式2020-01-01 00:00:00
var getStrTime=function(con,now){if(!con){con=['-','-','']};if(!now){now=new Date()};var year=now.getFullYear();var month=now.getMonth()+1;var day=now.getDate();var clock=year+con[0];if(month<10){clock+="0"}clock+=month+con[1];if(day<10){clock+="0"}clock+=day+con[2];return(clock)} //获取时间, 格式2020-01-01或2020/01/01或2020年01月01日
var getTimeDetail=function(con){if(!con){con="-"};var now=new Date();var hh=now.getHours();var mm=now.getMinutes();var ss=now.getSeconds();var clock="";if(hh<10){clock+="0"}clock+=hh+":";if(mm<10){clock+="0"}clock+=mm+":";if(ss<10){clock+="0"}clock+=ss;return(clock)} //获取时间, 格式00:00:00
var getWeekTime=function(w){var d=new Date().getDay();if(!w) w='星期';switch(d){case 0:w+='日';break;case 1:w+='一';break;case 2:w+='二';break;case 3:w+='三';break;case 4:w+='四';break;case 5:w+='五';break;case 6:w+='六';break;}return w} //获取星期几
var subkwd=function(k,l){if(k&&k.length>(l-1)) k=k.substr(0,(l-3))+'...';return k} //截断超长字符串并用...代替
var getRandom=function(num){return parseInt(Math.random()*num+1)} //获取整型随机数
var findSrc=function(t){var arr=t.split(' ');for(var n in arr) if(arr[n].indexOf('src')!=-1) return arr[n].split('"')[1]} //匹配src,返回一个
var findImgList=function(text){var pics = text.match(/<img.*?src="(.*?)"\/>/ig),lst=[];for(var p in pics) lst.push(findSrc(pics[p]));return lst} //匹配图片地址,返回src数组
var getRequest=function(){
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
var arrDef=function(a,b){
	var x=[],y=[];
	for(var i in a) if(b.indexOf(a[i])==-1) x.push(a[i]);
	for(var j in b) if(a.indexOf(b[j])==-1) y.push(b[j]);
	return [x,y];
}
var getRaondomData=function(){
	var l=[];
	for (var i=0;i<30;i++) l.push({name: (Math.random()*40+12)+'',value:(Math.random()*40+12)})
	return l;
}