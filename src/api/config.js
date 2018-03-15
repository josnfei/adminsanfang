import { getUserIng } from 'common/js/util'

//接口地址
//export const httpUrl = 'http://192.168.1.138:8080/sanfangstruts/';
   export const httpUrl = 'http://192.168.1.7:8050/sanfangstruts/';
// export const httpUrl = 'http://202.105.25.138:20465/sanfangstruts/';
//export const httpUrl = 'http://10.168.80.15:8090/sanfangstruts/';

//const IP = '10.168.80.15:8080';

const IP = '202.105.25.138:20465';

export const httpUrls = `http://${IP}/`;

//数据一张图接口地址
//export const data_map_httpUrl = 'http://10.168.80.15:8090/';
export const data_map_httpUrl = 'http://free.ngrok.cc:14754/';

//webSocket地址
export const socketHttpUrl = `ws://${IP}/sf-websocket/ws/websocket`;

//地图20462地址
//export const mapHttpUrl20462 = 'http://10.168.80.11:6080/';
export const mapHttpUrl20462 = 'http://202.105.25.138:20462/';

//地图20463地址
//export const mapHttpUrl20463 = 'http://10.168.80.11:8888/';
export const mapHttpUrl20463 = 'http://202.105.25.138:20463/';

//气象天气预报接口地址
//export const weatherHttpUrl = 'http://10.168.80.9:8090/';
export const weatherHttpUrl = 'http://free.ngrok.cc:14804/';

//后台数据返回成功标识
export const ERR_OK = '0000';

//登录超时
export const ERR_TIMEOUT = '0004';

//js访问 static 文件夹路径
export const Static = 'static/';

export const system_id = 'system_id=1000010';
// console.log(getUserIng())
//访问后台传的token值
export function options() {
	let user = getUserIng() || {}
	return {
		headers: {
			token: user.token,
			// info: getUserIng()

		}
	}
}

//自定义错误标识
export const ERR_CUSTOM = '2000';