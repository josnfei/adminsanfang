import { ajaxGet, ajaxPost } from 'api/axios'
import { options } from 'api/config'

//列表
export function getformList(search = {}) {
	let url = 'dp_rpdata_template/list'
	let data = {
		searchValue: {
			...search
		}
	}
	return ajaxPost(url, data, options())
}

//保存
export function getaddList(obj) {
	let url = 'dp_rpdata_list/new'
	let data = {
		...obj
	}
	return ajaxPost(url, data, options())
}

