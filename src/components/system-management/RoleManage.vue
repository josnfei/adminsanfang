<!-- 人员管理 -->
<style lang="scss" scoped>
	.addBtn {
		background-color: #40b0ff;
		color: #fff;
		margin: 5px;
		height: 30px;
	}
	
	.ivu-modal-content .ivu-modal-header {
		background-color: #41b0ff!important;
		border-radius: 6px!important;
		color: #FFFFFF;
	}
	
	.rolemanage {
		height: 100%;
	}
	
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
	
	.jto {
		transform: rotate(90deg);
		width: 23px;
		height: 20px;
		vertical-align: middle;
		margin-right: 10px;
	}
	
	.jto2 {
		font-size: 23px;
	}
	
	#mar {
		margin-top: 44px;
	}
</style>

<template>

	<div class="rolemanage">
		<div class="title">
			<span>位置： </span>
			<Breadcrumb separator=">">
				<BreadcrumbItem>三防业务</BreadcrumbItem>
				<BreadcrumbItem>角色管理</BreadcrumbItem>
			</Breadcrumb>
		</div>

		<Form ref="formInline" :model="formInline" inline :label-width="80" id="mar">
			<Form-item label="角色名称" prop="rolename">
				<Input v-model="formInline.rolename" placeholder="请输入名称"></Input>
			</Form-item>
			<Form-item label="角色描述" prop="description">
				<Input v-model="formInline.description" placeholder="请输入描述"></Input>
			</Form-item>
			<div class="searchBtn">
				<Button type="ghost" shape="circle" icon="ios-search" @click="submitSearch"></Button>
			</div>
			<div class="add pull-right" @click="add">
				<Button type="primary">
          <span class="icon-xinzeng"></span>新增</Button>
			</div>
		</Form>

		<!-- <Collapse class="aa"> -->
		<!-- <Panel name="1"> -->
		<!-- 条件筛选 -->
		<template slot="content">
			<!--模态框  -->
			<Modal v-model="modal1" class="modals modal" style="width:660px">
				<div slot="header">{{updateTitle}}</div>
				<Form :model="formItem" :label-width="120">
					<Form-item label="角色名称" prop="rolename">
						<Input v-model="formItem.rolename" placeholder="请输入名称"></Input>
					</Form-item>
					<Form-item label="角色描述" prop="description">
						<Input v-model="formItem.description" placeholder="请输入描述"></Input>
					</Form-item>
					<!--<Form-item label="角色权限" prop="system_name">

						<Select v-model="formItem.system_name" style="width:260px">
							<Option v-for="item in roname" :value="item.system_name" :key="item.system_id">{{ item.system_name }}</Option>
						</Select>
					</Form-item>-->
					<Form-item label="功能模块授权" prop="modules">
						<!-- <Tree v-if="treeShow" :data="formItem.modules" show-checkbox></Tree> -->
						<!-- <role-tree :data="formItem.modules" keyStr="title" checkedStr="checked"></role-tree> -->
						<role-trees :data="formItem.modules" @checkChange="selected"></role-trees>
						<!-- <Table border ref="selection" :columns="columns4" :data="data1"></Table> -->
					</Form-item>
				</Form>
				<div slot="footer">
					<Button v-if="btnSave" type="primary" @click="ok">保存</Button>
					<Button v-if="btnChange" type="primary" @click="changeNotice">修改</Button>
					<!-- <Button  @click="cancel">关闭</Button> -->
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
					<Button type="error" size="large" long :loading="modal_loading" @click="dels">确认</Button>
				</div>
			</Modal>
		</template>
		<!-- </Panel> -->
		<!-- </Collapse> -->
		<div class="center table">
			<Table :loading="loading" border highlight-row :data="UserData" :columns="theadArr" stripe></Table>

			<!-- <Page class="pull-right" :total="waterRecordPage.total" :current="waterRecordPage.current" size="small" show-total @on-change="changePage"></Page> -->
			<Page class="pull-right" :total="total" :current="current" size="small" show-total></Page>
		</div>
	</div>
</template>

<script>
	import { getUserList, getAddlist, deletelist, editlist, addtreelist, edittreelist, getrole } from 'api/rolemanage'
	import { mapMutations } from 'vuex'
	import { rolemanageThaed } from 'common/js/table'
	import { ERR_OK } from 'api/config'
	import { loadingMixin } from 'common/js/mixins'
	import { successNotice, errorNotice } from 'common/js/dom'
	import { cloneObj, likeStrSearch } from 'common/js/util'
	import RoleTree from './RoleTree.vue'
	import RoleTrees from './RoleTrees.vue'

	export default {
		mixins: [loadingMixin],
		components: {
			'role-tree': RoleTree,
			'role-trees': RoleTrees
		},
		data() {
			return {
				loading:false,
				modal2: false,
				modal_loading: false,
				treeShow: false,
				modal1: false,
				btnChange: false,
				btnSave: false,
				updateTitle: "",
				formInline: {
					rolename: '',
					description: ''
				},
				waterRecordPage: {
					current: 1,
					// pageSize: 10,
					total: 0
				},
				roname: [],
				current: 1,
				total: 0,
				UserData: [],
				rolenameList: [],
				departmentNameList: [],
				bucunzai: '',
				formItem: {
					modules: []
				},
				theadArr: rolemanageThaed(this)
			}
		},
		methods: {
			_getrolename(system_name, system_id) {

				getrole(system_name, system_id).then(res => {
					//					console.log(res);
					if(res.code === ERR_OK) {
						this.roname.push(system_name, system_id);
						this.roname = res.result.result;
					}
				})
			},
			selected(arr) {
				// console.log(arr)
			},
			changePage: function(page) {
				this.submitSearch(page);
			},
			_getUserList: function(page, search) {
				this.loading = true
				getUserList(page, search).then(res => {
					if(res.code === ERR_OK) {
						this.loading = false
						this.UserData = res.result.result;
						this.total = res.result.totalSize;
						this.current = res.result.page;
					}
				})
			},
			add() {
				this.formItem = {
					rolename: '',
					description: '',
					modules: [],
					roname: []
				};
				this.updateTitle = "新增用户";
				this.btnChange = false;
				this.btnSave = true;
				this.modal1 = true;
				addtreelist().then(res => {
					if(res.code === ERR_OK) {
						this.formItem.modules = res.result.result.modules;
					}
				})
			},
			ok() {
				console.log(this.formItem)
				getAddlist(this.formItem).then(res => {
					this.modal1 = false;
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '新增成功'
						});
					}

					this._getUserList();

				})
			},
			// 编辑
			edit(dataObj) {
				this.updateTitle = "编辑角色"
				this.btnSave = false;
				this.btnChange = true;
				this.modal1 = true;
				this.formItem = dataObj;

				edittreelist(this.formItem).then(res => {
					if(res.code === ERR_OK) {
						this.formItem.modules = res.result.result.modules;
						console.log(res.result.result)
					}
				})
			},
			changeNotice() {
				editlist(this.formItem).then(res => {
					this.modal1 = false;

					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '修改成功'
						});
					}

					this._getUserList();

				})
			},
			del(row) {
				this.rowIng = cloneObj(row)
				this.modal2 = true;
			},
			dels() {
				let data = {
					_ids: this.rowIng._id
				}
				deletelist(this.rowIng._id).then(res => {

					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '删除成功'
						});

						this._getUserList();

						this.modal2 = false;
					}
				})
			},
			submitSearch(page) {
				let search = {};
				if(this.formInline.rolename) {
					search.rolename = likeStrSearch(this.formInline.rolename)
				}
				if(this.formInline.description) {
					search.description = likeStrSearch(this.formInline.description)
				}
				this._getUserList(page, search)
			}
		},
		mounted: function() {
			this._getrolename();
			this._getUserList();
			this.rowIng = {}
		}
	}
</script>