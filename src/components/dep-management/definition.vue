<template>
	<div class="definition">
		<div class=title>
			<span>位置： </span>
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/home/depManagement/definition">部门管理</BreadcrumbItem>
				<BreadcrumbItem>部门系统定义</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<!--搜索  -->
		<Form ref="formInline" :model="formInline" inline :label-width="80">
			<Form-item label="部门名称" prop="department_name">
				<Input v-model="formInline.department_name" placeholder="请输入部门名称"></Input>
			</Form-item>
			<Form-item label="部门编号" prop="department_code">
				<Input v-model="formInline.department_code" placeholder="请输入部门编号"></Input>
			</Form-item>
			<div class="searchBtn">
				<Button type="ghost" shape="circle" icon="ios-search" @click="submitSearch"></Button>
			</div>
			<div class="add pull-right" @click="add">
				<Button type="primary"><span class="icon-xinzeng"></span>新增</Button>
			</div>
		</Form>
		<template slot="content">
			<!--新增，修改  -->
			<Modal v-model="modal1">
				<div slot="header">{{updateTitle}}</div>
				<Form :model="formItem" :label-width="80">
					<Form-item label="部门名称" prop="department_name">
						<Input v-model="formItem.department_name" placeholder="请输入部门名称"></Input>
					</Form-item>
					<Form-item label="部门编号" prop="department_code">
						<Input v-model="formItem.department_code" placeholder="请输入部门编号"></Input>
					</Form-item>
					<Form-item label="部门级别" prop="department_level">
						<Input v-model="formItem.department_level" placeholder="请输入部门级别"></Input>
					</Form-item>
					<Form-item label="系统名称" prop="system_name">
						<Input v-model="formItem.system_name" placeholder="请输入系统名称"></Input>
					</Form-item>
					<Form-item label="访问地址" prop="system_access">
						<Input v-model="formItem.system_access" placeholder="请输入系统访问地址"></Input>
					</Form-item>
				</Form>
				<div slot="footer">
					<Button v-if="btnSave" type="primary" @click="_defaddList">保存</Button>
					<Button v-if="btnChange" type="primary" @click="_defeditList">修改</Button>
				</div>
			</Modal>
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
					<Button type="error" size="large" long :loading="modal_loading" @click="_defdelList">确认</Button>
				</div>
			</Modal>
		</template>
		<div class="table">
			<Table :loading="loading" border stripe size="small" highlight-row :columns="tableThead" :data="tableTbody"></Table>
			<Page class="pull-right" :total="total" :current="current" size="small" show-elevator show-total @on-change="changePage"></Page>
		</div>
	</div>
</template>
<script>
	import { defUserList, defaddList, defeditList, defdelList } from 'api/definition'
	import { depmanageThead } from 'common/js/table'
	import { mapMutations } from 'vuex'
	import { ERR_OK } from 'api/config'
	import { successNotice, errorNotice } from 'common/js/dom'
	import { cloneObj, likeStrSearch } from 'common/js/util'
	import { loadingMixin, interactModelMixin } from 'common/js/mixins'
	export default {
		mixins: [loadingMixin, interactModelMixin],
		data() {
			return {
				loading:false,
				formInline: {
					department_name: '',
					department_code: ''
				},
				tableThead: depmanageThead(this),
				tableTbody: [],
				current: 1,
				total: 0,
				formItem: {},
				modal2: false,
				modal_loading: false,
				modal1: false,
				btnChange: false,
				btnSave: false,
				updateTitle: "",
			}
		},
		methods: {
			// 列表
			_defUserList(page, search) {
				this.loading = true
				defUserList(page, search).then(res => {
					if(res.code === ERR_OK) {
						this.loading = false
						this.tableTbody = res.result.result;
						this.total = res.result.totalSize;
						this.current = res.result.page;
					}
				})
			},
			// 页码
			changePage: function(page) {
				this._defUserList(page);
			},
			// 新增
			add() {
				this.formItem = {
					department_name: '',
					department_code: '',
					department_level: '',
					system_name: '',
					system_access: ''
				};
				this.updateTitle = "新增部门系统";
				this.btnChange = false;
				this.btnSave = true;
				this.modal1 = true;
			},
			// 保存按钮
			_defaddList() {
				defaddList(this.formItem).then(res => {
					this.modal1 = false
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '新增成功'
						});
						this._defUserList();
					} else {
						this.$Notice.warning({
							title: '系统已存在'
						})
					}
				})
			},
			// 编辑
			edit(dataObj) {
				this.updateTitle = "编辑部门系统"
				this.btnSave = false;
				this.btnChange = true;
				this.modal1 = true;
				this.formItem = dataObj;
			},
			// 修改成功
			_defeditList() {
				defeditList(this.formItem).then(res => {
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '修改成功'
						});
						this._defUserList();
						this.modal1 = false;
					}
				})
			},
			// 删除
			del(row) {
				this.rowIng = cloneObj(row)
				this.modal2 = true;
			},
			_defdelList() {
				let data = {
					_ids: this.rowIng._id
				}
				defdelList(this.rowIng._id).then(res => {
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '删除成功'
						});
					}
					this._defUserList();
					this.modal2 = false;
				})
			},
			// 搜索
			submitSearch(page) {
				let search = {}
				if(this.formInline.department_name) {
					search.department_name = likeStrSearch(this.formInline.department_name)
				}
				if(this.formInline.department_code) {
					search.department_code = likeStrSearch(this.formInline.department_code)
				}
				this._defUserList(page, search);
			}
		},
		mounted() {
			this._defUserList();
			this.rowIng = {};
		}
	}
</script>
<style scoped lang="scss">
	.definition {
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
		.addBtn {
			background-color: #40b0ff;
			color: #fff;
			margin: 5px;
			height: 30px;
		}
	}
</style>