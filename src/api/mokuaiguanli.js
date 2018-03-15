import { ajaxGet,ajaxPost} from 'api/axios'
import { options } from 'api/config'

// 部门列表
export function getUserList(page = 1, search = {}) {
	let url = 'sys/module/list'
	
	let data = {
		page: page,
		pageSize: 10,
		searchValue: {
			...search
		},
		order: {}
	}
	
	return ajaxPost(url, data, options())
}

