<template>
	<div class="default">
		<Row :gutter="8">
			<Col :span="16">
			<div class="imp-reminder">
				<div class="col-title">
					<span class="icon-zhongyaotixing">重要提醒</span>
				</div>
				<div class="bg-fff76c">
					<div class="imp-reminder-content">
						<table>
							<tr style="height:38px">
								<td class="td-label">应急响应信息</td>
								<td class="td-content red">{{responseText}}</td>
							</tr>
							<tr style="height:38px">
								<td class="td-label">预警公告</td>
								<td class="td-content red">{{warningNoticeInfo}}</td>
							</tr>
							<tr>
								<td class="td-label">任务执行提醒</td>
								<td class="td-content" v-if="taskInfo.length">
									<li v-for='(item,index) in taskInfo' :key="index">
										<span>{{item.department_name}}</span>
										<span>： </span>
										<span>{{item.task_desc}}</span>
									</li>
									<li class="pl15" @click='more("task")'>
										<span class="icon-xiangqing"></span>
										<span class="under_line">更多</span>
									</li>
								</td>
								<td class="td-content" v-if="!taskInfo.length">
									<li>暂无数据</li>
								</td>
							</tr>
							<tr>
								<td class="td-label">指令执行情况提醒</td>
								<td class="td-content" v-if="messageQueueInfo.length">
									<li v-if="messageQueueInfo.length" v-for="(item,index) in messageQueueInfo" :key="index">
										<span>{{item.department_name}}</span>
										<span>： </span>
										<span>{{item.text}}</span>
									</li>
									<li class="pl15" @click='more("instruct")'>
										<span class="icon-xiangqing"></span>
										<span class="under_line">更多</span>
									</li>
								</td>
								<td class="td-content" v-if="!messageQueueInfo.length">
									<li>暂无数据</li>
								</td>
							</tr>
							<tr>
								<td class="td-label">灾难统计上报</td>
								<td class="td-content">
									<li>部门1:</li>
									<li>部门2:</li>
									<li class="pl15" @click='more("disaster")'>
										<span class="icon-xiangqing"></span>
										<span class="under_line">更多</span>
									</li>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			</Col>
			<Col :span="8">
			<div class="inform">
				<div class="col-title1">
					<span class="icon-tongzhigontgao">通知公告</span>
				</div>
				<div class="bg-fff76c">
					<div class="inform-content">
						<ul>
							<li v-for="(item,index) in noticeInfo" :key='index'>
								<span class="round"></span>
								<a @click="jump(item)" href="javascript:;">
									<span>{{item.title}}</span>
									<span class="pull-right time">{{item.releasedt}}</span>
								</a>
							</li>
							<li>
								<span>共{{pageSize}}页/{{total}}条记录</span>
								<div class="pageStyle pull-right">
									<!-- <Page :total="total"></Page> -->
									<Page :total="total" @on-change="pageChange" show-elevator></Page>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			</Col>
		</Row>
		<div class="default-footer">
			<div class="footer-title">
				<span class="icon-dingyue">我的订阅</span>
			</div>
			<ul class="clear">
				<li>
					<h3>各地天气预警</h3>
					<weather-forecast></weather-forecast>
				</li>
				<li>
					<h3>天气预报</h3>
					<div class="weather">
						<weather-warning></weather-warning>
					</div>
				</li>
				<li>
					<h3>当前水情</h3>
					<current-water></current-water>
				</li>
				<li>
					<!-- <typhoon-path></typhoon-path> -->
				</li>
			</ul>
		</div>
		<!-- 点击更多 -->
		<Modal v-model="visible" :title="modalTitle" @on-ok="ok" @on-cancel="cancel" class-name="modal">
			<li v-if="task" v-for='(item,index) in taskInfoList' :key="index">
				<span class="departmentName">{{item.department_name}} ：</span>
				<span>{{item.task_desc}}</span>
			</li>
			<li v-if="instruct" v-for='(item,index) in messageQueueInfoList' :key="index">
				<span class="departmentName">{{item.department_name}} ：</span>
				<span>{{item.text}}</span>
			</li>
			<li v-if="disaster" v-for='(item,index) in messageQueueInfoList' :key="index">
				<span class="departmentName">{{item.department_name}} ：</span>
				<span>{{item.text}}</span>
			</li>
		</Modal>
	</div>
</template>

<script>
	import { homeThead } from 'common/js/table'
	import { getLocalStorage } from 'common/js/dom'
	import { response, taskRemind, warningNotice, notice, messageQueue, disasterStatistics } from 'api/home'
	import { noticeApi } from "api/daily-office";
	import { ERR_OK } from 'api/config'
	import WeatherWarning from './WeatherWarning.vue'
	import CurrentWater from './CurrentWater.vue'
	import WeatherForecast from './WeatherForecast.vue'
	import TyphoonPath from './TyphoonPath.vue'
	import { mapMutations } from 'vuex';
	export default {
		components: {
			WeatherWarning,
			CurrentWater,
			WeatherForecast,
			TyphoonPath
		},
		data() {
			return {
				pageSize: 1,
				total: 0,
				task: false,
				instruct: false,
				disaster: false,
				visible: false,
				taskInfo: [],
				taskInfoList: [],
				responseText: '',
				modalTitle: '',
				warningNoticeInfo: {},
				noticeInfo: [],
				messageQueueInfo: [],
				messageQueueInfoList: [],
				postObj: {
					page: 1,
					pageSize: 10,
					searchValue: {},
					order: {
						_id: -1
					}
				},
			}
		},
		created() {
			this.getResponseInfo()
			this.getWarningNotice()
			this.getNotice(1)
			this.getTaskRemind()
			this.getMessageQueue()
		},
		methods: {
			pageChange(index) {
				this.postObj.page = index
				this.getNotice()
			},
			jump(obj) {
				this.SET_NOTICEID(obj)
				let activeObj = getLocalStorage('active')
				activeObj.first = 4
				activeObj.third = '2'
				getLocalStorage('active', activeObj)
				this.$router.push('/home/dailyOffice/notice')
			},
			...mapMutations([
				'SET_NOTICEID'
			]),
			ok() {

			},
			cancel() { },
			// 点击更多
			more(value) {
				this.visible = true
				if (value === 'task') {
					this.task = true
					this.modalTitle = '任务执行提醒'
				} else if (value === 'instruct') {
					this.modalTitle = '指令执行情况提醒'
					this.instruct = true
				} else if (value === 'disaster') {
					this.modalTitle = '灾情统计上报'
					this.disaster = true
				}
			},
			// 应急响应信息
			getResponseInfo() {
				response().then(res => {
					if (res.code === ERR_OK) {
						if (res.result && res.result.length) {
							this.responseText = res.result[0].response_type + res.result[0].response_level + '应急响应已' + res.result[0].status
						} else {
							this.responseText = '暂无信息'
						}
					}
				})
			},
			// 预警公告
			getWarningNotice() {
				warningNotice().then(res => {
					if (res.code === ERR_OK) {
						this.warningNoticeInfo = res.result.result.map(item => {
							let arr = []
							arr.push(item.description)
							return arr
						})
						this.warningNoticeInfo = this.warningNoticeInfo.join(',')
					}
				})
			},
			// 通知公告
			getNotice() {
				noticeApi("list", this.postObj).then(res => {
					if (res.code === "0000") {
						this.noticeInfo = res.result.result
						console.log(this.noticeInfo)
						this.total = res.result.totalSize;
						this.pageSize = Math.ceil(this.total / 10)
					}
				});
			},
			// 任务执行提醒
			getTaskRemind() {
				taskRemind().then(res => {
					if (res.code === ERR_OK) {
						this.taskInfoList = res.result.result
						if (this.taskInfoList.length !== 0) {
							this.taskInfo.push(this.taskInfoList[0])
							this.taskInfo.push(this.taskInfoList[1])
						}
					}
				})
			},
			// 指令执行情况提醒
			getMessageQueue() {
				messageQueue().then(res => {
					if (res.code === ERR_OK) {
						this.messageQueueInfoList = res.result.result.map(item => {
							item.content = JSON.parse(item.content)
							item.text = item.content['指令内容'].map(i => {
								let arr = []
								arr.push(i['指令名称'])
								return arr
							})
							item.text = item.text.join(',')
							return item
						})
						if (this.messageQueueInfoList.length !== 0) {
							this.messageQueueInfo.push(this.messageQueueInfoList[0])
							this.messageQueueInfo.push(this.messageQueueInfoList[1])
						}
					}
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	#title {
		text-align: center;
	}

	.pl15 {
		position: relative;
		padding-left: 15px;
	}

	.default {
		width: 100%;
		min-width: 1299px;
		height: 100%;
		padding-top: 10px;
		.imp-reminder,
		.inform {
			height: 490px;
			margin-right: 10px;
			background-color: #fff;
			.col-title {
				height: 40px;
				line-height: 40px;
				text-align: center;
				font-size: 14px;
				font-weight: 600;
				color: #fff76c;
				background: #008cee;
			}
			.col-title1 {
				height: 40px;
				line-height: 40px;
				text-align: center;
				font-size: 14px;
				font-weight: 600;
				background: #008cee;
				font-size: 14px;
				font-weight: bold;
				color: #fff;
			}
		}
		.inform-content {
			background-color: #fff;
			height: 100%;
			position: relative;
			border: 1px solid #d5d5d5;
			ul {
				li {
					padding: 0 10px;
					height: 39px;
					line-height: 39px;
					font-size: 14px;
					border-bottom: 1px solid #d5d5d5;
					.time {
						font-size: 12px;
						color: #959595;
					}
					.round {
						display: inline-block;
						width: 8px;
						height: 8px;
						border-radius: 50%;
						background: #000;
					}
				}
				li:last-child {
					position: absolute;
					padding-top: 5px;
					bottom: 0;
					width: 100%;
					border-bottom: none;
					border-top: 1px solid #d5d5d5;
					line-height: 33px;
					font-size: 12px;
					color: #303030;
				}
			}
		}
		.bg-fff76c {
			padding: 10px;
			background: #e4f5ff;
			height: 450px;
			.imp-reminder-content {
				background: #fff;
				height: 100%;
				table {
					width: 100%;
					height: 100%;
					border: 1px solid #d5d5d5;
					td {
						border: 1px solid #d5d5d5;
					}
					.td-label {
						font-size: 14px;
						text-align: center;
						color: #303030;
						font-weight: bold;
						background: #f6f6f6;
						width: 150px;
					}
					.td-content {
						padding-left: 10px;
						>li {
							height: 40px;
							line-height: 40px;
							min-width: 670px;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}
					}
				}
			}
		}
		.default-footer {
			padding-bottom: 20px;
			background-color: #fff;
			margin-top: 10px;
			padding: 0 10px;
			.footer-title {
				background-color: #008cee;
				height: 40px;
				color: #fff;
				font-size: 14px;
				line-height: 40px;
				text-align: center;
				font-weight: blod;
			}
			ul {
				>li {
					float: left;
					width: 33.33%;
					padding: 10px;
					h3 {
						color: #fff;
						padding-left: 10px;
						height: 40px;
						line-height: 40px;
						background: #19bcff;
						width: 100%;
						top: 0;
					}
				}
			}
			.weather {
				height: 283px;
			}
		}
	}

	.warning-notice-title {
		font-size: 18px;
		color: #FF7F00;
	}

	.imp-reminder {
		margin-left: 10px;
	}

	.under_line {
		cursor: pointer;
		color: #303030;
		font-weight: blod;
	}

	.under_line:hover {
		color: #008cee;
	}

	.red {
		color: #e70000;
		font-size: 18px;
		font-weight: bold;
	}
</style>