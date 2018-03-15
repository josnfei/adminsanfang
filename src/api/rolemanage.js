import { ajaxGet,ajaxPost} from 'api/axios'
import { options } from 'api/config'

export function getUserList(page = 1, search = {}) {
	let url = 'sys/role/list'
	
	let data = {
		page: page,
		pageSize: 10,
		searchValue: {
			...search
		},
		// order: {
		// 	_id: -1
		// }
	}
	
	return ajaxPost(url, data, options())
}
//新增
export function getAddlist(obj) {
	let url = 'sys/role/new'
	let data = {
    ...obj
  }
	
	return ajaxPost(url, data, options())
}
//删除
export function deletelist(ids) {
	let url = 'sys/role/delete'
	let data = {
    _ids:ids
  }
	return ajaxPost(url, data, options())
}
//编辑
export function editlist(obj) {
	let url = 'sys/role/edit'
	let data = { 
    ...obj
  }
	return ajaxPost(url, data, options())
}


// 树形图新增
export function addtreelist() {
	let url = 'sys/module/treelist'
	let data ={

    searchValue: {}

	}
	return ajaxPost(url, data, options())
}

// 树形图编辑

export function edittreelist(row) {
	let url = 'sys/role/treelist'
	let data = {
		searchValue: {
			roleid: ''
		}
	}
	data.searchValue.roleid = row.roleid

	return ajaxPost(url, data, options())
}

//权限下拉框
export function getrole(system_name={},system_id={}) {
	let url = 'sys/system_info/list'
	let data = {
    ...system_name,
    ...system_id
  }
	
	return ajaxPost(url, data, options())
}
