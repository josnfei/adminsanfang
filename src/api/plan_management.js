import { ajaxPost } from 'api/axios'
import { options } from 'api/config'


// 部门预案
    // 查询全部列表
    export function getdepList(obj) {
        let url = 'sf_emergence_plan/list'
        return ajaxPost(url, obj, options())
    }
    // 增加
    export function addDep(obj) {
        let url = 'sf_emergence_plan/new'

        return ajaxPost(url, obj, options())
    }

    // 修改
    export function updateDep(obj) {
        let url = 'sf_emergence_plan/edit'
        return ajaxPost(url, obj, options())
    }

    // 删除
    export function deleteDep(obj) {
        let url = 'sf_emergence_plan/delete'
        return ajaxPost(url, obj, options())
    }

// 预案审批
    // 查询全部列表
    export function getAprList(obj) {
        let url = 'sf_emergence_plan/submitlist'

        return ajaxPost(url, obj, options())
    }
    // 提交审批申请
    export function submit(obj) {
        let url = 'sf_emergence_plan/submit'

        return ajaxPost(url, obj, options())
    }

    // 预案回退
    export function withdraw(obj) {
        let url = 'sf_emergence_plan/withdraw'
        return ajaxPost(url, obj, options())
    }

    // 预案审批
    export function approve(obj) {
        let url = 'sf_emergence_plan/approve'
        return ajaxPost(url, obj, options())
    }

// 社区预案
    // 查询全部列表
    export function getcotList(obj) {
        let url = 'sf_emergence_plan/list'
        let data = {
            ...obj
        }

        return ajaxPost(url, data, options())
    }
    // 增加
    export function addCot(obj) {
        let url = 'sf_emergence_plan/new'

        return ajaxPost(url, obj, options())
    }

    // 修改
    export function updateCot(obj) {
        let url = 'sf_emergence_plan/edit'
        return ajaxPost(url, obj, options())
    }

    // 删除
    export function deleteCot(obj) {
        let url = 'sf_emergence_plan/delete'
        return ajaxPost(url, obj, options())
    }

// 专题预案
    // 查询全部列表
    export function getopicList(obj) {
        let url = 'sf_emergence_plan/list'

        return ajaxPost(url, obj, options())
    }
    // 增加
    export function addTopic(obj) {
        let url = 'sf_emergence_plan/new'

        return ajaxPost(url, obj, options())
    }

    // 修改
    export function updateTopic(obj) {
        let url = 'sf_emergence_plan/edit'
        return ajaxPost(url, obj, options())
    }

    // 删除
    export function deleteTopic(obj) {
        let url = 'sf_emergence_plan/delete'
        return ajaxPost(url, obj, options())
    }