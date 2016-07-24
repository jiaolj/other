$('.content').css('left',parseInt(document.body.clientWidth*0.2));
$('.countdown').css('left',parseInt(document.body.clientWidth*0.2));
$('.text').css('left',parseInt(document.body.clientWidth*0.2));

var uname=$('#uname').val();
if (!uname) location.href='/loginPage/';

var tank1='mytank1';
var tank2='mytank2';
$.cookie('mytank','')
$.cookie('dtank','')

function addTank(){
	$('.content').append('<div class="tank" id="'+tank1+'" user="abc"><div class="gan up"></div><div class="head">3</div></div>');
	$('#'+tank1).css({'top':'460px','left':'660px'});
	
	$('.content').append('<div class="tank" id="'+tank2+'" user="def"><div class="gan down"></div><div class="head">3</div></div>');
	$('#'+tank2).css({'top':'10px','left':'10px'});

	myTank=$.cookie('mytank');
	$('#'+myTank).css('background','gold');	

	getKeyDown();
}

function getStart(){
	countText=$('.countdown').text();
	if (countText&&countText!='Game Over !'){
		ctext=parseInt(countText)-1;
		if (ctext==0){
			$('.countdown').text('');
			clearInterval(getStartTask);
			addTank();
			addTimeTask=setInterval('addTime();',1000);
		}
		else{
			$('.countdown').text(ctext);
		}
	}
}

function getWebSocketId(tp,sendData){
	ws = new WebSocket('ws://10.21.31.138:1234');
	ws.onopen = function(msg){
	//console.log('Connection Success!');
	if (tp==1) ws.send('{"id":"1","uname":"'+uname+'"}');
	else if (tp==5){
		try{
			ws.send(sendData);
		}catch(e){
			return;
		}
	}
	else if (tp==6) ws.send(sendData);
	else if (tp==7) ws.send(sendData);
	};
	ws.onmessage = function(msg){
		data=msg.data;
		jsonData=eval("("+data+")");
		ids=jsonData['id'];
		//console.log(ids);
		if (ids=='1'){
			ulist=jsonData['ulist'];
			numb=jsonData['numb'];
			count=jsonData['count'];
			//console.log(ulist);
			//console.log(numb);
			if (numb==1) dnumb=2;
			else dnumb=1;
			if (!$.cookie('mytank')) $.cookie('mytank','mytank'+numb);
			if (!$.cookie('dtank')) $.cookie('dtank','mytank'+dnumb);
			//console.log($.cookie('dtank'));

			for (i=0;i<ulist.length;i++){
				$('#uname'+(i+1)).text(ulist[i]);
			}

			if (count==2) getStartTask=setInterval('getStart();',1000);
		}
		else if(ids=='5'){
			tankId=jsonData['tankId'];
			bid=jsonData['bid'];
			myTank=$.cookie('mytank');
			//console.log(myTank);
			//console.log(tankId);
			
			if (tankId==tank1) getBtankFly(tankId,1,bid);
			else getBtankFly(tankId,2,bid);

			//alert(tankId);
		}
		else if(ids=='6'){
			tankId=jsonData['tankId'];
			tops=parseInt(jsonData['top']);
			lefts=parseInt(jsonData['left']);
			
			if (tops==-50) fangxiang='up';
			else if (lefts==-50) fangxiang='left';
			else if (lefts==50) fangxiang='right';
			else fangxiang='down';
			//console.log(fangxiang);
			if($('#'+tankId+'>.gan').hasClass(fangxiang)) tankMove(tankId,tops,lefts,1);
			else $('#'+tankId+'>.gan').attr('class','gan '+fangxiang);

		}
		//ws.close();
	};
	ws.onclose = function(msg){
		location.href='/tank/';
	};
}

function tankMove(tankId,top,left,arg){
	if (arg!=2){
		lastTop=parseInt($('#'+tankId).css('top'));
		lastLeft=parseInt($('#'+tankId).css('left'));
		top2=lastTop+top;
		left2=lastLeft+left;
		//newPosition=top2+''+left2;
		if (top2>=10&&top2<=460) $('#'+tankId).animate({ top: '+='+top+'px' },100);
		if (left2>=10&&left2<=660) $('#'+tankId).animate({ left: '+='+left+'px' },100);
		
		$('.star').each(function(index,item){
			starId=$(item).attr('id');
			starTop=parseInt($('#'+starId).css('top'));
			starLeft=parseInt($('#'+starId).css('left'));
			
			defTop=top2-starTop;
			defLeft=left2-starLeft;
			
			//console.log(defTop+','+defLeft);
			if (defTop==-30&&defLeft==-30){
				$('#'+starId).remove();
				tankLeave=parseInt($('#'+tankId+'>.head').text())+1;
				$('#'+tankId+'>.head').text(tankLeave);
			}
			
			
		});
	}
	if (arg!=1){
		sendData='{"id":"6","uname":"'+uname+'","tankId":"'+tankId+'","top":"'+top+'","left":"'+left+'"}';
		getWebSocket(6,sendData);
	}
}


$('.text>.message>a').click(function(){
	location.href='';
	$(this).text('');
})


function tankBulletFlys(){
	$('.bullet').each(function(index,item){
		zdRemove=0;
		dtype=$(item).attr('to');
		bid=$(item).attr('id');
		pid=$(item).attr('pid');
		if (dtype=='up'){
			range=parseInt($('#'+bid).css('top'))-10;
			if (range<0) zdRemove=1;
			else $('#'+bid).css('top',range);
		}
		else if (dtype=='down'){
			range=parseInt($('#'+bid).css('top'))+10;
			if (range>520) zdRemove=1;
			else $('#'+bid).css('top',range);
		}
		else if (dtype=='left'){
			range=parseInt($('#'+bid).css('left'))-10;
			if (range<0) zdRemove=1;
			else $('#'+bid).css('left',range);
		}
		else{
			range=parseInt($('#'+bid).css('left'))+10;
			if (range>720) zdRemove=1;
			else $('#'+bid).css('left',range);
		}

		
	zdtop=parseInt($('#'+bid).css('top'));
	zdleft=parseInt($('#'+bid).css('left'));
	
	if (pid==tank1) dtankId=tank2;
	else dtankId=tank1;
	
	dtop=parseInt($('#'+dtankId).css('top'));
	dleft=parseInt($('#'+dtankId).css('left'));
	
	xtop=zdtop-dtop;
	xleft=zdleft-dleft;
	
	if (xleft==26&&xtop>=10&&xtop<=60&&$('#'+dtankId).text()!='^_^'){

		$('#'+bid).remove();
		
		leave=parseInt($('#'+dtankId+'>.head').text())-1;
		//alert(leave);
		$('#'+dtankId).fadeOut(0).fadeIn(50);
		
		if (dtype=='up'){
			//console.log(dtankid);
			tankMove(dtankId,-50,0,1);
		}
		else if (dtype=='down'){
			tankMove(dtankId,50,0,1);
		}
		else if (dtype=='left'){
			tankMove(dtankId,0,-50,1);
		}
		else{
			tankMove(dtankId,0,50,1);
		}
		
		if (leave==0){
			$('#'+dtankId).text('^_^').fadeOut('1000');
			$('.countdown').text('Game Over !');
			getWebSocket(7,'{"id":"7","uname":"'+uname+'"}');
			$('.text>.message>a').text('重新开始');
			clearInterval(moveMyTankTask);
			clearInterval(addTimeTask);
			clearInterval(rtime);
			$('#myTankTask').val(0);
		}else{
			$('#'+dtankId+'>.head').text(leave);
		}
	}
	
	dtop2=parseInt($('.b'+dtankId).css('top'));
	dleft2=parseInt($('.b'+dtankId).css('left'));
	if (dtop2&&dleft2){
		xtop2=zdtop-dtop2;
		xleft2=zdleft-dleft2;
		console.log(xtop2);
		console.log(xleft2);
		if (xleft2<16&&xtop2<=16&&xleft2>=0&&xtop2>=0){
			$('#'+bid).remove();
			$('.b'+dtankId).remove();
		}
	}

	
	if (zdRemove==1) $('#'+bid).remove();
		
	});
	
}

function getBtankFly(tankId,arg,bid){
	tankTop=parseInt($('#'+tankId).css('top'));
	tankLeft=parseInt($('#'+tankId).css('left'));
	if($('#'+tankId+'>.gan').hasClass('up')){
		mbtype="up";
		tankTop-=16;
		tankLeft+=26;
	}else if($('#'+tankId+'>.gan').hasClass('down')){
		mbtype="down";
		tankTop+=60;
		tankLeft+=26;
	}else if($('#'+tankId+'>.gan').hasClass('left')){
		mbtype="left";
		tankTop+=23;
		tankLeft-=14;
	}else{
		mbtype="right";
		tankTop+=23;
		tankLeft+=66;
	}
	$('#'+tankId).after('<div class="bullet b'+tankId+'" id="'+bid+'" pid="'+tankId+'" to="'+mbtype+'" style="top:'+tankTop+'px;left:'+tankLeft+'px;"></div>');
}

function keyDownOnce(keyCode){
	myTank=$.cookie('mytank');
	if(keyCode == 13){ //回车键
		countText=$('.countdown').text();
		if (countText!='Game Over !'){
			if ($('.b'+myTank).length<1){
				sendData='{"id":"5","uname":"'+uname+'","tankId":"'+myTank+'","bid":""}';
				getWebSocket(5,sendData);
			}
		}
	}
	else if(keyCode==37){ // 方向键左
		if (parseInt($('#myTankTask').val())>1){
			if($('#'+myTank+'>.gan').hasClass('left')){
				tankMove(myTank,0,-50);
				$('#myTankTask').val('0');
			}else{
				$('#'+myTank+'>.gan').attr('class','gan left');
				tankMove(myTank,0,-50,2);
			}
		}
	}
	else if(keyCode==38){ // 方向键上
		if (parseInt($('#myTankTask').val())>1){
			if($('#'+myTank+'>.gan').hasClass('up')){
				tankMove(myTank,-50,0);
				$('#myTankTask').val('0');
			}else{
				$('#'+myTank+'>.gan').attr('class','gan up');
				tankMove(myTank,-50,0,2);
			}
		}
	}
	else if(keyCode==39){ // 方向键右
		if (parseInt($('#myTankTask').val())>1){
			if($('#'+myTank+'>.gan').hasClass('right')){
				tankMove(myTank,0,50);
				$('#myTankTask').val('0');
			}else{
				$('#'+myTank+'>.gan').attr('class','gan right');
				tankMove(myTank,0,50,2);
			}
		}
	}
	else if(keyCode==40){ // 方向键下
		if (parseInt($('#myTankTask').val())>1){
			if($('#'+myTank+'>.gan').hasClass('down')){
				tankMove(myTank,50,0);
				$('#myTankTask').val('0');
			}else{
				$('#'+myTank+'>.gan').attr('class','gan down');
				tankMove(myTank,50,0,2);
			}
		}
	}
}

function moveMyTank(){
	values=parseInt($('#myTankTask').val())+1;
	$('#myTankTask').val(values);
}

//刷星星
var starNum=0;
function addTime(){
	timeText=$('#ntime').text();
	timeNumb=time_to_numb(timeText)+1;
	if (timeNumb%6==0){
		starNum+=1;
		starId='start'+starNum;
		$('.content').append('<div class="star heart" id="'+starId+'"></div>');
		ranNum1=parseInt(Math.random()*14)+1;
		ranNum2=parseInt(Math.random()*10)+1;
		ranX=ranNum1*50-10;
		ranY=ranNum2*50-10;
		console.log(ranX+','+ranY);
		$('#'+starId).css({'top':ranY+'px','left':ranX+'px'});
	}
	tmdata=numb_to_time(timeNumb);
	$('#ntime').text(tmdata);
}

function getWebSocket(){
	initWebSocket('ws://10.21.31.138:1001');
}
function getWebSocketRecv(data){
		console.log(data);
		jsonData=eval("("+data+")");
		ids=jsonData['id'];
		if (ids=='1'){
			ulist=jsonData['ulist'];
			numb=jsonData['numb'];
			count=jsonData['count'];
			if (numb==1) dnumb=2;
			else dnumb=1;
			if (!$.cookie('mytank')) $.cookie('mytank','mytank'+numb);
			if (!$.cookie('dtank')) $.cookie('dtank','mytank'+dnumb);

			for (i=0;i<ulist.length;i++){
				$('#uname'+(i+1)).text(ulist[i]);
			}

			if (count==2) getStartTask=setInterval('getStart();',1000);
		}
		else if(ids=='5'){
			tankId=jsonData['tankId'];
			bid=jsonData['bid'];
			myTank=$.cookie('mytank');
			
			if (tankId==tank1) getBtankFly(tankId,1,bid);
			else getBtankFly(tankId,2,bid);
		}
		else if(ids=='6'){
			tankId=jsonData['tankId'];
			tops=parseInt(jsonData['top']);
			lefts=parseInt(jsonData['left']);
			
			if (tops==-50) fangxiang='up';
			else if (lefts==-50) fangxiang='left';
			else if (lefts==50) fangxiang='right';
			else fangxiang='down';

			if($('#'+tankId+'>.gan').hasClass(fangxiang)) tankMove(tankId,tops,lefts,1);
			else $('#'+tankId+'>.gan').attr('class','gan '+fangxiang);

		}
}
function getWebSocketClose(){
	//console.log('close');
}
function getWebSocketOpen(){
	//console.log('open');
	sendSocketData('{"id":"1","uname":"'+uname+'"}');
}

getWebSocket();
rtime=setInterval('tankBulletFlys();',30);
moveMyTankTask=setInterval('moveMyTank();',120);