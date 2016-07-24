(function(){
	window.MVC = {
		config : {
			n : 1,
			nh : [],
			nhm : {0:0}
		},
		getScroll : function(){
			var obj = this
				,_n = obj.config.n
			//	,menu2 = MVC.p2.getMenu()
			;
			//MVC.p2.audioClose();
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
		scrolln : function(){
			var obj = this,
				nh = obj.config.nh,
				_n = 0,
				top = document.documentElement.scrollTop || document.body.scrollTop;
			for(var p in nh){
				if(top > nh[p]){
					_n = nh.length + 1 - p;
					break;
				}
				_n = 1;
			}
			obj.config.n = _n;
			obj.getScroll();
		},
		getSize : function(){
			var obj = this,
				autoh = 0,
				list = [],
				listm = {0:0},
				last = 0;
			$('.movebox>li').each(function(i,t){
				var o = $(t),
					ht = o[0].clientHeight;
				if(i<($('.movebox>li').length-1)){
					autoh = last + ht/2;
					last += ht;
					list.push(autoh);
					listm[(i+1)] = last;
				}
			})
			list.reverse();
			obj.config.nh = list;
			obj.config.nhm = listm;
			//log(obj.config.nh,obj.config.nhm);
		},
		e : function(){
			var obj = this;
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
		},
		init : function(){
			var obj = this;
			obj.getSize();
			onscroll = function () {obj.scrolln()};
			obj.e();
		}
	}
})();
MVC.init();