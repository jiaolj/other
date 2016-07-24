//公共函数
var log=function(d){console.log(d)};
//鼠标在画板移动获得点的坐标
function getpoint(e,id){
	myc=document.getElementById(id);
	leftpx=myc.offsetLeft;
	toppx=myc.offsetTop;
	x=e.clientX-leftpx;
	y=e.clientY-toppx;
	text=x+','+y
	log(text);
}
//刷新
function reFresh(){
	location.href='';
}
//光标位置
function getFocus(id){
	document.getElementById(id).focus();
}
//1位数字转为2位
function toDouble(numb){
	numb=numb+'';
	if (numb.length==1) numb='0'+numb;
	return numb;
}
//数字转为00:00:00格式
function numb_to_time(numb){
	if (numb>3600){
		hour=parseInt(numb/3600);
		min=parseInt((numb-hour*3600)/60);
		sec=numb-hour*3600-min*60;
	}
	else if (numb>60){
		hour=0;
		min=parseInt(numb/60);
		sec=numb%60;
	}else{
		hour=0;
		min=0;
		sec=numb;
	}
	text=toDouble(hour)+':'+toDouble(min)+':'+toDouble(sec);
	return text;
}
//00:00:00格式转为数字
function time_to_numb(tmdata){
	tmdataList=tmdata.split(':');
	hour=parseInt(tmdataList[0])*3600;
	min=parseInt(tmdataList[1])*60;
	sec=parseInt(tmdataList[2]);
	numbd=hour+min+sec;
	return numbd;
}
//实现按一下只执行一次
function getKeyDown(){
    var preventCode = [13, 32, 37, 38, 39, 40]; // 要只执行一次事件的按键的键值，此处屏蔽的按键依次是：enter、空格、左、上、右、下
    var isRunning   = [];  // 不用管
    document.onkeydown = keyDown;
    document.onkeyup   = keyUp;
    function keyDown(event){
        event = event || window.event;
        var keycode = event.which || event.keyCode;
        if(preventCode.in_array(keycode)>=0){
            if(typeof isRunning[keycode] == "undefined" || isRunning[keycode]==false){
                isRunning[keycode] = true;
                // 只执行一次的事件
				//console.log(keycode);
				keyDownOnce(keycode);
            }
        }else{
            // 连续执行的事件
        }
    }
    function keyUp(event){
        event = event || window.event;
        var keycode = event.which || event.keyCode;
        if(preventCode.in_array(keycode)>=0){
            isRunning[keycode] = false;
        }
    }
    // 检测数组中是否有某值
    Array.prototype.in_array = function(c){
        for(i=0;i<this.length && this[i]!=c;i++);
        return (i==this.length) ? -1 : i;
    }
};