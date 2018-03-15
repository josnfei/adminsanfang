import { ajaxGet, ajaxPost } from 'api/axios'
import { options } from 'api/config'

// 表格列表
export function getUserList(page = 1, search = {}) {
  let url = 'dp_rpdata_template/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    }
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

