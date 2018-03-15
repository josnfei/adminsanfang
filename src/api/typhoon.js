import { ajaxGet1 } from './axios';
import { data_map_httpUrl } from './config';

//台风路径列表
export function getTyphoonList() {
	let url = `${data_map_httpUrl}fullservice/http/typhoonInfo`;

	let data = {}
	
	return ajaxGet1(url, data);
}

//单个台风路径信息
export function getTyphoonSingelInfo(tfbh) {
	let url = `${data_map_httpUrl}fullservice/http/typhoonPath`;

	let data = {
		tfbh
	}
	
	return ajaxGet1(url, data);
}