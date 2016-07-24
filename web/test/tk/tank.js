//全局变量
var cnt=$('.main');
var w=cnt[0].offsetWidth;
var h=cnt[0].offsetHeight;
var myTk='myTank1';
//坦克参数
var tankNum=0;
var lft=w*0.005;
var tp=h*0.005;
var tkw=w*0.055;
var tkh=h*0.089;
var bltNum=0;
//绘图函数
//添加坦克
var addtank=function(x,y){
	tankNum++;
	cnt.append('<div class="tank" style="left:'+x+'px;top:'+y+'px"><div class="head"></div><div class="gan down"></div><div>');
}
//初始化绘图
for (var i=0;i<18;i++){
	addtank(lft,tp);
	lft+=w*0.055;
}
//坦克移动
function tankMove(tankId,top,left){
	//lastTop=parseInt($('#'+tankId).css('top'));
	//lastLeft=parseInt($('#'+tankId).css('left'));
	//newTop=lastTop+top;
	//newLeft=lastLeft+left;
	//newPosition=newTop+''+newLeft;
	//if (newTop>=10&&newTop<=460) $('#'+tankId).animate({ top: '+='+top+'px' },100);
	//if (newLeft>=10&&newLeft<=460) $('#'+tankId).animate({ left: '+='+left+'px' },100);
	$('#'+tankId).animate({ top: '+='+top+'px' },100);
	$('#'+tankId).animate({ left: '+='+left+'px' },100);
}
//子弹飞
var bltSpeed=0;
function tankBulletFlys(){
	bltSpeed++;
	if (bltSpeed%3==0){
		$('.bullet').each(function(index,item){
			var fx=$(item).attr('fx');
			if (fx=='up'){
				var range=parseInt($(item).css('top'))-10;
				if (range<0) $(item).remove();
				$(item).css('top',range);
			}
			else if (fx=='down'){
				var range=parseInt($(item).css('top'))+10;
				if (range>h) $(item).remove();
				$(item).css('top',range);
			}
			else if (fx=='left'){
				var range=parseInt($(item).css('left'))-10;
				if (range<0) $(item).remove();
				$(item).css('left',range);
			}
			else{
				var range=parseInt($(item).css('left'))+10;
				if (range>w) $(item).remove();
				$(item).css('left',range);
			}
		});
	}
	
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
//操作
var keyStr={37:{'txt':'left','move':[0,tkw*-1],'cp':[tkh*0.47,tkw*-0.35]},38:{'txt':'up','move':[tkh*-1,0],'cp':[tkh*-0.4,tkw*0.435]},39:{'txt':'right','move':[0,tkw],'cp':[tkh*0.455,tkw*1.2]},40:{'txt':'down','move':[tkh,0],'cp':[tkh*1.3,tkw*0.435]}};
function keyDownOnce(keyCode){
	var fx=myObj.attr('fx');
	var kcode=parseInt(myObj.attr('kcode'));
	if(keyCode == 13){ //回车键
		bltNum++;
		var bltid='blt'+bltNum;
		var cp=keyStr[kcode]['cp'];
		var top=parseInt(myObj.css('top'))+cp[0];
		var left=parseInt(myObj.css('left'))+cp[1];
		myObj.after('<div class="bullet" fx="'+fx+'" id="'+bltid+'" style="width:'+w*0.005+';height:'+w*0.005+';border-radius:'+w*0.005+'px;top:'+top+';left:'+left+'"></div>');
	}
	else{
		var txt=keyStr[keyCode]['txt'];
		if (fx!=txt){
			myObj.attr({'kcode':keyCode,'fx':txt});
			myGanObj.removeClass(fx).addClass(txt);
			if (keyCode==37||keyCode==39){
				$('.lvleft').removeClass('lvleft').removeClass('cross').addClass('lvtop').addClass('perpend');
				$('.lvright').removeClass('lvright').removeClass('cross').addClass('lvdown').addClass('perpend');
			}
			else{
				$('.lvtop').removeClass('lvtop').removeClass('perpend').addClass('lvleft').addClass('cross');
				$('.lvdown').removeClass('lvdown').removeClass('perpend').addClass('lvright').addClass('cross');
			}
			return;
		}
		var move=keyStr[keyCode]['move'];
		tankMove(myTk,move[0],move[1]);
	}
}

//初始化个人信息
cnt.append('<div class="tank" id="myTank1" kcode="38" fx="up" style="left:0.5%;top:89.85%"> <ul class="lvleft cross"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul><ul class="lvright cross"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul> <div class="head"></div><div class="gan up"></div><div>');
var myObj=$('#'+myTk);
var myHeadObj=$('#'+myTk+'>.head');
var myGanObj=$('#'+myTk+'>.gan');
getKeyDown();
//子弹运行函数
var tfly=setInterval('tankBulletFlys();',1);