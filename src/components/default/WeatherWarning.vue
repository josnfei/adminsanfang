<template>
		<div class="WeatherWarning" v-if="infoData.length">
			<div class="WeatherWarning-warpper">
				<ul class="WeatherWarning-top">
					<li class="WeatherWarning-topInfo">
						<div class="time">
							{{filterTime(0).time}}
							&nbsp;&nbsp;&nbsp;
							{{filterTime(0).day}}
						</div>
						<div class="name">今天</div>
						<div class="content-today">
							<div class="weatherIng">
								<div>{{weatherIng.V12004}}</div>
								<div class="weather-flag">°C</div>
								<img class="weather-img" :src="filterIcon(descIng.W)"/>
							</div>
							<div class="weather-desc">
								{{descIng.WS}}
								{{descIng.WIND}}
							</div>
						</div>
					</li>
					<li class="WeatherWarning-topInfo">
						<div class="time">
							{{filterTime(1).time}}
							&nbsp;&nbsp;&nbsp;
							{{filterTime(1).day}}
						</div>
						<div class="name">明天</div>
						<div class="content-tomorrow">
							<div class="weather-distance">
								<div>{{infoData[0].MINTEMP}}</div>
								<div>~</div>
								<div>{{infoData[0].MAXTEMP}}</div>
								<div class="weather-flag">°C</div>
								<img class="weather-img" :src="filterIcon(infoData[0].WEATHERCODE)"/>
							</div>
							<div class="weather-desc">
								{{infoData[0].WEATHER}}
							</div>
						</div>
					</li>
				</ul>
				<ul class="WeatherWarning-bottom">
					<li class="WeatherWarning-bottomInfo" v-for="index in 4">
						<div class="name">{{filterTime(index + 1).day}}</div>
						<div class="time">{{filterTime(index + 1).time}}</div>
						<img class="weather-img" :src="filterIcon(infoData[index].WEATHERCODE)"/>
						<div class="weather-distance">
							<div>{{infoData[index].MINTEMP}}</div>
							<div>~</div>
							<div>{{infoData[index].MAXTEMP}}</div>
							<div class="weather-flag">°C</div>
						</div>
						<div class="weather-desc">
							{{infoData[index].WEATHER}}
						</div>
					</li>
				</ul>
			</div>
		</div>
</template>

<script>
	// import { BoxMixin } from 'common/js/mixins';
	import { weatherIcon } from 'common/js/module';
	import { getTiming } from 'common/js/dom';
	import { timeFilter } from 'common/js/util';
	import { Static } from 'api/config';
	import { getWeather } from 'api/weatherWarning';

	export default {
		// mixins: [BoxMixin],
		created() {
			this._getWeather();
		},
		data() {
			return {
				infoData: [],
				weatherIng: {},
				descIng: {}
			}
		},
		methods: {
			filterDay(day) {
				let arr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
				
				return arr[day];
			},
			filterTime(index) {
				let time = getTiming();
				
				time.setDate(time.getDate() + index);
				
				let timing = timeFilter(time, 'yyyy-MM-dd');
				
				let daying = this.filterDay(time.getDay());
				
				return {
					time: timing,
					day: daying
				};
			},
			filterIcon(code) {
				return `${Static}img/weatherWarning/${weatherIcon[code].IMGNAME}`
			},
			_getWeather() {
				getWeather().then(res => {
					if (res.res1) {
						let time = getTiming(res.res1.rows[0].STARTTIME);
						var timeArray = [];
						for(var i in res.res1.rows){
							time.setDate(time.getDate() + 1);
							
							var currentTime = getTiming()
							if(currentTime.getTime() < time.getTime()){
								res.res1.rows[i].datatime = timeFilter(time, 'yyyy-MM-dd');
								timeArray.push(res.res1.rows[i]);
							}
				
						}
						
						this.infoData = timeArray;
					}
					
					if (res.res2) {
						this.weatherIng = res.res2.rows[0];
					}
					
					if (res.res3) {
						this.descIng = res.res3.rows[0];
					}
					
					setTimeout(() => {
						this._getWeather();
					}, 3600000)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.WeatherWarning {
		width: 100%;
		height: 100%;
		overflow: hidden;
		font-family: "微软雅黑";
		.WeatherWarning-warpper {
			width: 100%;
			height: 100%;
			/* background-image: url(./img/weatherBG.jpg); */
			background: #67aad8;
			background-size: 100% 100%;
			padding: 5px;
			flex-direction: column;	
			box-sizing: border-box;
			> ul {
				flex: 1;
			}
			.WeatherWarning-top {
				width: 100%;
				height: 45%;
				margin-bottom: 5px;
				display: flex;
				.WeatherWarning-topInfo {
					flex: 1;
					color: white;
					position: relative;
					.time {
						font-size: 16px;
						padding-left: 5px;
					}
					.name {
						font-size: 18px;
						padding-left: 5px;
					}
					.content-today {
						.weatherIng {
							font-size: 22px;
							text-align: center;
							display: flex;
							justify-content: center;
							.weather-flag {
								font-size: 18px;
							}
							.weather-img {
								height: 35px;
							}
						}
						.weather-distance {
							font-size: 16px;
							text-align: center;
							> div {
								display: inline-block;
							}
							.weather-flag {
								font-size: 16px;
								vertical-align: top;
							}
						}
						.weather-desc {
							font-size: 18px;
							text-align: center;
						}
					}
					.content-tomorrow {
						.weather-distance {
							font-size: 22px;
							text-align: center;
							display: flex;
							justify-content: center;
							.weather-flag {
								font-size: 18px;
							}
							.weather-img {
								height: 35px;
							}
						}
						.weather-desc {
							font-size: 16px;
							text-align: center;
						}
					}
				}
				.WeatherWarning-topInfo:nth-of-type(1) {
					border-right: 1px solid lightgray;
				}
			}
			.WeatherWarning-bottom {
				height: 140px;
				display: flex;
				color: white;
				.WeatherWarning-bottomInfo {
					flex: 1;
					background-color: rgba(0, 0, 0, 0.6);
					margin: 0 1px;
					padding: 5px;
					text-align: center;
					.name {
						font-size: 12px;
						text-align: left;
					}
					.time {
						font-size: 12px;
						margin-top: 5px;
					}
					.weather-img {
						height: 25px;
						margin-top: 5px;
					}
					.weather-distance {
						font-size: 12px;
						text-align: center;
						margin-top: 5px;
						> div {
							display: inline-block;
						}
						.weather-flag {
							font-size: 12px;
							vertical-align: top;
						}
					}
					.weather-desc {
						margin-top: 5px;
						font-size: 12px;
					}
				}						
			}
		}
	}
</style>