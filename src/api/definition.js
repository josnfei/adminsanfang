import { ajaxGet,ajaxPost} from 'api/axios'
import { options } from 'api/config'

// 部门系统定义列表
export function defUserList(page = 1, search = {}){
    let url = 'dp_member_sysdef/list'
  	let data = {
		page: page,
		pageSize: 10,
		searchValue: {
			...search
		},
  }
  return ajaxPost(url, data, options())
}

// 新增
export function defaddList(obj){
  let url = 'dp_member_sysdef/new'
  let data = {
    ...obj
  }
  return ajaxPost(url, data, options())
}

// 修改
export function defeditList(obj){
  let url = 'dp_member_sysdef/edit'
  let data ={
    ...obj
  }
  return ajaxPost(url, data, options())
}

//删除
export function defdelList(ids){
  let url = 'dp_member_sysdef/delete'
  	let data = {
		_ids:ids
  }
  return ajaxPost(url, data, options())
}