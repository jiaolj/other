var ptx=250;
var ptY=250;
var bian=100;
var xmove=bian*0.7;
var ymove=bian*0.3;

var xmove2=xmove*0.6;
var xmove3=xmove*0.4;
var ymove2=ymove*0.3;
var ymove3=ymove*0.7;

var xmove4=25;
var ymove4=5;

//鼠标在画板移动获得点的坐标
function getpoint(e,num){
	myc=document.getElementById('svg'+num);
	leftpx=myc.offsetLeft;
	toppx=myc.offsetTop;
	x=e.clientX-leftpx;
	y=e.clientY-toppx;
	text=x+','+y
	$('#ponit'+num).text('坐标:'+text);
}
//一进四
function getparh1(){
//起点
pathValue='M'+ptx+' '+ptY+' ';
for (i=1;i<5;i++){
	switch(i){
	case 1:
		ptx+=bian;
		ptY-=bian;
	break;
	case 2:
		ptx-=bian;
		ptY-=bian;
	break;
	case 3:
		ptx-=bian;
		ptY+=bian;
	break;
	case 4:
		ptx+=bian;
		ptY+=bian;
	break;
	}
	pathValue+='L'+ptx+' '+ptY+' ';
}
//pathValue+='Z';
$('#svg1>path:eq(0)').attr('d',pathValue);
}
//四进八
function getparh2(){
//起点
pathValue='M'+ptx+' '+ptY+' ';
//四一
ptx+=xmove;
ptY-=ymove;
pathValue+='L'+ptx+' '+ptY+' ';
ptx+=ymove;
ptY-=xmove;
pathValue+='L'+ptx+' '+ptY+' ';
//四二
ptx-=ymove;
ptY-=xmove;
pathValue+='L'+ptx+' '+ptY+' ';
ptx-=xmove;
ptY-=ymove;
pathValue+='L'+ptx+' '+ptY+' ';
//四三
ptx-=xmove;
ptY+=ymove;
pathValue+='L'+ptx+' '+ptY+' ';
ptx-=ymove;
ptY+=xmove;
pathValue+='L'+ptx+' '+ptY+' ';
//四四
ptx+=ymove;
ptY+=xmove;
pathValue+='L'+ptx+' '+ptY+' ';
ptx+=xmove;
ptY+=ymove;
pathValue+='L'+ptx+' '+ptY+' ';
$('#svg1>path:eq(0)').attr('d',pathValue);
}
//八进十六
function getparh3(){
//起点
pathValue='M'+ptx+' '+ptY+' ';
//四一
ptx+=xmove2;
ptY-=ymove2;
pathValue+='L'+ptx+' '+ptY+' ';
ptx+=xmove3;
ptY-=ymove3;
pathValue+='L'+ptx+' '+ptY+' ';

ptx+=ymove3;
ptY-=xmove3;
pathValue+='L'+ptx+' '+ptY+' ';
ptx+=ymove2;
ptY-=xmove2;
pathValue+='L'+ptx+' '+ptY+' ';
//四二
ptx-=ymove2;
ptY-=xmove2;
pathValue+='L'+ptx+' '+ptY+' ';
ptx-=ymove3;
ptY-=xmove3;
pathValue+='L'+ptx+' '+ptY+' ';

ptx-=xmove3;
ptY-=ymove3;
pathValue+='L'+ptx+' '+ptY+' ';
ptx-=xmove2;
ptY-=ymove2;
pathValue+='L'+ptx+' '+ptY+' ';
//四三
ptx-=xmove2;
ptY+=ymove2;
pathValue+='L'+ptx+' '+ptY+' ';
ptx-=xmove3;
ptY+=ymove3;
pathValue+='L'+ptx+' '+ptY+' ';

ptx-=ymove3;
ptY+=xmove3;
pathValue+='L'+ptx+' '+ptY+' ';
ptx-=ymove2;
ptY+=xmove2;
pathValue+='L'+ptx+' '+ptY+' ';
//四四
ptx+=ymove2;
ptY+=xmove2;
pathValue+='L'+ptx+' '+ptY+' ';
ptx+=ymove3;
ptY+=xmove3;
pathValue+='L'+ptx+' '+ptY+' ';

ptx+=xmove3;
ptY+=ymove3;
pathValue+='L'+ptx+' '+ptY+' ';
ptx+=xmove2;
ptY+=ymove2;
pathValue+='L'+ptx+' '+ptY+' ';
$('#svg1>path:eq(0)').attr('d',pathValue);
}

//八进十六(二)
function getpath4(){
//起点
pathValue='M'+ptx+' '+ptY+' ';
	for (i=1;i<17;i++){
		switch(i){
		case 1:
			ptx+=xmove2;
			ptY-=ymove2;
		break;
		case 2:
			ptx+=xmove3;
			ptY-=ymove3;
		break;
		case 3:
			ptx+=ymove3;
			ptY-=xmove3;
		break;
		case 4:
			ptx+=ymove2;
			ptY-=xmove2;
		break;
		
		case 5:
			ptx-=ymove2;
			ptY-=xmove2;
		break;
		case 6:
			ptx-=ymove3;
			ptY-=xmove3;
		break;
		case 7:
			ptx-=xmove3;
			ptY-=ymove3;
		break;
		case 8:
			ptx-=xmove2;
			ptY-=ymove2;
		break;

		case 9:
			ptx-=xmove2;
			ptY+=ymove2;
		break;
		case 10:
			ptx-=xmove3;
			ptY+=ymove3;
		break;
		case 11:
			ptx-=ymove3;
			ptY+=xmove3;
		break;
		case 12:
			ptx-=ymove2;
			ptY+=xmove2;
		break;

		case 13:
			ptx+=ymove2;
			ptY+=xmove2;
		break;
		case 14:
			ptx+=ymove3;
			ptY+=xmove3;
		break;
		case 15:
			ptx+=xmove3;
			ptY+=ymove3;
		break;
		case 16:
			ptx+=xmove2;
			ptY+=ymove2;
		break;
		}
		pathValue+='L'+ptx+' '+ptY+' ';
	}
	$('#svg1>path:eq(0)').attr('d',pathValue);
}



//getparh1();
//getparh2();
//getparh3();
//getpath4();
