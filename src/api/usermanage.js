import { ajaxGet, ajaxPost } from 'api/axios'
import { options } from 'api/config'

export function getUserList(page = 1, search = {}) {
	let url = 'sys/userinfo/list'

	let data = {
		page: page,
		pageSize: 10,
		searchValue: {
			...search
		},

	}

	return ajaxPost(url, data, options())
}
//新增
export function getOgnList(obj) {
	let url = 'sys/userinfo/new'

	let data = {
		...obj
	}

	return ajaxPost(url, data, options())
}
//编辑
export function updateUserList(obj) {
	let url = 'sys/userinfo/edit'
	let data = {
		...obj
	}

	return ajaxPost(url, data, options())
}
//删除
export function updateUserPsw(ids) {
	let url = 'sys/userinfo/delete'
	let data = {
		_ids: ids

	}

	return ajaxPost(url, data, options())
}

// 用户角色下拉框
export function getrolelist(page = 1, search = {}) {
	let url = 'sys/role/list'
	let data = {
		page: page,
		pageSize: 10,
		searchValue: {
			...search
		},
	}
	return ajaxPost(url, data, options())
}

// 用户部门下拉框
export function getbumenlist(page = 1, search = {}) {
	let url = 'sys/department/list'
	let data = {
		page: page,
		pageSize: 10,
		searchValue: {
			...search
		},
	}
	return ajaxPost(url, data, options())
}
