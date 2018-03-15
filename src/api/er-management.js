import { ajaxPost } from 'api/axios'
import { options } from 'api/config'

// 查询全部列表
export function getErmList(obj) {
	let url = 'sf_response/list'

	return ajaxPost(url, obj, options())
}
// 增加
export function addErm(obj) {
	let url = 'sf_response/new'

	return ajaxPost(url, obj, options())
}

// 调整
export function updateErm(obj) {
	let url = 'sf_response/leveladjust'
	return ajaxPost(url, obj, options())
}

// 关闭
export function closeErm(obj){
	let url = 'sf_response/close'
	return ajaxPost(url, obj, options())
}