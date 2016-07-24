var getTitleList=function(page){
	var html='<ul>';
	for (i=0;i<12;i++){
		numb=(page-1)*12+i+1
		html+='<li><a href="">'+numb+'. 新闻标题新闻标题新闻标题</a></li>';
	}
	html+='</ul>';
	$('.content').html(html);
}
getTitleList(1);
//调用jPage的接口，支持各种jquery选择器
$('.pagelist').JPage({
	allPage:99,
	numList:9,
	page:1,
	isJump:true,//是否开启<跳转到第几页>的功能
	getPageData:function(page){
		getTitleList(page);
	}
});