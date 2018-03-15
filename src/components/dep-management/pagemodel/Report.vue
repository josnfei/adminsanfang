<template>
	<div class="Report">
		<div class="titles">
			<div class="btns"  v-if="sanfang" @click="_getedgList" style="cursor:pointer;">
				<Icon type="arrow-left-c"></Icon>
			</div>
			<BreadcrumbItem v-if="sanfang">部门上报数据录入</BreadcrumbItem>
			<Button type="primary" v-else="sanfang" style="margin:auto 0" @click="saveAndReturn">保存并返回</Button>
		</div>
		<!--输入框-->
		<div class="cont">
			<Form :model="formItem" :label-width="80">
				<FormItem label="部门名称" style="width:300px">
					<Input v-model="DepartReportInfo.department_name" placeholder="请输入部门名称" style="width:300px"></Input>
				</FormItem>
				<FormItem label="部门编号" style="width:300px">
					<Input v-model="DepartReportInfo.department_code" placeholder="请输入部门编号" style="width:300px"></Input>
				</FormItem>
				<FormItem label="部门级别" style="width:300px">
					<Input v-model="DepartReportInfo.department_level" placeholder="请输入部门级别" style="width:300px"></Input>
				</FormItem>
				<FormItem label="表单名称" style="width:300px">
					<Input v-model="formItem.form_name" placeholder="请输入表单名称" style="width:300px"></Input>
				</FormItem>
			</Form>
		</div>
		<div class="titl">
			<Button class="addBtn" @click="_getaddList">保存</Button>
		</div>
		<!--表格,可填写-->
		<div class="center table">
			<Table border highlight-row :data="UserData" :columns="theadArr" stripe></Table>
		</div>
		<br />
		<div class="titl">
			<h2>数据列表</h2>
			<Button class="addBtn" @click="_getdeleteList">清除所选中</Button>
		</div>
		<!--数据列表:根据上个数据来显示。动态表单-->
		<div class="table">
			<Table border highlight-row :data="UserDatas" :columns="theadArrs" stripe @on-select='selected'></Table>
			<Page class="pull-right" :total="total" :current="current" size="small" show-total @on-change="changePage"></Page>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';
	import { getUserList, getList, getinputList, getdeleteList, getbumenList } from 'api/Report'
	import { getuserList } from 'api/Employment'
	import { ERR_OK } from 'api/config'
	import { successNotice, errorNotice, getLocalStorage, senActive } from 'common/js/dom'
	import { cloneObj, likeStrSearch } from 'common/js/util'
	import { ReportThead, shujuThead } from 'common/js/table'
	export default {
        props: {
            departInfo: {
                type: Object
            }
        },
		computed: {
			...mapGetters([
				'DepartReportInfo'
			])
		},
		data() {
			return {
				sanfang: true,
				modal3: false,
				modal_loading: false,
				UserData: [],
				theadArr: ReportThead(this),
				formItem: {},
				UserDatas: [],
				theadArrs: [],
				idsArr: [],
				total: 2000,
				current: 1,
				departmentNameList: [],
				temp: true,
			}
		},
		methods: {
			// 保存并返回
			saveAndReturn(){
				this.$emit('saveAndReturn',false)
			},
			/*表格列表*/
			_getUserList(page) {
				var form_name = getLocalStorage('form_name')
				if(this.departInfo !== undefined){
					this.sanfang = false
					this.DepartReportInfo.department_code = this.departInfo.department_code
					this.DepartReportInfo.department_name = this.departInfo.department_name
					this.DepartReportInfo.department_level = this.departInfo.department_level
					form_name = this.departInfo.name
				}
				let searchValue = {
					"form_name": form_name
				}
				if(getLocalStorage('id') != 'false') {
					getUserList(searchValue).then(res => {
						// console.log(res);
						// console.log(res.result.totalSize)
						if(res.code === ERR_OK) {
							// console.log('----------')
							 console.log(this.DepartReportInfo)
							// console.log('//////')
							this.formItem.form_name = res.result.result[0].form_name
							this.UserData = res.result.result[0].col_info
							this.total = res.result.totalSize
							this._initList();
						}
					});
				}
			},
			/*点击保存表格,数据显示下面的表格*/
			_getaddList() {
				let obj = {
					'form_name': this.formItem.form_name,
					'department_code': this.DepartReportInfo.department_code,
					'department_level': this.DepartReportInfo.department_level,
					'department_name': this.DepartReportInfo.department_name,
				}
				this.UserData.map(item => {
					obj[item['栏位名称']] = item['custom_inputValue']
				})

				// console.log(obj)
				getinputList(obj).then(res => {
					if(res.code === ERR_OK) {
						this._getList(1, {
							department_name: this.DepartReportInfo.department_name,
							department_code: this.DepartReportInfo.department_code,
							department_level: this.DepartReportInfo.department_level
						}, {
							form_name: this.formItem.form_name
						});
						this.UserData.map(item => item.custom_inputValue = '');
						this.temp = false;
						this.theadArrs = [];
						this._getUserList();
						this.temp = true;
						this.$Notice.success({
							title: '添加成功'
						});
					}
				})
			},
			/*分页*/
			changePage: function(page) {
				this.page = page;
				this._getList(page);
			},
			_initList() {
				this.theadArrs.push({
					title: '选项(一个)',
					align: 'center',
					width: 120,
					type: 'selection'
				}, {
					title: '部门名称',
					key: 'department_name',
					align: 'center'
				})
				//通过循环来push上去这个栏位名称
				this.UserData.map(item => {
					this.theadArrs.push({
						title: item['栏位名称'],
						align: 'center',
						key: item['栏位名称']
					})
				})
				//参数调用
				this._getList(1, {
					department_name: this.DepartReportInfo.department_name,
					department_code: this.DepartReportInfo.department_code,
					department_level: this.DepartReportInfo.department_level
				}, {
					form_name: this.formItem.form_name
				});
			},
			//数据列表展示
			_getList(page, search, addSearch) {
				getList(page, search, addSearch).then(res => {
					if(res.code === ERR_OK) {
						this.UserDatas = res.result.result
					}
				})
			},
			//点击清除按钮清除,每勾选一个获取对应的id，点击清空时候清空对应的id
			_getdeleteList(id) {
				let ids = this.idsArr.join(',')
				// console.log(ids);
				getdeleteList({
					form_name: this.formItem.form_name
				}, ids).then(res => {
					// console.log(res);
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '清空成功'
						});
					} else {
						this.$Notice.warning({
							title: '不对应部门'
						})
					}
					this.temp = false;
					this.theadArrs = [];
					this._getUserList();
					this.temp = true;
				})
			},
			//点击保存跳转
			_getedgList() {
				this.$router.push('/home/depManagement/Employment');
			},
			//选项框
			selected(selection, row) {
				// console.log(selection)
				this.idsArr.push(row._id)
				// console.log(row)
				// this.formItem = Object.assign(row, this.formItem)
				// // console.log(this.formItem)
			},
		},
		mounted() {
			this.rowIng = {};
			this._getUserList();
		},
		created() {
			this.id = getLocalStorage("id");
			this.ids = getLocalStorage('ids')
		}
	}
</script>

<style scoped lang="scss">
	.Report {
		.titles {
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
			.btns {
				font-size: 26px;
				width: 30px;
				height: 30px;
			}
			>span {
				font-size: 14px;
				font-weight: 600;
			}
		}
		.addBtn {
			background-color: #40b0ff;
			color: #fff;
			margin: 5px;
			height: 30px;
		}
	}
</style>