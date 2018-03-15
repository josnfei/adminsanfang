import { ajaxGet,ajaxPost} from 'api/axios'
import { options } from 'api/config'


// 列表
export function getUserList(page = 1, search = {}) {
	let url = 'dp/penetrating_pipe/list'
	
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
	let url = 'dp/penetrating_pipe/new'
	
	let data = {
		...obj
	}
	
	return ajaxPost(url, data, options())
}

//编辑
export function geteditlist(obj) {
	let url = 'dp/penetrating_pipe/edit'
	
	let data = {
		...obj
	}
	
	return ajaxPost(url, data, options())
}

//删除
export function getdellist(ids) {
	let url = 'dp/penetrating_pipe/delete'
	
	let data = {
		_ids: ids
	}
	
	return ajaxPost(url, data, options())
}
	
