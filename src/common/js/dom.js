/* dom 操作 方法
 * @ 劳兆城 
 * @ 2017-08-02*/
import Vue from 'vue';
import storage from 'good-storage'
import { setAction, getAction } from 'common/js/util'

//获取 和 设置本地存储
export function getLocalStorage(name, val) {
	if (val) {
		return storage.set(name, val);
	}
	return storage.get(name);
}

//删除本地存储
export function removeLocalStorage(name) {
	return storage.remove(name);
}

//获取 和 设置本地存储
export function getSessionStorage(name, val) {
	if (val) {
		return sessionStorage.setItem(name,val);
	}
	return sessionStorage.getItem(name);
}

//删除本地存储
export function removeSessionStorage(name) {
	return sessionStorage.removeItem(name);
}

//成功 notice
export function successNotice(str) {
	Vue.prototype.$Notice.success({
		title: str
	});
}

//失败 notice
export function errorNotice(str = '', isTitle = false) {
	if (!isTitle) {
		Vue.prototype.$Notice.error({
			title: `数据加载出错。。。`,
			desc: `${str}尝试重新刷新或联系管理员。`
		});
	} else {
		Vue.prototype.$Notice.error({
			title: str
		});
	}

}

//成功 msg 
export function successMessage(str) {
	Vue.prototype.$Message.success(str);
}

//失败 msg
export function errorMessage(str) {
	Vue.prototype.$Message.error(str);
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
	let transformNames = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'OTransform',
		ms: 'msTransform',
		standard: 'transform'
	}

	for (let key in transformNames) {
		if (elementStyle[transformNames[key]] !== undefined) {
			return key
		}
	}

	return false
})()

//行内样式兼容写法
export function prefixStyle(style) {
	if (vendor === false) {
		return false
	}

	if (vendor === 'standard') {
		return style
	}

	return `-${vendor}-${style}`
	//vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

//阻止冒泡事件兼容写法
export function CancelBubble(event) {
	if (event.stopPropagation) {
		event.stopPropagation();
	} else {
		event.cancelBubble = true;
	}
}

// 改变导航状态
export function senActive(index) {
	var obj = getAction()
	obj.second = index
	setAction(obj)
}

//创建页面元素
export function createHtml(name) {
	return document.createElement(name);
}

//获取  元素的宽度
export function getWidth(el) {
	return el.clientWidth;
}

//获取  元素的高度
export function getHeight(el) {
	return el.clientHeight;
}

//获取 当前时间
export function getTiming(time) {
	let timing = null;
	
	if (time) {
		timing = new Date(time);
	}else {
		timing = new Date();
	}
	
	return timing;
}

//获取className dom元素
export function getClassEls(className) {
	return document.getElementsByClassName(className);
}