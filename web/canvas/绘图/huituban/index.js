//屏蔽右键菜单
/*if (window.Event) 
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
var myc=document.getElementById('myCanvas');
var cxt=myc.getContext("2d");
cxt.beginPath();
//文字
myc.getword=function(font,word,x,y){
	cxt.font =font;  
	cxt.fillText(word,x,y);  
}
//多边形
myc.getdbx=function(pointlist){
	x=pointlist[0][0];
	y=pointlist[0][1];
	cxt.moveTo(x,y);
	for (i=0;i<pointlist.length;i++){
		point=pointlist[i];
		cxt.lineTo(point[0],point[1]);
	}
	cxt.lineTo(x,y);
	cxt.stroke();
}
//圆形
myc.getyuan=function(bgcolor,x,y,size){
cxt.beginPath();
cxt.fillStyle=bgcolor;
cxt.arc(x,y,size,0,Math.PI*2,true);
cxt.fill();
}
//矩形(根据直线连接而成)
myc.getzfx=function(x,y,bian){
cxt.moveTo(x,y);
cxt.lineTo(x+bian,y);
cxt.lineTo(x+bian,y+bian);
cxt.lineTo(x,y+bian);
cxt.lineTo(x,y);
cxt.stroke();
}
//矩形
myc.juxing=function(){
cxt.beginPath();
cxt.rect(left, top,width, height);
cxt.stroke();
}
//圆弧
myc.yuanhu=function(x,y,x1,y1,x2,y2,radius,style){
cxt.beginPath();
cxt.moveTo(x,y);
if (style)
	cxt.strokeStyle=style;
else
	cxt.strokeStyle='#000000';
cxt.arcTo(x1,y1,x2,y2,radius);
cxt.stroke();
}
//绘图板
/*
listall=''
function righthit(e){
	leftpx=myc.offsetLeft;
	toppx=myc.offsetTop;
	x=e.clientX-leftpx;
	y=e.clientY-toppx;
	//鼠标左键
	if (e.button==0){
		if (!listall){
			cxt.moveTo(x,y);
			document.getElementById('showtu').style.display='block';
			listall+='cxt.moveTo('+x+','+y+');'
		}else{
			cxt.lineTo(x,y)
			listall+='cxt.lineTo('+x+','+y+');'
		}
		document.getElementById('pointlist').innerHTML=listall;
		cxt.stroke();
	}
	//鼠标右键
    else if (e.button==2){
		cxt.moveTo(x,y);
		listall+='cxt.moveTo('+x+','+y+');'
	}
}*/
//js绘图板的生成的代码放进去看效果
function testtuxing(){
}
testtuxing()
//myc调用方法
//myc.getword('35px Times New Roman','HelloCanvas!',100,100);
//myc.getdbx([[46,131],[18,175],[61,203],[89,180],[84,151],[47,133]]);
//myc.getzfx(20,10,50);
//myc.getyuan('#f5f5f5',110,68,27);
//myc.yuanhu(50,50,100,100, 200, 50, 100,"#ccc");