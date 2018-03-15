import { ajaxPost } from 'api/axios'
import { options } from 'api/config'

// 任务预设
// 查询全部列表
export function getpresetTaskList(obj) {
	let url = 'sf_task_preplan/list'

	return ajaxPost(url, obj, options())
}
// 增加
export function addpresetTask(obj) {
	let url = 'sf_task_preplan/new'

	return ajaxPost(url, obj, options())
}

// 编辑
export function editpresetTask(obj) {
	let url = 'sf_task_preplan/edit'
	return ajaxPost(url, obj, options())
}

// 删除
export function deletepresetTask(obj){
	let url = 'sf_task_preplan/delete'
	return ajaxPost(url, obj, options())
}

// 任务执行
// 查询全部列表
export function getTaskCryList(obj) {
	let url = 'sf_task/list'

	return ajaxPost(url, obj, options())
}
// 增加
export function addTaskCry(obj) {
	let url = 'sf_task/new'

	return ajaxPost(url, obj, options())
}

// 编辑
export function editTaskCry(obj) {
	let url = 'sf_task/edit'
	return ajaxPost(url, obj, options())
}

// 删除
export function deleteTaskCry(obj){
	let url = 'sf_task/delete'
	return ajaxPost(url, obj, options())
}

// 生成事前任务
export function addBeforeTask(){
	let url = 'sf_task/generateTask'
	let obj = {
		'task_type': '事前任务'
	}
	return ajaxPost(url, obj, options())
}
