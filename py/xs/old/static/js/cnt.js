var getSize=function(){
	var bdyh=document.body.clientHeight;
	var cnth=content.clientHeight;
	if((cnth+110+56+60)<bdyh){
		foot.style.position='absolute';
		foot.style.bottom=0;
	}
	else{
		foot.style.position='relative';
	}
}
$(window).resize(function(){getSize()});
window.onload=function(){
getSize();
}