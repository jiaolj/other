
var mapChartObj;
var getMapChart=function(ctid,data,title,slabel){
	if (!title) title='';
	mapChartObj=echarts.init(document.getElementById(ctid));
	var s=[
			{
				name: '世界事件分布',
				type: 'map',
				nameMap : nameMap,
				mapType: 'world',
				roam:false,	//滚轮缩放和拖拽漫游
				itemStyle:{
					emphasis:{label:{show:true}}
				},
				data:getMapRandomData(),
				/*markPoint : {
					symbolSize: 5,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
					itemStyle: {
						normal: {
							borderColor: '#87cefa',
							borderWidth: 1,            // 标注边线线宽，单位px，默认为1
							label: {
								show: false
							}
						},
						emphasis: {
							borderColor: '#1e90ff',
							borderWidth: 5,
							label: {
								show: false
							}
						}
					},
					data : [
						{name: "中间", value: 7},
						{name: "美国", value: 9},
						{name: "巴西", value: 12},
						{name: "埃及", value: 12},
						{name: "中国", value: 14},
					]
				},
				geoCoord: lalWorld,*/
				mapLocation:{width:'40%',height:'40%'}
			},
			{
				name:'事件数量',
				type:'pie',
				radius : ['70%','80%'],
				itemStyle: {
					normal: {
						label: {
							show:false
						},
						labelLine: {
							show:false
						},
						borderColor:'#fff',
						borderWidth:'1.5'
					}
				},
				center: ['50%', '50%'],
				data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:548, name:'搜索引擎'}
				],
			}
	];
	if (slabel) delete s[1]['itemStyle'];
	var option = {
		//color:[chartColor[0],chartColor[1],chartColor[2],chartColor[3]],
		color:chartColor,
		title : {
			text: title,
			x:'center',
			y:'top',
		},
		tooltip : {
			trigger: 'item',
		},
		dataRange: {
			show : false,
			min: 0,
			max: 100,
			text:['High','Low'],
			realtime: false,
			calculable : true,
			color: rangeColor
		},
		//calculable:true,
		series : s
	};
	mapChartObj.setOption(option);
	return mapChartObj;
}



var pieChartObj;
var getPieChart=function(cid,data){
	pieChartObj = echarts.init(document.getElementById(cid));
	var option = {
		color:chartColor,
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c}条"
		},
		series : [
			{
				name:'事件数量',
				type:'pie',
				radius : '50%', //['50%','70%']就是圆环
				center: ['50%', '60%'],
				data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
				],
			}
		]
	};        
	pieChartObj.setOption(option);
}

var HisChartObj;
var getHisChart=function(cid){
	HisChartObj=echarts.init(document.getElementById(cid));
	var option = {
		color:chartColor,
		title : {
			text: '世界人口总量',
			textStyle : {
				color : '#fff'
			},
		},
		tooltip : {
			trigger: 'axis'
		},
		legend: {
			data:['蒸发量','降水量'],
			textStyle : {
				color : '#fff'
			},
		},
		toolbox: {
			show : false,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		xAxis : [
			{
				type : 'category',
				axisLabel : {
					textStyle: {
						color: '#fff',
					}
				},
				data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
			}
		],
		yAxis : [
			{
				type : 'value',
				axisLabel : {
					textStyle: {
						color: '#fff',
					}
				},
			}
		],
		series : [
			{
				name:'蒸发量',
				type:'bar',
				data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
			},
			{
				name:'降水量',
				type:'bar',
				data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
			}
		]
	};
	HisChartObj.setOption(option);
}

var BarChartObj;
var getBarChart=function(cid){
	BarChartObj=echarts.init(document.getElementById(cid));
	var option = {
		color:chartColor,
		title : {
			text: '世界人口总量',
			/*subtext: '数据来自网络'*/
			textStyle : {
				color : '#fff'
			},
		},
		tooltip : {
			trigger: 'axis'
		},
		legend: {
			data:['2011年', '2012年'],
			textStyle : {
				color : '#fff'
			},
		},
		toolbox: {
			show : false,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				type : 'value',
				axisLabel : {
					textStyle: {
						color: '#fff',
					}
				},
				boundaryGap : [0, 0.01],
			}
		],
		yAxis : [
			{
				type : 'category',
				axisLabel : {
					textStyle: {
						color: '#fff',
					}
				},
				data : ['巴西','印尼','美国','印度','中国','世界人口(万)'],
			}
		],
		series : [
			{
				name:'2011年',
				type:'bar',
				data:[18203, 23489, 29034, 104970, 131744, 630230],
			},
			{
				name:'2012年',
				type:'bar',
				data:[19325, 23438, 31000, 121594, 134141, 681807]
			}
		]
	};
	BarChartObj.setOption(option);
}