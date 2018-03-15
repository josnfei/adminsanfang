<template>
	<div class="derstam">
		<div class=title>
			<span>位置： </span>
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/home/depManagement/derstam">部门管理</BreadcrumbItem>
				<BreadcrumbItem>险段数据维护</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<Form ref="formInline" inline :label-width="80">
			<Form-item label="险段名称">
				<Input v-model="formInline.danger_name" :maxlength="16" placeholder="请输入"></Input>
			</Form-item>
			<Form-item label="主管部门">
				<Input v-model="formInline.governor" :maxlength="16" placeholder="请输入"></Input>
			</Form-item>
			<Button type="ghost" shape="circle" icon="ios-search" class="ziti" @click="submitsearch(1)"></Button>
			<Button class="addBtn pull-right" @click="add"><Icon type="plus-round" ></Icon> 新增</Button>
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
					<Button type="error" size="large" long @click="dels">确认</Button>
				</div>
			</Modal>
		</template>
	</div>
</template>

<script>
	import { derstamthead } from 'common/js/table'
	import { ERR_OK } from 'api/config';
	//	import { mapMutations } from 'vuex';
	import { successNotice, errorNotice, getLocalStorage } from 'common/js/dom';
	import { cloneObj, likeStrSearch } from 'common/js/util';
	import { getUserList, getaddlist, geteditlist, getdellist } from 'api/derstam';

	export default {
		data() {
			return {
				loading:false,
				tableThead: derstamthead(this),
				tableTbody: [],
				total: 1,
				current: 1,
				modal2: false,
				formInline: {
					danger_name: '',
					governor: '',
				}
			}
		},
		methods: {
			//页码
			changePage(page) {
				this.page = page;
				this.submitsearch(page);
//				this._getuserlist(page);
			},
			//新增
			add() {
				this.formItem = {
					danger_length: '',
					danger_name: '',
					danger_type: '',
					lat: '',
					max_depth: '',
					renovate_year: '',
					stake_no: '',
					town: '',
					lng: '',
					dike_name: '',
					governor: '',
					information_equipment: '',
					other_plan: '',
					location: '',
					dike_high: '',
					fillby: '',
					createdt: '',
					doublecheckby: '',
					checkby: '',
					river_name: '',
					emergency_team: {
						headcount: '',
						director: '',
						director_telephone: '',
						contacts: '',
						contact_number: ''
					},
					manager: '',
					operator: {
						name: '',
						department: '',
						duty: '',
						telephone: ''
					},
					have_tranfer_plan: '',
					contact_number: '',
					start_stakeno: '',
					technical_director: {
						name: '',
						department: '',
						duty: '',
						telephone: ''
					},
					warehouse_statistics: {
						bag: '',
						cloth: '',
						sand: '',
						block_stone: '',
						life_jacket: '',
						distance: ''
					},
					administrator: {
						name: '',
						department: '',
						duty: '',
						telephone: ''
					},
					have_emergency_plan: ''
				}
				getLocalStorage('id', 'false')
				this.$router.push('home/depManagement/derstam/derstamadd')
			},
			//搜索
			submitsearch(page) {
				let search = {}
				if(this.formInline.danger_name) {
					search.danger_name = likeStrSearch(this.formInline.danger_name)
				}
				if(this.formInline.governor) {
					search.governor = likeStrSearch(this.formInline.governor)
				}
				this._getuserlist(page, search);
			},
			//编辑
			edit(dataObj) {
				getLocalStorage("formItemd", dataObj);
				getLocalStorage("id", dataObj._id);
				this.$router.push('home/depManagement/derstam/derstamadd')
			},
			//刪除
			del(row) {
				this.rowIng = cloneObj(row);
				this.modal2 = true;
			},
			//确认删除
			dels() {
				let data = {
					_ids: this.rowIng._id
				}
				getdellist(this.rowIng._id).then(res => {
					if(res.code === ERR_OK) {
						this._getuserlist();
						this.$Notice.success({
							title: '删除成功'
						});
					}
					this.modal2 = false;
				})
			},
			//列表显示
			_getuserlist(page, search) {
				this.loading = true
				getUserList(page, search).then(res => {
					if(res.code === ERR_OK) {
						this.loading = false
						this.tableTbody = res.result.result;
						this.total = res.result.totalSize;
					}
				})
			}
		},
		mounted() {
			this._getuserlist();
			this.rowIng = {};
		}
	}
</script>

<style scoped lang="scss">
	.title {
		position: absolute;
		top: 0px;
		left: 0px;
		display: flex;
		flex-direction: row;
		width: 100%;
		 background: rgb(237, 246, 250);  
		height: 50px;
		line-height: 50px;
		padding-left: 10px;
		>span {
			font-size: 16px;
			font-weight: 600;
		}
		
	}
	.addBtn {
			background-color: #008cee !important;
			color: #fff;
			margin: 5px;
			height: 40px;
		}
	.ziti {
		display: inline-block;
		background: #18bdff;
		font-size: 20px;
		color: #FFFFFF;
		border-radius: 0;
	}
</style>