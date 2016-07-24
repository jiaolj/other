var cntHeight=parseInt($('.main>.mid>.down>ul>li>.data>ul')[0].scrollHeight*0.1);
var scw=parseInt(window.screen.width);
var sch=parseInt(window.screen.height);
var pie1,pie2,pie3,pie4,pie5;
var lstp5=[];
var json5={};
var svg5=$('#svg5');
var w5=svg5[0].clientWidth;
var h5=svg5[0].clientHeight;
var isSvgMove=0;
var todayTime=getStrTime('/');
var lastMonth=getLastTime(-30);
$(window).resize(function(){ref();});

//计算经纬度
//var lalzero=[w5*0.3,h5/3];
var lalzero=[w5/2,h5/2];
var lalToPoint=function(d){
	var x=lalzero[0]+d[0]*0.4*lalzero[0]/180-13;
	var y=lalzero[1]-d[1]*0.4*lalzero[1]/90+20;
	return [x,y];
}

var getTitleList=function(){
	$('.main>.mid>.down>ul>li>.data>ul').each(function(index,item){
		for (var i=0;i<10;i++) $(item).append('<li>发生一个新事件</li>');
	})
	$('.main>.mid>.down>ul>li>.data>ul>li').css({'line-height':cntHeight+'px','height':cntHeight+'px'});
}
//小球转圈
var getSvgChart2=function(svgId){
	var obj=$('#'+svgId);
	var w=obj[0].clientWidth;
	var h=obj[0].clientHeight;
	var cw=w*0.7;
	var ch=h*0.8;
	var cr=ch/2.3;
	var br=ch/40;
	var cx=w/2;
	var cy=h/2;
	var htm='';

	htm+='<g transform="translate('+cx+','+cy+')"> ';
	htm+='<rect x="0" y="-'+cr+'" width="'+br+'" height="'+br+'" rx="'+br+'" ry="'+br+'" style="fill:'+chartColor[0]+';stroke:#ccc;stroke-width:1">';
	htm+='<animateTransform ';
	htm+='attributeType="xml"';
	htm+='attributeName="transform" type="rotate"';
	//htm+='from="0" to="'+lstp5[0].v+'"';
	//htm+='dur="'+lstp5[0].s+'s"';
	htm+='from="0" to="360"';
	htm+='dur="12s"';
	htm+='begin="indefinite"';
	//htm+='repeatCount="indefinite"';
	htm+=' />';
	htm+='</rect>';
	htm+='</g>';
	htm+='<circle cx="'+cx+'" cy="'+cy+'" r="'+cr*0.93+'" stroke="#ccc" stroke-width="1" fill="#fff" fill-opacity="0.1"/>';
	obj.html(htm);
}
var animateObj;
var getSvgChart=function(svgId){
	var obj=$('#'+svgId);
	var w=obj[0].clientWidth;
	var h=obj[0].clientHeight;
	var cw=w*0.7;
	var ch=h*0.8;
	var cr=ch/2.3;
	var br=ch/40;
	var cx=w/2;
	var cy=h/2;
	var htm='';

	htm+='<g transform="translate('+cx+','+cy+')"> ';
	htm+='<rect x="0" y="-'+cr+'" width="'+br+'" height="'+br+'" rx="'+br+'" ry="'+br+'" style="fill:#555;stroke:#ccc;stroke-width:1">';
	htm+='<animateTransform ';
	htm+='attributeType="xml"';
	htm+='attributeName="transform" type="rotate"';

	htm+='from="0" to="0"';
	htm+='dur="0s"';
	htm+='begin="indefinite"';
	htm+='fill="freeze"';
	
	htm+=' />';
	htm+='</rect>';
	htm+='</g>';
	htm+='<circle cx="'+cx+'" cy="'+cy+'" r="'+cr*0.93+'" stroke="#ccc" stroke-width="1" fill="#fff" fill-opacity="0.1"/>';
	obj.html(htm);
	animateObj=document.getElementsByTagName('animateTransform')[0];
}

var nowdd=$('.main>.mid>.mid>.frt>.up');
var nowtm=$('.main>.mid>.mid>.frt>.down');
var pastdd=$('.main>.mid>.mid>.flt>.up');
var pasttm=$('.main>.mid>.mid>.flt>.down');

var getTimeData=function(){
	var dd=getTimeDetail();
	nowdd.text(todayTime.substring(2));
	nowtm.text(dd);
	
	pastdd.text(lastMonth.substring(2));
	pasttm.text(dd);
}
//提示气泡
var tipNumb=0;
var tipTask=function(nm,city){
	tipNumb++;
	var c=lalWorldn[city];
	if(!c){
		//log(city);
		return;
	}
	var lal=lalToPoint(c);
	var px=lal[0];
	var py=lal[1];
	//参数
	var ranc=random(chartColor);
	var tipw=scw*0.006;
	var tiph=sch*0.012;
	var tipuw=parseInt(tipw/2);
	var tipdw=parseInt(tipw/3);
	$('.main>.mid>.up>.frt').append('<div class="rmdiv" sec="4" style="position:absolute;left:'+px+'px;top:'+(py-30)+'px;z-index:10;"><div style="position:relative;background:#f5f5f5;color:#555;border-radius:2px;z-index:11;left:-53px;padding:2px;line-height:15px;min-height:15px;word-break:keep-all;">'+city+' 新增1条事件</div><span class="drip" style="width:'+tipw+'px;height:'+tiph+'px"><b style="border-radius:'+tipw+'px;border:'+tipuw+'px solid '+ranc+';"></b><b style="border-top-color:'+ranc+';border-width:'+tipuw+'px '+tipdw+'px 0px '+tipdw+'px;"></b></span></div>');
	var p=json5[nm];
	//var pst=(px+tipdw)+','+(py)+' '+p[0]+','+p[1];
	//$('.main>.mid>.up>.frt').append('<svg class="rmdiv" sec="4"><polyline points="'+pst+'" style="fill:#fff;stroke:#555;stroke-width:1;stroke-dasharray:10,3;" /> <text x="'+p[0]+'" y="'+p[1]+'" font-size="16" style="fill:green">'+nm+'</text> </svg>');
	var pst='M'+(px+tipdw)+','+(py)+'L'+p[0]+','+p[1];
	$('.main>.mid>.up>.frt').append('<svg class="rmdiv" sec="4"><path class="lineani" d="'+pst+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="1" stroke="#555" fill="none"></path> <text x="'+p[0]+'" y="'+p[1]+'" font-size="16" style="fill:green">'+nm+'</text> </svg>');
}
//警示箭头
var warnNumb=0;
var warnTask=function(nm){
	warnNumb++;
	var p=json5[nm];
	$('.main>.mid>.up>.frt').append('<div class="rmdiv" sec="4" style="position:absolute;left:'+p[0]+'px;top:'+p[1]+'px;z-index:10;color:red;">↑</div>');
}

var getChartFunc=function(){
	$('.main>.mid>.down>ul>li>.tit:eq(0)').css('background',chartColor[0]);
	$('.main>.mid>.down>ul>li>.tit:eq(1)').css('background',chartColor[1]);
	$('.main>.mid>.down>ul>li>.tit:eq(2)').css('background',chartColor[2]);
	$('.main>.mid>.down>ul>li>.tit:eq(3)').css('background',chartColor[3]);

	$('.main>.mid>.mid>.line').css('top',$('.main>.mid>.mid')[0].clientHeight/2.2);
	$('.main>.mid>.down>ul>li>.tit').css('line-height',$('.main>.mid>.down>ul>li>.tit')[0].clientHeight+'px');
	$('.main>.mid>.mid>.mid>.mid').css('line-height',$('.main>.mid>.mid>.mid>.mid')[0].clientHeight+'px');
	$('.main>.mid>.up>.flt>ul>li>b>svg').css({width:$('.main>.mid>.up>.flt>ul>li')[0].clientWidth,height:$('.main>.mid>.up>.flt>ul>li')[0].clientHeight});
	
	pie5=getMapChart('uprtct',[],undefined,1);
	getMapChart('uprtcp',[],undefined);
	pie1=getMapChart('tp1',[],'A类');
	pie2=getMapChart('tp2',[],'B类');
	pie3=getMapChart('tp3',[],'C类');
	pie4=getMapChart('tp4',[],'D类');
	
	getTitleList();

	var point5=pie5.chart.pie.series[1].data;
	var vall=0;
	var stvall=0;
	var stvall2=0;
	for (var p in point5) vall+=point5[p].value;
	for (var p in point5){
		var nval=point5[p].value*360/vall;
		var sec=point5[p].value*8/vall;
		stvall+=nval;
		stvall2+=parseInt(point5[p].value*120/vall);
		lstp5.push({nm:point5[p].name,v:stvall2,x:point5[p].__labelX,y:point5[p].__labelY,c:parseInt(stvall-nval/2),s:sec});
		json5[point5[p].name]=[point5[p].__labelX,point5[p].__labelY];
	}
	getSvgChart('svg5');
	isSvgMove=1;
	
	getTimeData();
	
}

var timeTask=function(){
	if (todayTime!=getStrTime('/')){
		todayTime=getStrTime('/');
		nowdd.text(todayTime.substring(2));
		lastMonth=getLastTime(-30);
		pastdd.text(lastMonth.substring(2));
		nowtm.text('00:00:00');
		pasttm.text('00:00:00');
	}
	var sec=timt_add_numb(nowtm.text(),1);
	nowtm.text(sec);
	pasttm.text(sec);
}

var removeDiv=function(){
	$('.rmdiv').each(function(index,item){
		var sec=parseInt($(item).attr('sec'))-1;
		if (sec==0) $(item).remove();
		else $(item).attr('sec',sec);
	})
}

var exampleList=['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'];

var addNum=1;
var evtId=0;
var rollNum=0;
var getTitle=setInterval(function(){
	addNum++;
	if (addNum%2==0){
		evtId++;
		$('.main>.mid>.down>ul>li>.data>ul:eq(0)').animate({ top: '-='+cntHeight+'px' },400);
		$('.main>.mid>.down>ul>li>.data>ul:eq(0)').append('<li style="line-height:'+cntHeight+'px;height:'+cntHeight+'px">新发生一个新事件'+evtId+'</li>');
	}else{
		$('.main>.mid>.down>ul>li>.data>ul:eq(0)').css({ top: '+='+cntHeight+'px' });
		$('.main>.mid>.down>ul>li>.data>ul:eq(0)>li:eq(0)').remove();
	}
	
	if (addNum%2==0) tipTask(random(exampleList),getRandomArea());
	if (addNum==8) warnTask('邮件营销');

	removeDiv();
	
	if ((addNum-3)%4==0||addNum==3){
		//log(rollNum);
		getRollRun(rollNum);
		rollNum++;
		if (rollNum==lstp5.length+1){
			rollFrom=0;
			rollNum=0;
		}
	}
	timeTask();
},1000)

var rollFrom=0;
var getRollRun=function(rollNum){
	animateObj.setAttribute('from',rollFrom);
	if (rollNum==lstp5.length){
		var c=360;
		var dur=2;
		//$('#svg5>g>rect').css({fill:chartColor[0]});
	}
	else{
		var c=lstp5[rollNum].c;
		rollFrom=c;
		var dur=lstp5[rollNum].s;
		//$('#svg5>g>rect').css({fill:chartColor[rollNum]});
	}
	animateObj.setAttribute('to',c);
	animateObj.setAttribute('dur',dur);
	animateObj.beginElement();
}
var getRollRun2=function(){
	var animate=document.getElementsByTagName('animateTransform')[0];
	if (animate){
		animate.beginElement();
		var nmm=0;
		var svgInterval=setInterval(function(){
			if (isSvgMove==1){
				nmm++;
				if (nmm==120){
					nmm=0;
					clearInterval(svgInterval);
				}
				for (var p in lstp5){
					var pn=parseInt(p)+1;
					if(pn==lstp5.length) pn=0;
					if (nmm==lstp5[p].v){
						$('#svg5>g>rect').css({fill:chartColor[pn]});
						break;
					}
				}
			}
		},100);
	}
}

getChartFunc();