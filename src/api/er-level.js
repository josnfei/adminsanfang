import { ajaxPost } from 'api/axios'
import { options } from 'api/config'

// 查询全部列表
export function getErlList(obj) {
	let url = 'sf_response_level/list'

	return ajaxPost(url, obj, options())
}
// 修改
export function updateErl(obj) {
	let url = 'sf_response_level/edit'

	return ajaxPost(url, obj, options())
}
