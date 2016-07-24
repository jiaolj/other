document.write("<script src='http://f.jiaolj.com/js/dist/echarts.js'><\/script>");
document.write("<script src='js/homeChart.js'><\/script>");

var dcolor={
	1:['#FE8C10','#fff'],
	2:['#FEFC14','#fff'],
	3:['#00FFFB','#fff'],
	4:['#02FF11','#fff']
}
var dpt=1;

var isopen=1;
//开关
$('#setting>.backg>.switch').click(function(){
	var one=$('#setting>.backg>.switch>.one');
	var two=$('#setting>.backg>.switch>.two')
	var wd=two.text();
	var speed=100;
	if(wd=='开'){
		isopen=0;
		one.animate({left:'0px'},speed);
		two.animate({left:'10px'},speed).text('关');
	}
	else{
		isopen=1;
		one.animate({left:'30px'},speed);
		two.animate({left:'-10px'},speed).text('开');
	}
})

var iswhere=1;
var iswhen=1;
$('#setting>.backg>ul>li').click(function(){
	$(this).parent().find('.active').removeClass('active');
	$(this).addClass('active');
	var txt=$(this).text();
	switch(txt){
		case '世界':
			iswhere=1;
			break;
		case '中国':
			iswhere=2;
			break;
		case '七月':
			iswhen=1;
			break;
		case '七天':
			iswhen=2;
			break;
	}
	init();
})
$('#setting>a').click(function(){
	var div=$(this).parent().find('>div');
	if(div.css('display')=='none')div.slideDown(300);
	else div.slideUp(300);
})
var getData=function(){
	var l=[];
	for (var i=0;i<30;i++){
		l.push({name: "标签",value:(Math.random()*40+12)})
	};
	return l;
}
var titObj=$('#titleList');
var titObj2=$('#titleList2');
var nullto=function(w){if(!w) return '&nbsp;';else return w};

var lastHtm='';
var speed=1200;
var getTitleList=function(n,data){
	var htm='';
	for(var i in data) if(i<3)htm+='<li class="ui psr"><div class="one">'+data[i].title+'</div> <div class="two"><i class="flt">'+data[i].tpnm+'</i><i class="frt w30 trt"><img src="img/tip.png" width="20" height="20" />'+nullto(data[i].loc)+'</i></div></li>';
	if(n==1){
		if ($('#titleList>li').length==0) titObj.html(htm).css({top:100}).animate({top:0},speed);
		else{
			titObj.html(lastHtm).css({top:0}).animate({top:-250},speed);
			titObj2.html(htm).css({top:250}).animate({top:0},speed);
		}
	}
	else{
		titObj.html(lastHtm).css({top:0}).animate({top:-250},speed);
		titObj2.html(htm).css({top:250}).animate({top:0},speed);
	}
	lastHtm=htm;
}

var chartSlide=function(){
	var s=600;
	$('#chart2').css({left:'100%'}).animate({left:'10%'},s);
	$('#timeline').css({left:'100%'}).animate({left:'40%'},s);
	$('.chartmove2').css({left:'100%'}).animate({left:'4.4%'},s);
	$('.chartmove3').css({left:'100%'}).animate({left:'30.4%'},s);
	$('.chartmove4').css({left:'100%'}).animate({left:'56.4%'},s);
}

var getp1=function(){
	var data=[getRandom(100),getRandom(100),getRandom(100),getRandom(100)];
	getPieChart1('chart1',data);
	/*$.ajax({
		url: '/getchart1/',
		type: 'GET',
		data:{wen:iswhen},
		dataType: 'json'
	}).done(function(data) {
		getPieChart1('chart1',data);
	}).fail(function(jqXHR,textStatus) {
		log(' request failed'+textStatus);
	});*/
}
var getp4=function(){
	var data=[
	{name:'苹果',value:getRandom(30)},
	{name:'梨子',value:getRandom(30)},
	{name:'香蕉',value:getRandom(30)},
	{name:'葡萄',value:getRandom(30)},
	{name:'菠萝',value:getRandom(30)},
	{name:'哈密瓜',value:getRandom(30)},
	{name:'橙子',value:getRandom(30)},
	{name:'椰子',value:getRandom(30)},
	{name:'橄榄',value:getRandom(30)},
	]
	getWordChart('chart3',data);
	getPieChart('chart4',data);
	var dd={tm:['2014-04','2014-04','2014-04','2014-04','2014-04','2014-04','2014-04'],series:[
		{
			name:'苹果',
			type:'line',
			symbolSize:0,
			smooth:true,
			data:[10, 20, 50, 60, 70, 80, 90],
		},
		{
			name:'梨子',
			type:'line',
			symbolSize:0,
			smooth:true,
			data:[80, 70, 60, 50, 40, 20, 10],
		},
		{
			name:'香蕉',
			type:'line',
			symbolSize:0,
			smooth:true,
			data:[20, 10, 30, 40, 30, 40, 30],
			itemStyle:{
				normal:{color:'#4285f4'}
			},
		},
		{
			name:'葡萄',
			type:'line',
			symbolSize:0,
			smooth:true,
			data:[40, 50, 60, 70, 60, 30, 10],
		}
	]
	};
	getLineChart('chart5',dd);
	/*$.ajax({
		url: '/getchart4/',
		type: 'GET',
		data:{dpt:dpt,wen:iswhen},
		dataType: 'json'
	}).done(function(data){
		if(data.d2.length>0) getWordChart('chart3',data.d2);
		else $('#chart3').empty();
		if(data.d1.length>0) getPieChart('chart4',data.d1);
		else $('#chart4').empty();
		getLineChart('chart5',data.d3);
	}).fail(function(jqXHR,textStatus) {
		log(' request failed'+textStatus);
	});*/
}
var getp5=function(){
	if(iswhere==1) getMapChart('chart2',getRandomMapData(randomWorld),dcolor[dpt],'world');
	else if(iswhere==2)  getMapChart('chart2',getRandomMapData(randomChina),dcolor[dpt],'china');
	/*$.ajax({
		url: '/getchart5/',
		type: 'GET',
		data:{dpt:dpt,tm:viewdate,we:iswhere},
		dataType: 'json'
	}).done(function(data) {
		if(iswhere==1) getMapChart('chart2',data,dcolor[dpt],'world');
		else if(iswhere==2) getMapChart('chart2',data,dcolor[dpt],'china');
	}).fail(function(jqXHR,textStatus) {
		log(' request failed'+textStatus);
	});*/
}
var getp6=function(n){
	var data=[
	{title:'标题',tpnm:'标签',loc:'地区'},
	{title:'标题',tpnm:'标签',loc:'地区'},
	{title:'标题',tpnm:'标签',loc:'地区'},
	{title:'标题',tpnm:'标签',loc:'地区'},
	{title:'标题',tpnm:'标签',loc:'地区'},
	]
	getTitleList(n,data);
	/*$.ajax({
		url: '/getchart6/',
		type: 'GET',
		data:{dpt:dpt,tm:viewdate,we:iswhere},
		dataType: 'json'
	}).done(function(data) {
		getTitleList(n,data);
	}).fail(function(jqXHR,textStatus) {
		log(' request failed'+textStatus);
		
	});*/
}

var init=function(arg){
	var bdObj=$('body');
	//bdObj.css({'min-height':bdObj[0].clientWidth*0.64});
	bdObj.css({'width':bdObj[0].clientHeight*1.6,'margin':'0 auto'});
	if(!arg){
		getp1();
		obc1.css({height:obc1[0].clientWidth*0.9+'px'});
	}
	//getMapChart('chart2',data[0],dcolor[dpt]);
	getNowDate(n);
	//getp3();
	getp4();
	getp5();
	if (arg) chartSlide();
	getp6(n)
	timeTask();
}

$('#menu>li').click(function(){
	$(this).parent().find('.active').removeClass('active');
	$(this).addClass('active');
	dpt=parseInt($(this).attr('dpt'));
	$('#menu>li').css({'color':'#C1C0C5','text-shadow':'0 0 0 #C1C0C5'});
	var cor=dcolor[dpt][0];
	$(this).css({'color':cor,'text-shadow':'0 2px 2px '+cor});
	$('#timeline>.choice').removeClass('choice');
	$('#timeline>li:eq(1)').addClass('choice');
	tmData.css({color:cor});
	boll.css({background:cor});
	n=1;
	boll.animate({left:boleft[(n-1)]},200);
	setTimeout(function(){init(n)},1);
})

var tnm=0;
var n=1;
var obc1=$('.pie1');
var tmOne=$('#timeDiv>.one');
var tmTwo=$('#timeDiv>.two');
var tmThree=$('#timeDiv>.three');
var begin=$('#begin');



begin.click(function(){
	if($(this).hasClass('active')) $(this).removeClass('active');
	else $(this).addClass('active');
})

var timeTask=function(){
	tmOne.text(getStrTime(['年','月','日']));
	tmThree.text(getTimeDetail());
	tmTwo.text(getWeekTime());
}

var tmData=$('#timeline>.fyjsz');
var viewdate;
var nowyear=new Date().getFullYear();
var nowmonth=new Date().getMonth()+1;
var getNowDate=function(n){
	if(iswhen==1){
		var nowd=toDouble(nowmonth-7+n);
		viewdate=nowyear+'-'+nowd;
		tmData.text(nowyear+' - '+nowd);
	}
	else if(iswhen==2){
		viewdate=getStrTime(undefined,AddDays(new Date(),n-8));
		tmData.text(getStrTime([' - ',' - ',''],AddDays(new Date(),n-8)));
	}
};

var boleft=['5%','20%','35%','50%','65%','80%','95%'];
var boll=$('#timeline>.choice2');
var timelineTask=function(){
	if(!begin.hasClass('active')){
		var li=$('#timeline>.choice');
		li.removeClass('choice');
		var i=parseInt(li.attr('i'));
		n=i+1;
		if (n==8){
			n=1;
			var atv=$('#menu>.active')
			dpt=parseInt(atv.attr('dpt'))+1;
			if(dpt==5) dpt=1;
			$('#menu>li').css({'color':'#C1C0C5','text-shadow':'0 0 0 #C1C0C5'});
			var cor=dcolor[dpt][0];
			atv.removeClass('active');
			$('#menu>li:eq('+(dpt-1)+')').addClass('active').css({'color':cor,'text-shadow':'0 2px 2px '+cor});
			tmData.css({color:cor});
			boll.css({background:cor});
			init(n);
		}
		else{
			getp6(n);
			//getTitleList(n);
			//getMapAnimate(n);
			//getMapChart('chart2',data[(n-1)],dcolor[dpt]);
			getp5();	
		}
		$('#timeline>li:eq('+n+')').addClass('choice');
		boll.animate({left:boleft[(n-1)]},200);
		getNowDate(n);

	}
}

$(function(){init()});
$(window).resize(function(e){init()});

var task=setInterval(function(){
	if(document.hidden==false&&isopen==1){
		tnm++;
		timeTask();
		if(tnm%3==0) timelineTask();
	}
},1000);