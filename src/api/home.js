import { ajaxPost } from 'api/axios'
import { options } from 'api/config'

// 重要提示
export function getPromptList(){
    let url = ''
    let data = {
        searchValue: {}
    }
    return ajaxPost(url, data, options())
}

// 预警
export function getWarmingList() {
	let url = 'town/inforce_warning'
    let data = {
        searchValue: {}
    }
	return ajaxPost(url, data, options())
}

// 天气预报
export function getWeatherList(){
    let url = 'forecast/folo_10d'
    let data = {
        searchValue: {}
    }
    return ajaxPost(url, data, options())
}

// 当前水情
export function getWaterList(){
    let url = 'water/waterlevel'
    let data = {
        searchValue: {
            'status': '启动'
        }
    }
    return ajaxPost(url, data, options())
}

// 应急响应提醒
export function response(){
    let url = 'sf_response/notice'
    return ajaxPost(url, {}, options())
}

// 预警公告
export function warningNotice(){
    let url = 'sf/sf_emergency_warning/list'
    let data = {
        searchValue: {
            'status': '启动'
        }
    }
    return ajaxPost(url, data, options())
}

// 通知公告
export function notice(page){
    let url = 'sf/sf_notice/list'
    let data = {
        page: 1 || page,
        pageSize: 10,
        searchValue: {
            'status': '发布'
        }
    }
    return ajaxPost(url, data, options())
}

// 任务执行提醒
export function taskRemind(){
    let url = 'sf_task/list'
    let data = {
        searchValue: {
            'department_code': localStorage.getItem('info').department_code,
            'status': '进行中'
        }
    }
    return ajaxPost(url, data, options())
}

// 指令执行
export function messageQueue(){
    let url = 'sf/message_queue/list'
    let data = {
        searchValue: {
            'department_code': localStorage.getItem('info').department_code,
            "messagecategory":"指令执行"
        }
    }
    return ajaxPost(url, data, options())
}

// 灾情统计
export function disasterStatistics(){
    let url = 'sf/message_queue/list'
    let data = {
        searchValue: {
            'department_code': localStorage.getItem('info').department_code,
            "messagecategory":"指令执行"
        }
    }
    return ajaxPost(url, data, options())
}