import { Static } from 'api/config';

//台风路径 强度 图例
export const typhoonStrongLegend = [{
	img: `${Static}img/threeCommand/typhoonCenterGreen.png`,
	name: '热带低压(TD)',
	imgPosition: '0 0',
	color: '#00ff03'
}, {
	img: `${Static}img/threeCommand/typhoonCenterBlue.png`,
	name: '热带风暴(TS)',
	imgPosition: '-35px 0',
	color: '#0062fe'
}, {
	img: `${Static}img/threeCommand/typhoonCenterYellow.png`,
	name: '强热带风暴(STS)',
	imgPosition: '-70px 0',
	color: '#fdfa00'
}, {
	img: `${Static}img/threeCommand/typhoonCenterOrange.png`,
	name: '台风(TY)',
	imgPosition: '-105px 0',
	color: '#fdac03'
}, {
	img: `${Static}img/threeCommand/typhoonCenterPink.png`,
	name: '强台风(STY)',
	imgPosition: '-140px 0',
	color: '#f072f6'
}, {
	img: `${Static}img/threeCommand/typhoonCenterRed.png`,
	name: '超强台风(Super TY)',
	imgPosition: '-175px 0',
	color: '#fd0002'
}]

//台风路径 预测台 图例
export const typhoonForecastLegend = [{
	color: 'rgb(255, 64, 80)',
	pointColor: 'rgb(253, 172, 3)',
	name: '中国'
}, {
	color: 'rgb(67, 255, 75)',
	pointColor: 'rgb(238, 238, 238)',
	name: '日本'
}, {
	color: 'rgb(64, 221, 255)',
	pointColor: 'rgb(253, 250, 0)',
	name: '美国'
}, {
	color: 'rgb(102, 153, 153)',
	pointColor: 'rgb(255, 64, 80)',
	name: '韩国'
}, {
	color: 'rgb(24, 92, 186)',
	pointColor: 'rgb(240, 114, 1)',
	name: '欧洲'
}, {
	color: 'rgb(255, 102, 255)',
	pointColor: 'rgb(7, 81, 10)',
	name: '中国香港'
}, {
	color: 'rgb(255, 160, 64)',
	pointColor: 'rgb(0, 98, 254)',
	name: '中国台湾'
}]

//应急响应 级别和类型
export const responseModule = [
	[{
		'info': '防汛I级',
		'isChecked': false,
		'group': 1,
		'level': 'I',
		'name': '防汛'
	}, {
		'info': '防汛II级',
		'isChecked': false,
		'group': 1,
		'level': 'II',
		'name': '防汛'
	}, {
		'info': '防汛III级',
		'isChecked': false,
		'group': 1,
		'level': 'III',
		'name': '防汛'
	}, {
		'info': '防汛IV级',
		'isChecked': false,
		'group': 1,
		'level': 'IV',
		'name': '防汛'
	}],
	[{
		'info': '防旱I级',
		'isChecked': false,
		'group': 2,
		'level': 'I',
		'name': '防旱'
	}, {
		'info': '防旱II级',
		'isChecked': false,
		'group': 2,
		'level': 'II',
		'name': '防旱'
	}, {
		'info': '防旱III级',
		'isChecked': false,
		'group': 2,
		'level': 'III',
		'name': '防旱'
	}, {
		'info': '防旱IV级',
		'isChecked': false,
		'group': 2,
		'level': 'IV',
		'name': '防旱'
	}],
	[{
		'info': '防风I级',
		'isChecked': false,
		'group': 3,
		'level': 'I',
		'name': '防风'
	}, {
		'info': '防风II级',
		'isChecked': false,
		'group': 3,
		'level': 'II',
		'name': '防风'
	}, {
		'info': '防风III级',
		'isChecked': false,
		'group': 3,
		'level': 'III',
		'name': '防风'
	}, {
		'info': '防风IV级',
		'isChecked': false,
		'group': 3,
		'level': 'IV',
		'name': '防风'
	}],
	[{
		'info': '防暴雨I级',
		'isChecked': false,
		'group': 4,
		'level': 'I',
		'name': '防暴雨'

	}, {
		'info': '防暴雨II级',
		'isChecked': false,
		'group': 4,
		'level': 'II',
		'name': '防暴雨'
	}, {
		'info': '防暴雨III级',
		'isChecked': false,
		'group': 4,
		'level': 'III',
		'name': '防暴雨'
	}, {
		'info': '防暴雨IV级',
		'isChecked': false,
		'group': 4,
		'level': 'IV',
		'name': '防暴雨'
	}]
]

export const commandChoseMapList = [{
	name: '实时预警',
	layer: 'weatherLayer',
	img: `${Static}img/mapIcon/radar.png`,
	selected: false
}, {
	name: '台风路径',
	layer: 'typhoonLayer',
	img: `${Static}img/mapIcon/typhoon.png`,
	selected: false
}, {
	name: '实时云图',
	layer: 'cloudLayer',
	img: `${Static}img/mapIcon/cloud.png`,
	selected: false
}, {
	name: '实时雷达',
	layer: 'radarLayer',
	img: `${Static}img/mapIcon/radar.png`,
	selected: false
}, {
	name: '避难所',
	layer: 'refugeLayer',
	img: `${Static}img/mapIcon/refuge.png`,
	selected: false
}, {
	name: '物资仓库',
	layer: 'emergencyLayer',
	img: `${Static}img/mapIcon/emergency.png`,
	selected: false
}, {
	name: '抢险队',
	layer: 'emergencySquadLayer',
	img: `${Static}img/mapIcon/emergencySquad.png`,
	selected: false
}, {
	name: '救援队',
	layer: 'rescueTeamLayer',
	img: `${Static}img/mapIcon/rescueTeam.png`,
	selected: false
}, {
	name: '重点人员',
	layer: 'liabilityPersonLayer',
	img: `${Static}img/mapIcon/liabilityPerson.png`,
	selected: false
}, {
	name: '三防人员',
	layer: 'defenseExpertLayer',
	img: `${Static}img/mapIcon/defenseExpert.png`,
	selected: false
}, {
	name: '群众分布',
	layer: 'massHeatLayer',
	img: `${Static}img/mapIcon/massHeat.png`,
	selected: false
}]

export function commandLayerNeedKeys(layerName) {
	let arr,
		localArr,
		arrs = [],
		obj = {},
		title = '';

	switch (layerName) {
		case 'refugeLayer':
			arr = [
				'name|名称',
				'address|地址',
				'capacity|可容纳人数',
				'telephone|联系电话',
			];
			localArr = ['longitude', 'latitude'];
			title = '避难所';
			break;
		case 'emergencyLayer':
			arr = [
				'name|名称',
				'address|地址',
				'institution|物资库存',
				'manager|管理员',
				'telephone|联系电话'
			];
			localArr = ['lng', 'lat'];
			title = '物资仓库';
			break;
		case 'emergencySquadLayer':
			arr = [
				'name|名称',
				'address|地址',
				'people|负责人',
				'phone|联系电话'
			];
			localArr = ['lng', 'lat'];
			title = '抢险队';
			break;
		case 'rescueTeamLayer':
			arr = [
				'name|名称',
				'address|地址',
				'people|负责人',
				'phone|联系电话'
			];
			localArr = ['lng', 'lat'];
			title = '救援队';
			break;
		case 'liabilityPersonLayer':
			arr = [
				'name|名称',
				'address|地址',
				'phone|联系电话'
			];
			localArr = ['lng', 'lat'];
			title = '重点人员';
			break;
		case 'defenseExpertLayer':
			arr = [
				'name|名称',
				'address|地址',
				'phone|联系电话'
			];
			localArr = ['lng', 'lat'];
			title = '三防专家';
			break;
	}

	arr.map(item => {
		let content = item.split('|'),
			key = content[0],
			val = content[1];
		arrs.push({
			key, val
		})
	})

	obj['info'] = arrs;
	obj['lng'] = localArr[0];
	obj['lat'] = localArr[1];
	obj['title'] = title;

	return obj;
}

export const weatherIcon = [{
	"ID": 0,
	"WEATHERDESC": "晴",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "qing.png",
	"RN": 1
}, {
	"ID": 1,
	"WEATHERDESC": "多云",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "duoyun.png",
	"RN": 2
}, {
	"ID": 2,
	"WEATHERDESC": "阴",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "yin.png",
	"RN": 3
}, {
	"ID": 3,
	"WEATHERDESC": "阵雨",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "zhenyu.png",
	"RN": 4
}, {
	"ID": 4,
	"WEATHERDESC": "雷阵雨",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "leizhenyu.png",
	"RN": 5
}, {
	"ID": 5,
	"WEATHERDESC": "雷阵雨并伴有冰雹",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "lzybinbao.png",
	"RN": 6
}, {
	"ID": 6,
	"WEATHERDESC": "雨夹雪",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "yuxue.png",
	"RN": 7
}, {
	"ID": 7,
	"WEATHERDESC": "小雨",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "xiaoyu.png",
	"RN": 8
}, {
	"ID": 8,
	"WEATHERDESC": "中雨",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "zhongyu.png",
	"RN": 9
}, {
	"ID": 9,
	"WEATHERDESC": "大雨",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "dayu.png",
	"RN": 10
}, {
	"ID": 10,
	"WEATHERDESC": "暴雨",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "baoyu.png",
	"RN": 11
}, {
	"ID": 11,
	"WEATHERDESC": "大暴雨",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "dabaoyu.png",
	"RN": 12
}, {
	"ID": 12,
	"WEATHERDESC": "特大暴雨",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "tedabaoyu.png",
	"RN": 13
}, {
	"ID": 13,
	"WEATHERDESC": "阵雪",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "zhenxue.png",
	"RN": 14
}, {
	"ID": 14,
	"WEATHERDESC": "小雪",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "xiaoxue.png",
	"RN": 15
}, {
	"ID": 15,
	"WEATHERDESC": "中雪",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "zhongxue.png",
	"RN": 16
}, {
	"ID": 16,
	"WEATHERDESC": "大雪",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "daxue.png",
	"RN": 17
}, {
	"ID": 17,
	"WEATHERDESC": "暴雪",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "baoxue.png",
	"RN": 18
}, {
	"ID": 18,
	"WEATHERDESC": "雾",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "wu.png",
	"RN": 19
}, {
	"ID": 19,
	"WEATHERDESC": "冻雨",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "dongyu.png",
	"RN": 20
}, {
	"ID": 20,
	"WEATHERDESC": "沙尘暴",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "shachenbao.png",
	"RN": 21
}, {
	"ID": 21,
	"WEATHERDESC": "小到中雨",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "xiaozhongyu.png",
	"RN": 22
}, {
	"ID": 22,
	"WEATHERDESC": "中到大雨",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "zhongdayu.png",
	"RN": 23
}, {
	"ID": 23,
	"WEATHERDESC": "大到暴雨",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "datobaoyu.png",
	"RN": 24
}, {
	"ID": 24,
	"WEATHERDESC": "暴雨到大暴雨",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "baodabaoyu.png",
	"RN": 25
}, {
	"ID": 25,
	"WEATHERDESC": "大暴雨到特大暴雨",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "datedayu.png",
	"RN": 26
}, {
	"ID": 26,
	"WEATHERDESC": "小到中雪",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "xiaozhengxue.png",
	"RN": 27
}, {
	"ID": 27,
	"WEATHERDESC": "中到大雪",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "zhongdaxue.png",
	"RN": 28
}, {
	"ID": 28,
	"WEATHERDESC": "大到暴雪",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "datobaoxue.png",
	"RN": 29
}, {
	"ID": 29,
	"WEATHERDESC": "浮尘",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "fuchen.png",
	"RN": 30
}, {
	"ID": 30,
	"WEATHERDESC": "扬沙",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "yangsha.png",
	"RN": 31
}, {
	"ID": 31,
	"WEATHERDESC": "强沙尘暴",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "qiangshachen.png",
	"RN": 32
}, {
	"ID": 53,
	"WEATHERDESC": "霾",
	"IMGPATH": "weatherIcons",
	"IMGNAME": "mai.png",
	"RN": 33
}]

// 通讯录管理
export const addressBookModule = [
	[
		{
			label: '姓名',
			type: 'text',
			key: 'name',
			colspan: '1',
			props: 'name'
		}, {
			label: '所属部门',
			type: 'autoSelect',
			key: 'department_name',
			props: 'department_name',
			filterable: true,
			remote: true,
			colspan: '1',
			notFoundText: '无匹配数据',
			selectLoading: false,
			data: []
		}, {
			label: '部门级别',
			type: 'text',
			key: 'department_code',
			props: 'department_code',
			colspan: '1'
		}
	], [
		{
			label: '手机号码',
			type: 'text',
			key: 'telephoe',
			props: 'telephoe',
			colspan: '1'
		}, {
			label: '办公室电话',
			type: 'text',
			key: 'office_phone',
			props: 'office_phone',
			colspan: '1'
		}, {
			label: '家庭电话',
			type: 'text',
			key: 'home_phone',
			props: 'home_phone',
			colspan: '1'
		}
	], [
		{
			label: '职责',
			type: 'text',
			key: 'duty',
			props: 'duty',
			colspan: '1'
		}, {
			label: '职责描述',
			type: 'textarea',
			key: 'duty_desc',
			props: 'duty_desc',
			colspan: '5'
		}
	]
]