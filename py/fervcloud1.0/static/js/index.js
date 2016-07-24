checkLeave = function(){$(document).scrollTop(0);};
(function(){
	var MVC = MVC || {};
	MVC.base = (function(){
		var moveBox = $('.main>.movebox'),
			_n = 1,
			_mouseMenu = -1,
			_mousep1Menu = -1,
			_mousep2Menu = -1
			_p1i = 0,
			_p2i = 0,
			_db = 0,
			_atm = 800,
			_dftw = 1920,
			_dfth = 920,
			_pallh = [],
			_pallj = {0:0},
			_p1auto = 0;
			_cfc = cwt/_dftw,
			_pss = {},
			_p2ss = {},
			_p2yibiao = function(num){
				var box3cliNub = 0,
					box3cliHtm = '',
					box3cliTsf = 140,
					box3cliRgb = 0.01;
				for(var i=0;i<(num*2);i++){
					box3cliNub ++;
					box3cliHtm += '<li class="c'+box3cliNub+'"><div><p></p></div></li>';
				}
				$('.box3-circle').html(box3cliHtm).find('>li').each(function(k,i){
					if(k<20){
						box3cliTsf ++;
						box3cliRgb += 0.005;
					}
					else{
						box3cliTsf ++;
						box3cliRgb += 0.005;
					}
					if(k>0){
						$(i).css('transform','rotate('+box3cliTsf+'deg)');
						$(i).find('>div>p').css('background','rgba(144, 235, 244, '+box3cliRgb+')');
					}
				})
				$('.box3-circle').css({width:_p2ss.yb.wh+'px',height:_p2ss.yb.wh+'px',top:_p2ss.yb.t+'px',left:_p2ss.yb.l+'px'});
				$('.box3-circle>li>div').css({width:_p2ss.yb.sw+'px'});
				$('.box3-circle>li>div>p').css({width:_p2ss.yb.spw+'px'});
			},
			_scrolln = function(){
				if(_db==0){
					var top = document.documentElement.scrollTop || document.body.scrollTop;
					//log(_pallh+'-'+top);
					for(var p in _pallh){
						if(top>_pallh[p]){
							_n = _pallh.length+1-p;
							break;
						}
						_n = 1;
					}
					_getScroll();
				}
			},
			_getScroll = function(){
				_db = 0;
				var menu2 = MVC.p2.getMenu();
				MVC.p2.audioClose();
				if(_n==2) {
				}
				else{
					$('#show>p.active').removeClass('active');
					$('#show>p:eq(0)').addClass('active');
					$('#move-p2').css('left','0');
					$('.p2b1').hide();
					$('.mainback').hide();
					$('.cover-img').hide();
				}
				if(_n==3){if($('#txt-3').css('display')=='none') jq_domUpToDown($('#txt-3'))}
				else $('#txt-3').hide();
				if(_n==4){if($('#txt-4').css('display')=='none') jq_domUpToDown($('#txt-4'))}
				else $('#txt-4').hide();
				if(_n==5){if($('#txt-5').css('display')=='none') jq_domUpToDown($('#txt-5'))}
				else $('#txt-5').hide();
				$('#mainMenu>.active').removeClass('active');
				$('#mainMenu>dt:eq('+(_n-1)+')').addClass('active');
			},
			_getp1Scroll = function(obj){
				$('.imgscroll>ul').animate({left:'-'+(_p1i*100)+'%'},_atm);
				obj.parent().parent().find('.active').removeClass('active');
				obj.parent().addClass('active');
			},
			scrollFunc=function(e){
				var e = e || window.event,
					val = e.wheelDelta || e.detail; //IE/Opera/Chrome || Firefox
				
				if(_db==0){
					_db = 1;
					//_scrolln();
					if(val==120||val==-3){
						_n--;
						if(_n<1) _n=1;
					}else if(val==-120||val==3){
						_n++;
						if(_n>6) _n=6;
					}
					$('.movebox').animate({top:(1-_n)*cht+'px'},1000,function(){_getScroll()});
					//$('html,body').animate({scrollTop:(_n-1)*cht+'px'},1000,function(){_getScroll()});
				}
			};
		//if(document.addEventListener) document.addEventListener('DOMMouseScroll',scrollFunc,false);
		//window.onmousewheel=document.onmousewheel=scrollFunc;
		window.onscroll = function () {_scrolln()};
		//_n = 2;$('.movebox').css({top:(1-_n)*cht+'px'});
		//$('.main').css('height',cht);
		//moveBox.css('height',cht*6);
		//$('.main>.movebox>.box').css('height',cht);
		$('#mainMenu>dt').hover(function(){
			_mouseMenu = $(this).index('#mainMenu>dt');
		},function(){
			$(this).attr('stay',0);
			_mousep2Menu = -1;
		})
		$('#boll>dt>p').hover(function(){
			_mousep1Menu = $(this).index('#boll>dt>p');
		},function(){
			$(this).attr('stay',0);
			_mousep2Menu = -1;
		})
		$('#show>p').hover(function(){
			_mousep2Menu = $(this).index('#show>p');
		},function(){
			$(this).attr('stay','0');
			_mousep2Menu = -1;
		});
		setInterval(function(){
			if(_mouseMenu!=-1){
				var msmenu = $('#mainMenu>dt:eq('+_mouseMenu+')'),
					mstay = parseInt(msmenu.attr('stay'))+1;
				if(mstay>8){
					_n = _mouseMenu+1;
					_mouseMenu = -1;
					_db = 1,
					$('html,body').animate({scrollTop:_pallj[(_n-1)]+'px'},1000,function(){_getScroll()});
				}
				else msmenu.attr('stay',mstay)
			}
			if(_mousep1Menu!=-1){
				var msp1menu = $('#boll>dt>p:eq('+_mousep1Menu+')'),
					msp1tay = parseInt(msp1menu.attr('stay'))+1;
				if(msp1tay>8){
					_p1i = _mousep1Menu;
					_mousep1Menu = -1;
					_getp1Scroll(msp1menu);
					_p1auto = 0;
				}
				else msp1menu.attr('stay',msp1tay)
			}
			if(_n==1){
				_p1auto++;
				if(_p1auto==80){
					_p1auto = 0;
					var atv = $('#boll>dt.active'),
						i = atv.index('#boll>dt');
					if(i==($('.imgscroll>ul>li').length-1)) i = 0;
					else i = i + 1;
					$('.imgscroll>ul').animate({left:'-'+(i*100)+'%'},_atm);
					atv.removeClass('active');
					$('#boll>dt:eq('+(i)+')').addClass('active');
				}
			}else if(_n==2){
				if(_mousep2Menu!=-1){
					var msp2menu = $('#show>p:eq('+_mousep2Menu+')'),
						msp2tay = parseInt(msp2menu.attr('stay'))+1;
					if(msp2tay>8){
						_p2i = _mousep2Menu+1;
						_mousep2Menu = -1;
						jq_menuChange(msp2menu);
						MVC.p2.changeMenu();
					}
					else msp2menu.attr('stay',msp2tay)
				}
			}
		},100);
		getFrame(function(){
			var autoh = 0,
				last = 0;
			$('.autopheight').each(function(i,t){
				var o = $(t),
					ht = parseInt(o.attr('h'))*cwt/_dftw;
				o.css('height',ht+'px');
				if(i<($('.autopheight').length-1)){
					autoh = last + ht/2;
					last += ht;
					_pallh.push(autoh);
					_pallj[(i+1)] = last;
				}
			})
			_pallh.reverse();
			$('.outbox dl').css('width',cwt*6+'px');
			$('.outbox dl dt').css('width',cwt+'px');
			var cfc = cwt/_dftw;
			$('.autoimg').each(function(i,t){
				var o = $(t),
					wt = t = parseInt(o.attr('w'))*_cfc; 
					ht = parseInt(o.attr('h'))*_cfc;
				o.css({width:wt+'px',height:ht+'px'});
			})
			//p1-p6
			$('.imgscroll').css('width',cwt);
			$('.imgscroll>ul>li').css('width',cwt);
			$('.imgscroll>ul').css('width',$('.imgscroll>ul>li').length*cwt);
			_pss.p3t = {};
			_pss.p3t.t = 435*_cfc;
			_pss.p3t.w = 405*_cfc;
			_pss.p3t.h = 94*_cfc;
			$('.box.p3 .txt').css({top:_pss.p3t.t+'px',width:_pss.p3t.w+'px',height:_pss.p3t.h+'px'});
			_pss.p4t = {};
			_pss.p4t.t = 405*_cfc;
			_pss.p4t.w = 548*_cfc;
			_pss.p4t.h = 109*_cfc;
			$('.box.p4 .txt').css({top:_pss.p4t.t+'px',width:_pss.p4t.w+'px',height:_pss.p4t.h+'px'});
			_pss.p4t.t1 = 304*_cfc;
			_pss.p4t.w1 = 217*_cfc;
			_pss.p4t.h1 = 369*_cfc;
			$('.box.p4 .text').css({top:_pss.p4t.t1+'px',width:_pss.p4t.w1+'px',height:_pss.p4t.h1+'px'});
			_pss.p5t = {};
			_pss.p5t.t = 400*_cfc;
			_pss.p5t.w = 358*_cfc;
			_pss.p5t.h = 190*_cfc;
			$('.box.p5 .txt').css({top:_pss.p5t.t+'px',width:_pss.p5t.w+'px',height:_pss.p5t.h+'px'});
			_pss.p6 = {};
			_pss.p6.t = 338*_cfc;
			_pss.p6.s = 8+8*_cfc;
			$('.box.p6 .txt').css({'top':_pss.p6.t+'px','font-size':_pss.p6.s+'px'});
			_pss.p6.dth = 28*_cfc;
			$('.box.p6 .txt dt').css({'line-height':_pss.p6.dth+'px'});
			_pss.p6.wt = 187*_cfc;
			_pss.p6.wl = 264*_cfc;
			_pss.p6.ww = 588*_cfc;
			_pss.p6.wh = 85*_cfc;
			$('.box.p6 .word').css({top:_pss.p6.wt+'px',left:_pss.p6.wl+'px',width:_pss.p6.ww+'px',height:_pss.p6.wh+'px'});
			_pss.p6.ft = 226*_cfc;
			$('.box.p6 .form').css({top:_pss.p6.ft+'px'});
			_pss.p6.fdh = 24+16*_cfc;
			$('.box.p6 .form dt').css({'line-height':_pss.p6.fdh+'px'});
			//p2
			_p2ss.show = {};
			_p2ss.show.t = 134*_cfc;
			_p2ss.show.l = 820*_cfc-200;
			_p2ss.show.s = 6+17*_cfc;
			_p2ss.show.p = 22*_cfc;
			$('#show').css({'padding-top':_p2ss.show.t+'px','font-size':_p2ss.show.s+'px','margin-left':_p2ss.show.l+'px'});
			$('#show p').css({'padding':'0 '+_p2ss.show.p+'px 0 '+_p2ss.show.p+'px','maigin':'0 '+_p2ss.show.p+'px 0 '+_p2ss.show.p+'px'});
			_p2ss.b1 = {};
			_p2ss.b1.vw = 638*_cfc;
			_p2ss.b1.vt = 260*_cfc;
			$('.box1 .video').css({width:_p2ss.b1.vw+'px',height:_p2ss.b1.vw+'px',top:_p2ss.b1.vt+'px'});
			_p2ss.hud = {};
			_p2ss.hud.w = 1416*_cfc;
			_p2ss.hud.h = _p2ss.hud.w*636/1416;
			_p2ss.hud.l = (cwt - _p2ss.hud.w)/2;
			$('.mainback').css({width:_p2ss.hud.w+'px',height:_p2ss.hud.h+'px',left:_p2ss.hud.l+'px'});
			_p2ss.sc = {};
			_p2ss.sc.w = 738*_cfc,
			_p2ss.sc.h = 362*_cfc;
			_p2ss.sc.l = (cwt - _p2ss.sc.w)/2,
			_p2ss.sc.t = 328*_cfc,
			$('.outbox .screen').css({width:_p2ss.sc.w+'px',height:_p2ss.sc.h+'px',left:_p2ss.sc.l+'px',top:_p2ss.sc.t+'px'});
			_p2ss.b1s = {};
			_p2ss.b1s.l = _p2ss.sc.w*0.08,
			_p2ss.b1s.t = _p2ss.sc.h*0.1,
			_p2ss.b1s.h = _p2ss.sc.h*0.7,
			_p2ss.b1s.h1 = _p2ss.b1s.h*0.4,
			$('#slide').css({left:_p2ss.b1s.l+'px',top:_p2ss.b1s.t+'px',height:_p2ss.b1s.h+'px'});
			$('#slide-1').css({height:_p2ss.b1s.h1+'px'}).attr('h',_p2ss.b1s.h1);
			_p2ss.b1t = {};
			_p2ss.b1t.l = _p2ss.sc.w*0.39;
			_p2ss.b1t.t = _p2ss.sc.w*0.03;
			_p2ss.b1t.s = 17*_cfc;
			$('#title').css({'left':_p2ss.b1t.l+'px','top':_p2ss.b1t.t+'px','font-size':_p2ss.b1t.s+'px'});
			_p2ss.b1a = {};
			_p2ss.b1a.l = _p2ss.sc.w*0.4;
			_p2ss.b1a.t = _p2ss.sc.w*0.18;
			_p2ss.b1a.iw = _p2ss.sc.w*0.2;
			_p2ss.b1a.ih = _p2ss.b1a.iw*134/167;
			$('#arrow').css({left:_p2ss.b1a.l+'px',top:_p2ss.b1a.t+'px'});
			$('#arrow img').css({width:_p2ss.b1a.iw+'px',height:_p2ss.b1a.ih+'px'});
			_p2ss.b1e = {};
			_p2ss.b1e.l = _p2ss.sc.w*0.446;
			_p2ss.b1e.b = _p2ss.sc.h*0.12;
			_p2ss.b1e.s = 22*_cfc;
			$('#box2area').css({'left':_p2ss.b1e.l+'px','bottom':_p2ss.b1e.b+'px','font-size':_p2ss.b1e.s+'px'});
			_p2ss.b1g = {};
			_p2ss.b1g.r = _p2ss.sc.w*0.08;
			_p2ss.b1g.wh = _p2ss.sc.w*0.09;
			$('#camero,#monitor,#traffic').css({right:_p2ss.b1g.r+'px',width:_p2ss.b1g.wh+'px',height:_p2ss.b1g.wh+'px'});
			$('#camero').css('top',_p2ss.b1g.wh*0.8+'px');
			$('#monitor').css('top',_p2ss.b1g.wh*2.2+'px');
			$('#traffic').css('top',_p2ss.b1g.wh*3.3+'px');
			_p2ss.b5t = {};
			_p2ss.b5t.t1t = _p2ss.sc.h*0.28,
			_p2ss.b5t.t1s = 30+22*_cfc,
			_p2ss.b5t.t2s = 18+6*_cfc,
			$('#box5t1').css({'top':_p2ss.b5t.t1t+'px','font-size':_p2ss.b5t.t1s+'px'});
			$('#box5t2').css({'top':(_p2ss.b5t.t1t+_p2ss.b5t.t1s*1.1)+'px','font-size':_p2ss.b5t.t2s+'px'});
			_p2ss.b5m = {};
			_p2ss.b5m.l = _p2ss.sc.w*0.52;
			_p2ss.b5m.t = _p2ss.sc.h*0.3;
			_p2ss.b5m.a = _p2ss.sc.h*0.2;
			$('#music').css({left:_p2ss.b5m.l+'px',top:_p2ss.b5m.t+'px'});
			$('.stat2').css({height:_p2ss.b5m.a+'px'});
			_p2ss.b5c= {};
			_p2ss.b5c.wh = _p2ss.sc.h*1.5;
			_p2ss.b5c.t = _p2ss.sc.h*-0.25;
			_p2ss.b5c.r = _p2ss.sc.w*-0.4;
			$('.cdimg,.cdimg2').css({width:_p2ss.b5c.wh+'px',height:_p2ss.b5c.wh+'px',top:_p2ss.b5c.t+'px',right:_p2ss.b5c.r+'px'});
			_p2ss.b5c.hwh = _p2ss.b5c.wh*0.3;
			_p2ss.b5c.htl = _p2ss.b5c.wh*0.35-10;
			$('.bg1').css({width:_p2ss.b5c.hwh+'px',height:_p2ss.b5c.hwh+'px',top:_p2ss.b5c.htl+'px',left:_p2ss.b5c.htl+'px'});
			_p2ss.b5v = {};
			_p2ss.b5v.w = 925*_cfc;
			_p2ss.b5v.h = 902*_cfc;
			_p2ss.b5v.t = 60*_cfc;
			$('img.cover-img').css({width:_p2ss.b5v.w+'px',height:_p2ss.b5v.h+'px',top:_p2ss.b5v.t+'px'});
			_p2ss.b5tm = {};
			_p2ss.b5tm.w = _p2ss.sc.w*0.26;
			_p2ss.b5tm.l = _p2ss.sc.w*0.42;
			_p2ss.b5tm.t = _p2ss.sc.h*0.68;
			$('#box5-time').css({left:_p2ss.b5tm.l+'px',top:_p2ss.b5tm.t+'px',width:_p2ss.b5tm.w+'px'});
			_p2ss.b6p = {};
			_p2ss.b6p.w = _p2ss.sc.h*0.6;
			_p2ss.b6p.h = _p2ss.b6p.w*210/258;
			_p2ss.b6p.t = _p2ss.sc.h*0.05;
			_p2ss.b6p.l = _p2ss.sc.w*0.36;
			$('#photo').css({width:_p2ss.b6p.w+'px',height:_p2ss.b6p.h+'px',top:_p2ss.b6p.t+'px',left:_p2ss.b6p.l+'px'});
			_p2ss.b6pn = {};
			_p2ss.b6pn.w = _p2ss.sc.w*0.3;
			_p2ss.b6pn.h = _p2ss.b6pn.w*56/232;
			_p2ss.b6pn.t = _p2ss.sc.h*0.05;
			$('.phonenumb').css({width:_p2ss.b6pn.w+'px',height:_p2ss.b6pn.h+'px',top:_p2ss.b6pn.t+'px',left:_p2ss.b6pn.t+'px'});
			_p2ss.b6a = {};
			_p2ss.b6a.l = _p2ss.sc.w*0.73;
			_p2ss.b6a.hul = _p2ss.sc.w*0.15;
			_p2ss.b6a.wh = _p2ss.sc.h*0.25;
			_p2ss.b6a.awh = _p2ss.b6a.wh*98/112;
			$('.answer').css({left:_p2ss.b6a.l+'px'});
			$('.hangup').css({left:_p2ss.b6a.hul+'px'}).attr('l',_p2ss.sc.w*0.295);
			$('.answer,.hangup').css({width:_p2ss.b6a.wh+'px',height:_p2ss.b6a.wh+'px'});
			$('.answer a,.hangup a').css({width:_p2ss.b6a.awh+'px',height:_p2ss.b6a.awh+'px'});
			_p2ss.b6c = {};
			_p2ss.b6c.tl = _p2ss.sc.w*0.465;
			_p2ss.b6c.tt = _p2ss.sc.h*0.52;
			_p2ss.b6c.hdl = _p2ss.sc.w*0.48;
			_p2ss.b6c.drl = _p2ss.sc.w*0.28;
			_p2ss.b6c.drr = _p2ss.sc.w*0.56;
			$('.timer').css({top:_p2ss.b6c.tt+'px',left:_p2ss.b6c.tl+'px'});
			$('.hand').css({left:_p2ss.b6c.hdl+'px'});
			$('.drleft').css({left:_p2ss.b6c.drl+'px'});
			$('.dright').css({left:_p2ss.b6c.drl*2+'px'});
			$('.drleft-1').css({left:(_p2ss.b6c.drl+22)+'px'});
			$('.drleft-2').css({left:(_p2ss.b6c.drl+22*2)+'px'});
			$('.drleft-3').css({left:(_p2ss.b6c.drl+22*3)+'px'});
			$('.drleft-4').css({left:(_p2ss.b6c.drl+22*4)+'px'});
			$('.dright-1').css({left:(_p2ss.b6c.drr+22)+'px'});
			$('.dright-2').css({left:(_p2ss.b6c.drr+22*2)+'px'});
			$('.dright-3').css({left:(_p2ss.b6c.drr+22*3)+'px'});
			$('.dright-4').css({left:(_p2ss.b6c.drr+22*4)+'px'});
			_p2ss.b3bg = {};
			_p2ss.b3bg.wh = _p2ss.sc.h*1.1;
			_p2ss.b3bg.l = _p2ss.sc.w*0.24;
			_p2ss.b3bg.t = -_p2ss.sc.h*0.08;
			$('.box3-1').css({width:_p2ss.b3bg.wh+'px',height:_p2ss.b3bg.wh+'px',top:_p2ss.b3bg.t+'px',left:_p2ss.b3bg.l+'px'});
			_p2ss.b3d = {};
			_p2ss.b3d.wh = _p2ss.sc.h*0.88;
			_p2ss.b3d.l = _p2ss.sc.w*0.295;
			_p2ss.b3d.t = _p2ss.sc.w*0.018;
			$('.box3-2').css({width:_p2ss.b3d.wh+'px',height:_p2ss.b3d.wh+'px',top:_p2ss.b3d.t+'px',left:_p2ss.b3d.l+'px'});
			$('.pie_left_amt').css({width:_p2ss.b3d.wh+'px',height:_p2ss.b3d.wh+'px'});
			$('.pie_lefts,.lefts').css({width:_p2ss.b3d.wh+'px',height:_p2ss.b3d.wh+'px',clip:'rect(0,'+(_p2ss.b3d.wh*0.57)+'px,auto,0)'});
			_p2ss.b3t = {};
			_p2ss.b3t.t1l = _p2ss.sc.w*0.41;
			_p2ss.b3t.t1w = _p2ss.sc.w*0.2;
			_p2ss.b3t.t1s = 2+10*cht/_dfth;
			_p2ss.b3t.t1t = _p2ss.sc.h*0.32;
			$('#box3t .text1').css({'top':_p2ss.b3t.t1t+'px','left':_p2ss.b3t.t1l+'px','width':_p2ss.b3t.t1w+'px','font-size':_p2ss.b3t.t1s+'px'});
			_p2ss.b3t.t2t = _p2ss.sc.h*0.72;
			_p2ss.b3t.t2s = 15+15*_cfc;
			_p2ss.b3t.t2l = _p2ss.sc.w*0.5;
			$('#box3t .text2').css({'top':_p2ss.b3t.t2t+'px','left':_p2ss.b3t.t2l+'px','font-size':_p2ss.b3t.t2s+'px'});
			_p2ss.b3t.t3t = _p2ss.sc.h*0.84;
			_p2ss.b3t.t3w = _p2ss.sc.w*0.25;
			_p2ss.b3t.t3l1 = _p2ss.sc.w*0.05;
			_p2ss.b3t.t3l2 = _p2ss.sc.w*0.43;
			_p2ss.b3t.t3l3 = _p2ss.sc.w*0.8;
			$('#box3t .text3').css({'top':_p2ss.b3t.t3t+'px','width':_p2ss.b3t.t3w+'px'});
			$('#box3t .text3.btn1').css({left:_p2ss.b3t.t3l1+'px'});
			$('#box3t .text3.btn2').css({left:_p2ss.b3t.t3l2+'px'});
			$('#box3t .text3.btn3').css({left:_p2ss.b3t.t3l3+'px'});
			_p2ss.b3t.t4w =  _p2ss.sc.w*0.28;
			_p2ss.b3t.t4l =  _p2ss.sc.w*0.72;
			_p2ss.b3t.t4t =  -_p2ss.sc.h*0.02;
			_p2ss.b3t.t4s =  6 + 8*_cfc;
			$('#box3t .text4').css({'width':_p2ss.b3t.t4w+'px','left':_p2ss.b3t.t4l+'px','top':_p2ss.b3t.t4t+'px','font-size':_p2ss.b3t.t4s+'px'});
			_p2ss.b3t.t5l =  _p2ss.sc.w*0.735;
			_p2ss.b3t.t5t =  _p2ss.sc.h*0.22;
			_p2ss.b3t.t5s =  10+12*_cfc;
			$('#box3t .text5').css({'left':_p2ss.b3t.t5l+'px','top':_p2ss.b3t.t5t+'px','font-size':_p2ss.b3t.t5s+'px'});
			$('#box3t .text6').css({'left':_p2ss.b3t.t5l*1.02+'px','top':_p2ss.b3t.t5t*1.8+'px','font-size':_p2ss.b3t.t5s+'px'});
			$('#box3t .text7').css({'left':_p2ss.b3t.t5l*1.02+'px','top':_p2ss.b3t.t5t*2.5+'px','font-size':_p2ss.b3t.t5s+'px'});
			$('#box3t .text8').css({'left':_p2ss.b3t.t5l*0.98+'px','top':_p2ss.b3t.t5t*3.2+'px','font-size':_p2ss.b3t.t5s+'px'});
			_p2ss.b3t.t9l =  _p2ss.sc.w*0.3;
			_p2ss.b3t.t9t =  _p2ss.sc.h*0.8;
			_p2ss.b3t.t9s =  6+8*cht/_dfth;
			$('#box3t .text9').css({'left':_p2ss.b3t.t9l*1.02+'px','top':_p2ss.b3t.t9t+'px','font-size':_p2ss.b3t.t9s+'px'});
			_p2ss.b3t.p2wh = _p2ss.sc.h*0.1;
			_p2ss.b3t.p2t = _p2ss.sc.h*0.42;
			_p2ss.b3t.p2l = _p2ss.sc.w*0.485;
			_p2ss.b3t.p21w = _p2ss.sc.h*0.467;
			_p2ss.b3t.p22w = _p2ss.sc.h*0.185;
			$('.box3-p2').css({width:_p2ss.b3t.p2wh+'px',height:_p2ss.b3t.p2wh+'px',top:_p2ss.b3t.p2t+'px',left:_p2ss.b3t.p2l+'px'});
			$('.box3-p2 .d-1').css({width:_p2ss.b3t.p21w+'px'});
			$('.box3-p2 .d-2').css({width:_p2ss.b3t.p22w+'px'});
			_p2ss.b3t.pwh = _p2ss.sc.h*0.48;
			_p2ss.b3t.pt = _p2ss.sc.h*0.23;
			_p2ss.b3t.pl = _p2ss.sc.w*0.39;
			$('.box3-p3').css({width:_p2ss.b3t.pwh+'px',height:_p2ss.b3t.pwh+'px',top:_p2ss.b3t.pt+'px',left:_p2ss.b3t.pl+'px'});
			$('.pie_left3,.left3').css({width:_p2ss.b3t.pwh+'px',height:_p2ss.b3t.pwh+'px',clip:'rect(0,'+(_p2ss.b3t.pwh)+'px,auto,0)'});
			
			$('.gears .lefts').css('transform','rotate('+(156+13*_cfc)+'deg)');
			_p2ss.yb = {};
			_p2ss.yb.wh = _p2ss.sc.h*0.02;
			_p2ss.yb.t = _p2ss.sc.h*0.46;
			_p2ss.yb.l = _p2ss.sc.w*0.505;
			_p2ss.yb.sw = _p2ss.sc.h*0.425;
			_p2ss.yb.spw = _p2ss.sc.h*0.18;
			_p2yibiao(40);
		});
		return {
			p2yibiao : function(num){
				_p2yibiao(num);
			},
			getAtm : function(){
				return _atm;
			},
			getN : function(){
				return _n;
			}
		}
	})();
	MVC.p2 = (function(){
		var _moveDom = $('#move-p2'),
			_taskn = {
				m : 0,
				b3 : 0,
				b5 : 0
			},
			_p2task = {
				m : 0,
				b1 : {
					t : 0,
					ar : 1
				},
				b3 : {
					t1 : $('.box3-text .text3 .word:eq(0)'),
					t2 : $('.box3-text .text3 .word:eq(1)'),
					t3 : $('.box3-text .text3 .word:eq(2)'),
					a1 : {
						outd : -27,
						ind : 160,
						b : [-27,160],
						back : 0
					},
					a2 : {
						outd : -137,
						ind : 188,
						back : 0,
						b : [-137,188],
						s : 1
					},
					a3 : {
						num : 3,
						db : 3,
						data : 3,
						nb : 3,
						back : 0,
						add : 1,
						d : 1,
						c : [38,65,82]
					},
				},
				b5 : {
					o : document.getElementById('myaudio'),
					p : 0,
					s : 0,
					a1 : $('#music .stat1'),
					a2 : $('#music .stat2'),
				},
				b6 : {
					l : 0,
				}
			},
			_audioOpen = function(){
				_p2task.b5.o.volume = 1;
				_p2task.b5.o.play();
				_p2task.b5.a1.hide();
				_p2task.b5.a2.show();
				_p2task.b5.p = 0;
				$('.cdimg2').attr('class','cdimg');
			},
			_changeMenu = function(){
				var i = $('#show>p.active').index('#show>p');
				if(i==0){
					$('.p2b1').hide();
					$('.mainback').hide();
					_audioClose();
				}else{
					if(i==4){
						$('.box-5').show().css({top:'-=50px',opacity:0}).animate({top:'+=50px',opacity:1},2000);
						_audioOpen();
						$('.cover-img').show();
						$('.rotate').show();
						$('#box5-time').css({'width':'-=84px','left':'+=42px'}).animate({'width':'+=84px','left':'-=42px'},1000);
					}else{
						_audioClose();
						$('.cover-img').hide();
						$('.rotate').hide();
					}
					if(i==5){}
					else{
						_p2box6Hangup();
					}
					$('.p2b1').show();
					$('.mainback').show();
				}
				_p2task.m = i;
				_moveDom.css({left:(i*-100)+'%'});
				_moveDom.find('>dt:eq('+i+')').hide().fadeIn(1000);
			}
			_audioClose = function(){
				_p2task.b5.p = 1;
				_p2task.b5.a1.show();
				_p2task.b5.a2.hide();
				$('.cdimg').attr('class','cdimg2');
			},
			_circlef = function(numbs){
				if (numbs<=180){
					$('.pie_right .right').css('transform', "rotate(" + numbs + "deg)");
					$('.pie_left .left').css('transform', "rotate(0deg)");
				}else if(numbs<=360) {
					$('.pie_right .right').css('transform', "rotate(180deg)");
					$('.pie_left .left').css('transform', "rotate(" + (numbs - 180) + "deg)");
				}
			},
			_p2box3Date = function(){
				$('.box3-text .week').text(getWeekTime());
				$('.box3-text .date').text(getHmTm({
					get : [0,1,1,0,0,0],
					con : ['','月','日','','']
				}));
				$('.box3-text .text4 .word').text(getHmTm({
					get : [0,0,0,1,1,0],
					con : ['','','',':','']
				}));
			},
			_p2box6Answer = function(){
				if(_p2task.b6.l == 0){
					_p2task.b6.l = 1;
					$('.asrstate').hide();
					$('.hangup').animate({left:'+='+parseInt($('.hangup').attr('l'))+'px',bottom:'+=10px'},1000,function(){
						$('.timer').fadeIn(1000);
						$('.timer>.num').text('0:00');
					});
				}
			},
			_p2box6Hangup = function(){
				if(_p2task.b6.l == 1){
					_p2task.b6.l = 0;
					_taskn.b5 = 0;
					$('.timer').fadeOut(1000);
					$('.timer>.num').text('0:00');
					$('.hangup').animate({left:'-='+parseInt($('.hangup').attr('l'))+'px',bottom:'-=10px'},1000,function(){
						$('.asrstate').show();
					});
				}
			},
		$('#music').click(function(){
			if(_p2task.b5.a1.css('display')=='none') {
				_audioClose();
			}else{
				_audioOpen();
			}
		});
		_p2box3Date();
		$('.answer').click(function(){
			_p2box6Answer();
		})
		$('.hangup').click(function(){
			_p2box6Hangup();
		})
		var	_task = setInterval(function(){
				var ns = MVC.base.getN(),
					allnm = 3;
				if(ns==2){
					_taskn.m++;
					if(_p2task.m==1){
						if(_taskn.m%2==0){
							var sd = (parseFloat($('#slide-1 span').text()) + 0.03).toFixed(2),
								sh = parseFloat($('#slide-1').css('height')) + 1;
							if(sd>3.6){
								sd = 2.2;
								$('#slide-1').css('height',  $('#slide-1').attr('h')+ 'px');
								$('#slide-1 span').text('2.2公里');
							}else{
								$('#slide-1 span').text(sd + '公里');
								$('#slide-1').css('height',sh + 'px');
							}
						}
						if(_taskn.m%10==0){
							if(_p2task.b1.ar==1){
								allnm++;
								$('.p2twinkle-1').addClass('p2twinkle');
							}else allnm = 3;
							_p2task.b1.t++;
							if(_p2task.b1.t==allnm){
								_p2task.b1.t = 0;
								//箭头交替变换
								_p2task.b1.ar++;
								if(_p2task.b1.ar==4) {
									$('#slide-1').css('height',  $('#slide-1').attr('h')+ 'px');
									$('#slide-1 span').text('2.2公里');
									_p2task.b1.ar = 1;
								}
								$('.p2twinkle').removeClass('p2twinkle');
								$('.p2twinkle-'+_p2task.b1.ar).addClass('p2twinkle');
								$('.p2-d').hide();
								$('.p2-d-'+_p2task.b1.ar).fadeIn(200);
							}
						}
					}
					else if(_p2task.m==2){
						//return;
						_taskn.b3++;
						if(_p2task.b3.a1.ind>170 || _p2task.b3.a1.back == 1){
							$('.pie_left_amt7 .lefts').css('border','8px solid #c60000');
							_p2task.b3.a1.back = 1;
							_p2task.b3.a1.ind += 0.05;
							_p2task.b3.a1.outd -= 0.05;
							if(_p2task.b3.a1.ind>180){
								_p2task.b3.a1.ind += 0.001;
								_p2task.b3.a1.outd -= 0.001;
							}
						}
						else{
							_p2task.b3.a1.ind += 0.1;
							_p2task.b3.a1.outd -= 0.1;
						}
						//仪表转动
						if(_p2task.b3.a3.add==1){
							if(_p2task.b3.a3.data<_p2task.b3.a3.c[0]){
								_p2task.b3.a3.data ++;
								_p2task.b3.a3.num += 1.07;
								_p2task.b3.a2.s = 1.6;
								_p2task.b3.a2.ind -= _p2task.b3.a2.s;
								_p2task.b3.a2.outd += _p2task.b3.a2.s;
							}
							else if(_p2task.b3.a3.data>=_p2task.b3.a3.c[0]&&_p2task.b3.a3.data<_p2task.b3.a3.c[1]){
								_p2task.b3.a3.data += 0.5;
								_p2task.b3.a3.num += 0.745;
								if(_p2task.b3.a3.d==1){
									_p2task.b3.a3.d++;
									_p2task.b3.a2.s = -6;
								}else{
									_p2task.b3.a2.ind -= _p2task.b3.a2.s;
									_p2task.b3.a2.outd += _p2task.b3.a2.s;
									if(_p2task.b3.a2.s<0&&_p2task.b3.a2.ind>188){
										_p2task.b3.a2.s = 1.6;
									};
								}
							}
							else if(_p2task.b3.a3.data>=_p2task.b3.a3.c[1]&&_p2task.b3.a3.data<_p2task.b3.a3.c[2]){
								_p2task.b3.a3.data += 0.3;
								_p2task.b3.a3.num += 0.7;
								if(_p2task.b3.a3.d==2){
									_p2task.b3.a3.d++;
									_p2task.b3.a2.s = -6;
								}else{
									_p2task.b3.a2.ind -= _p2task.b3.a2.s;
									_p2task.b3.a2.outd += _p2task.b3.a2.s;
									if(_p2task.b3.a2.s<0&&_p2task.b3.a2.ind>188){
										_p2task.b3.a2.s = 1.6;
									};
								}
							}
							else{
								_p2task.b3.a3.add = 0;
							}
						}else if(_p2task.b3.a3.add==0){
							_p2task.b3.a3.data --;
							_p2task.b3.a3.num -= 1.4;
							if(_p2task.b3.a3.data<_p2task.b3.a3.c[1]&&_p2task.b3.a3.d==3) _p2task.b3.a3.d = 2;
							else if(_p2task.b3.a3.data<_p2task.b3.a3.c[0]&&_p2task.b3.a3.d==2) _p2task.b3.a3.d = 1;
							_p2task.b3.a2.s = -0.8;
							_p2task.b3.a2.ind -= _p2task.b3.a2.s;
							_p2task.b3.a2.outd += _p2task.b3.a2.s;
							if(_p2task.b3.a3.data<3){
								_p2task.b3.a3.add = 1;
								_p2task.b3.a3.data = _p2task.b3.a3.db;
								_p2task.b3.a3.num = _p2task.b3.a3.nb;
								_p2task.b3.a2.outd = _p2task.b3.a2.b[0];
								_p2task.b3.a2.ind = _p2task.b3.a2.b[1];
								_p2task.b3.a1.outd = _p2task.b3.a1.b[0];
								_p2task.b3.a1.ind = _p2task.b3.a1.b[1];
								$('.pie_left_amt3 .lefts').css('border','8px solid rgba(203,203,203,0.5)');
								$('.pie_left_amt8 .lefts').css('border','8px solid #c60000');
								$('#geart').text('P');
								_taskn.b3 = 1;
								_p2task.b5.s = 0;
								_p2task.b3.a1.back = 0;
								$('.pie_left_amt7 .lefts').css('border','8px solid #009ced');
							}
						}
						MVC.base.p2yibiao(_p2task.b3.a3.data);
						$('#speedt').text(parseInt(_p2task.b3.a3.num));
						$('.pie_left_amt6').css('transform','rotate('+_p2task.b3.a2.outd+'deg)');
						$('.pie_left_amt6 .lefts').css('transform','rotate('+_p2task.b3.a2.ind+'deg)');
						$('.pie_left_amt7').css('transform','rotate('+_p2task.b3.a1.outd+'deg)');
						$('.pie_left_amt7 .lefts').css('transform','rotate('+_p2task.b3.a1.ind+'deg)');

						if(_taskn.b3%20==0&&_p2task.b5.s==0){
							_p2task.b5.s = 1;
							$('.pie_left_amt3 .lefts').css('border','8px solid #00ffd8');
							$('.pie_left_amt8 .lefts').css('border','8px solid rgba(203,203,203,0.5)');
							$('#geart').text('D');
						}
						if (_taskn.m%30==0){
							_p2task.b3.t1.text(parseInt(parseInt(_p2task.b3.t1.text())+1)+'KM');
							_p2task.b3.t2.text(parseInt(parseInt(_p2task.b3.t2.text())+1)+'KM');
						}
						if (_taskn.m%50==0){
							_p2task.b3.t3.text(parseInt(Math.random()*10+45)+'℃');
						}
						if (_taskn.m%100==0){
							_p2box3Date();
						}
					}
					else if(_p2task.m==4){
						if(_p2task.b5.p==1 && !_p2task.b5.o.paused){
							if (_p2task.b5.o.volume < 0.5) _p2task.b5.o.volume -= 0.005;
							else _p2task.b5.o.volume -= 0.01;
							if (_p2task.b5.o.volume < 0.01) {
								_p2task.b5.o.pause();
							}
						}if(_p2task.b5.p==0){
							if(_taskn.m%10==0){
								var txt = $('#musicadd').text(),
									txtlist = txt.split(':'),
									mnt = parseInt(txtlist[0]),
									scd = parseInt(txtlist[1]),
									vallsec = mnt*60 + scd;
								vallsec ++;
								if(vallsec>253) vallsec = 1;
								mnt = parseInt(vallsec/60);
								scd = vallsec%60;
								$('#musicadd').text(toDouble(mnt)+':'+toDouble(scd));
							}
						}
					}
					else if(_p2task.m==5){
						_taskn.b5++;
						if(_taskn.b5%2==0){
							var atv = $('.drleft.active'),idv = atv.index('.drleft');
							idv--;
							if(idv<0) idv=3;
							atv.removeClass('active').attr('src','/static/img/pro/p2/call/1.1.png');
							$('.drleft:eq('+idv+')').addClass('active').attr('src','/static/img/pro/p2/call/1.png');
							
							var atv2 = $('.dright.active'),idv2 = atv2.index('.dright');
							idv2++;
							if(idv2>3) idv2=0;
							atv2.removeClass('active').attr('src','/static/img/pro/p2/call/2.1.png');
							$('.dright:eq('+idv2+')').addClass('active').attr('src','/static/img/pro/p2/call/2.png');
						}
						if(_taskn.b5%10==0){
							var ntxt = $('.timer>.num').text().split(':'),
								ndt = parseInt(ntxt[0])*60+parseInt(ntxt[1])+1,
								min = parseInt(ndt/60),
								sec = ndt%60;
							$('.timer>.num').text(min+':'+toDouble(sec));
						}
						if(_taskn.b5%100==0){
							_p2box6Answer();
						}
					}
				}
			},100)
		return {
			audioClose : function(){
				return _audioClose();
			},
			getMenu : function(){
				return _p2task.m;
			},
			changeMenu : function(){
				_changeMenu();
			}
		}
	})();
	MVC.p6 = (function(){
		$('.showform').click(function(){
			$('.form').show();
			$('#f-name').focus();
		});
		$('.submit').click(function(){
			var name = $('#f-name').val(),
				age = $('#f-age').val(),
				sex = $('#f-sex .active').attr('d'),
				tp = $('#f-tp .active').attr('d'),
				mobile = $('#f-mobile').val(),
				email = $('#f-email').val(),
				company = $('#f-company').val(),
				job = $('#f-job').val(),
				advice = '',
				isc = 0;
			$('#f-advice input').each(function(k,i){
				var v = $(i).val();
				if(v) advice += v;
			});
			if(!name){
				alert('请填写姓名。');
				return;
			}
			if(mobile.length>=11) isc = 1;
			if(email && email.indexOf('@')!=-1) isc = 1;
			if(isc==0){
				alert('请填写正确的手机或邮箱。');
				return;
			}
			$.ajax({
				url : '/submit99/',
				data : {
					name: name,
					age: age,
					sex: sex,
					mobile: mobile,
					email: email,
					tp: tp,
					company: company,
					job: job,
					advice:advice
				},
				dataType : 'json'
			}).done(function(data){
				if(data==1) alert('谢谢，提交成功，工作人员会跟您联系!');;
				$('.form').hide();
			}).fail(function(jqXHR,textStatus){
				log(' request failed'+jqXHR+','+textStatus);
			})
		});
		$('.form>.close').click(function(){
			$('.form').hide();
		});
		$('.form .sex>b').click(function(){
			jq_menuChange($(this));
		});
		$('.form .who>b').click(function(){
			jq_menuChange($(this));
		});
		$('.form>.frt>dt>input').keyup(function(e){ 
			var alllen = $(this).attr('maxlength'),
				len = $(this).val().length,
				i = $(this).index('.form>.frt>dt>input');
			if(len==alllen){
				$('.form>.frt>dt>input:eq('+(i+1)+')').focus();
			}
		});
	})();
	MVC.init = (function(){
		$(window).resize(function(){location.href=''});
	})
	window.MVC = MVC;
})();
MVC.init();