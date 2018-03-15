import { ajaxGet, ajaxPost } from 'api/axios'
import { options } from 'api/config'

// 巡查任务安排
export function patrolPlanApi(type, obj) {
    let url = `mobile/sf_patrol_task/${type}`
    let data = {
        ...obj
    }
    return ajaxPost(url, data, options())
}

// 巡查任务记录
export function patrolRecordApi(type, obj) {
    let url = `mobile/sf_patrol_log/${type}`
    let data = {
        ...obj
    }
    return ajaxPost(url, data, options())
}

// 上传
export function uploadApi(obj) {
    let url = 'oa/sf_notice/upload'
    return ajaxPost(url, obj, options())
}

let token = options().headers.token

export function url() {
    let url = `http://192.168.1.138:8080/sanfangstruts/oa/sf_notice/upload?token=${48669290}&system_id=1000010`
    return url
}