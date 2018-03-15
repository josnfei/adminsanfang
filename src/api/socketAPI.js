import { sendSocket, ACTION_KEYS } from 'api/socket';
import store from 'src/store';

//启动应急响应
export function startEmergency(obj = {}) {
	let userInfo = store.getters.userInfo;
	
	sendSocket({
		'action': ACTION_KEYS['start_emergency'],
		'actionName': '启动应急响应',
		'token': userInfo.token,
		'param': {
			'department_name':  userInfo.department_name,
			'department_code': userInfo.department_code,
			'department_level': userInfo.department_level,
			...obj
		}
	})
}

//获取部门信息台列表
export function getDepartInfoList(obj = {}) {
	sendSocket({
		'action': ACTION_KEYS['department_message_list'],
		'actionName': '部门消息列表',
		'token': store.getters.userInfo.token,
		'param': obj
	})
}

//部门信息台点击确认
export function departSureMessage(id = '') {
	sendSocket({
		'action': ACTION_KEYS['confirm_message'],
		'token': store.getters.userInfo.token,
		'param': {
			_id: id
		}
	})
}

//获取三防预警台初始化信息列表
export function getWarnInfoList(obj = {}) {
	sendSocket({
		'action': ACTION_KEYS['message_list'],
		'actionName': '消息列表',
		'token': store.getters.userInfo.token,
		'param': obj
	})
}

//获取三防预警台初始化信息列表
export function getImplementInfoList(obj = {}) {
	let userInfo = store.getters.userInfo;
	
	sendSocket({
		'action': ACTION_KEYS['task_list'],
		'actionName': '消息列表',
		'token': userInfo.token,
		'param': {
			'department_code': userInfo.department_code,
			...obj
		}
	})
}

//获取当前部门任务汇报列表
export function getDepartTaskList(obj = {}) {
	sendSocket({
		'action': ACTION_KEYS['departmenttask_list'],
		'token': store.getters.userInfo.token,
		'param': obj
	})
}

//任务汇报上报数据或确认完成
export function sendReportTaskList(obj = {}) {
	sendSocket({
		'action': ACTION_KEYS['reporttask_data'],
		'token': store.getters.userInfo.token,
		'param': obj
	})
}

//任务汇报完成修改
export function editReportTaskList(obj = {}) {
	sendSocket({
		'action': ACTION_KEYS['updatetask_data'],
		'token': store.getters.userInfo.token,
		'param': obj
	})
}

//获取执行情况统计数据
export function getTaskStatis(obj = {}) {
	sendSocket({
		'action': ACTION_KEYS['task_statis'],
		'token': store.getters.userInfo.token,
		'param': obj
	})
}

//获取单个部门执行情况内容
export function getDepartmenttaskChart(obj = {}) {
	sendSocket({
		'action': ACTION_KEYS['departmenttask_chart'],
		'token': store.getters.userInfo.token,
		'param': {
			'department_code': obj.department_code
		}
	})
}
