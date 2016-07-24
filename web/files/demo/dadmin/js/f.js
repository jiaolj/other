var clh=parseInt(document.documentElement.clientHeight);
var clw=parseInt(document.documentElement.clientWidth);
var menuList=[];
var initFunc=function(){
$('#content').css({height:clh-30});
}
initFunc();
$('body').click(function(e){
if((e.target.className+'x').split('nohid').length==1&&e.target.className!='') $('#content>.active').removeClass('active');
});
$('#content>li').click(function(){
$(this).parent().find('.active').removeClass('active');
$(this).addClass('active');
})

var closeFunc=function(oid){
	$('#'+oid+'>b>.three').click(function(){
		var cod=$('.'+oid);
		menuList=arrayRemove(menuList,indexOf(menuList,cod.attr('tid')));
		$('#'+oid).remove();
		cod.remove();
	})
	$('#'+oid+'>b>.two').click(function(){
		var obj=$('#'+oid),jsd;
		if(parseInt(obj.css('width'))==clw){
			jsd = {width:(clw*0.8)+'px',height:(clh*0.8-40)+'px',top:(clh*0.1)+'px',left:(clw*0.1)+'px'};
			
			$('.'+oid).attr('tp','0');
		}
		else{
			jsd = {width:(clw)+'px',height:(clh-40)+'px',top:(clh*0)+'px',left:(clw*0)+'px'};
			$('.'+oid).attr('tp','1');
		}
		obj.animate(jsd, 500, function(){
			eval(('my'+oid)).window.MVP.model.getResize();
		});
	})
	$('#'+oid+'>b>.one').click(function(){
		var l=$('.'+oid)[0].offsetLeft;
		$('#'+oid).animate({width:'10px',height:'10px',top:(clh-30)+'px',left:l+'px'},300);
	})
	$('.'+oid).click(function(){
		var obj=$('#'+oid);
		var cbj=$('.'+oid);
		if (parseInt(obj.css('width'))==10){
			var t=$(this).attr('tp');
			if(t=='0'){
				obj.animate({width:(clw*0.8)+'px',height:(clh*0.8-40)+'px',top:(clh*0.1)+'px',left:(clw*0.1)+'px'},300);
			}else{
				obj.animate({width:(clw)+'px',height:(clh-40)+'px',top:(clh*0)+'px',left:(clw*0)+'px'},300);
			}
		}else{
			obj.animate({width:'10px',height:'10px',top:(clh-30)+'px',left:cbj[0].offsetLeft+'px'},300);
		}
	})
}
var openNum=0;
$('#content>li').dblclick(function(){
	var tid=$(this).attr('id');
	if(indexOf(menuList,tid)==-1){
		menuList.push(tid);
		openNum++;
		$('#content>.active').removeClass('active');
		var txt=$(this).text();
		var htm=$(this).attr('htm');
		var w=$(this)[0].clientWidth;
		var h=$(this)[0].clientHeight;
		var top=$(this)[0].offsetTop;
		var left=$(this)[0].offsetLeft;
		var oid='open'+openNum;
		$('#content').append('<div id="'+oid+'" class="psa bggry2" style="height:'+h+'px;width:'+w+'px;top:'+top+'px;left:'+left+';border:1px solid #ccc"></div>');
		$('#'+oid).animate({width:(clw*0.8)+'px',height:(clh*0.8-40)+'px',top:(clh*0.1)+'px',left:(clw*0.1)+'px'},300,function(){
			$('#'+oid).html('<b class="close"> <a class="one">-</a> &nbsp;&nbsp;<a class="two">口</a> &nbsp;&nbsp;<a class="three">X</a> </b><iframe name="my'+oid+'" width="100%" height="100%" src="'+htm+'"></iframe>');
			closeFunc(oid);
		});
		$('#menu>ul').append('<li class="psr '+oid+'" tp="0" tid="'+tid+'">'+txt+'</li>');
		$('#menu>ul>.active').removeClass('active');
		$('#menu>ul>.'+oid).addClass('active');
	}
})