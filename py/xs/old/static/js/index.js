var sli=$('#scircle>li');
var slen=sli.length;
var simg=$('#scroll>div>ul');
//simg.css({width:slen*1000+'px'});
var aniNum=0;
var speed=0;
var task=setInterval(function(){
	aniNum++;
	if (aniNum==4){
		aniNum=0
		var atv=$('#scircle>.active'),
			nb=parseInt(atv.attr('i'));
		if(nb==slen) nb=0;
		simg.find('.active').animate({opacity: 0},1000).removeClass('active');
		simg.find('li:eq('+nb+')').animate({opacity: 1},1000).addClass('active');
		
		atv.removeClass('active');
		$('#scircle>li:eq('+nb+')').addClass('active');
	}
},1000)
sli.click(function(){
	aniNum=0;
	$(this).parent().find('.active').removeClass('active');
	$(this).addClass('active');
	
	var nb=parseInt($(this).attr('i'));
	simg.find('.active').animate({opacity: 0},1000).removeClass('active');
	simg.find('li:eq('+(nb-1)+')').animate({opacity: 1},1000).addClass('active');

})

$('#rollmenu1>li').click(function(){
	$(this).parent().find('.active').removeClass('active');
	$(this).addClass('active');
	var i=$(this).index('#rollmenu1>li');
	$(this).parent().parent().find('>div>ul').animate({'left':i*-1000+'px'},800);
})
$('#rollmenu2>li').click(function(){
	$(this).parent().find('.active').removeClass('active');
	$(this).addClass('active');
	var i=$(this).index('#rollmenu2>li');
	$(this).parent().parent().find('>div>ul').animate({'left':i*-1000+'px'},800);
})