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

//数据列表
export function getList(page=1,search={},addSearch={}){
	console.log(search)
	let url = 'dp_rpdata_list/getlist'
	let data = {
		page:page,
		pageSize:10,
		searchValue: {
			...search
		},
		order:{"createdt":-1},
		...addSearch
	}
	return ajaxPost(url, data, options())
}

//imput输入框
export function getinputList(obj){
	let url = 'dp_rpdata_list/input'
	let data = {
		...obj
	}
	return ajaxPost(url, data, options())
}

//清空
//export function getdeleteList(ids) {
//	let url = 'dp_rpdata_list/clear'
//	let data = {
//		_ids:ids
//	}
//	return ajaxPost(url, data, options())
//}
export function getdeleteList(addSearch={},ids) {
	let url = 'dp_rpdata_list/clear'
	let data = {
		...addSearch,
		_ids:ids
	}
	return ajaxPost(url, data, options())
}


//选择部门
export function getbumenList(page=1,search={}) {
	let url = 'sys/department/list'
	
	let data = {
		page: page,
		pageSize: 10,
		searchValue: {
			...search
		}
	}
	
	return ajaxPost(url, data, options())
}
