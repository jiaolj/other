var wbs;
var isWbsConn=0;
function initWebSocket(host){
	if (isWbsConn==0||wbs.readyState!=1){
		wbs = new WebSocket(host);
		wbs.onopen = function(msg){
			console.log('已连接,连接状态:'+wbs.readyState);
			isWbsConn=1;
			getWebSocketOpen();
		}
		wbs.onclose = function(msg){
			console.log('已关闭,连接状态:'+wbs.readyState);
			getWebSocketClose();
			wbs.close();
		};
		wbs.onmessage = function(msg){
			console.log('接收数据');
			getWebSocketRecv(msg.data);
		}
	}else{
		alert('已连接');
	}
}
function sendSocketData(jsonData) {
wbs.send('{"id":"1","uname":"abc"}');
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