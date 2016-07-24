(function(){
	var MVC = {
		config : {
			sli : $('#boll>dt'),
			simg : $('#scroll'),
			aniNum : 0,
			speed : 1000,
			dom : {
				head : {
					s : $('header'),
					h : 120
				},
				box : {
					s : $('.box'),
					trip : {
						s : $('#trip-chart')
					}
				}
			}
		},
		size : (function(){
			var obj = this,
				cwt = document.body.clientWidth,
				cht = document.body.clientHeight;
			obj.config.dom.box.h = cht - obj.config.dom.head.h;
			for(var dom in obj.config.dom){
				obj.config.dom[dom].s.css({height:obj.config.dom[dom].h+'px'});
			}
			$('.box:eq(0)').css({'margin-top':obj.config.dom.head.h+'px'});
			obj.config.dom.box.trip.s.css({'margin-left':(cwt*0.03)+'px'});
			return this;
		}),
		init : (function(){
			var obj = this;
			obj.size();
			$(window).resize(function(){obj.size()});
			obj.config.sli.click(function(){
				aniNum=0;
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				var nb=$(this).index('#boll>dt');
				obj.config.simg.find('.active').animate({opacity: 0},1000).removeClass('active');
				obj.config.simg.find('dt:eq('+(nb)+')').animate({opacity: 1},1000).addClass('active');
			})
			var task=setInterval(function(){
					obj.config.aniNum++;
					if (obj.config.aniNum==4){
						obj.config.aniNum=0
						var atv=$('#boll>.active'),
							nb=parseInt(atv.index('#boll>dt'));
						if(nb==(obj.config.sli.length-1)) nb=-1;
						obj.config.simg.find('.active').animate({opacity: 0},1000).removeClass('active');
						obj.config.simg.find('dt:eq('+(nb+1)+')').animate({opacity: 1},obj.config.speed).addClass('active');
						atv.removeClass('active');
						$('#boll>dt:eq('+(nb+1)+')').addClass('active');
					}
				},obj.config.speed);
			return obj;
		})	
	}
	window.MVC = MVC;
})();
MVC.init();