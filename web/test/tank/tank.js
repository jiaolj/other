//子弹数量
var bnumb=0;
//当前存在的敌坦克ID集合
var dtankList=[];
//刷新第几辆敌坦克
var dnumb=0;
//坦克位置，碰撞体积
//var positionList=['460460'];
//敌坦克总数
var allDtankNum=4;
//敌坦克ID集合
var allDtanks=[];
for (i=1;i<allDtankNum+1;i++){
	allDtanks.push('dtank'+i);
}
//console.log(allDtanks);

function tankMove(tankId,top,left){
	lastTop=parseInt($('#'+tankId).css('top'));
	lastLeft=parseInt($('#'+tankId).css('left'));
	top2=lastTop+top;
	left2=lastLeft+left;
	newPosition=top2+''+left2;
	newIndex=-1;
	$('.tank').each(function(index,item){
		ntankid=$(item).attr('id');
		//console.log(ntankid);
		if (ntankid!=tankId){
			nposition=parseInt($('#'+ntankid).css('top'))+''+parseInt($('#'+ntankid).css('left'));
			if (newPosition==nposition){
				newIndex=1;
			}
		}
	});
	if (newIndex==-1){
		//if (top2>=10&&top2<=460) $('#'+tankId).css('top',top2);
		if (top2>=10&&top2<=460) $('#'+tankId).animate({ top: '+='+top+'px' },100);
		//if (left2>=10&&left2<=460) $('#'+tankId).css('left',left2);
		if (left2>=10&&left2<=460) $('#'+tankId).animate({ left: '+='+left+'px' },100);
	}
}
function tankTtwinkle(tankId){
	$('#'+tankId).css('background','#fff');
	//$('#'+dtankId).css('background','#f5f5f5');
}

function bulletFly(bid,dtype){
	zdRemove=0;
	if (dtype=='up'){
		range=parseInt($('#'+bid).css('top'))-10;
		//console.log(range);
		if (range<0) zdRemove=1;
		else $('#'+bid).css('top',range);
	}
	else if (dtype=='down'){
		range=parseInt($('#'+bid).css('top'))+10;
		if (range>600) zdRemove=1;
		else $('#'+bid).css('top',range);
	}
	else if (dtype=='left'){
		range=parseInt($('#'+bid).css('left'))-10;
		if (range<0) zdRemove=1;
		else $('#'+bid).css('left',range);
	}
	else{
		range=parseInt($('#'+bid).css('left'))+10;
		if (range>600) zdRemove=1;
		else $('#'+bid).css('left',range);
	}

	zdtop=parseInt($('#'+bid).css('top'));
	zdleft=parseInt($('#'+bid).css('left'));


	$('.otank').each(function(index,item){
		//console.log(index);
		dtankId=$(item).attr('id');
		if ($('#'+dtankId).length>0&&$(item).text()!='^_^'){
			dtop=parseInt($('#'+dtankId).css('top'));
			dleft=parseInt($('#'+dtankId).css('left'));
			
			xtop=zdtop-dtop;
			xleft=zdleft-dleft;
			
			if (xleft==26&&xtop>=10&&xtop<=60){
				zdRemove=1;
				leave=parseInt($('#'+dtankId+'>.head').text())-1;
				//$('#'+dtankId).css('background','#fff');
				$('#'+dtankId).fadeOut(0).fadeIn(50);
				
				if (dtype=='up'){
					console.log(dtankid);
					tankMove(dtankid,-50,0);
				}
				else if (dtype=='down'){
					tankMove(dtankid,50,0);
				}
				else if (dtype=='left'){
					tankMove(dtankid,0,-50);
				}
				else{
					tankMove(dtankid,0,50);
				}
				
				//setTimeout("tankTtwinkle("+dtankId+")",500)
				if (leave==0){
					$('#'+dtankId).text('^_^').fadeOut('1000');
				}else{
					$('#'+dtankId+'>.head').text(leave);
				}
			}
		}
	});

	$('.dbullet').each(function(index,item){
		bdId=$(item).attr('id');
		pId=$(item).attr('pid');
		dtop=parseInt($('#'+bdId).css('top'));
		dleft=parseInt($('#'+bdId).css('left'));
		xtop=zdtop-dtop;
		xleft=zdleft-dleft;

		if (xleft<16&&xtop<=16&&xleft>=0&&xtop>=0){
			//console.log(xtop);
			//console.log(xleft);
			
			clearInterval(rtime);
			$('#'+bid).remove();
			$('#'+bdId).remove();
			clearDbullet(bid,pId,1);
		}
	});

	if (zdRemove==1){
		clearInterval(rtime);
		$('#'+bid).remove();
	}

}

function clearDbullet(bid,parent_id,zdRemove){
	if (zdRemove==1){
		if (parent_id==allDtanks[0]) clearInterval(bftime1);
		else if (parent_id==allDtanks[1]) clearInterval(bftime2);
		else if (parent_id==allDtanks[2]) clearInterval(bftime3);
		else if (parent_id==allDtanks[3]) clearInterval(bftime4);
		else if (parent_id==allDtanks[4]) clearInterval(bftime5);
		else if (parent_id==allDtanks[5]) clearInterval(bftime6);
		$('#'+bid).remove();
	}
}

function tankBulletFly(bid,dtype,parent_id){
	zdRemove=0;
	//console.log(bid);
	//console.log(dtype);
	if (dtype=='up'){
		range=parseInt($('#'+bid).css('top'))-10;
		//console.log(range);
		if (range<0) zdRemove=1;
		else $('#'+bid).css('top',range);
	}else if (dtype=='down'){
		range=parseInt($('#'+bid).css('top'))+10;
		//console.log(range);
		if (range>600) zdRemove=1;
		else $('#'+bid).css('top',range);
	}else if (dtype=='left'){
		range=parseInt($('#'+bid).css('left'))-10;
		if (range<0) zdRemove=1;
		else $('#'+bid).css('left',range);
	}else{
		range=parseInt($('#'+bid).css('left'))+10;
		if (range>600) zdRemove=1;
		else $('#'+bid).css('left',range);
	}
	
	myTankId='mytank1';
	zdtop=parseInt($('#'+bid).css('top'));
	zdleft=parseInt($('#'+bid).css('left'));
	dtop=parseInt($('#'+myTankId).css('top'));
	dleft=parseInt($('#'+myTankId).css('left'));
	
	xtop=zdtop-dtop;
	xleft=zdleft-dleft;
	
	if (xleft==26&&xtop>=10&&xtop<=60&&$('#'+myTankId).text()!='^_^'){
		zdRemove=1;
		leave=parseInt($('#'+myTankId+'>.head').text())-1;
		$('#'+myTankId).fadeOut(0).fadeIn(50);
		//tankMove(dtankid,x,y);
		if (leave==0){
			$('#'+myTankId).text('^_^').hide('2000');
		}else{
			$('#'+myTankId+'>.head').text(leave);
		}
	}
	
	clearDbullet(bid,parent_id,zdRemove);

}

function moveMyTank(){
	values=parseInt($('#myTankTask').val())+1;
	$('#myTankTask').val(values);
	//alert(1);
}
function sleep(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
	now = new Date();
	if (now.getTime() > exitTime)
	return;
	}
}

function keyDownOnce(keyCode){
	if(keyCode == 13){ //回车键
		if ($('.mytankb').length<1){
			tankTop=parseInt($('#mytank1').css('top'));
			tankLeft=parseInt($('#mytank1').css('left'));
			if($('#mytank1>.gan').hasClass('up')){
				mbtype="up";
				tankTop-=16;
				tankLeft+=26;
			}else if($('#mytank1>.gan').hasClass('down')){
				mbtype="down";
				tankTop+=60;
				tankLeft+=26;
			}else if($('#mytank1>.gan').hasClass('left')){
				mbtype="left";
				tankTop+=23;
				tankLeft-=14;
			}else{
				mbtype="right";
				tankTop+=23;
				tankLeft+=66;
			}
			bnumb+=1;
			bid='mb'+bnumb;
			$('#mytank1').after('<div class="bullet mytankb" id="'+bid+'" style="top:'+tankTop+'px;left:'+tankLeft+'px;"></div>');
			rtime=setInterval('bulletFly(bid,mbtype);',30);
		}
	}
	else if(keyCode==37){ // 方向键左
		$('#mytank1>.gan').attr('class','gan left');
		if (parseInt($('#myTankTask').val())>3){
			tankMove('mytank1',0,-50);
			$('#myTankTask').val('0');
		}
		//else{
		//	sleep(120);
		//	tankMove('mytank1',0,-50);
		//}
	}
	else if(keyCode==38){ // 方向键上
		$('#mytank1>.gan').attr('class','gan up');
		//tankMove('mytank1',-50,0);
		if (parseInt($('#myTankTask').val())>1){
			tankMove('mytank1',-50,0);
			$('#myTankTask').val('0');
		}
		//sleep(100);
		//tankMove('mytank1',-50,0);
	}
	else if(keyCode==39){ // 方向键右
		$('#mytank1>.gan').attr('class','gan right');
		if (parseInt($('#myTankTask').val())>1){
			tankMove('mytank1',0,50);
			$('#myTankTask').val('0');
		}
		//sleep(100);
		//tankMove('mytank1',0,50);
	}
	else if(keyCode==40){ // 方向键下
		$('#mytank1>.gan').attr('class','gan down');
		if (parseInt($('#myTankTask').val())>1){
			tankMove('mytank1',50,0);
			$('#myTankTask').val('0');
		}
		//else{
		//sleep(100);
		//tankMove('mytank1',50,0);
		//}
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
	
	moveMyTankTask=setInterval('moveMyTank();',120);
};
function toDouble(numb){
	numb=numb+'';
	if (numb.length==1) numb='0'+numb;
	return numb;
}
function numb_to_time(numb){
	
	if (numb>3600){
		hour=parseInt(numb/3600);
		min=numb%3600;
		sec=min%60;
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
function time_to_numb(tmdata){
	tmdataList=tmdata.split(':');
	hour=parseInt(tmdataList[0])*3600;
	min=parseInt(tmdataList[1])*60;
	sec=parseInt(tmdataList[2]);
	numbd=hour+min+sec;
	return numbd;
}
function dtankRun(dtankid){
	numb=parseInt(4*Math.random());
	if (numb==0){
		dtype='left';
		x=0;
		y=-50;
	}else if (numb==1){
		dtype='up';
		x=-50;
		y=0;
	}else if (numb==2){
		dtype='right';
		x=0;
		y=50;
	}else{
		dtype='down';
		x=50;
		y=0;
	}
	$('#'+dtankid+'>.gan').attr('class','gan '+dtype);
	tankMove(dtankid,x,y);
}

function dtankrunall(addBullet){
	$.each(dtankList,function(n,value){
		if ($('#'+value).css('display')=='none') $('#'+value).remove();
		else dtankRun(value,addBullet);
	});
}

function dtankBulletAll(){
	$.each(dtankList,function(n,dtankid){

		if ($('.bf'+dtankid).length<1){

			tankTop=parseInt($('#'+dtankid).css('top'));
			tankLeft=parseInt($('#'+dtankid).css('left'));
			if($('#'+dtankid+'>.gan').hasClass('up')){
				dtypes="up";
				tankTop-=16;
				tankLeft+=26;
			}else if($('#'+dtankid+'>.gan').hasClass('down')){
				dtypes="down";
				tankTop+=60;
				tankLeft+=26;
			}else if($('#'+dtankid+'>.gan').hasClass('left')){
				dtypes="left";
				tankTop+=23;
				tankLeft-=14;
			}else{
				dtypes="right";
				tankTop+=23;
				tankLeft+=66;
			}

			bnumb+=1;
			did='d'+bnumb;
			$('#'+dtankid).after('<div class="bullet dbullet bf'+dtankid+'" id="'+did+'" pid="'+dtankid+'" style="top:'+tankTop+'px;left:'+tankLeft+'px;"></div>');
			
			if (dtankid==allDtanks[0]){
				did1=did;
				dtypes1=dtypes;
				parent_id1=dtankid;
				bftime1=setInterval('tankBulletFly(did1,dtypes1,parent_id1);',60);	
			}else if (dtankid==allDtanks[1]){
				did2=did;
				dtypes2=dtypes;
				parent_id2=dtankid;
				bftime2=setInterval('tankBulletFly(did2,dtypes2,parent_id2);',50);					
			}else if (dtankid==allDtanks[2]){
				did3=did;
				dtypes3=dtypes;
				parent_id3=dtankid;
				bftime3=setInterval('tankBulletFly(did3,dtypes3,parent_id3);',40);					
			}else if (dtankid==allDtanks[3]){
				did4=did;
				dtypes4=dtypes;
				parent_id4=dtankid;
				bftime4=setInterval('tankBulletFly(did4,dtypes4,parent_id4);',30);					
			}else if (dtankid==allDtanks[4]){
				did5=did;
				dtypes5=dtypes;
				parent_id5=dtankid;
				bftime5=setInterval('tankBulletFly(did5,dtypes5,parent_id5);',20);					
			}else if (dtankid==allDtanks[5]){
				did6=did;
				dtypes6=dtypes;
				parent_id6=dtankid;
				bftime6=setInterval('tankBulletFly(did6,dtypes6,parent_id6);',10);					
			}
		}

	});
}


function addDtank(){
	timeText=$('#ntime').text();
	//console.log(timeText);
	ctext=parseInt($('.countdown').text())-1;
	if (ctext>0) $('.countdown').text(ctext);
	else $('.countdown').text('');
	timeNumb=time_to_numb(timeText)+1;
	if (timeNumb==2){
		dnumb+=1;
		dtankid='dtank'+dnumb;
		dtankList.push(dtankid);
		$('.content').append('<div class="tank otank" id="'+dtankid+'"><div class="gan down"></div><div class="head">3</div></div>');
		$('#'+dtankid).css({'top':'10px','left':'10px'});
		//positionList.push('1010');
	}else if (timeNumb==3){
		getKeyDown();
	}
	else if (timeNumb==4){
		dnumb+=1;
		dtankid='dtank'+dnumb;
		dtankList.push(dtankid);
		$('.content').append('<div class="tank otank" id="'+dtankid+'"><div class="gan down"></div><div class="head">4</div></div>');
		$('#'+dtankid).css({'top':'10px','left':'160px'});
		//positionList.push('10160');
	}else if (timeNumb==6){
		dnumb+=1;
		dtankid='dtank'+dnumb;
		dtankList.push(dtankid);
		$('.content').append('<div class="tank otank" id="'+dtankid+'"><div class="gan down"></div><div class="head">5</div></div>');
		$('#'+dtankid).css({'top':'10px','left':'310px'});
		//positionList.push('10310');
	}else if (timeNumb==8){
		dnumb+=1;
		dtankid='dtank'+dnumb;
		dtankList.push(dtankid);
		$('.content').append('<div class="tank otank" id="'+dtankid+'"><div class="gan down"></div><div class="head">6</div></div>');
		$('#'+dtankid).css({'top':'10px','left':'460px'});
		//positionList.push('10460');
	}else if (timeNumb>8){
		if ($('.otank').length==0){
			$('.countdown').text('^_^ Success !');
			clearAll();
		}
		if ($('#mytank1').css('display')=='none') $('.countdown').text('-_- Fail !');
	}
	
	if (timeNumb%3==0){
		//dtankBullet('dtank1');
		//dtankBullet('dtank2');
		//dtankBullet('dtank3');
		dtankBulletAll();
	}
	if (timeNumb%2==0) dtankrunall();

	//console.log(timeNumb);
	tmdata=numb_to_time(timeNumb);
	//console.log(tmdata);
	$('#ntime').text(tmdata);
}

function clearAll(){
	$('#ntime').text('00:00:00');
	$('.otank').remove();
	clearInterval(addDtankTask);
	//clearInterval(dTankRunTask);
	dnumb=0;
	$('#mytank1').css({'top':'460px','left':'460px'});
}

$('.text>.mid>div').click(function(){
	if ($(this).text()=='Stop'){
		location.href='';
		//clearAll();
		//$(this).text('开始');
		//$('.countdown').text('3');
	}
	else{
		addDtankTask=setInterval('addDtank();',1000);
		//dTankRunTask=setInterval('dtankrunall();',2000);
		$(this).text('Stop');
	}
})

//var arr = [1,2,3];
//console.log(arr.indexOf(2));    // 返回0
//console.log(arr.indexOf(5));    // 返回-1