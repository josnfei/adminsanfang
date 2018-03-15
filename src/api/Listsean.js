import { ajaxGet, ajaxPost } from 'api/axios'
import { options } from 'api/config'

//表格列表
export function getuserList(page = 1, search = {}) {
	let url = 'dp_rpdata_list/list'
	let data = {
		page: page,
		pageSize: 10,
		searchValue: {
			...search
		},
	}
	return ajaxPost(url, data, options())
}

//明细页面的接口
export function getUserList(search = {}) {
	let url = 'dp_rpdata_template/list'

	let data = {
		searchValue: {
			...search
		}
	}

	return ajaxPost(url, data, options())
}