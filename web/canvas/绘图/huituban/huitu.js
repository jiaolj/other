var myc=document.getElementById('myCanvas');
var cxt=myc.getContext("2d");
var isline=$('#isline');
var isrect=$('#isrect');
var isarc=$('#isarc');
var isword=$('#isword');
listall=''
function closeall(){
isline.text('关');
isrect.text('关');
isarc.text('关');
isword.text('关');
listall=''
}
$(function(){
	//直线
	isline.click(function(){
		text=isline.text();
		if (text=='关'){
			closeall();
			isline.text('开');
			$('#tishi').text('提示：请选择起点');
			myc.onmousedown=function(){
				righthit(event);
			}
		}
		else{
			isline.text('关');
			$('#tishi').text('');
			myc.onmousedown=function(){}
		}
	})
	//矩形
	isrect.click(function(){
		text=isrect.text();
		if (text=='关'){
			closeall();
			isrect.text('开');
			$('#tishi').text('提示：请确定起点');
			myc.onmousedown=function(){
				getrect(event);
			}
		}
		else{
			isrect.text('关');
			$('#tishi').text('');
			myc.onmousedown=function(){}
		}
	})
	//圆形
	isarc.click(function(){
		text=isarc.text();
		if (text=='关'){
			closeall();
			isarc.text('开');
			$('#tishi').text('提示：请确定圆心');
			myc.onmousedown=function(){
				getarc(event);
			}
		}
		else{
			isarc.text('关');
			$('#tishi').text('');
			myc.onmousedown=function(){}
		}
	})
	//文字
	isword.click(function(){
		text=isword.text();
		if (text=='关'){
			closeall();
			isword.text('开');
			$('#tishi').text('提示：请确定文字位置');
			myc.onmousedown=function(){
				getword(event);
			}
		}
		else{
			isword.text('关');
			$('#tishi').text('');
			myc.onmousedown=function(){}
		}
	})
})
function rectinit(){
	initpoint=[]
	listpointx=[]
	listpointy=[]
	width=''
	x1=''
	y1=''
}
rectinit();
function fillin(){
	if(document.getElementById("xiantiao").checked){
		cxt.strokeStyle=$('#nowColor').val();
		cxt.stroke();
	}
	else{
		cxt.fillStyle=$('#nowColor').val();
		cxt.fill();
	}
}
//文字
function getword(e){
	x=e.clientX-myc.offsetLeft;
	y=e.clientY-myc.offsetTop;
	var word=prompt('请输入字符');
	if (word){
		cxt.font ='35px Times New Roman';  
		cxt.fillText(word,x,y);
	}
}
//圆形
function getarc(e){
	x=e.clientX-myc.offsetLeft;
	y=e.clientY-myc.offsetTop;
	listpointx.push(x);
	if (listpointx.length==1){
			x1=x;
			y1=y;
			cxt.moveTo(x,y);
			$('#tishi').text('提示：请确定半径');
		}else if (listpointx.length==2){
			width=listpointx[1]-listpointx[0];
			listpointx=[];
			cxt.beginPath();
			cxt.arc(x1,y1,width,0,Math.PI*2,true);	//确定图形
			//cxt.strokeStyle='#000000';	//选择边框线颜色
			fillin();
			//cxt.stroke();	//画边框线
			//cxt.fillStyle='#ccc';	//选择填充颜色
			//cxt.fill();	//填充
			$('#tishi').text('完成');
		}
}
//矩形
function getrect(e){
	x=e.clientX-myc.offsetLeft;
	y=e.clientY-myc.offsetTop;
	listpointx.push(x);
	listpointy.push(y);
	if (listpointy.length==3){
		//cxt.lineTo(x,y);
		//cxt.stroke();
		height=listpointy[2]-listpointy[1];
		cxt.beginPath();
		cxt.rect(x1,y1,width,height);
		fillin();
		rectinit();
		$('#tishi').text('完成');
	}else if (listpointx.length==1){
		x1=x;
		y1=y;
		cxt.moveTo(x,y);
		$('#tishi').text('提示：请先确定一条横线');
	}else if (listpointx.length==2){
		//cxt.lineTo(x,y);
		//cxt.stroke();
		width=listpointx[1]-listpointx[0];
		listpointx=[];
		$('#tishi').text('提示：请先再确定一条竖线');
	}
}
listpoint=[]
//直线
function righthit(e){
	x=e.clientX-myc.offsetLeft;
	y=e.clientY-myc.offsetTop;
	//鼠标左键
	if (e.button==0){
		if (listall==''){
			//标记圆点
			cxt.beginPath();
			cxt.moveTo(x,y);
			listpoint.push(x+','+y);
			cxt.arc(x,y,1,0,Math.PI*2,true);
			cxt.fill();
			//开始直线
			cxt.beginPath();
			cxt.moveTo(x,y);
			document.getElementById('showtu').style.display='block';
			listall+='cxt.moveTo('+x+','+y+');'
			$('#tishi').text('提示：请开始连线');
		}else{
			cxt.lineTo(x,y);
			//cxt.stroke();
			fillin()
			//listall+='cxt.lineTo('+x+','+y+');'
		}
		document.getElementById('pointlist').innerHTML=listall;
	}
	//鼠标右键
    else if (e.button==2){
		cxt.moveTo(x,y);
		listall+='cxt.moveTo('+x+','+y+');'
	}
}
//鼠标在画板移动获得点的坐标
function getpoint(e){
	leftpx=myc.offsetLeft;
	toppx=myc.offsetTop;
	x=e.clientX-leftpx;
	y=e.clientY-toppx;
	text=x+','+y
	if (text==listpoint[0])
		$('#ponits').html('坐标:<span style="color:red">'+text+'</span>');
	else
		$('#ponits').text('坐标:'+text);
}
function clear_point(){
$('#ponits').text('');
}
/*
if (window.Event) 
    document.captureEvents(Event.MOUSEUP); 
    function nocontextmenu(){ 
     event.cancelBubble = true 
     event.returnValue = false; 
     return false; 
    } 
    function norightclick(e){ 
     if (window.Event){ 
      if (e.which == 2 || e.which == 3) 
      return false; 
     } 
     else 
      if (event.button == 2 || event.button == 3){ 
       event.cancelBubble = true 
       event.returnValue = false; 
       return false; 
      } 
    } 
    document.oncontextmenu = nocontextmenu; // for IE5+ 
    document.onmousedown = norightclick; // for all others
*/