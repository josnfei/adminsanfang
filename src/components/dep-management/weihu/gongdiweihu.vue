<template>
	<div class="tiweiweihu">
		<div class="title">
			<BreadcrumbItem>新增</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="edit">
			<div class="title">
				<span>位置： </span>
				<Breadcrumb separator=">">
					<BreadcrumbItem to="/home/depManagement/gongdi">部门管理</BreadcrumbItem>
					<BreadcrumbItem>
						<a href="javascript:;" @click='cancel'>建筑工地数据</a>
					</BreadcrumbItem>
					<!--<BreadcrumbItem>{{moduleTitle}}</BreadcrumbItem>-->
				</Breadcrumb>
			</div>
			<div class="editHead">
				<span>基本信息</span>
			</div>
			<div class="editcontant">
				<!--<Form ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="0">-->
				<Form ref="formItem" :model="formItem" :label-width="0">
					<table class="ed-table">
						<tbody>
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">基本情况</td>
							</tr>
							<tr>
								<td class="ed-label">工程名称</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="工程名称" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.工程名称"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">填表人</td>
								<td class="ed-content">
									<FormItem label="" prop="填表人" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.填表人"></Input>
									</FormItem>
								</td>

								<td class="ed-label">填表时间</td>
								<td class="ed-content">
									<FormItem label="" prop="填表时间" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.填表时间"></Input>
									</FormItem>
								</td>
								<td class="ed-label">联系电话</td>
								<td class="ed-content">
									<FormItem label="" prop="联系电话" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.联系电话"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>

								<td class="ed-label">施工单位</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="施工单位" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.施工单位"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">审核人</td>
								<td class="ed-content">
									<FormItem label="" prop="审核人" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.审核人"></Input>
									</FormItem>
								</td>
								<td class="ed-label">复核人</td>
								<td class="ed-content">
									<FormItem label="" prop="复核人" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.复核人"></Input>
									</FormItem>
								</td>
								<td class="ed-label">建设单位</td>
								<td class="ed-content">
									<FormItem label="" prop="建设单位" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.建设单位"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">监理单位</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="监理单位" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.监理单位"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">地址</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="地址" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.地址"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">主管部门 </td>
								<td class="ed-content">
									<FormItem label="" prop="主管部门" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.主管部门"></Input>
									</FormItem>
								</td>
								<td class="ed-label">开工日期 </td>
								<td class="ed-content">
									<FormItem label="" prop="开工日期" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.开工日期"></Input>
									</FormItem>
								</td><td class="ed-label">施工日期(天) </td>
								<td class="ed-content">
									<FormItem label="" prop="施工日期(天)" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem['施工日期(天)']"></Input>
									</FormItem>
								</td>
							</tr>
							
							<!--预警责任人_建设单位-->
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">预警责任人_建设单位</td>
							</tr>
							<tr>
								<td class="ed-label">姓名 </td>
								<td class="ed-content">
									<FormItem label="" prop="预警责任人_建设单位.姓名" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.预警责任人_建设单位['姓名']"></Input>
									</FormItem>
								</td>
								<td class="ed-label">电话 </td>
								<td class="ed-content">
									<FormItem label="" prop="预警责任人_建设单位.电话" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.预警责任人_建设单位['电话']"></Input>
									</FormItem>
								</td>
							</tr>
							<!--预警责任人_施工单位-->
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">预警责任人_施工单位</td>
							</tr>
							<tr>
								<td class="ed-label">姓名 </td>
								<td class="ed-content">
									<FormItem label="" prop="预警责任人_施工单位.姓名" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.预警责任人_施工单位['姓名']"></Input>
									</FormItem>
								</td>
								<td class="ed-label">电话 </td>
								<td class="ed-content">
									<FormItem label="" prop="预警责任人_施工单位.电话" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.预警责任人_施工单位['电话']"></Input>
									</FormItem>
								</td>
							</tr>
							
							<!--预警责任人_监理单位-->
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">预警责任人_监理单位</td>
							</tr>
							<tr>
								<td class="ed-label">姓名 </td>
								<td class="ed-content">
									<FormItem label="" prop="预警责任人_监理单位.姓名" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.预警责任人_监理单位['姓名']"></Input>
									</FormItem>
								</td>
								<td class="ed-label">电话 </td>
								<td class="ed-content">
									<FormItem label="" prop="预警责任人_监理单位.电话" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.预警责任人_监理单位['电话']"></Input>
									</FormItem>
								</td>
							</tr>
							<!--转移负责人_建设单位-->
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">转移负责人_建设单位</td>
							</tr>
							<tr>
								<td class="ed-label">姓名 </td>
								<td class="ed-content">
									<FormItem label="" prop="转移负责人_建设单位.姓名" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.转移负责人_建设单位['姓名']"></Input>
									</FormItem>
								</td>
								<td class="ed-label">电话 </td>
								<td class="ed-content">
									<FormItem label="" prop="转移负责人_建设单位.电话" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.转移负责人_建设单位['电话']"></Input>
									</FormItem>
								</td>
								<td class="ed-label">职务 </td>
								<td class="ed-content">
									<FormItem label="" prop="转移负责人_建设单位.职务" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.转移负责人_建设单位['职务']"></Input>
									</FormItem>
								</td>
							</tr>
							<!--转移负责人_施工单位-->
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">转移负责人_施工单位</td>
							</tr>
							<tr>
								<td class="ed-label">姓名 </td>
								<td class="ed-content">
									<FormItem label="" prop="转移负责人_施工单位.姓名" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.转移负责人_施工单位['姓名']"></Input>
									</FormItem>
								</td>
								<td class="ed-label">电话 </td>
								<td class="ed-content">
									<FormItem label="" prop="转移负责人_施工单位.电话" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.转移负责人_施工单位['电话']"></Input>
									</FormItem>
								</td>
								<td class="ed-label">职务 </td>
								<td class="ed-content">
									<FormItem label="" prop="转移负责人_施工单位.职务" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.转移负责人_施工单位['职务']"></Input>
									</FormItem>
								</td>
							</tr>
							<!--转移负责人_区/镇(街)-->
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">转移负责人_区/镇(街)</td>
							</tr>
							<tr>
								<td class="ed-label">姓名 </td>
								<td class="ed-content">
									<FormItem label="" prop="转移负责人_区/镇(街)['姓名']" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem['转移负责人_区/镇(街)']['姓名']"></Input>
									</FormItem>
								</td>
								<td class="ed-label">电话 </td>
								<td class="ed-content">
									<FormItem label="" prop="转移负责人_区/镇(街)['电话']" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem['转移负责人_区/镇(街)']['电话']"></Input>
									</FormItem>
								</td>
								<td class="ed-label">职务 </td>
								<td class="ed-content">
									<FormItem label="" prop="转移负责人_区/镇(街)['职务']" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem['转移负责人_区/镇(街)']['职务']"></Input>
									</FormItem>
								</td>
							</tr>
							<!--安置负责人-->
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">安置负责人</td>
							</tr>
							<tr>
								<td class="ed-label">姓名 </td>
								<td class="ed-content">
									<FormItem label="" prop="安置负责人['姓名']" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem['安置负责人']['姓名']"></Input>
									</FormItem>
								</td>
								<td class="ed-label">电话 </td>
								<td class="ed-content">
									<FormItem label="" prop="安置负责人['电话']" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem['安置负责人']['电话']"></Input>
									</FormItem>
								</td>
								<td class="ed-label">职务 </td>
								<td class="ed-content">
									<FormItem label="" prop="安置负责人['职务']" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem['安置负责人']['职务']"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">单位 </td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="安置负责人['单位']" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem['安置负责人']['单位']"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">安置点名称 </td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="安置负责人['安置点名称']" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem['安置负责人']['安置点名称']"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">安置点地址 </td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="安置负责人['安置点地址']" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem['安置负责人']['安置点地址']"></Input>
									</FormItem>
								</td>
							</tr>
							
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">地图经纬度</td>
							</tr>
							<tr>
								<td class="ed-label">经度</td>
								<td class="ed-content">
									<FormItem label="" prop="lng" style="margin: 0">
										<Input placeholder="经度" style="width:80%" v-model="formItem.lng"></Input>
									</FormItem>
								</td>
								<td class="ed-label">纬度</td>
								<td class="ed-content">
									<FormItem label="" prop="lat" style="margin: 0">
										<Input placeholder="纬度" style="width:80%" v-model="formItem.lat"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">涉及到社区</td>
							</tr>
							<Button class="addbtn" @click="addbtns">
								<Icon type="plus-round" ></Icon>
								添加
							</Button>
							<tr>
								<th v-for="item in athead">{{item.name}}</th>
							</tr>
							<tr v-for="item in tdthead">
								<td contenteditable=true></td>
								<td contenteditable=true></td>
								<td></td>
								<td></td>
							</tr>

						</tbody>

					</table>
					<!--地图-->
					<i-col span="24">
						<div id="myMap1">
							<div class="amap-page-container">
								<el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
								</el-amap>

								<!--<div class="toolbar">
									<button @click="getMap()">get map</button>
								</div>-->
							</div>
						</div>
					</i-col>
				</Form>
			</div>
			<div class="editFooter">
				<Button type="ghost" @click='cancel' style="margin-right: 10px">关闭</Button>
				<!--<Button type="primary" @click="_sureBtn">保存</Button>-->
				<Button type="primary" @click="_sureBtn" v-if="btns">保存</Button>
				<Button type="warning" @click="_gettiaoeditList" v-if="btn">修改保存</Button>
			</div>
		</div>
	</div>
</template>

<script>
	//	import { preTaskThead } from 'common/js/table'
	import { initTime } from 'common/js/util'
	import { depTaskQuery } from 'common/js/query'
	//	import { presetTask } from 'common/js/rules'
	//	import { mapGetters, mapMutations } from 'vuex';
	import { getUserList, getaddlist, geteditlist, getdellist } from 'api/gongdi';
	import { ERR_OK } from 'api/config'
	import { successNotice, errorNotice, getLocalStorage, senActive } from 'common/js/dom'
	import vueAMap from 'vue-amap';
	let amapManager = new vueAMap.AMapManager();
	export default {
		//		computed: {
		//			...mapGetters([
		//				'SHUIKU'
		//			])
		//		},
		data() {
			return {
				amapManager,
				zoom: 12,
				center: [113.17213016912342, 23.02122420436683],
				events: {
					init: (o) => {
						//						console.log(o.getCenter())
						//						console.log(this.$refs.map.$$getInstance())
						o.getCity(result => {
							//							console.log(result)
						})
					},
					'moveend': () => {},
					'zoomchange': () => {},
					'click': (e) => {
						this.formItem.lat = e.lnglat.O;
						this.formItem.lng = e.lnglat.P;
					}

				},
				plugin: ['ToolBar', {
					pName: 'MapType',
					defaultType: 0,
					events: {
						init(o) {
							console.log(o);
						}
					}
				}],
				athead: [{
					name: '社区'
				}, {
					name: '需要转移人数'
				}, {
					name: '已转移人数'
				}, {
					name: '时间'
				}],
				tdthead: new Array(1),
				btns: true,
				btn: false,
				endType: '天',
				responseResult: [],
				autoCompleteData: [],
				departmentList: [],
				selectLoading: false,
				num: 1,
				detObj: {},
				sure_del: false,
				delObj: {},
				formDisabled: false,
				detDisabled: true,
				formItem: {
					lng: 0,
					lat: 0,
					'预警责任人_建设单位':{},
					'预警责任人_施工单位':{},
					'预警责任人_监理单位':{},
					'转移负责人_建设单位':{},
					'转移负责人_施工单位':{},
					'转移负责人_区/镇(街)':{},
					安置负责人:{},
				},
				disabled: false,
				tableTbody: [],
				total: 0,
				searchVal: {
					department_name: '',
					task_type: '',
				},
			}
		},
		mounted() {
			this._getuserlist();
		},
		created() {
			this.id = getLocalStorage("id");
			this.formItemd = getLocalStorage('formItemd');
		},
		methods: {
			//点击新增就多一行tr
			addbtns() {
				this.tdthead.length++;
				this.tdthead.push();
			},
			// 选择预案类型
			planTypeSelect(value) {
				// this.getRespontResult()
				var arr = []
				this.responseResult.map(item => {
					if(item.plan_type === '全部' || item.play_type === value) {
						arr.push(item)
					}
				})
				this.responseResult = arr
			},

			cancel() {
				this.$router.push('/home/depManagement/gongdi')
			},
			//表格显示
			_getuserlist(search) {
				search = {
					id: this.id
				}
				if(getLocalStorage('id') != 'false') {
					getUserList(search).then(res => {
						if(res.code === ERR_OK) {
							this.formItem = this.formItemd;
							this.btn = true;
							this.btns = false;
						}
					})
				}
			},
			//保存按钮时新增
			_sureBtn() {
				getaddlist(this.formItem).then(res => {
					console.log(this.formItem);
					if(res.code === ERR_OK) {
						this.$router.push('/home/depManagement/gongdi')
						this.$Notice.success({
							title: '新增成功'
						});
					} else {
						this.$Notice.warning({
							title: '新增失败'
						})
					}
				})
			},
			//页面点击修改按钮
			_gettiaoeditList() {
				geteditlist(this.formItem).then(res => {
					console.log(res);
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '修改成功'
						});
						this.$router.push('/home/depManagement/gongdi');
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.amap-demo {
		padding-top: 20px;
		height: 400px;
	}
	
	.tiweiweihu {
		height: 100%;
		.title {
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			flex-direction: row;
			width: 100%;
			background: rgb(237, 246, 250);
			height: 50px;
			line-height: 50px;
			padding-left: 10px;
			>span {
				font-size: 14px;
				font-weight: 600;
			}
		}
		.edit {
			width: 100%;
			height: 100%;
			padding: 10px;
			padding-top: 60px;
			background: #fff;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			.title {
				position: absolute;
				top: 0;
				left: 0;
				display: flex;
				flex-direction: row;
				width: 100%;
				background: rgb(237, 246, 250);
				height: 50px;
				line-height: 50px;
				padding-left: 10px;
				>span {
					font-size: 14px;
					font-weight: 600;
				}
			}
			>.editHead {
				border-bottom: 1px solid #ccc;
				margin-bottom: 20px;
				>span {
					display: inline-block;
					height: 30px;
					line-height: 30px;
					font-size: 14px;
					font-weight: 500;
					border-bottom: 2px solid rgb(12, 102, 204);
				}
			}
			>.editcontant {
				margin-bottom: 20px;
				.ed-table {
					width: 100%;
					tr {
						height: 50px;
						.ed-label {
							width: 150px;
							background: #edf6fa;
							text-align: center;
						}
						.ta-label {
							margin: 0 auto;
						}
						.ed-content {
							padding: 5px 1%;
							.more {
								width: 30px;
								height: 30px;
								border: 1px solid #ccc;
								text-align: center;
								line-height: 30px;
								color: #ccc;
								font-size: 20px;
							}
							.more:hover {
								border-color: #b6e1fc;
								color: #b6e1fc;
								cursor: pointer;
							}
						}
						td {
							border: 1px solid #ccc;
							padding: 0;
							input[type='text'] {
								width: 100%;
								height: 40px;
								border: none;
								padding: 10px;
							}
						}
					}
				}
			}
		}
		.search {
			margin-bottom: 15px;
			.searchBtn {
				display: inline-block;
			}
		}
	}
	
	#myMap1 {
		width: 100%;
		height: 450px;
	}
	
	.addbtn {
		width: 70px;
		height: 40px;
		color: #FFF5E6;
		background-color: #41B0FF;
		border-radius: 10px;
		margin-top: 10px;
	}
</style>