import { ajaxPost } from 'api/axios'

export function goLogin(obj) {
	let url = 'sys/userinfo/login'
	
	return ajaxPost(url, obj)
}
  