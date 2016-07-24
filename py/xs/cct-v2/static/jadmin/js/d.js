$('.close').click(function(){$(this).parent().hide()});
//获得各参数
var getAjax=function(d){
	var asy;
	var arg=d.arg;
	if (!arg) arg={};
	arg.randm=Math.random();//处理ie6的ajax缓存
	if (d.asy) asy=true;
	else asy=false;
	$.ajax({
		async: asy,
		url: d.url,
		type: 'GET',
		data:arg,
		dataType: 'json'
	}).done(function(data) {
		d.suc(data);
	}).fail(function(jqXHR,textStatus) {
		log(d.url+' request failed'+textStatus);
		d.fail();
	});
}
//部门
var departMent={0:'全部'};
getAjax({url:'/admin/getDepartmentType/',suc:function(data){for (var i in data) departMent[data[i].id]=data[i].name}});
var dptmt=$('#did');
var getDepartmentHtml=function(){for (var i in departMent) dptmt.append('<option value="'+i+'">'+departMent[i]+'</option>')};
var getDepartmentType=function(txt){
	var htm='';
	for (var t in departMent) if (txt==departMent[t]&&t!=0) htm+='<option value="'+t+'">'+departMent[t]+'</option>';
	for (var t in departMent) if (txt!=departMent[t]&&t!=0) htm+='<option value="'+t+'">'+departMent[t]+'</option>';
	return '<select>'+htm+'</select>';
}
//URL类型
var siteType={};
getAjax({url:'/admin/getSiteType/',suc:function(data){for (var i in data) siteType[data[i].id]=data[i].name}});
var getSiteType=function(txt){
	var htm='';
	for (var t in siteType) if (txt==siteType[t]) htm+='<option value="'+t+'">'+siteType[t]+'</option>';
	for (var t in siteType) if (txt!=siteType[t]) htm+='<option value="'+t+'">'+siteType[t]+'</option>';
	return '<select>'+htm+'</select>';
}
//栏目类型
var columnType={};
getAjax({url:'/admin/getColumnType/',suc:function(data){for (var i in data) columnType[data[i].id]=data[i].name}});
var getColumnType=function(txt){
	var htm='';
	for (var t in columnType) if (txt==columnType[t]) htm+='<option value="'+t+'">'+columnType[t]+'</option>';
	for (var t in columnType) if (txt!=columnType[t]) htm+='<option value="'+t+'">'+columnType[t]+'</option>';
	return '<select>'+htm+'</select>';
}
//关键词类型
var kwdType={};
getAjax({url:'/admin/getKwdType/',suc:function(data){for (var i in data) kwdType[data[i].id]=data[i].name}});
var getKwdType=function(txt){
	var htm='';
	for (var t in kwdType) if (txt==kwdType[t]) htm+='<option value="'+t+'">'+kwdType[t]+'</option>';
	for (var t in kwdType) if (txt!=kwdType[t]) htm+='<option value="'+t+'">'+kwdType[t]+'</option>';
	return '<select>'+htm+'</select>';
}
//伤害类型
var damageType={};
getAjax({url:'/admin/getDamageType/',suc:function(data){for (var i in data) damageType[data[i].id]=data[i].name}});
var getDamageType=function(txt){
	var htm='';
	for (var t in damageType) if (txt==damageType[t]) htm+='<option value="'+t+'">'+damageType[t]+'</option>';
	for (var t in damageType) if (txt!=damageType[t]) htm+='<option value="'+t+'">'+damageType[t]+'</option>';
	return '<select>'+htm+'</select>';
}
//商品类型
var commodityType={};
getAjax({url:'/admin/getCommodityType/',suc:function(data){for (var i in data) commodityType[data[i].id]=data[i].name}});
var getCommodityType=function(txt){
	var htm='';
	for (var t in commodityType) if (txt==commodityType[t]) htm+='<option value="'+t+'">'+commodityType[t]+'</option>';
	for (var t in commodityType) if (txt!=commodityType[t]) htm+='<option value="'+t+'">'+commodityType[t]+'</option>';
	return '<select>'+htm+'</select>';
}