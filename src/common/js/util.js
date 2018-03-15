import { likeSearchRule, gtSearchRule, ltSearchRule, betweenSearchRule } from 'common/js/config'
import { getLocalStorage, removeLocalStorage } from 'common/js/dom'

//用户信息本地存储 变量
const userLocalName = 'info'

//当前工地信息本地存储 变量
const taskLocalName = 'taskIng'

// 当前选中状态
const actionName = 'active'

//获取当前用户本地存储信息
export function getUserIng() {
	return getLocalStorage(userLocalName);
}

//设置当前用户本地存储信息
export function setUserIng(obj) {
	return getLocalStorage(userLocalName, obj)
}

//删除当前用户本地存储信息
export function removeUserIng() {
	return removeLocalStorage(userLocalName)
}

//获取当前用户本地存储信息
export function getAction() {
	return getLocalStorage(actionName)
}

//设置当前用户本地存储信息
export function setAction(obj) {
	return getLocalStorage(actionName, obj)
}

//删除当前用户本地存储信息
export function removeAction() {
	return removeLocalStorage(actionName)
}

// 初始化时间
export function initTime(year, task) {
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mm = date.getMinutes();
	var ss = date.getSeconds();
	if (m.toString().length == 1) {
		m = '0' + m;
	}
	if (d.toString().length == 1) {
		d = '0' + d;
	}
	if (h.toString().length == 1) {
		h = '0' + h;
	}
	if (mm.toString().length == 1) {
		mm = '0' + mm;
	}
	if (ss.toString().length == 1) {
		ss = '0' + ss;
	}
	if (year && !task) {
		return y + m + d
	}
	if (task) {
		return y + m + d + h + mm + ss
	}
	return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + ss;
}
//获取当前工地信息本地存储信息
export function getTaksIng() {
	return getLocalStorage(taskLocalName)
}

//设置当前工地信息本地存储信息
export function setTaksIng(obj) {
	return getLocalStorage(taskLocalName, obj)
}

//模糊查询
export function likeSearch(obj) {
	let search = {}
	for (let key in obj) {
		search[key] = `${obj[key]}${likeSearchRule}`
	}
	return search
}

//模糊查询
export function likeStrSearch(str) {
	return `${str}${likeSearchRule}`
}

//大于查询
export function gtStrSearch(str) {
	return `${str}${gtSearchRule}`
}

//小于查询
export function ltStrSearch(str) {
	return `${str}${ltSearchRule}`
}

//区间查询
export function betweenStrSearch(small, big) {
	return `${small}${betweenSearchRule}${big}`
}

//深拷贝一个Object
export function cloneObj(obj) {
	if (typeof obj !== 'object') {
		return obj;
	}
	var s = {};
	if (obj.constructor === Array) {
		s = [];
	}
	for (var i in obj) {
		s[i] = cloneObj(obj[i]);
	}
	return s;
}

//判断一个对象是否为空对象
export function isNullObject(obj) {
	return JSON.stringify(obj) === '{}' ? true : false
}

//过滤时间格式
export function timeFilter(time, format) {
	var o = {
		'M+': time.getMonth() + 1, //month 
		'd+': time.getDate(), //day 
		'H+': time.getHours(), //hour 
		'm+': time.getMinutes(), //minute 
		's+': time.getSeconds(), //second 
		'q+': Math.floor((time.getMonth() + 3) / 3), //quarter 
		'S': time.getMilliseconds() //millisecond 
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
		}
	}
	return format;
}

// 筛选用户部门以及下层部门
export function filterDepartment(arr, name, level,code) {
	let newArr = []
	arr.map(item => {
		let str = 'level' + level
		if (String.trim(item[str]) === code) {
			newArr.push(item)
		}
	})
	return newArr
}

export function fiterConstruct(arr) {
	let result = {
		'施工员': [],
		'质监员': [],
		'安全员': [],
		'技术负责人': [],
		'项目经理': []
	}

	arr.map(item => {
		if (!result[item.job]) {
			return
		}
		result[item.job].push(item)
	})

	return result
}

export function fiterSupervisor(arr) {
	let result = {
		'监理员': [],
		'总监理': []
	}

	arr.map(item => {
		if (!result[item.job]) {
			return
		}
		result[item.job].push(item)
	})

	return result
}

export function fiterJob(str) {
	let jobKey = ''
	switch (str) {
		case '施工员':
			jobKey = 'constructor_realname'
			break;
		case '质监员':
			jobKey = 'qualitysupervisor'
			break;
		case '安全员':
			jobKey = 'safor'
			break;
		case '技术负责人':
			jobKey = 'technologyleader'
			break;
		case '项目经理':
			jobKey = 'pm'
			break;
		case '监理员':
			jobKey = 'supervisor_realname'
			break;
		case '总监理':
			jobKey = 'chiefsupervisor'
			break;
	}

	return jobKey
}

export function filterCoordinate(arr) {
	let filterArr = []
	arr.map(item => {
		filterArr.push([item.lng, item.lat])
	})

	return filterArr
}

export function split_array(arr, len) {
	var a_len = arr.length;
	var result = [];
	for (var i = 0; i < a_len; i += len) {
		result.push(arr.slice(i, i + len));
	}
	return result;
}

// 分割数组
export function divisionArr(arr) {
	var allData = []; //用来装处理完的数组
	var currData = []; //子数组用来存分割完的数据
	//循环需要处理的数组
	for (var i = 0; i < arr.length; i++) {
		//将chartArr[i]添加到子数组
		currData.push(arr[i]);
		//在这里求4的余数,如果i不等于0,且可以整除 或者考虑到不满4个或等于4个的情况就要加上  i等于当前数组长度-1的时候
		if ((i != 0 && (i + 1) % 10 == 0) || i == arr.length - 1) {
			//把currData加到allData里
			allData.push(currData);
			//在这里清空currData
			currData = [];
		}
	};
	return allData
}

//过滤台风路径基础信息
export function filterTyphoonBaseInfo(type, info) {
	let content = '',title = '';
	
	if(type === 'point') {
		title = `${filterStr(info.tfbh)} - ${filterStr(info.typhoon_name)}`;
		content = `
			<span class="typhoon-baseTip-key">过去时间：</span><span class="detail">${filterStr(timeFilter(new Date(info.time.replace("T", " ")), "yyyy年MM月dd日 HH时"))}</span><br />
			<span class="typhoon-baseTip-key">中心位置：</span><span class="detail">${filterStr(info.longitude)} °E，${filterStr(info.latitude)} °N</span><br />
			<span class="typhoon-baseTip-key">最大风力：</span><span class="detail">${filterStr(info.power)} 级</span><br />
			<span class="typhoon-baseTip-key">最大风速：</span><span class="detail">${filterStr(info.speed)} 米/秒</span><br />
			<span class="typhoon-baseTip-key">中心气压：</span><span class="detail">${filterStr(info.pressure)} 百帕</span><br />
			<span class="typhoon-baseTip-key">移动速度：</span><span class="detail">${filterStr(info.move_speed)} 公里/小时</span><br />
			<span class="typhoon-baseTip-key">移动方向：</span><span class="detail">${filterStr(info.move_dir)}</span><br />
			<span class="typhoon-baseTip-key">七级风圈半径：</span><span class="detail">${filterStr(info.radius7)} 公里</span><br />
			<span class="typhoon-baseTip-key">十级风圈半径：</span><span class="detail">${filterStr(info.radius10)} 公里</span><br />
			<span class="typhoon-baseTip-key">十二级风圈半径：</span><span class="detail">${filterStr(info.radius12)} 公里</span><br />
		`;
	}else if(type === 'dashPoint') {
		title = `[${filterStr(info.sets)}] ${filterStr(info.tfbh)} - ${filterStr(info.typhoon_name)}`;
		content = `
			<span class="typhoon-baseTip-key">到达时间：</span><span class="detail">${filterStr(timeFilter(new Date(info.time.replace("T", " ")), "yyyy年MM月dd日 HH时mm分ss秒"))}</span><br />
			<span class="typhoon-baseTip-key">中心位置：</span><span class="detail">${filterStr(info.longitude)} °E，${filterStr(info.latitude)} °N</span><br />
			<span class="typhoon-baseTip-key">最大风力：</span><span class="detail">${filterStr(info.power)} 级</span><br />
			<span class="typhoon-baseTip-key">最大风速：</span><span class="detail">${filterStr(info.speed)} 米/秒</span><br />
			<span class="typhoon-baseTip-key">中心气压：</span><span class="detail">${filterStr(info.pressure)} 百帕</span><br />
			<span class="typhoon-baseTip-key">移动速度：</span><span class="detail">${filterStr(info.move_speed)} 公里/小时</span><br />
			<span class="typhoon-baseTip-key">移动方向：</span><span class="detail">${filterStr(info.move_dir)}</span><br />
		`;
	}
	return {
		title,
		content,
		local: [+info.longitude, +info.latitude]
	}
}