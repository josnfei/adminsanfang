import { ajaxGet,ajaxPost} from 'api/axios'
import { options } from 'api/config'


// 列表
export function getUserList(page = 1, search = {}) {
	let url = 'dp/dangerous_build/list'
	
	let data = {
		page: page,
		pageSize: 10,
		searchValue: {
			...search
		},
		order:{_id: -1}
	}
	
	return ajaxPost(url, data, options())
}

//新增
export function getaddlist(obj) {
	let url = 'dp/dangerous_build/new'
	
	let data = {
		...obj
	}
	
	return ajaxPost(url, data, options())
}

//编辑
export function geteditlist(obj) {
	let url = 'dp/dangerous_build/edit'
	
	let data = {
		...obj
	}
	
	return ajaxPost(url, data, options())
}

//删除
export function getdellist(ids) {
	let url = 'dp/dangerous_build/delete'
	
	let data = {
		_ids: ids
	}
	
	return ajaxPost(url, data, options())
}