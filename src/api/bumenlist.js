import { ajaxGet,ajaxPost} from 'api/axios'
import { options } from 'api/config'

// 部门列表
export function getUserList(page = 1, search = {}) {
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

export function getDepList() {
	let url = 'sys/department/list'
	
	let data = {
		searchValue: {}
	}
	
	return ajaxPost(url, data, options())
}

// 搜索
export function getUserLists(page = 1, search = {}) {
	let url = 'sys/department/list'
	let data = {
		page:page,
		pageSize: 10,
  	order: {},
    searchValue: {
			...search
		}
	}
	return ajaxPost(url, data, options())
}

// 部门新增
export function getAddList(obj){
  let url = 'sys/department/new'
  let data = {
		...obj
	}
  return ajaxPost(url,data,options())
}

// 部门删除
export function getdelete(ids){
  let url = 'sys/department/delete'
  let data = {
		_ids: ids
	}
  return ajaxPost(url,data,options())
}

//部门修改
export function getedit(obj){
  let url = 'sys/department/edit'
  let data = {
		...obj
	}
  return ajaxPost(url,data,options())
}


