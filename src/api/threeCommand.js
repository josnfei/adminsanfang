/* 指挥一张图调接口文件 
* @ 劳兆城 
* @ 2017-08-08*/

import axios from 'axios';
import { ajaxGet1, ajaxPost1 } from './axios';
import { Static, data_map_httpUrl, httpUrls } from './config';
import { options } from './config';

//警告信息
export function getWarnInfo(obj = {}) {
	let url = `${httpUrls}sf-websocket/emergency/start_emergency/warning_info`;
	
	let data = {}
	
	return ajaxPost1(url, data, options())
}

//启动应急响应
export function startEmergency(obj = {}) {
	let url = `${httpUrls}sf-websocket/emergency/start_emergency`;
	
	let data = {
    'response_list': obj.response_list
  }
	
	return ajaxPost1(url, data, options())
}

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

//获取南海区GeoJson
export function getNormalMapData() {
	const url = `${Static}json/normalMap.json`;
	
	return ajaxGet1(url, {});
}

//获取树Json
export function getTreesData() {
	const url = `${Static}json/trees.json`;
	
	return ajaxGet1(url, {});
}

//获取上报数据Json
//export function getReportingData() {
//	const url = `${Static}json/report.json`;
//	
//	return ajaxGet1(url, {});
//}

//获取下发指令Json
export function getSendData() {
	const url = `${Static}json/send.json`;
	
	return ajaxGet1(url, {});
}
