<template>
	<div class="Report">
		<div class="titles">
			<div class="btns" @click="_getedgList" style="cursor:pointer;">
				<Icon type="arrow-left-c"></Icon>
			</div>
			<BreadcrumbItem>数据查看</BreadcrumbItem>
		</div>
		<div class="table">
			<Table :loading="loading" border highlight-row :data="UserDatas" :columns="theadArrs" stripe></Table>
			<Page class="pull-right" :total="total" :current="current" size="small" show-total @on-change="changePage"></Page>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import { getUserList, getList, getinputList, getdeleteList, getbumenList } from 'api/Report'
	import { getuserList } from 'api/Employment'
	import { ERR_OK } from 'api/config'
	import { successNotice, errorNotice, getLocalStorage, senActive } from 'common/js/dom'
	import { cloneObj, likeStrSearch } from 'common/js/util'
	import { ReportThead, shujuThead } from 'common/js/table'
	export default {
		computed: {
			...mapGetters([
				'DepartReportInfo'
			])
		},
		data() {
			return {
				loading:false,
				modal3: false,
				modal_loading: false,
				UserData: [],
				theadArr: ReportThead(this),
				formItem: {},
				UserDatas: [],
				theadArrs: [],
				total: 2000,
				current: 1,
				departmentNameList: [],
			}
		},
		methods: {
			//表格列表
			_getUserList(page) {
				let form_name = getLocalStorage('form_name')
				//				console.log(form_name)
				//				console.log("------------")
				let searchValue = {
					"form_name": form_name
				}
				this.loading = true
				if(getLocalStorage('id') != 'false') {
					getUserList(searchValue).then(res => {
						if(res.code === ERR_OK) {
							this.loading = false
							console.log(this.DepartReportInfo)
							this.formItem.form_name = res.result.result[0].form_name
							this.UserData = res.result.result[0].col_info
							this.total = res.result.totalSize
							this._initList();
						}
					});
					//					
				}
			},
			changePage(page) {
				this._getUserList(page);
			},
			//点击保存表格,数据显示下面的表格
//			_getaddList() {
//				let obj = {
//					'form_name': this.formItem.form_name,
//					'department_name': this.DepartReportInfo.department_name,
//					'department_code': this.DepartReportInfo.department_code,
//					'department_level': this.DepartReportInfo.department_level
//				}
//				this.UserData.map(item => {
//					obj[item['栏位名称']] = item['custom_inputValue']
//				})
//				//				console.log(this.UserData)
//				//				console.log('-----------')
//								console.log(obj)
//				getinputList(obj).then(res => {
////					console.log(res);
//					if(res.code === ERR_OK) {
//						this._getList(1, {
//							department_name: this.DepartReportInfo.department_name,
//							department_code: this.DepartReportInfo.department_code,
//							department_level: this.DepartReportInfo.department_level
//						}, {
//							form_name: this.formItem.form_name
//						});
//						this.$Notice.success({
//							title: '添加成功'
//						});
//					}
//				})
//			},
			_initList() {
				let arr = false;
				this.theadArrs.push({
					title: '序号',
					type: 'index',
					align: 'center',
					width: 60
				}, {
					title: '部门名称',
					key: 'department_name',
					align: 'center'
				})
				this.UserData.map(item => {
					this.theadArrs.push({
						title: item['栏位名称'],
						align: 'center',
						key: item['栏位名称']
					})
				})
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
					//					console.log(res)
					if(res.code === ERR_OK) {
						this.UserDatas = res.result.result
					}
				})
			},
			//点击保存跳转
			_getedgList() {
				let path = getLocalStorage('formPath')
				this.$router.push(path);
			}
		},
		mounted() {
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