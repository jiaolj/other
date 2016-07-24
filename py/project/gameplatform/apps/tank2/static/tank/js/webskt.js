var wbs;
var isWbsConn=0;
function initWebSocket(host){
	if (isWbsConn==0||wbs.readyState!=1){
		wbs = new WebSocket(host);
		wbs.onopen = function(msg){
			console.log('已连接,连接状态:'+wbs.readyState);
			isWbsConn=1;
			//成功连接触发接口
			getWebSocketOpen();
		}
		wbs.onclose = function(msg){
			console.log('已关闭,连接状态:'+wbs.readyState);
			wbs.close();
			//关闭连接触发接口
			getWebSocketClose();
		};
		wbs.onmessage = function(msg){
			console.log('接收数据');
			//接收数据触发接口
			getWebSocketRecv(msg.data);
		}
	}else{
		alert('已连接');
	}
}
function sendSocketData(jsonData) {
wbs.send(jsonData);
};
function seeSocketState(){
var state=wbs.readyState;
console.log('连接状态:'+state);
return state;
}
function goSocketOut(){
wbs.close();
console.log('已断开,连接状态:'+wbs.readyState);
}
//页面关闭或刷新事件
window.onbeforeunload=function(event){ 
goSocketOut();
}