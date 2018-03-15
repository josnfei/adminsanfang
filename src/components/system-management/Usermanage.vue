<!-- 人员管理 -->
<style lang="scss" scoped>
	.addBtn {
		background-color: #40b0ff;
		color: #fff;
		margin: 5px;
		height: 30px;
	}
	
	.usermanage {
		height: 100%
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
	
	#mar {
		margin-top: 42px;
	}
</style>

<template>
	<div class="usermanage">

		<div class="title">
			<span>位置： </span>
			<Breadcrumb separator=">">
				<BreadcrumbItem>三防业务</BreadcrumbItem>
				<BreadcrumbItem>用户管理</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<!--搜索  -->
		<Form ref="formInline" :model="formInline" inline :label-width="80" id="mar">
			<Form-item label="用户账号" prop="username">
				<Input v-model="formInline.username" :maxlength="16" placeholder="请输入账号"></Input>
			</Form-item>
			<Form-item label="用户名称" prop="realname">
				<Input v-model="formInline.realname" :maxlength="16" placeholder="请输入名称"></Input>
			</Form-item>
			<Button type="ghost" shape="circle" icon="ios-search" @click="submitSearch"></Button>
			<Button class="addBtn pull-right" @click="add">
        <Icon type="plus-round"></Icon> 新增</Button>
		</Form>
		<template slot="content">

			<!--新增，修改  -->
			<Modal v-model="modal1">
				<div slot="header">{{updateTitle}}</div>
				<Form :model="formItem" :rules="ruleValidate" :label-width="80">
					<Form-item label="用户账号" prop="username">
						<Input v-model="formItem.username" placeholder="请输入账号"></Input>
					</Form-item>
					<Form-item label="用户密码" prop="password">
						<Input v-model="formItem.password" type="password" placeholder="请输入密码"></Input>
					</Form-item>
					<Form-item label="用户名称" prop="realname">
						<Input v-model="formItem.realname" placeholder="请输入名称"></Input>
					</Form-item>
					<Form-item label="联系方式" prop="mobile">
						<Input v-model="formItem.mobile" placeholder="请输入联系方式"></Input>
					</Form-item>
					<Form-item label="系统" prop="system_name">
						<Select v-model="formItem.system_name" style="width:260px">
							<Option v-for="item in rolenameLists" :value="item.system_name" :key="item.system_id">{{ item.system_name }}</Option>
						</Select>
					</Form-item>
					<Form-item label="用户角色" prop="role">
						<Select v-model="formItem.role" style="width:260px">
							<Option v-for="item in rolenameList" :value="item.rolename" :key="item.roleid">{{ item.rolename }}</Option>
						</Select>
					</Form-item>

					<Form-item label="部门名称(全称)" prop="department_fullname" style="width:300px">
						<Select :label='formItem.department_fullname' not-found-text='无匹配部门，请重新输入' v-model="formItem.department_fullname" filterable remote :remote-method="autoSearch" :loading="selectLoading" style="width:300px" @on-change='selecteds'>
							<Option v-for="(option, index) in autoCompleteData" :value="option.value" :key="index">{{option.label}}</Option>
						</Select>
					</Form-item>
					<Form-item label="部门名称(简称)" prop="department_name">
						<Input v-model="formItem.department_name" placeholder="请输入部门名称" style="width:300px"></Input>
					</Form-item>
					<FormItem label="部门编号" style="width:300px">
						<Input v-model="formItem.department_code" placeholder="请输入部门编号" style="width:300px"></Input>
					</FormItem>
				</Form>
				<div slot="footer">
					<Button v-if="btnSave" type="primary" @click="ok">保存</Button>
					<Button v-if="btnChange" type="primary" @click="changeNotice">修改</Button>
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
		<div class="center">
			<Table :loading="loading" border highlight-row :data="UserData" :columns="theadArr" stripe></Table>
			<Page class="pull-right" :total="total" :current="current" size="small" show-total @on-change="changePage"></Page>
		</div>

	</div>
</template>

<script>
	import { getUserList, getOgnList, updateUserList, updateUserPsw, getrolelist, getbumenlist } from 'api/usermanage'
	//import {  getrole } from 'api/rolemanage'
	import { mapMutations } from 'vuex'
	import { ERR_OK } from 'api/config'
	import { successNotice, errorNotice } from 'common/js/dom'
	import { cloneObj, likeStrSearch } from 'common/js/util'
	import { loadingMixin, interactModelMixin } from 'common/js/mixins'
	import { usermanageThead } from 'common/js/table'
	import { userManagementRules } from 'common/js/rules'
	import { getDepList } from 'api/bumenlist'

	export default {
		mixins: [loadingMixin, interactModelMixin],
		data() {
			return {
				loading:false,
				modal2: false,
				depList: {},
				autoCompleteData: [],
				selectLoading: false,
				modal_loading: false,
				modal1: false,
				btnChange: false,
				btnSave: false,
				updateTitle: "",
				ruleValidate:userManagementRules,
				formInline: {
					username: '',
					password: '',
					realname: '',
					mobile: '',
					rolename: '',
					department_name: ''
				},
				waterRecordPage: {
					current: 1,
					pageSize: 10,
					total: 0
				},
				total: 0,
				current: 1,
				UserData: [],
				rolenameList: [],
				rolenameLists: [{
						system_name: '南海区人民政府三防指挥系统',
						system_id: '1000011'
					},
					{
						system_name: '南海区三防综合业务管理系统',
						system_id: '1000010'
					},
					{
						system_name: '南海区三防指挥移动应用系统',
						system_id: '1000020'
					}
				],
				departmentNameList: [],
				bucunzai: '',
				formItem: {},
				theadArr: usermanageThead(this)
			}
		},

		methods: {
			selecteds(value) {
				if(this.depList.length > 0) {
					let index = this.depList.findIndex(item => value === item.department_fullname)
					this.formItem.department_fullname = this.depList[index].department_fullname
					this.formItem.department_name = this.depList[index].department_name
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
			// 列表
			_getUserList(page, search) {
				this.loading = true
				this.$Loading.start();
				getUserList(page, search).then(res => {
					if(res.code === ERR_OK) {
						this.loading = false
						this.$Loading.finish();
						this.UserData = res.result.result;
						this.total = res.result.totalSize;
						this.current = res.result.page;
					}
				})
			},
			changePage: function(page) {
				this._getUserList(page);
				console.log(page)
				this.page = page;
				this.submitSearch(page)
			},
			// 用户角色下拉框
			getRoleNameList(page, search) {
				getrolelist(page, search).then(res => {
					if(res.code === ERR_OK) {
						this.rolenameList = res.result.result;
					}
				})
			},
			// 用户部门下拉框
			getDepartmentNameList(page, search) {
				getbumenlist(page, search).then(res => {
					if(res.code === ERR_OK) {
						this.departmentNameList = res.result.result;
					}
				})
			},
			// 新增按钮
			add() {
				this.formItem = {
					username: '',
					password: '',
					realname: '',
					mobile: '',
					logintime: '',
					loginip: '',
					system_id: '',
					system_name: '',
					role_id: '',
					role: '',
					remark: '',
					//					system_name: '',
					department_name: '',
					department_code: '',
					department_level: ''
				};
				this.updateTitle = "新增用户";
				this.btnChange = false;
				this.btnSave = true;
				this.modal1 = true;
			},

			// 保存按钮、
			// 向后台传3个字段
			ok() {
				this.rolenameLists.map(item => {
					if(item.system_name === this.formItem.system_name) {
						return this.formItem.system_id = item.system_id
					}
				})
				let index = this.rolenameList.findIndex(item => item.rolename === this.formItem.role);
				this.formItem.role_id = this.rolenameList[index].roleid;
				getOgnList(this.formItem).then(res => {
					this.modal1 = false
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '新增成功'
						});
						this._getUserList();
					} else {
						this.$Notice.warning({
							title: '用户名已存在'
						})
					}
				})
			},
			// 编辑
			edit(dataObj) {
				this.updateTitle = "编辑用户"
				this.btnSave = false;
				this.btnChange = true;
				this.modal1 = true;
				console.log(dataObj);
				//      let arr = [];
				//      if (dataObj.roles) {
				//        dataObj.roles.map(item => {
				//          arr.push(item.roleid);
				//        })
				//      }
				//      dataObj.roles = arr;
				//				this.formItem.role = dataObj.rolename;
				this.formItem = dataObj;
			},
			// 修改成功
			changeNotice() {
				//      let arr = [];
				//      this.formItem.roles.map(items => {
				//        let index = this.rolenameList.findIndex(item => item.roleid === items);
				//        let obj = cloneObj(this.rolenameList[index]);
				//        delete obj['description'];
				//        delete obj['modules'];
				//        arr.push(obj);
				//      })
				//      this.formItem['roles'] = arr;
				//      console.log(this.formItem);
				updateUserList(this.formItem).then(res => {
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '修改成功'
						});
						this._getUserList();
						this.modal1 = false;
					}
				})
			},
			// 删除
			del(row) {
				this.rowIng = cloneObj(row)
				this.modal2 = true;
			},
			// 删除成功
			dels() {
				let data = {
					_ids: this.rowIng._id
				}
				updateUserPsw(this.rowIng._id).then(res => {
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '删除成功'
						});
					}
					this.submitSearch();
					this.modal2 = false;
				})
			},
			// 搜索
			submitSearch(page) {
				let search = {}
				if(this.formInline.username) {
					search.username = likeStrSearch(this.formInline.username)
				}
				if(this.formInline.realname) {
					search.realname = likeStrSearch(this.formInline.realname)
				}
				if(this.formInline.rolename) {
					search.rolename = likeStrSearch(this.formInline.rolename)
				}
				if(this.formInline.departmentName) {
					search.departmentName = likeStrSearch(this.formInline.departmentName)
				}
				this._getUserList(page, search);
			}
		},
		mounted: function() {
			this._getUserList();
			this.rowIng = {};
			this.getRoleNameList();
			this.getDepartmentNameList();
			this._getDepList();
		}
	}
</script>
