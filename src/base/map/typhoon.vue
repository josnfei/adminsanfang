<template>
	<div class="typhoon">
		<div ref="map" class="typhoon-map"></div>

		<!--台风路径标题列表-->
		<div class="typhoon-titles">
			<ul class="typhoon-titleList">
				<li v-for="item in typhoonTitles" v-show="typhoonTitles.length">
					{{item.tfbh}} - {{item.name}}（风力{{item.points[0].power}}级）
				</li>
			</ul>
			<div class="typhoon-titleNoTyphoon" v-show="!typhoonTitles.length">暂无台风</div>
		</div>

		<!--历史台风列表-->
		<div class="typhoon-list" :class="{'typhoon-list-show': showTyphoonList}">
			<div class="typhoon-list-head">
				<span>台风列表</span>
				<div class="close" @click="controlTyphoonList(false)">
					<Icon type="close"></Icon>
				</div>
			</div>
			<div class="typhoon-list-content">
				<Table size="small" border :loading="showTyphoonListLoading" :height="typhoonListHeight" :columns="typhoonTh" :data="typhoonTb"></Table>
			</div>
		</div>

		<!--图例-->
		<div class="legend-list" :class="{'legend-list-show': showLegend}">
			<div class="legend-list-head">
				<span>台风图例</span>
				<div class="close" @click="controlLegend(false)">
					<Icon type="close"></Icon>
				</div>
			</div>
			<div class="legend-list-content">
				<div class="typhoon-legend">
					<header>风圈</header>
					<div class="typhoon-legend-list">
						<div class="typhoon-legend-detail">
							<div class="typhoon-legend-circle typhoon-legend-circle-7"></div>
							<div class="typhoon-legend-text">7级风圈</div>
						</div>
						<div class="typhoon-legend-detail">
							<div class="typhoon-legend-circle typhoon-legend-circle-10"></div>
							<div class="typhoon-legend-text">10级风圈</div>
						</div>
						<div class="typhoon-legend-detail">
							<div class="typhoon-legend-circle typhoon-legend-circle-12"></div>
							<div class="typhoon-legend-text">12级风圈</div>
						</div>
					</div>
				</div>
				<div class="typhoon-legend">
					<header>等级</header>
					<div class="typhoon-legend-list">
						<div class="typhoon-legend-detail" v-for="item in typhoonStrongLegend">
							<img :src="item.img"/>
							<div class="typhoon-legend-text">{{item.name}}</div>
						</div>
					</div>
				</div>
				<div class="typhoon-legend">
					<header>预报台</header>
					<div class="typhoon-legend-list">
					<div class="typhoon-legend-detail mar-8" v-for="item in typhoonForecastLegend">
						<div class="typhoon-legend-forecast">
							<div v-for="index in 3" :style="{'background-color': item.color}"></div>
						</div>
						<div class="typhoon-legend-text">{{item.name}}</div>						
					</div>
				</div>
				</div>
			</div>
		</div>

		<!--云图、雷达 时间-->
		<div class="cloud-radar-time" v-show="cloudradarTimes.length">
			<ul class="cloud-radar-timeList clear">
				<li v-for="item in cloudradarTimes" class="pull-left">
					{{item.name}}：{{item.info.datatime}}
				</li>
			</ul>
		</div>

		<!--右边选项卡-->
		<div class="typhoon-right">
			<div class="typhoon-showList" :class="{'yellow': showTyphoonList}" @click="controlTyphoonList(true)">台风列表</div>
			<div class="typhoon-showCloud" :class="{'yellow': showCloud}" @click="controlCloudRadar('cloudLayer')">显示云图</div>
			<div class="typhoon-showRadar" :class="{'yellow': showRadar}" @click="controlCloudRadar('radarLayer')">显示雷达</div>
			<div class="typhoon-showLegend" :class="{'yellow': showLegend}" @click="controlLegend(true)">显示图例</div>
		</div>

		<loading v-show="showLoading"></loading>
	</div>
</template>

<script>
	import { loadingMixin } from 'common/js/mixins';
	import { ERR_OK, ERR_CUSTOM } from 'api/config';
	import { createMap, getLayer, createTyphoon, createTyphoonContent, isShowOverLayer } from 'api/map';
	import { getTyphoonList, getTyphoonSingelInfo } from 'api/typhoon';
	import { errorNotice, errorMessage, getClassEls } from 'common/js/dom';
	import { typhoonListThead } from 'common/js/table';
	import { filterTyphoonBaseInfo } from 'common/js/util';
	import { typhoonStrongLegend, typhoonForecastLegend } from 'common/js/module';

	export default {
		mixins: [loadingMixin],
		created() {
			this.layers = {};

			this.zoom = 4;

			this._getTyphoonList();
		},
		computed: {
			typhoonListHeight() {
				return this.typhoonTb.length >= 5 ? '240' : '';
			},
			typhoonListChosed() {
				let bol = false;
				for(let i = 0; i < this.typhoonTb.length; i++) {
					if(this.typhoonTb[i].is_current === 1) {
						bol = true;
						break;
					}
				}
				return bol;
			}
		},
		mounted() {
			setTimeout(() => {
				this._initMap();
			}, 20)
		},
		data() {
			return {
				typhoonTh: typhoonListThead(this),
				typhoonTb: [],
				typhoonTitles: [],
				showTyphoonList: false,
				showTyphoonListLoading: false,
				showCloud: false,
				showRadar: false,
				cloudradarTimes: [],
				showLegend: false,
				typhoonStrongLegend: typhoonStrongLegend,
				typhoonForecastLegend: typhoonForecastLegend,
				showLoading: false
			}
		},
		methods: {
			controlLegend(bol) {
				if(bol && this.showTyphoonList) {
					this.showTyphoonList = false;
				}
				this.showLegend = bol;
			},
			controlCloudRadar(layerName) {
				let bol;
				switch(layerName) {
					case 'cloudLayer':
						this.showCloud = !this.showCloud;
						bol = this.showCloud;
						break;
					case 'radarLayer':
						this.showRadar = !this.showRadar;
						bol = this.showRadar;
						break;
				}
				if(bol) {
					this._getCloundRadarLayer(layerName);
				} else {
					this._removeCloudRadarLayer(layerName);
				}
			},
			choseTyphoon(bol, params) {
				let item = params.row;
				let index = params.index;
				if(bol) {
					this.showLoading = true;
					this.controlTyphoonList(false);
					this.typhoonTb[index].is_current = 1;
					getTyphoonSingelInfo(item.tfbh).then(res => {
						if(res.code === ERR_OK && res.result.length) {
							let info = createTyphoon(res.result[0]);
							console.log(info)
							this.addTyphoonLayer({
								layers: info
							});
							this.typhoonTitles.push(res.result[0]);
						}
						this.showLoading = false;
					})
				} else {
					this.typhoonTb[index].is_current = 0;
					this.layers.Map.removeLayer(this.layers['typhoonLayer'][item.tfbh]['layer']);
					this.layers.Map.removeOverlay(this.layers['typhoonLayer'][item.tfbh]['typhoon']['typhoonStrong']);
					delete this.layers['typhoonLayer'][item.tfbh];
					this.hideTyphoonInfoLayer();
					let titleIndex = this.typhoonTitles.findIndex(items => items.tfbh === item.tfbh);
					this.typhoonTitles.splice(titleIndex, 1);
				}
			},
			controlTyphoonList(bol) {
				if(bol && this.showLegend) {
					this.showLegend = false;
				}
				this.showTyphoonList = bol;
			},
			showTyphoonInfoLayer(featureType, featureInfo) {
				if (this.layers['typhoonContent'] !== undefined) {
					this.hideTyphoonInfoLayer();
				}
				
				this.layers['typhoonContent'] = createTyphoonContent(filterTyphoonBaseInfo(featureType, featureInfo));
				this.layers.Map.addOverlay(this.layers['typhoonContent']);
				
				let el = getClassEls('typhoonInfo-close')[0];

				el.onclick = (e) => {
					this.hideTyphoonInfoLayer();
				}	
			},
			hideTyphoonInfoLayer() {
				this.layers.Map.removeOverlay(this.layers['typhoonContent']);
				this.layers['typhoonContent'] = undefined;
			},
			addTyphoonLayer(res) {
				let layerName = 'typhoonLayer';
				
				for(let key in res['layers']) {
					let keyName = key;
					
					this.layers[layerName][keyName] = res.layers[key];
					
					this.layers.Map.addLayer(this.layers[layerName][keyName]['layer']);
					
					this.layers[layerName][keyName]['intervalIndex'] = 0;
					
					this.layers[layerName][keyName]['interval'] = setInterval(() => {
						if (this.layers[layerName][keyName]['intervalIndex'] === this.layers[layerName][keyName]['typhoon']['typhoonIng'].length) {
							clearInterval(this.layers[layerName][keyName]['interval']);
							
							let dashFeature = this.layers[layerName][keyName]['typhoon']['typhoonWill'];
							
							if (dashFeature.length) {
								this.layers[layerName][keyName]['layer'].getSource().addFeatures(dashFeature);										
							}
							
							this.layers.Map.addOverlay(this.layers[layerName][keyName]['typhoon']['typhoonStrong']);
							
							let featureInfo = this.layers[layerName][keyName]['typhoon']['typhoonIng'][this.layers[layerName][keyName]['intervalIndex'] - 1]['point'].get('info');
							this.showTyphoonInfoLayer('point', featureInfo);
							return
						}
						if (
							this.layers[layerName][keyName]['intervalIndex'] - 1 >= 0 &&
							this.layers[layerName][keyName]['intervalIndex'] !== this.layers[layerName][keyName]['typhoon'].length
						) {
							this.layers[layerName][keyName]['typhoon']['typhoonIng'][this.layers[layerName][keyName]['intervalIndex'] - 1]['rings'].map(item => {
								this.layers[layerName][keyName]['layer'].getSource().removeFeature(item);									
							})
						}
						
						let ringsFeature = this.layers[layerName][keyName]['typhoon']['typhoonIng'][this.layers[layerName][keyName]['intervalIndex']]['rings'],
								pointFeature = this.layers[layerName][keyName]['typhoon']['typhoonIng'][this.layers[layerName][keyName]['intervalIndex']]['point'],
								solidLineFeature = this.layers[layerName][keyName]['typhoon']['typhoonIng'][this.layers[layerName][keyName]['intervalIndex']]['solidLine'];
						
						let features = [
							...ringsFeature,
							pointFeature
						];
						
						if(solidLineFeature) {
							features.push(solidLineFeature);
						}
						
						this.layers[layerName][keyName]['layer'].getSource().addFeatures(features);

						this.layers[layerName][keyName]['intervalIndex']++;
					}, 100)
				}
			},
			updateSize() {
				this.layers.Map.updateSize();
			},
			_removeCloudRadarLayer(layerName) {
				this.layers.Map.removeLayer(this.layers[layerName].layer);
				clearInterval(this.layers[layerName].timeInterval);

				let index = this.cloudradarTimes.findIndex(item => item.layerName === layerName);
				this.cloudradarTimes.splice(index, 1);
			},
			_getCloundRadarLayer(layerName) {
				this.showLoading = true;

				getLayer(layerName).then(res => {
					if(res.code === ERR_OK) {
						this.layers[layerName] = res;

						let name = '',
							length;

						layerName === 'cloudLayer' ? name = '云图' : name = '雷达';
						this.cloudradarTimes.push({
							layerName,
							name,
							info: this.layers[layerName].info[this.layers[layerName].info.length - 1]
						});

						let index = this.layers[layerName].info.length - 2;
						this.layers.Map.addLayer(res.layer);
						this.layers[layerName]['timeInterval'] = setInterval(() => {

							this.layers[layerName].layer.setSource(new ol.source.ImageStatic({
								url: this.layers[layerName].info[index].imageurl,
								imageExtent: res.extent
							}))
							let listIndex = this.cloudradarTimes.findIndex(item => item.name === name);
							this.cloudradarTimes[listIndex].info = this.layers[layerName].info[index];
							index--;
							if(index === -1) {
								index = this.layers[layerName].info.length - 1
							}
						}, 500)
					} else if(res.code === ERR_CUSTOM) {
						errorNotice(res.message)
					} else {
						errorMessage('抱歉! 暂时没有该图层信息')
					}
					this.showLoading = false;
				})
			},
			_getTyphoonList() {
				this.showTyphoonListLoading = true;
				getTyphoonList().then(res => {
					if(res.code === ERR_OK && res.result.length) {
						this.typhoonTb = res.result;
					}
					this.showTyphoonListLoading = false;
				})
			},
			_getTyphoonLayer() {
				this.showLoading = true;
				let layerName = 'typhoonLayer';
				
				getLayer(layerName).then(res => {
					if(res.code === ERR_OK) {
						this.layers[layerName] = {};
						
						this.addTyphoonLayer(res);
						
						if(res.isHaveTyphoon) {
							this.typhoonTitles = res.result;
						}
					} else if(res.code === ERR_CUSTOM) {
						errorNotice(res.message)
					} else {
						errorMessage('抱歉! 暂时没有该图层信息')
					}
					this.showLoading = false;
				});
			},
			_initMap() {
				if(this.layers.Map === undefined) {
					this.layers['baseLayer'] = getLayer('baseLayer');
					this.layers['FsNhLayer'] = getLayer('FsNhLayer');
					this.layers['notionLayer'] = getLayer('notionLayer');
					this.layers['warnLineLayer'] = getLayer('warnLineLayer');

					let layerArr = [
						this.layers['baseLayer'],
						this.layers['FsNhLayer'],
						this.layers['notionLayer'],
						this.layers['warnLineLayer']
					];

					this.layers.Map = createMap(this.$refs['map'], layerArr, {
						zoom: this.zoom,
						center: [120.43903125000003, 20.345582812500005]
					});

					this._getTyphoonLayer();
					
					this.layers.Map.on('singleclick', (event) => {
						let pixel = event.pixel;
						let lng = event.coordinate[0];
						let lat = event.coordinate[1];
						console.log(lng, lat);
						
						this.layers.Map.forEachFeatureAtPixel(pixel, (feature, layer) => {
							if(feature) {
								let featureType = feature.get('type'),
										featureInfo = feature.get('info');
										
								if (featureType === 'point' || featureType === 'dashPoint') {
									this.showTyphoonInfoLayer(featureType, featureInfo);									
								}
							}
							
						});
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '~common/scss/color';
	.typhoon {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		>.typhoon-map {
			width: 100%;
			height: 100%;
			.typhoon-ringCenter {
				width: 35px;
				height: 35px;
				background-image: url(./img/typhoonstatic.png);
				transform: translate3D(-50%, -50%, 0);
				transform-origin: center center;
				animation: ringCenterAnimate 1s linear infinite;
				z-index: 99;
			}
			@keyframes ringCenterAnimate {
				from {
					transform: translate3D(-50%, -50%, 0) rotate(0deg);
				}
				to {
					transform: translate3D(-50%, -50%, 0) rotate(360deg);
				}
			}
			.threeCommand-map-typhoonInfo {
				transform: translate3D(-50%, -100%, 0);
		    white-space: nowrap;
		    position: absolute;
		    user-select: none;
		    z-index: 100;
		    > .warpper {
		    	border-radius: 5px;
	        padding: 10px;
	        padding-top: 5px;
	        background-color: rgba(255, 255, 255, .9);
	        box-shadow: 1px 1px 1px 1px #ccc;
	        color: black;
	        > .header {
	        	width: 100%;
            height: 25px;
            display: flex;
            align-items: center;
            overflow: hidden;
            border-bottom: 1px solid gray;
            font-size: 14px;
            > .title {
                flex: 1;
                color: $color-danger;
            }
            .typhoonInfo-close {
                color: black;
                font-size: 20px;
                cursor: pointer;
                &:hover {
                    color: gray;
                }
            }
	        }
	        > .content {
	        	padding-top: 5px;
	        	> .detail {
	        		color: $color-blue;
	        	}
	        }
		    }
		    > .tail {
		    	margin-top: -7px;
	        text-align: center;
	        color: rgba(255, 255, 255, .9);
		    }
			}
		}
		.typhoon-titles {
			width: 300px;
			position: absolute;
			left: 0;
			right: 0;
			top: 40px;
			margin: 0 auto;
			text-align: center;
			color: red;
			font-weight: 700;
			font-size: 22px;
			.typhoon-titleList {
				width: 100%;
				>li {
					font-weight: 700;
				}
			}
		}
		.typhoon-list {
			width: 100%;
			height: 280px;
			box-sizing: border-box;
			position: absolute;
			left: 0;
			bottom: -280px;
			z-index: 200;
			background-color: white;
			transition: .2s all;
			overflow: hidden;
			&.typhoon-list-show {
				bottom: 0;
			}
			.typhoon-list-head {
				width: 100%;
				height: 30px;
				line-height: 30px;
				text-align: center;
				background-color: #054a84;
				position: relative;
				color: white;
				.close {
					position: absolute;
					right: 10px;
					top: 0;
					cursor: pointer;
					&:hover {
						color: #999;
					}
				}
			}
			.typhoon-list-content {
				width: 100%;
				height: calc(100% - 30px);
				border: 1px solid #054a84;
				border-top: none;
				overflow: hidden;
				padding: 5px;
			}
		}
		.legend-list {
			width: 100%;
			height: 280px;
			box-sizing: border-box;
			position: absolute;
			left: 0;
			bottom: -280px;
			z-index: 200;
			background-color: white;
			transition: .2s all;
			overflow: hidden;
			&.legend-list-show {
				bottom: 0;
			}
			.legend-list-head {
				width: 100%;
				height: 30px;
				line-height: 30px;
				text-align: center;
				background-color: #054a84;
				position: relative;
				color: white;
				.close {
					position: absolute;
					right: 10px;
					top: 0;
					cursor: pointer;
					&:hover {
						color: #999;
					}
				}
			}
			.legend-list-content {
				width: 100%;
				height: calc(100% - 30px);
				border: 1px solid #054a84;
				border-top: none;
				overflow: hidden;
				padding: 5px;
				display: flex;
				text-align: center;
				font-size: 16px;
				font-weight: 700;
				.typhoon-legend {
					flex: 1;
					.typhoon-legend-list {
						font-size: 16px;
						font-weight: 100;
						.typhoon-legend-detail {
							display: flex;
							align-items: center;
							justify-content: center;
							margin-bottom: 12px;
							&.mar-8 {
								margin-bottom: 8px;
							}
							.typhoon-legend-circle {
								width: 14px;
								height: 14px;
								border-radius: 7px;
								margin-left: 10px;
							}
							.typhoon-legend-circle-7 {
								border: 1px solid #24B43D;
								background-color: #9BDBCB;
							}
							.typhoon-legend-circle-10 {
								border: 1px solid #DCD024;
								background-color: #F4FF97;
							}
							.typhoon-legend-circle-12 {
								border: 1px solid #E72A1D;
								background-color: #F7B3B2;
							}
							.typhoon-legend-text {
								flex: 1;
								text-align: center;
							}
							.typhoon-legend-forecast {
								width: 80px;
								height: 3px;
								display: flex;
								align-content: center;
								justify-content: center;
								>div {
									flex: 1;
									margin: 0 2px;
									height: 100%;
								}
							}
						}
					}
				}
				.legend-ring {
					flex: 1;
					margin: 0 10px;
				}
				.legend-prediction {
					flex: 1;
				}
			}
		}
		.cloud-radar-time {
			width: 675px;
			position: absolute;
			left: 10px;
			top: 10px;
			color: red;
			font-size: 22px;
			.cloud-radar-timeList {
				>li {
					font-weight: 700;
					margin-right: 10px;
				}
			}
		}
		.typhoon-right {
			width: 46px;
			position: absolute;
			top: 20px;
			right: 20px;
			color: white;
			font-size: 12px;
			>div {
				width: 46px;
				height: 46px;
				padding: 5px 6px;
				text-align: center;
				background-color: rgba(0, 0, 0, .6);
				margin-bottom: 5px;
				border-radius: 5px;
				cursor: pointer;
				&.yellow {
					color: yellow;
				}
			}
		}
	}
</style>