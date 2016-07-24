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
var cnt=$('.main>.mid');
var w=cnt[0].offsetWidth;
var h=cnt[0].offsetHeight;

var canvas=document.getElementById('canv'); //不能再css里面设置宽和高，否则线条会变很粗
canvas.width=w;
canvas.height=h;
var ctx=canvas.getContext('2d');

//初始化绘图
ctx.fillStyle='#ccc';
ctx.strokeStyle='#555';
ctx.strokeRect(10, 10, 50, 50);
ctx.strokeRect(30, 50, 10, 30);