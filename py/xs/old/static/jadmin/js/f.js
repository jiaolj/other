/*全局属性*/
var clw,clh;
var framew,righth;
var frmObj=$('.rightdiv>.frame');
var jsLoad=function(){
clw=parseInt(document.documentElement.clientWidth);
clh=parseInt(document.documentElement.clientHeight);
$('.main').css({height:clh-31});
frmObj.css({height:(clh-61)});
}
jsLoad();
$(window).resize(function(e){jsLoad()});
var tabList=[];
var url=location.href;

var getHtmClick=function(sc){
	$('#u'+sc+'>.tclose').click(function(){
		$('#u'+sc).remove();
		$('#f'+sc).remove();
		tabList=arrayRemove(tabList,indexOf(tabList,sc));
		$('.rightdiv>.bggry1>ul>li:last').addClass('active');
		$('.rightdiv>.frame>div:last').show();
		if(tabList.length==0) location.href=url;
		else{
			 var ns=$('.rightdiv>.bggry1>ul>li:last').attr('id').replace('u','');
			 if (ns) location.hash='#1/'+ns;
			 else location.href=url;
		}
	});
	$('#u'+sc).click(function(){
		$('.rightdiv>.frame>div').hide();
		$('.rightdiv>.bggry1>ul>li').removeClass('active');
		location.hash='#1/'+sc;
		$('#u'+sc).addClass('active');
		$('#f'+sc).show();
	})
}
var isOpen=function(hid){
	var sul=$('#'+hid+'>ul');
	if(sul.css('display')=='none'){
		sul.show();
		$('#'+hid+'>.isopen').css('background-position','0 -71px');
	}
	else{
		$('#'+hid+'>.isopen').css('background-position','0 -29px');
		sul.hide();
	}
}
var menuClick=function(){
	$('#menu a').click(function(){
		var sc=$(this).parent().attr('htm');
		var vid=$(this).parent().attr('id');
		if(sc=='undefined') {isOpen(vid);return};
		var hid=vid.replace('h','');
		var txt=$(this).parent().text();
		$('.rightdiv>.frame>div').hide();
		$('.rightdiv>.bggry1>ul>li').removeClass('active');
		if (indexOf(tabList,hid)==-1){
			tabList.push(hid);
			location.hash='#1/'+hid;
			$('.rightdiv>.bggry1>ul').append('<li id="u'+hid+'" class="ti-1 fs9p tcenter">'+txt+' <i class="tclose"></i></li>');
			frmObj.append('<div id="f'+hid+'" class="h w dsn ova"><iframe src="htm/'+sc+'" width="100%" height="99.5%" frameborder="0"></iframe></div>');
			getHtmClick(hid);
		}
		$('#u'+hid).addClass('active');
		$('#f'+hid).show();
	})
	$('.isopen').click(function(){isOpen($(this).parent().attr('id'))});
}

var initFunc=function(d){
	var cjson={};
	var htm='';
	var c=d.config;
	for (var i in c){
		var itm=c[i].items;
		var iid=c[i].id;
		var iht=c[i].htm;
		var inm=c[i].name;
		cjson[iid]={htm:iht,name:inm};
		htm+='<li id="h'+iid+'" htm="'+iht+'"><a>'+inm+'</a>';
		if (itm){
			htm+='<s class="isopen"></s><ul class="u25 ut2 psr">';
			for (var j in itm){
				var jid=itm[j].id;
				var jht=itm[j].htm;
				var jnm=itm[j].name;
				cjson[jid]={htm:jht,name:jnm};
				htm+='<li id="h'+jid+'" htm="'+jht+'"><a>'+jnm+'</a></li>';
			}
			htm+='</ul>';
		}
		htm+='</li>';
	}
	$('#menu').html(htm);
	menuClick();
	
	if(url.split('#').length==1) location.hash='#1';
	else{
		var hid=url.split('#')[1].split('/')[1];
		if(hid){
			url=url.replace('#1/'+hid,'#1');
			tabList.push(hid);
			var nd=cjson[hid];
			$('.rightdiv>.bggry1>ul').append('<li id="u'+hid+'" class="active ti-1 fs9p tcenter">'+nd.name+' <i class="tclose"></i></li>');
			frmObj.append('<div id="f'+hid+'" class="h w ova"><iframe src="htm/'+nd.htm+'" width="100%" height="99.5%" frameborder="0"></iframe></div>');
			getHtmClick(hid);
		}else location.href=url.replace('#1','').replace('#','');
	}
}