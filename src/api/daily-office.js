import { ajaxGet, ajaxPost } from 'api/axios'
import { options } from 'api/config'

// 通讯录管理
export function addressBookApi(type, obj) {
    let url = `oa/dp_contact_list/list/${type}`
    let data = {
        ...obj
    }
    return ajaxPost(url, data, options())
}

// 通知公告
export function noticeApi(type, obj) {
    let url = `sf/sf_notice/${type}`
    let data = {
        ...obj
    }
    return ajaxPost(url, data, options())
}

// 通知公告-发布
export function releaseApi(obj) {
    let url = 'oa/sf_notice/publish'
    let data = {
        ...obj
    }
    return ajaxPost(url, data, options())
}

// 上传
export function uploadApi(obj) {
    let url = 'common/upload'
    return ajaxPost(url, obj, options())
}

let token = options().headers.token

export function url() {
    let url = `http://192.168.1.138:8080/sanfangstruts/common/upload?token=${token}&system_id=1000010`
    return url
}

// 公文收发
export function addresseeApi(type, obj) {
    let url = `oa/dp_document/${type}`
    let data = {
        ...obj
    }
    return ajaxPost(url, data, options())
}

// 短信管理
export function noteApi(type, obj) {
    let url = `oa/dp_send_message/${type}`
    let data = {
        ...obj
    }
    return ajaxPost(url, data, options())
}

// 资料管理
export function dataApi(type, obj) {
    let url = `oa/dp_material_refer/${type}`
    let data = {
        ...obj
    }
    return ajaxPost(url, data, options())
}

// 资料管理上传
export function getUrl() {
    let url = `http://192.168.1.138:8080/sanfangstruts/oa/dp_material_refer/upload?token=${48669290}&system_id=1000010`
    return url
}

// 资料管理下载
export function downLoad(obj) {
    let url = `common/download`
    let data = {
        ...obj
    }
    return ajaxPost(url, data, options())
}

