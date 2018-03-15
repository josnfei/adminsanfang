import { ajaxPost } from 'api/axios'
import { options } from 'api/config'

// 查询全部列表
export function getErcList(obj) {
	let url = 'sf_response_kanban/list?system_id=1000010'

	return ajaxPost(url, obj, options())
}