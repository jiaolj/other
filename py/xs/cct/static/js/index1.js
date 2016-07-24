var sli=$('#scircle>li');
var slen=sli.length;
var simg=$('#scroll>div>ul');
simg.css({width:slen*1000+'px'});
var aniNum=0;
var speed=0;
var task=setInterval(function(){
	aniNum++;
	if (aniNum==4){
		aniNum=0
		var atv=$('#scircle>.active');
		var nb=parseInt(atv.attr('i'));
		if(nb==slen){
			nb=0;
			simg.animate({left:'0px'},speed);
		}
		else simg.animate({left:'-='+1000+'px'},speed);
		atv.removeClass('active');
		$('#scircle>li:eq('+nb+')').addClass('active');
	}
},1000)
sli.click(function(){
	aniNum=0;
	$(this).parent().find('.active').removeClass('active');
	$(this).addClass('active');
	var nb=parseInt($(this).attr('i'));
	simg.animate({left:(nb-1)*-1000+'px'},speed);
})

$('#rollmenu1>li').click(function(){
	$(this).parent().find('.active').removeClass('active');
	$(this).addClass('active');
	var i=$(this).index('#rollmenu1>li');
	$(this).parent().parent().find('>div>ul').animate({'left':i*-1000+'px'},0);
})
$('#rollmenu2>li').click(function(){
	$(this).parent().find('.active').removeClass('active');
	$(this).addClass('active');
	var i=$(this).index('#rollmenu2>li');
	$(this).parent().parent().find('>div>ul').animate({'left':i*-1000+'px'},0);
})