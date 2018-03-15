import { ajaxGet, ajaxPost } from 'api/axios'
import { options } from 'api/config'

// 表格列表
export function getUserList(search = {}) {
	let url = 'dp_rpdata_template/list'

	let data = {
		searchValue: {
			...search
		}
	}

	return ajaxPost(url, data, options())
}

// 表格新增
export function getAddLists(obj) {
	let url = 'dp_rpdata_template/edit'
	let data = {
		...obj
	}
	return ajaxPost(url, data, options())
}

// 网页保存按钮
export function getaddList(obj) {
	let url = 'dp_rpdata_template/new'
	let data = {
		...obj
	}
	return ajaxPost(url, data, options())
}

// 删除
export function getDelList(ids) {
	let url = 'dp_rpdata_template/delete'
	let data = {
		_ids: ids
	}
	return ajaxPost(url, data, options())
}

//网页修改按钮
export function geteditList(obj) {
	let url = 'dp_rpdata_template/edit'
	let data = {
		...obj
	}
	return ajaxPost(url, data, options())
}