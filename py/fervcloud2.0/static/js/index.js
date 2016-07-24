checkLeave = function(){
	$(document).scrollTop(0);
};
(function(){
	var MVC = MVC || {};
	MVC.base = (function(){
		var moveBox = $('.main>.movebox'),
			_n = 1,
			//_arrow = 1,
			_mouseMenu = -1,
			_mousep1Menu = -1,
			_mousep2Menu = -1
			_p1i = 0,
			_p2i = 0,
			_db = 0,
			_atm = 800,
			_dftw = 1920,
			_dfth = 920,
			_p1auto = 0;
			_scrolln = function(){
				if(_db==0){
					var top = document.documentElement.scrollTop || document.body.scrollTop;  
					if(top<cht*0.4) _n = 1;
					else if(top>=cht*0.4&&top<cht*1.4) _n = 2;
					else if(top>=cht*1.4&&top<cht*2.4) _n = 3;
					else if(top>=cht*2.4&&top<cht*3.4) _n = 4;
					else if(top>=cht*3.4&&top<cht*4.4) _n = 5;
					else if(top>=cht*4.4) _n = 6;
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
				/*
				if(_n==3) jq_domUpToDown($('#txt-3'));
				else $('#txt-3').hide();
				if(_n==4) jq_domUpToDown($('#txt-4'));
				else $('#txt-4').hide();
				if(_n==5) jq_domUpToDown($('#txt-5'));
				else $('#txt-5').hide();
				*/
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
		if(document.addEventListener) document.addEventListener('DOMMouseScroll',scrollFunc,false);
		window.onmousewheel=document.onmousewheel=scrollFunc;
		//window.onscroll = function () {_scrolln()};
		$('.main').css('height',cht);
		moveBox.css('height',cht*6);
		$('.main>.movebox>.box').css('height',cht);
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
					$('.movebox').animate({top:(1-_n)*cht+'px'},1000,function(){_getScroll()});
					//$('html,body').animate({scrollTop:(_n-1)*cht+'px'},1000,function(){_getScroll()});
					//jq_menuChange(msmenu);
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
			var pw2 = cwt*0.7375,
				pw2 = cwt;
			$('.outbox').css({'width':pw2+'px'});//,left:cwt*0.13125+'px'
			$('.outbox dl').css('width',pw2*6+'px');
			$('.outbox dl dt').css('width',pw2+'px');
			$('.box1 .video').css({width:(648*cht/_dfth)+'px',top:((_dfth-cht)/2+68*cht/_dfth)+'px'});
			if(cht<880){
				//$('.cdimg').css({'clip':'rect(0px,440px,auto,0px)'});
				$('.box.p3 .txt').css({top:'260px',left:'35%'});
				$('.box.p4 .txt').css({top:'260px',left:'5%',width:'400px',height:'80px'});
				$('.box.p4 .text').css({top:'160px',left:'40%'});
				$('.box.p5 .txt').css({top:'250px',right:'10%'});
				$('.box.p6 .txt').css({top:'230px',left:(250*cwt/_dftw)+'px'});
				$('.mainback').css({top:((_dfth-cht)/2+102*cht/_dfth)+'px'});
				$('.cover-img').css({width:(925*cht*0.5/_dfth)+'px',height:(902*cht/_dfth)+'px'});
			}else if(cht>930){
				$('.mainback').css({top:((_dfth-cht)/2+102*cht/_dfth)+'px'});
			}
			$('.box.p6 .word').css({top:(187*cwt/_dftw)+'px',left:(264*cwt/_dftw)+'px',width:(588*cwt/_dftw)+'px',height:(85*cwt/_dftw)+'px'});
			$('.box.p6 .form').css({top:(226*cwt/_dftw)+'px',left:(630*cwt/_dftw)+'px'});
			$('.box1 .video video').css({left:(648*cht/_dfth-648)/2+'px'});
			$('#show').css({'padding-top':(134*cht/_dfth)+'px','font-size':(23*cht/_dfth)+'px'});
			$('.mainback').css({left:(pw2-1416)/2+'px'});
			$('.outbox .screen').css({left:(334-(1416-pw2)/2)+'px',top:((_dfth-cht)/2+102*cht/_dfth)+'px'});
		});
		return {
			getAtm : function(){
				return _atm;
			},
			getN : function(){
				return _n;
			}
		}
	})();
	MVC.p1 = (function(){
		var _atm = MVC.base.getAtm(),
			lenli = $('.imgscroll>ul>li').length,
			_cw = document.body.clientWidth;
		$('.imgscroll').css('width',_cw);
		$('.imgscroll>ul>li').css('width',_cw);
		$('.imgscroll>ul').css('width',lenli*_cw);
	})();
	MVC.p2 = (function(){
		var _moveDom = $('#move-p2'),
			pShow,
			_tasknum = 0,
			_menu = 0,
			_p2_1 = 0,
			_arrow = 1,
			_onumb = 200,
			_p2box3amt1 = {
				outd : -48,
				ind : 179,
				back : 0
			},
			_p2box3amt2 = {
				outd : -134,
				ind : 179,
				back : 0
			},
			_p2box3amt3 = {
				data : -39,
				back : 0
			},
			_zeroTask,
			_audio = document.getElementById('myaudio'),
			_isaudio = 0,
			_isPaused = 0,
			_box3Num = 0,
			_box5Num = 0,
			_box3txt1 = $('.box3-text .text3 .word:eq(0)'),
			_box3txt2 = $('.box3-text .text3 .word:eq(1)'),
			_box3txt3 = $('.box3-text .text3 .word:eq(2)'),
			_box3isOpen = 0,
			_box3isListen = 0,
			_music = $('#music'),
			_stat1 = _music.find('.stat1'),
			_stat2 = _music.find('.stat2'),
			_audioOpen = function(){
				_audio.volume = 1;
				_audio.play();
				_isaudio = 0;
				_stat1.hide();
				_stat2.show();
				_isPaused = 0;
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
				_p2Animate(i==1);
				_menu = i;
				_moveDom.css({left:(i*-100)+'%'});
				_moveDom.find('>dt:eq('+i+')').hide().fadeIn(1000);
			}
			_audioInterval = setInterval(function(){
				if(_isPaused==1 && !_audio.paused){
					if (_audio.volume < 0.5) _audio.volume -= 0.005;
					else _audio.volume -= 0.01;
					if (_audio.volume < 0.01) {
						//clearInterval(_audioInterval);
						_isaudio = 0;
						_audio.pause();
					}
				}
			},50);
			_audioClose = function(){
				_isaudio = 1;
				_isPaused = 1;
				_stat1.show();
				_stat2.hide();
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
				if(_box3isListen == 0){
					_box3isListen = 1;
					$('.asrstate').hide();
					$('.hangup').animate({left:'+=180px',bottom:'+=10px'},1000,function(){
						$('.timer').fadeIn(1000);
						$('.timer>.num').text('0:00');
					});
				}
			},
			_p2box6Hangup = function(){
				if(_box3isListen == 1){
					_box3isListen = 0;
					_box5Num = 0;
					$('.timer').fadeOut(1000);
					$('.timer>.num').text('0:00');
					$('.hangup').animate({left:'-=180px',bottom:'-=10px'},1000,function(){
						$('.asrstate').show();
					});
				}
			},
			_p2Animate = function(isTrue){
				if(isTrue){
					var numb = 0;
					$('#slide-1').animate({height:'170px',top:'40px'},{
						duration : 10000,
						step : function(){
							numb++;
							if(numb%130==0){
								var d = (parseFloat($('#slide-1 span').text()) + 0.1).toFixed(1);
								if(d>3.6) return;
								$('#slide-1 span').text(d + '公里');
							}
						}
					})
				}else {
					$('#slide-1 span').text('2.2公里');
					$('#slide-1').stop(true,true).css({height:'123.2px',top:'86.8px'});
					$('.p2twinkle').removeClass('p2twinkle');
					$('.p2-d').hide();
					$('.p2-d-1').show();
					_p2_1 = 0;
					_arrow = 1;
				}
			};
		_music.click(function(){
			if(_stat1.css('display')=='none') {
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
		var	task = setInterval(function(){
				var ns = MVC.base.getN(),
					allnm = 3;
				if(ns==2){
					_tasknum++;
					if(_menu==1){
						if(_tasknum%10==0){
							if(_arrow==1){
								allnm++;
								$('.p2twinkle-1').addClass('p2twinkle');
							}else allnm = 3;
							_p2_1++;
							if(_p2_1==allnm){
								_p2_1 = 0;
								//箭头交替变换
								_arrow++;
								if(_arrow==4) {
									_p2Animate();
									_p2Animate(1);
									_arrow = 1;
								}
								$('.p2twinkle').removeClass('p2twinkle');
								$('.p2twinkle-'+_arrow).addClass('p2twinkle');
								$('.p2-d').hide();
								$('.p2-d-'+_arrow).fadeIn(200);
							}
						}
					}
					else if(_menu==2){
						_box3Num++;
						/*
						if(_p2box3amt1.ind<86 || _p2box3amt1.back == 1){
							_p2box3amt1.back = 1;
							_p2box3amt1.ind += 1;
							_p2box3amt1.outd -= 1;
							if(_p2box3amt1.ind>=179) _p2box3amt1.back=0;
						}
						else{
							_p2box3amt1.ind -= 1;
							_p2box3amt1.outd += 1;
						}
						$('.pie_left1_amt').css('-webkit-transform','rotate('+_p2box3amt1.outd+'deg)');
						$('.pie_left1_amt .left').css('-webkit-transform','rotate('+_p2box3amt1.ind+'deg)');
						*/
						if(_p2box3amt2.ind<95 || _p2box3amt2.back == 1){
							_p2box3amt2.back = 1;
							_p2box3amt2.ind += 1;
							_p2box3amt2.outd -= 1;
							if(_p2box3amt2.ind>=179) _p2box3amt2.back=0;
						}
						else{
							if(_p2box3amt2.ind<160&&_p2box3amt2.ind>115){
								_p2box3amt2.ind -= 3;
								_p2box3amt2.outd += 3;
							}
							else {
								_p2box3amt2.ind -= 1;
								_p2box3amt2.outd += 1;
							}
						}
						$('.pie_left2_amt').css('transform','rotate('+_p2box3amt2.outd+'deg)');
						$('.pie_left2_amt .left').css('transform','rotate('+_p2box3amt2.ind+'deg)');
						if(_p2box3amt3.data > 110 || _p2box3amt3.back == 1){
							_p2box3amt3.back = 1;
							_p2box3amt3.data -=1;
							if(_p2box3amt3.data<-39) _p2box3amt3.back = 0;
						}else{
							if(_p2box3amt3.data>-20&&_p2box3amt3.data<90) _p2box3amt3.data += 3;
							else _p2box3amt3.data += 1;
						};
						$('.c2-p2').css('transform','rotate('+_p2box3amt3.data+'deg)');
						if(_box3Num%20==0&_box3isOpen==0){
							_box3isOpen = 1;
							$('.pie_left3-1 .left').css('border','8px solid #ff0000');
							$('.pie_left3-2 .left').css('border','8px solid rgba(203,203,203,0.5)');
						}
						if (_tasknum%30==0){
							_box3txt1.text(parseInt(parseInt(_box3txt1.text())+1)+'KM');
							_box3txt2.text(parseInt(parseInt(_box3txt2.text())+1)+'KM');
						}
						if (_tasknum%50==0){
							_box3txt3.text(parseInt(Math.random()*10+45)+'℃');
						}
						if (_tasknum%100==0){
							_p2box3Date();
						}
					}
					else if(_menu==4&&_isPaused==0){
						if(_tasknum%10==0){
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
					else if(_menu==5){
						_box5Num++;
						if(_box5Num%2==0){
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
						if(_box5Num%10==0){
							var ntxt = $('.timer>.num').text().split(':'),
								ndt = parseInt(ntxt[0])*60+parseInt(ntxt[1])+1,
								min = parseInt(ndt/60),
								sec = ndt%60;
							$('.timer>.num').text(min+':'+toDouble(sec));
						}
						if(_box5Num%100==0){
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
				return _menu;
			},
			p2Animate : function(arg){
				_p2Animate(arg);
			},
			changeMenu : function(){
				_changeMenu();
			}
		}
	})();
	MVC.p6 = (function(){
		$('.showform').click(function(){
			$('.form').show();
		});
		$('.submit').click(function(){
			var name = $('#f-name').val(),
				age = $('#f-age').val(),
				sex = $('#f-sex .active').attr('d'),
				tp = $('#f-tp .active').attr('d'),
				company = $('#f-company').val(),
				job = $('#f-job').val();
			if(!name){
				alert('请填写姓名!');
				return;
			}
			$.ajax({
				url : '/submit99/',
				data : {
					name: name,
					age: age,
					sex: sex,
					tp: tp,
					company: company,
					job: job,
					advice:(function(){
						log($('#f-advice input').val());
						return $('#f-advice input').val();
					}),
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
	window.MVC = MVC;
})();