$(function(){
	$('.mid-botton>a').click(function(){
		cvalue=$('.current').attr('value');
		$('.current').removeClass('current');
		$(this).addClass('current');
		value=parseInt($(this).attr('value'));
		$(".float-div").animate({left:'-'+(value-1)*983+'px'});
	})
	$('.btn-btn').click(function(){
		if ($('.btn-btn-hide').css('height')=='0px')
			$('.btn-btn-hide').animate({height:'174px'});
		else
			$('.btn-btn-hide').animate({height:'0px'});
	})
	$('.current-left').click(function(){
		nowCurrent=parseInt($('#nowCurrent').attr('value'));
		if (nowCurrent>1){
			$(".float-div").animate({left:'-'+(nowCurrent-2)*983+'px'});
			$('#nowCurrent').attr('value',nowCurrent-1);
		}
	})
	$('.current-right').click(function(){
		nowCurrent=parseInt($('#nowCurrent').attr('value'));
		//alert(nowCurrent);
		if (nowCurrent<3){
			$(".float-div").animate({left:'-'+nowCurrent*983+'px'});
			$('#nowCurrent').attr('value',nowCurrent+1);
		}
	})
})