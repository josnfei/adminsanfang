import { ajaxGet, ajaxGet1 } from './axios';
import { Static, data_map_httpUrl, mapHttpUrl20462, mapHttpUrl20463 } from './config';
import { createHtml, getClassEls } from 'common/js/dom';
import { typhoonStrongLegend, typhoonForecastLegend } from 'common/js/module';
import { timeFilter } from 'common/js/util';

export function createMap(el, layers, options = {}) {
	return new ol.Map({
		target: el,
		layers: layers,
		view: new ol.View({
			center: options.center || [113.0445, 23.0907],
			zoom: options.zoom || 11,
			maxZoom: 19,
			minZoom: 4,
			projection: 'EPSG:4326',
		}),
		controls: ol.control.defaults({
			attribution: false,
		})
	});
}

//创建Features
function createFeatures(LNT, LAT, data = [], img, scale = 0.5) {
	let features = [];
	for(let i = 0; i < data.length; i++) {
		if(+data[i][LNT] && +data[i][LAT]) {
			let feature = new ol.Feature(new ol.geom.Point([data[i][LNT], data[i][LAT]]));
			feature.set('style', new ol.style.Style({
				image: new ol.style.Icon({
					src: img,
					scale: scale
				})
			}));
			feature.set('content', data[i]);
			features.push(feature);
		}
	}
	return features;
}

//创建FeaturesLayer
function createFeaturesLayer(name, features, zIndex = 1) {
	return new ol.layer.Vector({
		style: function(feature) {
			return feature.get('style');
		},
		source: new ol.source.Vector({
			features: features
		}),
		name: name,
		zIndex: zIndex
	});
}

//创建OverLayer
export function createdOverLayer(el, lng, lat, options = {}) {
	return new ol.Overlay({
		element: el,
		position: [lng, lat],
		offset: options.offset || [0, -5],
		stopEvent: options['isStop'] || false,
		autoPan: true
	});
}

//创建KmlSource
export function createdKmlSource(kml) {
	return new ol.source.Vector({
		features: (new ol.format.KML({
			extractStyles: false
		})).readFeatures(kml, {
			dataProjection: 'EPSG:4326',
			featureProjection: 'EPSG:4326'
		})
	})
}

export function getLayer(item, option) {
	let fn,
			layerName = typeof item === 'string' ? item : item.layer;

	switch(layerName) {

		//基础图层
		case 'baseLayer':
			fn = baseLayer();
			break;
		case 'heightLayer':
			fn = heightLayer();
			break;
		case 'FsNhLayer':
			fn = FsNhLayer();
			break;
		case 'notionLayer':
			fn = notionLayer();
			break;
		case 'warnLineLayer':
			fn = warnLineLayer();
			break;

			//气象
		case 'typhoonLayer':
			fn = typhoonLayer();
			break;
		case 'cloudLayer':
			fn = cloudLayer();
			break;
		case 'radarLayer':
			fn = radarLayer();
			break;

			//三防人员
		case 'emergencySquadLayer':
			fn = emergencySquadLayer(item);
			break;
		case 'rescueTeamLayer':
			fn = rescueTeamLayer(item);
			break;
		case 'massHeatLayer':
			fn = massHeatLayer();
			break;
		case 'liabilityPersonLayer':
			fn = liabilityPersonLayer(item);
			break;
		case 'defenseExpertLayer':
			fn = defenseExpertLayer(item);
			break;

			//三防场所
		case 'refugeLayer':
			fn = refugeLayer(item);
			break;
		case 'emergencyLayer':
			fn = emergencyLayer(item);
			break;
	}

	return fn || Promise.resolve({});
}

//创建静态图片图层
function createImgExtent(url, extent) {
	return new ol.layer.Image({
		source: new ol.source.ImageStatic({
			url: url,
			imageExtent: extent
		}),
		opacity: 0.8
	});
}

//用于当地图图层  Zoom 级别 小于 预定className级别时，显示 图标信息 overLayer
export function isShowOverLayer(zoom, className) {
	if(className) {
		let elArr = getClassEls(className);
		let str = '';

		if(zoom < +className.split('-')[1]) {
			str = 'none';
		} else {
			str = 'block';
		}

		for(let i = 0; i < elArr.length; i++) {
			elArr[i].style.display = str;
		}
	} else {
		let classNames = [
			'mustHideOverLayers-7',
			'mustHideOverLayers-12',
			'mustHideOverLayers-15'
		];
		classNames.map(item => {
			let elArr = getClassEls(item);
			let str = '';

			if(zoom < +item.split('-')[1]) {
				str = 'none';
			} else {
				str = 'block';
			}

			for(let i = 0; i < elArr.length; i++) {
				elArr[i].style.display = str;
			}
		})
	}
}

/* 基础图层 */
//普通地图 Layer
function baseLayer() {
	return new ol.layer.Tile({
		source: new ol.source.TileArcGISRest({
			url: `${mapHttpUrl20462}arcgis/rest/services/data_visualization/basemap_backgroud_normal/MapServer`
		})
	});
}

//地形图 Layer
function heightLayer() {
	return new ol.layer.Tile({
		source: new ol.source.XYZ({
			url: `${mapHttpUrl20463}static/map_tile/gaocheng_guangdong_google/tiles/{z}/{y}/{x}.png`
		})
	});
}

//佛山南海 Layer
function FsNhLayer() {
	return new ol.layer.Tile({
		source: new ol.source.TileArcGISRest({
			url: `${mapHttpUrl20462}arcgis/rest/services/data_visualization/basemap_foshan_nanhai/MapServer`
		})
	});
}

//镇街名 Layer
function notionLayer() {
	return new ol.layer.Tile({
		source: new ol.source.TileArcGISRest({
			url: `${mapHttpUrl20462}arcgis/rest/services/data_visualization/notation/MapServer`
		})
	});
}

//警戒线 Layer
function warnLineLayer() {
	let arr1 = [
			[127, 34],
			[127, 22],
			[119, 18],
			[119, 11],
			[113, 4.5],
			[105, 0]
		],
		arr2 = [
			[132, 34],
			[132, 15],
			[120, 0],
			[105, 0]
		];

	var feature1 = new ol.Feature({
		geometry: new ol.geom.LineString(arr1)
	})
	feature1.setStyle(new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'red',
			width: 1
		}),
		text: new ol.style.Text({
			text: '24小时警戒线',
			font: '14px 微软雅黑',
			fill: new ol.style.Fill({
				color: 'white'
			}),
			stroke: new ol.style.Stroke({
				color: 'black',
				width: 2
			})
		})
	}))
	var feature2 = new ol.Feature({
		geometry: new ol.geom.LineString(arr2)
	})
	feature2.setStyle(new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'green',
			width: 2,
			lineDash: [9]
		}),
		text: new ol.style.Text({
			text: '48小时警戒线',
			font: '14px 微软雅黑',
			fill: new ol.style.Fill({
				color: 'white'
			}),
			stroke: new ol.style.Stroke({
				color: 'black',
				width: 2
			})
		})
	}))

	return new ol.layer.Vector({
		source: new ol.source.Vector({
			features: [feature1, feature2]
		}),
		name: 'warnLineLayer'
	})
}

//创建风圈 tip
//function createRingTipOverlay() {
//	let el = createHtml('div');
//	el.className = 'typhoon-ringTip threeCommand-map-infoOverLayer pad-10';
//
//	let infoDiv = createHtml('div');
//	infoDiv.className = 'threeCommand-map-infoOverLayer-warpper blue';
//	el.append(infoDiv);
//
//	let div = createHtml('div');
//	div.className = 'boxTail';
//	div.innerHTML = `<img src="${Static}img/threeCommand/boxTail.png" />`;
//
//	el.append(div);
//
//	return createdOverLayer(el, 113.0445, 23.0907);
//}

//创建台风路径 基础信息 tip
//function createTyphoonInfoOverlay() {
//
//	let el = createHtml('div');
//	el.className = 'typhoon-baseTip threeCommand-map-infoOverLayer';
//
//	let infoDiv = createHtml('div');
//	infoDiv.className = 'typhoon-baseTip-warpper';
//	infoDiv.innerHTML = `
//		<div class="typhoon-baseTip-header">台风路径信息</div>
//		<div class="typhoon-baseTip-content"></div>
//	`;
//
//	el.append(infoDiv);
//
//	let div = createHtml('div');
//	div.className = 'boxTail';
//	div.innerHTML = `<img src="${Static}img/threeCommand/boxTail.png" />`;
//
//	el.append(div);
//
//	return createdOverLayer(el, 113.0445, 23.0907);
//}

//创建台风路径
//export function createTyphoon(info) {
//	let option = info.points[0],
//		options = info.points;
//
//	//风圈
//	let ringColor = {
//		radius7_quad: {
//			"bg-color": 'rgba(155, 219, 203, 0.4)',
//			'border-color': '#24B43D',
//			'text': '7级风圈'
//		},
//		radius10_quad: {
//			"bg-color": 'rgba(244, 255, 151, 0.4)',
//			'border-color': '#DCD024',
//			'text': '10级风圈'
//		},
//		radius12_quad: {
//			"bg-color": 'rgba(247, 179, 178, 0.4)',
//			'border-color': '#E72A1D',
//			'text': '12级风圈'
//		}
//
//	}
//
//	let features = [];
//	let overLayerArr = [];
//	let hideClassName = 'mustHideOverLayers-7';
//
//	for(let key in ringColor) {
//		let wktformat = new ol.format.WKT();
//		let Configs = {
//			CIRCLE_CENTER_X: option.longitude,
//			CIRCLE_CENTER_Y: option.latitude,
//			CIRCLE_R: {
//				"SE": +option[key].se / 100 || 0,
//				"NE": +option[key].ne / 100 || 0,
//				"NW": +option[key].nw / 100 || 0,
//				"SW": +option[key].sw / 100 || 0
//			}
//		};
//
//		if(
//			Configs.CIRCLE_R.SE == 0 &&
//			Configs.CIRCLE_R.NE == 0 &&
//			Configs.CIRCLE_R.NW == 0 &&
//			Configs.CIRCLE_R.SW == 0
//		) {
//			continue;
//		} else {
//			let wkt = "POLYGON((";
//			let wkt0 = "",
//				_interval = 1;
//			for(let i = 0; i < 360 / _interval; i++) {
//				let _r = 0;
//				let _ang = i * _interval;
//				if(_ang > 0 && _ang <= 90) {
//					_r = Configs.CIRCLE_R.NE;
//				} else if(_ang > 90 && _ang <= 180) {
//					_r = Configs.CIRCLE_R.NW;
//				} else if(_ang > 180 && _ang <= 270) {
//					_r = Configs.CIRCLE_R.SW;
//				} else {
//					_r = Configs.CIRCLE_R.SE;
//				}
//
//				let x = Configs.CIRCLE_CENTER_X + _r * Math.cos(_ang * 3.14 / 180);
//				let y = Configs.CIRCLE_CENTER_Y + _r * Math.sin(_ang * 3.14 / 180);
//
//				wkt = wkt + "" + x + " " + y + ", ";
//				if(i === 0) {
//					wkt0 = "" + x + " " + y + "";
//				}
//			}
//			wkt = wkt + wkt0 + "))";
//			let ringFeature = wktformat.readFeature(wkt);
//			ringFeature.setStyle(new ol.style.Style({
//				fill: new ol.style.Fill({
//					color: ringColor[key]['bg-color']
//				}),
//				stroke: new ol.style.Stroke({
//					color: ringColor[key]['border-color'],
//					width: 2
//				})
//			}))
//			ringFeature.set('custom_name', 'typhoonRing');
//			ringFeature.set('ring_name', ringColor[key]['text']);
//			ringFeature.set('ring_length', option[key]);
//			features.push(ringFeature);
//		}
//	}
//
//	//预测路径
//	if(option.forecast) {
//		option.forecast.map(item => {
//			let points = item.points;
//			let localArr = [];
//
//			let ForecastIndex = typhoonForecastLegend.findIndex(items => items.name === item.sets);
//			let color = typhoonForecastLegend[ForecastIndex].color;
//			let pointColor = typhoonForecastLegend[ForecastIndex].pointColor;
//
//			localArr.push([option.longitude, option.latitude]);
//
//			item.points.map(items => {
//				let local = [+items.longitude, +items.latitude];
//
//				localArr.push(local);
//
//				let feature = new ol.Feature(new ol.geom.Point(local));
//
//				feature.setStyle(new ol.style.Style({
//					image: new ol.style.Circle({
//						fill: new ol.style.Fill({
//							color: pointColor
//						}),
//						stroke: new ol.style.Stroke({
//							color: 'black',
//							width: 2
//						}),
//						radius: 5
//					}),
//					zIndex: 10
//				}));
//
//				let obj = {
//					tfbh: option.tfbh,
//					typhoon_name: info.name,
//					sets: item.sets,
//					...items
//				}
//
//				feature.set('content', obj);
//				feature.set('custom_name', 'typhoonPoint');
//				feature.set('custom_type', 'typhoonwill');
//				features.push(feature);
//				let el = createHtml('div');
//				el.className = `typhoon-time ${hideClassName} threeCommand-map-infoOverLayer pad-10`;
//				let infoDiv = createHtml('div');
//				infoDiv.innerHTML = `${timeFilter(new Date(items.time.replace("T", " ")), "dd日HH时")}`;
//				el.append(infoDiv);
//
//				overLayerArr.push(createdOverLayer(el, local[0], local[1], {
//					offset: [35, 10]
//				}));
//			})
//
//			let feature = new ol.Feature({
//				geometry: new ol.geom.LineString(localArr)
//			})
//
//			feature.setStyle(new ol.style.Style({
//				stroke: new ol.style.Stroke({
//					color: color,
//					width: 2,
//					lineDash: [9]
//				})
//			}));
//			features.push(feature);
//		})
//
//	}
//
//	//台风路径
//	let pointsArr = [];
//
//	options.map((item, index) => {
//		let points = item.points;
//		let local = [+item.longitude, +item.latitude];
//
//		if(index === options.length - 1) {
//			let el = createHtml('div');
//			el.className = 'threeCommand-map-infoOverLayer pad-10';
//
//			let infoDiv = createHtml('div');
//			infoDiv.className = 'threeCommand-map-infoOverLayer-warpper blue';
//			infoDiv.innerHTML = `${info.tfbh}: <span class="red">${info.name}</span>`;
//			el.append(infoDiv);
//
//			let div = createHtml('div');
//			div.className = 'boxTail';
//			div.innerHTML = `<img src="${Static}img/threeCommand/boxTail.png" />`;
//
//			el.append(div);
//
//			overLayerArr.push(createdOverLayer(el, local[0], local[1]));
//		}
//
//		if(index === 0) {
//			let el = createHtml('div');
//			el.className = `typhoon-time ${hideClassName} threeCommand-map-infoOverLayer pad-10`;
//
//			let infoDiv = createHtml('div');
//			infoDiv.innerHTML = `${timeFilter(new Date(item.time.replace("T", " ")), "dd日HH时")}`;
//			el.append(infoDiv);
//
//			overLayerArr.push(createdOverLayer(el, local[0], local[1], {
//				offset: [40, 8]
//			}));
//		}
//
//		pointsArr.push(local);
//
//		let feature = new ol.Feature(new ol.geom.Point(local));
//		let strongIndex = typhoonStrongLegend.findIndex(items => items.name === item.strong);
//
//		feature.setStyle(new ol.style.Style({
//			image: new ol.style.Circle({
//				fill: new ol.style.Fill({
//					color: typhoonStrongLegend[strongIndex].color
//				}),
//				stroke: new ol.style.Stroke({
//					color: 'black',
//					width: 2
//				}),
//				radius: 5
//			}),
//			zIndex: 10
//		}))
//
//		let obj = {
//			typhoon_name: info.name,
//			...item
//		}
//
//		feature.set('content', obj);
//		feature.set('custom_name', 'typhoonPoint');
//		feature.set('custom_type', 'typhooned');
//		features.push(feature);
//	})
//
//	let solidFeature = new ol.Feature({
//		geometry: new ol.geom.LineString(pointsArr)
//	})
//
//	solidFeature.setStyle(new ol.style.Style({
//		stroke: new ol.style.Stroke({
//			color: 'black',
//			width: 3,
//			zIndex: 9
//		})
//	}));
//	features.push(solidFeature);
//
//	//实时台风强度图标
//	let el = createHtml('div');
//	let strongIndex = typhoonStrongLegend.findIndex(item => item.name === option.strong);
//	el.className = 'typhoon-ringCenter';
//	let imgPosition = typhoonStrongLegend[strongIndex].imgPosition;
//	el.style.backgroundPosition = imgPosition;
//
//	let overLayer = createdOverLayer(el, option.longitude, option.latitude);
//
//	overLayerArr.push(overLayer);
//
//	let layer = new ol.layer.Vector({
//		source: new ol.source.Vector({
//			features: features
//		}),
//		zIndex: 12,
//		name: 'typhoonLayer'
//	});
//
//	return {
//		info,
//		tfbh: info.tfbh,
//		layer,
//		overLayerArr,
//		hideClassName: 'mustHideOverLayers-7'
//	};
//}

function createRing(option) {
	let features = [];

	//风圈
	let ringColor = {
		radius7_quad: {
			"bg-color": 'rgba(155, 219, 203, 0.4)',
			'border-color': '#24B43D',
			'text': '7级风圈'
		},
		radius10_quad: {
			"bg-color": 'rgba(244, 255, 151, 0.4)',
			'border-color': '#DCD024',
			'text': '10级风圈'
		},
		radius12_quad: {
			"bg-color": 'rgba(247, 179, 178, 0.4)',
			'border-color': '#E72A1D',
			'text': '12级风圈'
		}
	}

	for(let key in ringColor) {
		let wktformat = new ol.format.WKT();
		let Configs = {
			CIRCLE_CENTER_X: option.longitude,
			CIRCLE_CENTER_Y: option.latitude,
			CIRCLE_R: {
				"SE": +option[key].se / 100 || 0,
				"NE": +option[key].ne / 100 || 0,
				"NW": +option[key].nw / 100 || 0,
				"SW": +option[key].sw / 100 || 0
			}
		};

		if(
			Configs.CIRCLE_R.SE == 0 &&
			Configs.CIRCLE_R.NE == 0 &&
			Configs.CIRCLE_R.NW == 0 &&
			Configs.CIRCLE_R.SW == 0
		) {
			continue;
		} else {
			let wkt = "POLYGON((";
			let wkt0 = "",
				_interval = 1;
			for(let i = 0; i < 360 / _interval; i++) {
				let _r = 0;
				let _ang = i * _interval;
				if(_ang > 0 && _ang <= 90) {
					_r = Configs.CIRCLE_R.NE;
				} else if(_ang > 90 && _ang <= 180) {
					_r = Configs.CIRCLE_R.NW;
				} else if(_ang > 180 && _ang <= 270) {
					_r = Configs.CIRCLE_R.SW;
				} else {
					_r = Configs.CIRCLE_R.SE;
				}

				let x = Configs.CIRCLE_CENTER_X + _r * Math.cos(_ang * 3.14 / 180);
				let y = Configs.CIRCLE_CENTER_Y + _r * Math.sin(_ang * 3.14 / 180);

				wkt = wkt + "" + x + " " + y + ", ";
				if(i === 0) {
					wkt0 = "" + x + " " + y + "";
				}
			}
			wkt = wkt + wkt0 + "))";
			let ringFeature = wktformat.readFeature(wkt);
			ringFeature.setStyle(new ol.style.Style({
				fill: new ol.style.Fill({
					color: ringColor[key]['bg-color']
				}),
				stroke: new ol.style.Stroke({
					color: ringColor[key]['border-color'],
					width: 2
				})
			}))
			
			ringFeature.set('type', 'ring');
			features.push(ringFeature);
		}
	}

	return features;
}

function createTyphoonPoint(info, item) {
	let feature = new ol.Feature(new ol.geom.Point([+item.longitude, +item.latitude]));
	let strongIndex = typhoonStrongLegend.findIndex(items => items.name === item.strong);

	feature.setStyle(new ol.style.Style({
		image: new ol.style.Circle({
			fill: new ol.style.Fill({
				color: typhoonStrongLegend[strongIndex].color
			}),
			stroke: new ol.style.Stroke({
				color: 'black',
				width: 2
			}),
			radius: 5
		}),
		zIndex: 10
	}))
	
	feature.set('type', 'point');
	feature.set('info', {
		typhoon_name: info.name,
		...item
	});

	return feature
}

function createTyphoonSolidLine(pointsArr) {
	let solidFeature = new ol.Feature({
		geometry: new ol.geom.LineString(pointsArr)
	})

	solidFeature.setStyle(new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'black',
			width: 3,
			zIndex: 9
		})
	}));
	
	solidFeature.set('type', 'solidLine');

	return solidFeature;
}

function createTyphoonDashLine(info, option) {
	let features = [];
	
	if (option.forecast) {
		option.forecast.map(item => {
			let points = item.points;
			let localArr = [];
	
			let ForecastIndex = typhoonForecastLegend.findIndex(items => items.name === item.sets);
			let color = typhoonForecastLegend[ForecastIndex].color;
			let pointColor = typhoonForecastLegend[ForecastIndex].pointColor;
	
			localArr.push([+option.longitude, +option.latitude]);
	
			item.points.map(items => {
				let local = [+items.longitude, +items.latitude];
	
				localArr.push(local);
	
				let feature = new ol.Feature(new ol.geom.Point(local));
	
				feature.setStyle(new ol.style.Style({
					image: new ol.style.Circle({
						fill: new ol.style.Fill({
							color: pointColor
						}),
						stroke: new ol.style.Stroke({
							color: 'black',
							width: 2
						}),
						radius: 5
					}),
					zIndex: 10
				}));
				
				feature.set('type', 'dashPoint');
				feature.set('info', {
					tfbh: option.tfbh,
					typhoon_name: info.name,
					sets: item.sets,
					...items
				});
				features.push(feature);
			
			})
	
			let feature = new ol.Feature({
				geometry: new ol.geom.LineString(localArr)
			})
	
			feature.setStyle(new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: color,
					width: 2,
					lineDash: [9]
				})
			}));
			
			feature.set('type', 'dashLine');
			features.push(feature);
		})
	}
	
	return features;
}

function createTyphoonStrong(option) {
	let el = createHtml('div');
	let strongIndex = typhoonStrongLegend.findIndex(item => item.name === option.strong);
	el.className = 'typhoon-ringCenter';
	let imgPosition = typhoonStrongLegend[strongIndex].imgPosition;
	el.style.backgroundPosition = imgPosition;

	let overLayer = createdOverLayer(el, option.longitude, option.latitude);
	
	return overLayer;
}

export function createTyphoonContent(obj) {
	let title = obj.title,
			content = obj.content,
			local = obj.local;
	
	let el = createHtml('div');
	el.className = 'threeCommand-map-typhoonInfo pad-10';
	
	let warp = createHtml('div');
	warp.className = 'warpper';
	
	let headerWarp = createHtml('header');
	headerWarp.className = 'header';
	headerWarp.innerHTML = `
		<div class="title">${title}</div>
		<div class="typhoonInfo-close">&times;</div>
	`;
	
	let contentWarp = createHtml('div');
	contentWarp.className = 'content';
	contentWarp.innerHTML = content;
	
	warp.append(headerWarp);
	warp.append(contentWarp);
	
	let tail = createHtml('div');
	tail.className = 'tail';
	tail.innerHTML = '<span class="iconfont icon-zelvxuanzefeiyongdaosanjiaoxingfandui"></span>';
	
	el.append(warp);
	el.append(tail);
	
	let overLayer = createdOverLayer(el, local[0], local[1]);
	
	return overLayer;
}

export function createTyphoon(info) {
	let option = info.points[0],
			optionEnd = info.points[info.points.length - 1],
			options = info.points,
			arr = [],
			obj = {};
		
	let dashLine = createTyphoonDashLine(info, option);
	let strong = createTyphoonStrong(option);

	for(let i = options.length - 1; i >= 0; i--) {
		let rings = createRing(options[i]);
		let point = createTyphoonPoint(info, options[i]);
		let solidLine;

		if(i < options.length - 1) {
			let local = [+options[i].longitude, +options[i].latitude];
			let localNext = [+options[i + 1].longitude, +options[i + 1].latitude];

			solidLine = createTyphoonSolidLine([local, localNext]);
		}

		arr.push({
			rings,
			point,
			solidLine
		})
	}
	
	obj['typhoonIng'] = arr;
	if(dashLine) {
		obj['typhoonWill'] = dashLine;
	}
	obj['typhoonStrong'] = strong;
	obj['typhoonStartInfo'] = option;
	
	let layers = {};	
	const tfbh = option.tfbh;
	
	layers[tfbh] = {};

	layers[tfbh]['layer'] = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: []
		}),
		name: 'typhoonLayer',
		zIndex: 12
	});

	layers[tfbh]['typhoon'] = obj;

	return layers;
}

//台风路径 Layer
function typhoonLayer() {
	let url = `${data_map_httpUrl}fullservice/http/typhoonPath`;
//		let url = `${data_map_httpUrl}fullservice/http/typhoonInfo`;

	return ajaxGet1(url, {
//		tfbh: '201801'
	})
		.then(res => {
			let isHaveTyphoon = true;

			let layers = {};
			
			let result = [];

			if(res.result.length) {
				result = res.result;
				
				res.result.map(item => {
					layers = {
						...layers,
						...createTyphoon(item)
					};
				})
			} else {
				isHaveTyphoon = false;
			}
			
			
			return Promise.resolve({
				code: res.code,
				layers,
				result,
				isHaveTyphoon
			});
		})
		.catch(res => {
			return Promise.resolve(res);
		});
}

//云图 Layer
function cloudLayer() {
	let url = `${data_map_httpUrl}fullservice/http/metorImage?imageType=cloudImage`;

	return ajaxGet(url, {})
		.then(res => {
			let layer = null,
				extent = [50, 0, 145, 60];

			if(res.result.length) {
				layer = createImgExtent(res.result[res.result.length - 1].imageurl, extent);
				layer.setZIndex(10);
			}

			return Promise.resolve({
				code: res.code,
				layer,
				info: res.result,
				extent
			})
		})
		.catch(res => {
			return Promise.resolve(res);
		})
}

//雷达图 Layer
function radarLayer() {
	let url = `${data_map_httpUrl}fullservice/http/metorImage?imageType=radarImage`;

	return ajaxGet(url, {})
		.then(res => {
			let layer = null,
				extent = [73, 15.5, 135.5, 55.5];

			if(res.result.length) {
				layer = createImgExtent(res.result[res.result.length - 1].imageurl, extent)
				layer.setZIndex(11);
			}

			return Promise.resolve({
				code: res.code,
				layer,
				info: res.result,
				extent
			})
		})
		.catch(res => {
			return Promise.resolve(res);
		})
}

//避难所 Layer
function refugeLayer(item) {
	let url = `${data_map_httpUrl}fullservice/http/refugeInfo`;

	return ajaxGet(url, {})
		.then(res => {
			let features = createFeatures('longitude', 'latitude', res.result, item.img);
			let layer = createFeaturesLayer(item.layer, features);

			return Promise.resolve({
				code: res.code,
				layer: layer
			});
		})
		.catch(res => {
			return Promise.resolve(res);
		});
}

//物资仓库 Layer
function emergencyLayer(item) {
	let url = `${data_map_httpUrl}fullservice/http/suppliesWarehouseInfo`;

	return ajaxGet(url, {})
		.then(res => {
			let features = createFeatures('lng', 'lat', res.result, item.img);
			let layer = createFeaturesLayer(item.layer, features);

			return Promise.resolve({
				code: res.code,
				layer: layer
			});
		})
		.catch(res => {
			return Promise.resolve(res);
		});
}

//抢险队 Layer
function emergencySquadLayer(item) {
	let url = `${data_map_httpUrl}fullservice/http/emergencySquad`;

	return ajaxGet(url, {})
		.then(res => {
			let features = createFeatures('lng', 'lat', res.result, item.img);
			let layer = createFeaturesLayer(item.layer, features);

			return Promise.resolve({
				code: res.code,
				layer: layer
			});
		})
		.catch(res => {
			return Promise.resolve(res);
		});
}

//救援队 Layer
function rescueTeamLayer(item) {
	let url = `${data_map_httpUrl}fullservice/http/rescueTeam`;

	return ajaxGet(url, {})
		.then(res => {
			let features = createFeatures('lng', 'lat', res.result, item.img);
			let layer = createFeaturesLayer(item.layer, features);

			return Promise.resolve({
				code: res.code,
				layer: layer
			});
		})
		.catch(res => {
			return Promise.resolve(res);
		});
}

//群众热力分布 Layer
function massHeatLayer() {
	let url = `${data_map_httpUrl}fullservice/http/peopleHeadHot`;

	return ajaxGet(url, {})
		.then(res => {
			let layer = new ol.layer.Heatmap({
				source: createdKmlSource(),
				blur: 30,
				radius: 50,
				gradient: ['#5a00ff', '#00e4ff', '#00ff00', '#ffff00', '#ff0000']
			});

			layer.on('change:source', function(event) {
				event.target.get('source').getFeatures().map(item => {
					let name = item.get('name');
					item.set('weight', name / 30000);
				});
			});

			layer.setSource(createdKmlSource(res.result[0].kml));

			return Promise.resolve({
				code: res.code,
				layer: layer,
				result: res.result
			});
		})
		.catch(res => {
			return Promise.resolve(res);
		});
}

//重点人员实时位置 Layer
function liabilityPersonLayer(item) {
	let url = `${data_map_httpUrl}fullservice/http/liabilityPerson`;

	return ajaxGet(url, {})
		.then(res => {
			let features = createFeatures('lng', 'lat', res.result, item.img);
			let layer = createFeaturesLayer(item.layer, features);


			return Promise.resolve({
				code: res.code,
				layer: layer
			});
		})
		.catch(res => {
			return Promise.resolve(res);
		});
}

//三防专家实时位置 Layer
function defenseExpertLayer(item) {
	let url = `${data_map_httpUrl}fullservice/http/defenseExpert`;

	return ajaxGet(url, {})
		.then(res => {
			let features = createFeatures('lng', 'lat', res.result, item.img);
			let layer = createFeaturesLayer(item.layer, features);

			return Promise.resolve({
				code: res.code,
				layer: layer
			});
		})
		.catch(res => {
			return Promise.resolve(res);
		});
}