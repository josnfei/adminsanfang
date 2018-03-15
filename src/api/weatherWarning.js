import axios from 'axios';
import { weatherHttpUrl, ERR_CUSTOM } from './config';

export function getWeather() {
	
	let url1 = `${weatherHttpUrl}proxy/router/getForcast10dayNH`;
	
	let data1 = {
		token: '0e597131d9f43b7ca2dc16411f914a11'
	};
	
	let axiosGet1 = axios.get(url1, {
		params: data1
	});
	
	let url2 = `${weatherHttpUrl}proxy/router/view_stationinfo`;
	
	let data2 = {
		token: 'b703fb1dd205efe6946b1e3ca0964d2a',
		Iiiii: 'G2267'
	};
	
	let axiosGet2 = axios.get(url2, {
		params: data2
	});
	
	let url3 = `${weatherHttpUrl}proxy/router/getFormeteo_3h `;
	
	let data3 = {
		token: '1dd603d70996f46a3625f452aa387094',
		Iiiii: 'G2267'
	};
	
	let axiosGet3 = axios.get(url3, {
		params: data3
	});
	
	return axios.all([axiosGet1, axiosGet2, axiosGet3])
			.then(axios.spread((res1, res2, res3) => {
				let obj = {};
				
				if(res1.data.rows.length) {
					obj['res1'] = res1.data
				}
				
				if(res2.data.rows.length) {
					obj['res2'] = res2.data
				}
				
				if(res3.data.rows.length) {
					obj['res3'] = res3.data
				}
				
				return Promise.resolve(obj);
			}))
			.catch(res => {
				return Promise.resolve({
					code: ERR_CUSTOM
				});
			});
}