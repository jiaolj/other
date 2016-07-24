(function(){
	var MVP = MVP || {};
	MVP.model = (function(){
		var _tb = [],
			_url = location.href,
			_s = {
				clw : parseInt(document.documentElement.clientWidth),
				clh : parseInt(document.documentElement.clientHeight),
				framew : null,
				righth : null,
				frmObj : $('.rightdiv>.frame'),
			}
		return {
			gets : function(d){
				return _s[d];
			},
			getTb : function(){
				return _tb;
			},
			setTb : function(d){
				_tb = d;
				return this;
			},
			getUrl : function(){
				return _url;
			},
			setUrl : function(d){
				_url = d;
				return this;
			}
		}
	})();
	MVP.view = (function(){
		return {
			jsLoad : function(){
				clw=parseInt(document.documentElement.clientWidth);
				clh=parseInt(document.documentElement.clientHeight);
				$('.main').css({height:clh-31});
				MVP.model.gets('frmObj').css({height:(clh-61)});
			},
			isOpen : function(hid){
				var sul=$('#'+hid+'>ul');
				if(sul.css('display')=='none'){
					sul.show();
					$('#'+hid+'>.isopen').css('background-position','0 -71px');
				}
				else{
					$('#'+hid+'>.isopen').css('background-position','0 -29px');
					sul.hide();
				}
			},
		}
	})();
	MVP.contrl = (function(){
		return {
			menuClick : function(){
				var prt = this;
				$('#menu a').click(function(){
					var sc=$(this).parent().attr('htm');
					var vid=$(this).parent().attr('id');
					if(sc=='undefined') {MVP.view.isOpen(vid);return};
					var hid = vid.replace('h',''),
					txt = $(this).parent().text(),
						tabList = MVP.model.getTb(),
						frmObj = MVP.model.gets('frmObj');
					$('.rightdiv>.frame>div').hide();
					$('.rightdiv>.bggry1>ul>li').removeClass('active');
					if (indexOf(tabList,hid)==-1){
						tabList.push(hid);
						location.hash='#1/'+hid;
						$('.rightdiv>.bggry1>ul').append('<li id="u'+hid+'" class="ti-1 fs9p tcenter">'+txt+' <i class="tclose"></i></li>');
						frmObj.append('<div id="f'+hid+'" class="h w dsn ova"><iframe src="htm/'+sc+'" width="100%" height="99.5%" frameborder="0"></iframe></div>');
						prt.getHtmClick(hid);
					}
					$('#u'+hid).addClass('active');
					$('#f'+hid).show();
				})
				$('.isopen').click(function(){MVP.view.isOpen($(this).parent().attr('id'))});
			},
			getHtmClick : function(sc){
				$('#u'+sc+'>.tclose').click(function(){
					$('#u'+sc).remove();
					$('#f'+sc).remove();
					var tb = MVP.model.getTb(),
						tabList=arrayRemove(tb,indexOf(tb,sc)),
						url = MVP.model.getUrl();
					MVP.model.setTb(tabList);
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
		}
	})();
	MVP.init = function(d){
		MVP.view.jsLoad();
		$(window).wresize(function(e){MVP.view.jsLoad()});
		var cjson = {},
			htm = '',
			url = this.model.getUrl(),
			tabList = this.model.getTb(),
			frmObj = this.model.gets('frmObj'),
			c=d.config;
		for (var i in c){
			var itm=c[i].items,
				iid=c[i].id,
				iht=c[i].htm,
				inm=c[i].name;
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
		this.contrl.menuClick();
		if(url.split('#').length==1) location.hash='#1';
		else{
			var hid=url.split('#')[1].split('/')[1];
			if(hid){
				url=url.replace('#1/'+hid,'#1');
				this.model.setUrl(url);
				tabList.push(hid);
				var nd=cjson[hid];
				$('.rightdiv>.bggry1>ul').append('<li id="u'+hid+'" class="active ti-1 fs9p tcenter">'+nd.name+' <i class="tclose"></i></li>');
				frmObj.append('<div id="f'+hid+'" class="h w ova"><iframe src="htm/'+nd.htm+'" width="100%" height="99.5%" frameborder="0"></iframe></div>');
				this.contrl.getHtmClick(hid);
			}else location.href=url.replace('#1','').replace('#','');
		}
	}
	window.MVP = MVP;
})();