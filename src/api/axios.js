import axios from 'axios'
import { httpUrl, ERR_TIMEOUT, system_id } from 'api/config'
import { removeUserIng } from 'common/js/util'
import { getUserIng } from 'common/js/util'

const info = getUserIng()
let sanfang_integration_service_loginfo = {}
if (info) {
	sanfang_integration_service_loginfo = {
		"username": info.username,
		"password": info.password,
		"sanfang_integration_service_loginfo": {
			"department_code": info.department_code,
			"logintime": info.logintime,
			"role": info.role,
			"system_id": info.system_id,
			"system_name": info.system_name,
			"department_name": info.department_name,
			"mobile": info.mobile,
			"remark": info.remark,
			"userid": info.userid,
			"realname": info.realname,
			"token": info.token,
			"role_id": info.role_id,
			"loginip": info.loginip,
			"_id": info._id,
			"department_level": info.department_level,
			"department_fullname": info.department_fullname,
			"username": info.username
		}
	}
} else {
	sanfang_integration_service_loginfo = {}
}
const timeOut = '登录超时，请重新登录。'

//页面接口通用接口 get 
export function ajaxGet(url = '', data = {}, option = {}) {
	data.sanfang_integration_service_loginfo = sanfang_integration_service_loginfo
	url = `${httpUrl}${url}?${system_id}`
	return axios.get(url, {
		params: data,
		...option
	}).then(res => {
		if (res.code === ERR_TIMEOUT) {
			removeUserIng()
			alert(timeOut)
			window.location.href = location.pathname
			return
		}
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.resolve(res.data)
	})
}

//页面接口通用接口 get 
export function ajaxGet1(url = '', data = {}, option = {}) {
	data.sanfang_integration_service_loginfo = sanfang_integration_service_loginfo
	return axios.get(url, {
		params: data,
		...option
	}).then(res => {
		if (res.code === ERR_TIMEOUT) {
			removeUserIng()
			alert(timeOut)
			window.location.href = location.pathname
			return
		}
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.resolve(res.data)
	})
}

//页面接口通用接口 Post 
export function ajaxPost(url = '', data = {}, option = {}) {
	data.sanfang_integration_service_loginfo = sanfang_integration_service_loginfo
	url = `${httpUrl}${url}?${system_id}`

	return axios.post(url, data, option).then(res => {
		if (res.data.code === ERR_TIMEOUT) {
			removeUserIng()
			alert(timeOut)
			window.location.href = location.pathname
			return
		}
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.resolve(res.data)
	})
}

//页面接口通用接口 post 
export function ajaxPost1(url = '', data = {}, option = {}) {
	return axios.post(url, data, option).then(res => {
		if (res.data.code === ERR_TIMEOUT) {
			removeUserIng()
			alert(timeOut)
			window.location.href = location.pathname
			return
		}
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.resolve(res.data)
	})
}

//页面接口通用接口 All 
export function ajaxAll(arr, option = {}) {
	let ajaxArr = []
	data.sanfang_integration_service_loginfo = sanfang_integration_service_loginfo
	arr.map(item => {
		if (item.method === 'get') {
			ajaxArr.push(axios.get(`${httpUrl}${item.url}`, {
				params: item.data,
				...option
			}))
		} else {
			ajaxArr.push(axios.post(`${httpUrl}${item.url}`, item.data, option))
		}
	})

	return axios.all(ajaxArr).then((...res) => {
		let timeout = false
		let data = []
		for (let item of res[0]) {
			if (item.data.code === ERR_TIMEOUT) {
				removeUserIng()
				alert(timeOut)
				window.location.href = location.pathname
				timeout = true
			}
			data.push(item)
		}

		return Promise.resolve(data)
	}).catch((...res) => {
		return Promise.resolve(res)
	})
}