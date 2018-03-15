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
					<BreadcrumbItem to="/home/depManagement/school">部门管理</BreadcrumbItem>
					<BreadcrumbItem>
						<a href="javascript:;" @click='cancel'>学校数据</a>
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
								<td class="ed-label">学校名称</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="name" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.name"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">地址</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="address" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.address"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">填表人</td>
								<td class="ed-content">
									<FormItem label="" prop="fillbby" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.fillbby"></Input>
									</FormItem>
								</td>

								<td class="ed-label">填表时间</td>
								<td class="ed-content">
									<FormItem label="" prop="filltime" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.filltime"></Input>
									</FormItem>
								</td>
								<td class="ed-label">联系电话</td>
								<td class="ed-content">
									<FormItem label="" prop="contacts" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.contacts"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>

								<td class="ed-label">管理单位</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="charge_company" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.charge_company"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">审核人</td>
								<td class="ed-content">
									<FormItem label="" prop="checkby" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.checkby"></Input>
									</FormItem>
								</td>
								<td class="ed-label">复核人</td>
								<td class="ed-content">
									<FormItem label="" prop="doublecheckby" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.doublecheckby"></Input>
									</FormItem>
								</td>
								
							</tr>
							<tr>
								<td class="ed-label">建筑面积</td>
								<td class="ed-content">
									<FormItem label="" prop="area" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.area"></Input>
									</FormItem>
								</td>
								<td class="ed-label">建筑年份</td>
								<td class="ed-content">
									<FormItem label="" prop="build_year" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.build_year"></Input>
									</FormItem>
								</td>
								<td class="ed-label">主管部门</td>
								<td class="ed-content">
									<FormItem label="" prop="chage_dept" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.chage_dept"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<!--<td class="ed-label">flag</td>
								<td class="ed-content">
									<FormItem label="" prop="flag" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.flag"></Input>
									</FormItem>
								</td>-->
								<td class="ed-label">结构层次（层）</td>
								<td class="ed-content">
									<FormItem label="" prop="level" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.level"></Input>
									</FormItem>
								</td>
								<td class="ed-label">使用年限</td>
								<td class="ed-content">
									<FormItem label="" prop="lift_limit" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.lift_limit"></Input>
									</FormItem>
								</td>
								<td class="ed-label">类型</td>
								<td class="ed-content">
									<FormItem label="" prop="type" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.type"></Input>
									</FormItem>
								</td>
							</tr>
							<!--migrateby-->
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">转移负责人</td>
							</tr>
							<tr>
								<td class="ed-label">姓名</td>
								<td class="ed-content">
									<FormItem label="" prop="migrateby.name" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.migrateby.name"></Input>
									</FormItem>
								</td>
								<td class="ed-label">单位</td>
								<td class="ed-content">
									<FormItem label="" prop="migrateby.company" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.migrateby.company"></Input>
									</FormItem>
								</td>
								<td class="ed-label">职务</td>
								<td class="ed-content">
									<FormItem label="" prop="migrateby.duty" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.migrateby.duty"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">电话</td>
								<td class="ed-content">
									<FormItem label="" prop="migrateby.phonenumber" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.migrateby.phonenumber"></Input>
									</FormItem>
								</td>
							</tr>
							<!--settle_principal-->
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">安置负责人</td>
							</tr>
							<tr>
								<td class="ed-label">安置点名称</td>
								<td class="ed-content">
									<FormItem label="" prop="settle_principal.location" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.settle_principal.location"></Input>
									</FormItem>
								</td>
								<td class="ed-label">安置点地址</td>
								<td class="ed-content">
									<FormItem label="" prop="settle_principal.address" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.settle_principal.address"></Input>
									</FormItem>
								</td>
								<td class="ed-label">职务</td>
								<td class="ed-content">
									<FormItem label="" prop="settle_principal.duty" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.settle_principal.duty"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">姓名</td>
								<td class="ed-content">
									<FormItem label="" prop="settle_principal.name" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.settle_principal.name"></Input>
									</FormItem>
								</td>
								<td class="ed-label">单位</td>
								<td class="ed-content">
									<FormItem label="" prop="settle_principal.company" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.settle_principal.company"></Input>
									</FormItem>
								</td>
								<td class="ed-label">电话</td>
								<td class="ed-content">
									<FormItem label="" prop="settle_principal.phonenumber" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.settle_principal.phonenumber"></Input>
									</FormItem>
								</td>
							</tr>
							<!--warnner-->
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">预警负责人</td>
							</tr>
							<tr>
								<td class="ed-label">管理单位</td>
								<td class="ed-content">
									<FormItem label="" prop="warnner.management" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warnner.management"></Input>
									</FormItem>
								</td>
								<td class="ed-label">巡查员姓名</td>
								<td class="ed-content">
									<FormItem label="" prop="warnner.supervisor" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warnner.supervisor"></Input>
									</FormItem>
								</td>
								<td class="ed-label">电话</td>
								<td class="ed-content">
									<FormItem label="" prop="warnner.phonenumber" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warnner.phonenumber"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">主管部门</td>
								<td class="ed-content">
									<FormItem label="" prop="warnner.chargeby" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warnner.chargeby"></Input>
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
	import { getUserList, getaddlist, geteditlist, getdellist } from 'api/school';
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
					migrateby: {},
					settle_principal: {},
					warnner: {},
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
				this.$router.push('/home/depManagement/school')
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
						this.$router.push('/home/depManagement/school')
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
						this.$router.push('/home/depManagement/school');
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