<template>
	<div class="addPage">
		<div class=titles>
			<span>位置： </span>
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/home/depManagement/Employment">部门管理</BreadcrumbItem>
				<BreadcrumbItem>上报数据表单录入</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<!--搜索-->
		<Form ref="formInline" inline :label-width="80">
			<!--<Form-item label="部门名称(全称)" prop="department_fullname" style="width:180px">
				<Select :label='formInline.department_fullname' 
					not-found-text='无匹配部门，请重新输入' 
					v-model="formItem.department_fullname" 
					filterable remote 
					:remote-method="autoSearch" 
					:loading="selectLoading" style="width:180px" @on-change='selecteds'>
					<Option v-for="(option, index) in autoCompleteData" :value="option.value" :key="index">{{option.label}}</Option>
				</Select>
			</Form-item>-->
			<Form-item label="(简称)">
				<Input v-model="formInline.department_name" :maxlength="16" placeholder="请输入部门名称"></Input>
			</Form-item>
			<Form-item label="表单名称">
				<Input v-model="formInline.form_name" :maxlength="16" placeholder="请输入表单数据名称"></Input>
			</Form-item>
			<Form-item label="预案类型">
				<Input v-model="formInline.plan_type" :maxlength="16" placeholder="请输入对应预案类型"></Input>
			</Form-item>
			<div class='searchBtn'>
				<Button type="ghost" shape="circle" icon="ios-search" @click="submitsearch(1)"></Button>
			</div>
			<div class="add pull-right" @click="add">
				<Button type="primary"><span class="icon-xinzeng"></span>新增</Button>
			</div>
		</Form>
		<!--表格-->
		<div class="table">
			<Table :loading="loading" border stripe size="small" highlight-row :columns="tableThead" :data="tableTbody"></Table>
			<Page class="pull-right" :total="total" :current="current" size="small" show-total @on-change="changePage"></Page>
		</div>
		<template slot="content">
			<!--确认删除  -->
			<Modal v-model="modal2" width="360">
				<p slot="header" style="color:#f60;text-align:center">
					<Icon type="information-circled"></Icon>
					<span>删除</span>
				</p>
				<div style="text-align:center">
					<p>确认删除？</p>
				</div>
				<div slot="footer">
					<Button type="error" size="large" long :loading="modal_loading" @click="dels">确认</Button>
				</div>
			</Modal>
			<!--上报-->
			<!--<Modal v-model="modal3" width="360">
				<p slot="header" style="color:#f60;text-align:center">
					<Icon type="arrow-up-c"></Icon>
					<span>上报</span>
				</p>
				<div style="text-align:center">
					<p>确认上报？</p>
				</div>
				<div slot="footer">
					<Button type="primary" size="large" long :loading="modal_loading" @click="_getshangbao">确认</Button>
				</div>
			</Modal>-->
		</template>
	</div>
</template>
<script>
	import { mapMutations } from 'vuex';
	import { getuserList, getdelList, getshangbao } from 'api/Employment'
	import { employThead } from 'common/js/table'
	import { ERR_OK } from 'api/config'
	import { successNotice, errorNotice, getLocalStorage } from 'common/js/dom'
	import { cloneObj, likeStrSearch } from 'common/js/util'
	import { getDepList } from 'api/bumenlist'
	
	export default {
		data() {
			return {
				loading:false,
				current: 1,
				total: 2000,
				modal2: false,
				modal3: false,
				modal_loading: false,
				tableThead: employThead(this),
				tableTbody: [],
				formInline: {
					department_name: '',
					form_name: '',
					plan_type: ''
				},
				selectLoading: false,
				modal_loading: false,
				autoCompleteData:[],
				formItem:{}
			}
		},
		methods: {
			selecteds(value) {
				if(this.depList.length > 0) {
					let index = this.depList.findIndex(item => value === item.department_fullname)
					this.formInline.department_fullname = this.depList[index].department_fullname
					this.formInline.department_name = this.depList[index].department_name
					this.formItem.department_level = this.depList[index].department_level
					this.formItem.department_code = this.depList[index].department_code
				}
			},
			// 提示部门名称
			autoSearch(query) {
				if(query !== '') {
					this.selectLoading = true;
					setTimeout(() => {
						this.selectLoading = false;
						this.autoCompleteData = this.depList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
					}, 200);
				} else {
					this.autoCompleteData = [];
				}
			},
			// 获取部门
			_getDepList() {
				getDepList().then(res => {
					//得到的数据循环一一对应
					this.depList = res.result.result.map(item => {
						return {
							value: item.fullname,
							label: item.fullname,
							department_name: item.name,
							department_fullname: item.fullname,
							department_code: item.code,
							department_level: item.level
						}
					})
				})
			},
			//列表
			_getUserList(page, search) {
				this.loading = true
				getuserList(page, search).then(res => {
					console.log(res);
					if(res.code === ERR_OK) {
						this.loading = false
						this.tableTbody = res.result.result;
						this.total = res.result.totalSize
					}
				})
			},
			//页码
			changePage(page) {
				this.page = page;
				this.submitsearch(page);
//				this._getUserList(page);
			},
			//点击新增时候跳转到另一个页面
			add() {
				this.$router.push('/home/depManagement/Employment/lypage')
			},
			//点击录入时候跳转到另一个页面
			luyong(dataObj) {
				getLocalStorage('id', 'true')
				//				console.log(dataObj);
				getLocalStorage('ids', dataObj._id);
				getLocalStorage("form_name", dataObj.form_name);
				this.SET_DEPARTREPORTINFO(dataObj);
				this.$router.push('/home/depManagement/Employment/Report')
			},
			//删除
			del(row) {
				this.rowIng = cloneObj(row)
				this.modal2 = true;
			},
			//删除成功
			dels() {
				let data = {
					_ids: this.rowIng._id
				}
				getdelList(this.rowIng._id).then(res => {
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '删除成功'
						});
					}
					this._getUserList();
					this.modal2 = false;
				})
			},
			//搜索
			submitsearch(page) {
				let search = {}
				if(this.formInline.department_name) {
					search.department_name = likeStrSearch(this.formInline.department_name)
				}
				if(this.formInline.form_name) {
					search.form_name = likeStrSearch(this.formInline.form_name)
				}
				if(this.formInline.plan_type) {
					search.plan_type = likeStrSearch(this.formInline.plan_type)
				}
				if(this.formInline.department_fullname) {
					search.department_fullname = likeStrSearch(this.department_fullname)
				}
				this._getUserList(page, search);
			},
			//上报成功
			shangbao(dataObj) {
				let pObj = {
					_id: dataObj._id,
					"status": "生效"
				}
				getshangbao(pObj).then(res => {
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '上报成功'
						})
					} else if(res.code === '0001') {
						this.$Notice.warning({
							title: '已上报过'
						})
					}
				})
			},
			...mapMutations([
				'SET_DEPARTREPORTINFO'
			])
		},
		mounted() {
			this.rowIng = {};
			this._getUserList();
			this._getDepList();
			
		}
	}
</script>

<style scoped lang="scss">
	.addPage {
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