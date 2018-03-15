import Vue from 'vue';
import store from 'src/store';
import { socketHttpUrl, ERR_OK, ERR_TIMEOUT } from 'api/config';
import { removeLocalStorage, errorNotice } from 'common/js/dom';
import { userInfoLocalStroageKey } from 'common/js/config';

export const ACTION_KEYS = {
	'user_has_logined': 'user_has_logined',
	'warning_message': 'warning_message',
	'emergency_message': 'emergency_message',
	'start_emergency': 'start_emergency',
	'department_message_list': 'department_message_list',
	'confirm_message': 'confirm_message',
	'message_list': 'message_list',
	'message_list_auto': 'message_list_auto',
	'departmenttask_list': 'departmenttask_list',
	'reporttask_data': 'reporttask_data',
	'updatetask_data': 'updatetask_data',
	'task_statis': 'task_statis',
	'task_list': 'task_list',
	'departmenttask_chart': 'departmenttask_chart',
	'heart_bit': 'heart_bit'
}

const CODE_STATUS = {
	'OK': '0000',
	'TOKEN_ISOVER': '0004',
	'HEART_BIT': '0099',
	'LOGINED': '0999'
}

//let isAllowSendHead_bit = true;

export function initSocket(option = {}) {
	
	//连接后台	webSocket
	let socket = new WebSocket(`${socketHttpUrl}/${store.getters.userInfo.userid}`);
	
	socket.last_health_time = -1;

	socket.keepalive = function() {
		let time = new Date().getTime();
		if(socket.last_health_time !== -1 && time - socket.last_health_time > 20000) { // 不是刚开始连接并且20s
			socket.close()
		} else {
			// 如果断网了，send会无法发送消息出去。bufferedAmount不会为0。
			if(socket.bufferedAmount === 0 && socket.readyState === 1) {
//				if (!isAllowSendHead_bit) {
//					return
//				}
				sendSocket({
					action: ACTION_KEYS['heart_bit']
				});
				socket.last_health_time = time;
			}
		}
	}
	
//	let connectIndex = 0;

	if(socket) {
		let reconnect = 0; //重连的时间
		let reconnectMark = false; //是否重连过

		socket.onopen = () => {
			console.log('socket连接成功');
			
			store.commit('SET_SOCKET', socket);
			
			//初始化时不执行，断开后，重新连接成功，重新获取数据
//			if(connectIndex > 0) {
//				initWebList();				
//			}
//			connectIndex++;
			
			reconnect = 0;
			reconnectMark = false;
			socket.receiveMessageTimer = setTimeout(() => {
				socket.close();
			}, 30000); // 30s没收到信息，代表服务器出问题了，关闭连接。如果收到消息了，重置该定时器。
			if(socket.readyState === 1) { // 为1表示连接处于open状态
				socket.keepAliveTimer = setInterval(() => {
					socket.keepalive();
				}, 5000)
			}
		}
		
		socket.onmessage = (e) => {
			let data = JSON.parse(e.data);
			
			if (!data) {
				return
			}
//			console.log(data)
			if (data.code === ERR_TIMEOUT) { //token过期
				timeOutAction();
				return
			}
			
//			console.log(data)
			
			switch(data.code) {
				case CODE_STATUS['OK']:
					switch(data.action) {
						case ACTION_KEYS['warning_message']:	//预警信息
							Vue.prototype.$bus.emit(ACTION_KEYS['warning_message'], data);
							break;
						case ACTION_KEYS['emergency_message']:	//机器人说的预警信息
							Vue.prototype.$bus.emit(ACTION_KEYS['emergency_message'], data);
							break;
						case ACTION_KEYS['start_emergency']:	//是否启动应急响应成功信息
							Vue.prototype.$bus.emit(ACTION_KEYS['start_emergency'], data);
							break;
						case ACTION_KEYS['department_message_list']:	//部门信息
							Vue.prototype.$bus.emit(ACTION_KEYS['department_message_list'], data);
							break;
						case ACTION_KEYS['message_list']:	//三防预警台信息
							Vue.prototype.$bus.emit(ACTION_KEYS['message_list'], data);
							break;
						case ACTION_KEYS['message_list_auto']:	//三防预警台增加信息
							Vue.prototype.$bus.emit(ACTION_KEYS['message_list_auto'], data);
							break;
						case ACTION_KEYS['task_list']:	//执行情况
							Vue.prototype.$bus.emit(ACTION_KEYS['task_list'], data);
							break;
						case ACTION_KEYS['departmenttask_list']:	//获取部门预案任务
							Vue.prototype.$bus.emit(ACTION_KEYS['departmenttask_list'], data);
							break;
						case ACTION_KEYS['reporttask_data']:	//获取上报数据后返回的状态
							Vue.prototype.$bus.emit(ACTION_KEYS['reporttask_data'], data);
							break;
						case ACTION_KEYS['updatetask_data']:	//获取修改上报数据后返回的状态
							Vue.prototype.$bus.emit(ACTION_KEYS['updatetask_data'], data);
							break;
						case ACTION_KEYS['task_statis']:	//获取修改上报数据后返回的状态
							Vue.prototype.$bus.emit(ACTION_KEYS['task_statis'], data);
							break;
						case ACTION_KEYS['departmenttask_chart']:	//获取单个部门执行情况内容
							Vue.prototype.$bus.emit(ACTION_KEYS['departmenttask_chart'], data);
							break;
					}
					break;
				case CODE_STATUS['LOGINED']:	//用户已登陆
					Vue.prototype.$bus.emit(ACTION_KEYS['user_has_logined'], data);
					break;
				case CODE_STATUS['TOKEN_ISOVER']:	//token过期
					timeOutAction();
					break;
				case CODE_STATUS['HEART_BIT']:	//心跳信息
				
					break;
				
				default:
//					console.log(data)
					Vue.prototype.$bus.emit(data.action, data);
					break;
			}
				
			// 收到消息，重置定时器
			clearTimeout(socket.receiveMessageTimer);
			socket.receiveMessageTimer = setTimeout(() => {
				socket.close();
			}, 30000); // 30s没收到信息，代表服务器出问题了，关闭连接。
		}

		socket.onerror = () => {
			console.error('onerror')
		}

		socket.onclose = (e) => {
			clearTimeout(socket.receiveMessageTimer);
			clearInterval(socket.keepAliveTimer);
			store.commit('SET_SOCKET', null);
			if(!reconnectMark) { // 如果没有重连过，进行重连。
				reconnect = new Date().getTime();
				reconnectMark = true;
			}

			if(new Date().getTime() - reconnect >= 10000) { // 10秒中重连，连不上就不连了
				socket.close();
			} else {
				initSocket();
			}
		}
	}

}

let isAlerting = false;

export function sendSocket(obj) {
	let str = JSON.stringify(obj);
	
	if (store.getters.socket) {
//			console.log(obj)
		store.getters.socket.send(str);
	}
}

export function timeOutAction(str = '登录超时，请重新登录。', isNeedAlert = true) {
	if (isAlerting) {
		return
	}
	isAlerting = true;
//	isAllowSendHead_bit = false;
	removeLocalStorage(userInfoLocalStroageKey);
	const timeOut = str;
	
	window.location.href = location.pathname;
	if (isNeedAlert) {	
		alert(timeOut);
	}
}

import { 
	getDepartInfoList,
	getWarnInfoList,
	getImplementInfoList
} from 'api/socketAPI';

export function initWebList() {
	if (!store.getters.ifCommand) {
		return
	}
	
	let code = store.getters.userInfo.department_code;
	
	//获取部门信息
	getDepartInfoList({
		department_code: code
	});
	
	//获取三防预警台信息
	getWarnInfoList();
	
	//获取执行情况
	getImplementInfoList({
		department_code: code
	});
}
