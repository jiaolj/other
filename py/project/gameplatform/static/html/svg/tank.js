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
//全局变量
var svg=$('#svgt');
//svg.mousemove(function(e){getpoint(e,'svgt')});
var w=svg[0].offsetWidth;
var h=svg[0].offsetHeight;

//坦克参数
var tankw=parseInt(w*0.03);
var tankh=parseInt(h*0.06);

var tankNum=0;
//绘图函数
//添加坦克
var addtank=function(x,y){
	tankNum++;
	var htm='<rect x="'+x+'" y="'+y+'" class="tank'+tankNum+' cnt" width="'+tankw+'" height="'+tankh+'" style="fill:black;stroke:black;stroke-width:1;fill-opacity:0.1;stroke-opacity:0.7" />';
	htm+='<rect x="25" y="25" class="tank'+tankNum+' head" width="20" height="20" style="fill:black;stroke:black;stroke-width:1;fill-opacity:0.1;stroke-opacity:0.7" />';
	htm+='<rect x="30" y="45" class="tank'+tankNum+' gan" width="10" height="30" style="fill:#ccc;stroke:black;stroke-width:1;stroke-opacity:0.7" />';
	svg.html(htm);
}
//初始化绘图
addtank(10,10);