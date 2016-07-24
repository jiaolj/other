var sli=$('#boll>dt');
var slen=sli.length;
var simg=$('#scroll');
var aniNum=0;
var speed=0;
var task=setInterval(function(){
	aniNum++;
	if (aniNum==4){
		aniNum=0
		var atv=$('#boll>.active'),
			nb=parseInt(atv.index('#boll>dt'));
		if(nb==(slen-1)) nb=-1;
		simg.find('.active').animate({opacity: 0},1000).removeClass('active');
		simg.find('dt:eq('+(nb+1)+')').animate({opacity: 1},1000).addClass('active');
		log(nb);
		atv.removeClass('active');
		$('#boll>dt:eq('+(nb+1)+')').addClass('active');
	}
},1000)
sli.click(function(){
	aniNum=0;
	$(this).parent().find('.active').removeClass('active');
	$(this).addClass('active');
	
	var nb=$(this).index('#boll>dt');
	log(nb);
	simg.find('.active').animate({opacity: 0},1000).removeClass('active');
	simg.find('dt:eq('+(nb)+')').animate({opacity: 1},1000).addClass('active');

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