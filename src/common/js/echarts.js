/* echart图表配置文件 
 * @ 劳兆城 
 * @ 2017-08-05*/

//南海区发射状Echart
export function getNoramlMap() {
	let geoCoordMap = {
		'南海水务': [113.149648, 23.037042],
		'西樵': [112.945865, 22.944525],
		'九江': [112.969926, 22.836815],
		'丹灶': [112.926055, 23.056794],
		'罗村': [113.058184, 23.064774],
		'大沥': [113.116816, 23.114405],
		'狮山': [113.025635, 23.120818],
		'桂城': [113.208421, 23.022061],
		'里水': [113.14069, 23.204815]
	}

	let BJData = [
		[{
			name: '西樵'
		}, {
			name: '南海水务',
			value: 90
		}],
		[{
			name: '九江'
		}, {
			name: '南海水务',
			value: 90
		}],
		[{
			name: '丹灶'
		}, {
			name: '南海水务',
			value: 90
		}],
		[{
			name: '狮山'
		}, {
			name: '南海水务',
			value: 90
		}],
		[{
			name: '里水'
		}, {
			name: '南海水务',
			value: 90
		}],
//		[{
//			name: '罗村'
//		}, {
//			name: '南海水务',
//			value: 90
//		}],
		[{
			name: '大沥'
		}, {
			name: '南海水务',
			value: 90
		}],
		[{
			name: '桂城'
		}, {
			name: '南海水务',
			value: 90
		}]
	];

	function convertData(data) {
		let res = [];
		for(let i = 0; i < data.length; i++) {
			let dataItem = data[i];
			let fromCoord = geoCoordMap[dataItem[0].name];
			let toCoord = geoCoordMap[dataItem[1].name];
			if(fromCoord && toCoord) {
				res.push({
					fromName: dataItem[0].name,
					toName: dataItem[1].name,
					coords: [fromCoord, toCoord]
				});
			}
		}
		return res;
	};

	let series = [];

	[
		['', BJData]
	].forEach(function(item, i) {
		series.push({
			name: item[i],
			type: 'effectScatter',
			coordinateSystem: 'geo',
			zlevel: 2,
			rippleEffect: {
				brushType: 'stroke'
			},
			label: {
				normal: {
					show: true,
					position: 'right',
					formatter: '{b}'
				}
			},
			symbolSize: function(val) {
				return val[2] / 8;
			},
			itemStyle: {
				normal: {
					color: 'white'
				}
			},
			data: item[1].map(function(dataItem) {
				return {
					name: dataItem[0].name,
					value: geoCoordMap[dataItem[0].name].concat([90])
				};
			})
		}, {

			type: 'lines',
			zlevel: 1,
			effect: {
				show: true,
				period: 6,
				trailLength: 0.7,
				color: 'red',
				symbolSize: 3
			},
			lineStyle: {
				normal: {
					color: '#a6c84c',
					width: 0,
					curveness: 0.2
				}
			},
			data: convertData(item[1])
		}, {

			type: 'lines',
			zlevel: 2,
			symbol: ['none', 'arrow'],
			symbolSize: 10,
			effect: {
				show: true,
				period: 6,
				trailLength: 0,
				symbol: 'circle',
				//				symbol: 'triangle',
				symbolSize: 8,
				color: '#E5464D',
			},
			lineStyle: {
				normal: {
					color: 'white',
					width: 1,
					opacity: 0.6,
					curveness: 0.2
				}
			},
			data: convertData(item[1])
		}, {
			name: item[i],
			type: 'effectScatter',
			coordinateSystem: 'geo',
			zlevel: 2,
			rippleEffect: {
				brushType: 'stroke'
			},
			label: {
				normal: {
					show: true,
					position: 'right',
					formatter: '{b}'
				}
			},
			symbolSize: function(val) {
				return val[2] / 8;
			},
			itemStyle: {
				normal: {
					color: 'red'
				}
			},
			data: item[1].map(function(dataItem) {
				return {
					name: dataItem[1].name,
					value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
				};
			})
		});
	});

	let option = {
		backgroundColor: 'rgba(0,0,0,0)',
		tooltip: {
			trigger: 'item'
		},
		geo: {
			map: 'nanhai',
			label: {
				emphasis: {
					show: false
				}
			},
			roam: true,
			itemStyle: {
				normal: {
					areaColor: 'rgba(44, 174, 243, 0.5)',
					borderColor: 'rgba(44, 174, 243, 1)'
				},
				emphasis: {
					areaColor: 'rgba(44, 174, 243, 0.5)'
				}
			}
		},
		series: series
	};

	return option;
}

//指挥一张图-统计数据-饼图
export const pieChart = {
	title: {
		text: '',
		x: 'left',
		textStyle: {
			color: '#fff100',
			fontSize: 12
		}
	},
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)",
		position: function(point, params, dom, rect, size) {
			return [point[0] - 67, point[1]];
		}
	},
	series: [{
		name: '统计',
		type: 'pie',
		radius: '55%',
		center: ['50%', '60%'],
		itemStyle: {
			normal: {
				color: 'white'
			}
		},
		data: [{
			value: 335,
			name: '大沥',
			itemStyle: {
				normal: {
					color: 'rgb(117, 167, 255)'
				}
			}
		}, {
			value: 310,
			name: '丹灶',
			itemStyle: {
				normal: {
					color: 'rgb(164, 82, 229)'
				}
			}
		}, {
			value: 234,
			name: '桂城',
			itemStyle: {
				normal: {
					color: 'rgb(235, 91, 80)'
				}
			}
		}, {
			value: 135,
			name: '狮山',
			itemStyle: {
				normal: {
					color: 'rgb(175, 221, 146)'
				}
			}
		}, {
			value: 458,
			name: '西樵',
			itemStyle: {
				normal: {
					color: 'rgb(253, 175, 64)'
				}
			}
		}, {
			value: 150,
			name: '里水'
		}],
		itemStyle: {
			emphasis: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
			},
			normal: {
				borderColor: 'white'
			}
		},
		labelLine: {
			normal: {
				length: 5,
				length2: 5,
				lineStyle: {
					color: 'white'
				}
			}
		},
		label: {
			normal: {
				textStyle: {
					fontSize: 12,
					color: 'white'
				},
				formatter: function(param) {
					return Math.round(param.percent) + '%';
				}
			}
		}
	}]
};

//指挥一张图-统计数据-折线图
export const lineChart = {
	title: {
		text: '',
		x: 'left',
		textStyle: {
			color: '#fff100',
			fontSize: 12
		}
	},
	tooltip: {
		trigger: 'axis',
	},
	grid: {
		top: 50,
		bottom: 32,
		left: 30,
		right: 10
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: ['大沥', '丹灶', '桂城', '狮山', '西樵', '里水'],
		nameTextStyle: {
			color: 'white'
		},
		axisLine: {
			lineStyle: {
				color: 'white',
				width: 1
			}
		},
		axisLabel: {
			formatter: function(value, index) {
				return value.split('').join('\n');
			}
		}
	},
	yAxis: {
		type: 'value',
		name: '水位 (m)',
		splitLine: {
			show: false
		},
		nameTextStyle: {
			color: 'white'
		},
		axisLabel: {
			formatter: '{value}'
		},
		axisPointer: {
			snap: true
		},
		axisLine: {
			lineStyle: {
				color: 'white',
				width: 1
			}
		},
	},
	visualMap: {
		show: false,
		type: 'piecewise',
		pieces: [{
			min: 5,
			color: 'red'
		}, {
			max: 4.9,
			color: 'green'
		}]
	},
	series: [{
		name: '水位',
		type: 'line',
		smooth: true,
		data: [5, 6, 3, 7, 10, 2],
	}]
};

//指挥一张图-统计数据-折线柱状图
export const barChart = {
	title: {
		text: '',
		x: 'left',
		textStyle: {
			color: '#fff100',
			fontSize: 12
		}
	},
	tooltip: {
		trigger: 'axis',
		position: function(point, params, dom, rect, size) {
			return [point[0] - 50, point[1] - 30];
		}
	},
	grid: {
		top: 50,
		bottom: 32,
		left: 30,
		right: 30
	},
	xAxis: [{
		type: 'category',
		data: ['大沥', '丹灶', '桂城', '狮山', '西樵', '里水'],
		nameTextStyle: {
			color: 'white'
		},
		axisPointer: {
			type: 'shadow'
		},
		axisLine: {
			lineStyle: {
				color: 'white',
				width: 1
			}
		},
		axisLabel: {
			formatter: function(value, index) {
				return value.split('').join('\n');
			}
		}
	}],
	yAxis: [{
			type: 'value',
			name: '水量 (ml)',
			min: 0,
			max: 250,
			interval: 50,
			axisLabel: {
				formatter: '{value}',
				textStyle: {
					color: 'white'
				}
			},
			splitLine: {
				show: false
			},
			nameTextStyle: {
				color: 'white'
			},
			axisLine: {
				lineStyle: {
					color: 'white',
					width: 1
				}
			},
		},
		{
			type: 'value',
			name: '温度 (°C)',
			min: 0,
			max: 25,
			interval: 5,
			axisLabel: {
				formatter: '{value}',
				textStyle: {
					color: 'white'
				}
			},
			splitLine: {
				show: false
			},
			nameTextStyle: {
				color: 'white'
			},
			axisLine: {
				lineStyle: {
					color: 'white',
					width: 1
				}
			},
		}
	],
	series: [{
			name: '蒸发量',
			type: 'bar',
			barWidth: 5,
			data: [25.6, 76.7, 135.6, 162.2, 32.6, 20.0],
			itemStyle: {
				normal: {
					color: 'rgb(164, 82, 229)'
				}
			}
		},
		{
			name: '降水量',
			type: 'bar',
			barWidth: 5,
			data: [28.7, 70.7, 175.6, 182.2, 48.7, 18.8],
			itemStyle: {
				normal: {
					color: 'rgb(253, 175, 64)'
				}
			}
		},
		{
			name: '平均温度',
			type: 'line',
			yAxisIndex: 1,
			data: [6.3, 10.2, 20.3, 23.4, 23.0, 16.5],
			itemStyle: {
				normal: {
					color: 'rgb(175, 221, 146)'
				}
			}
		}
	]
};