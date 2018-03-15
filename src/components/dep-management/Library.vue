<template>
	<div class="Library">
		<div class=title>
			<span>位置： </span>
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/home/depManagement/definition">部门管理</BreadcrumbItem>
				<BreadcrumbItem>部门指令库管理</BreadcrumbItem>
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
				<Form :model="formItem" :label-width="120">
					<Form-item label="部门名称(全称)" prop="department_fullname">
						<!-- <Input v-model="formItem.department_name" placeholder="请输入部门名称"></Input> -->
						<Select :label='formItem.department_fullname' not-found-text='无匹配部门，请重新输入' v-model="formItem.department_fullname" filterable remote :remote-method="autoSearch" :loading="selectLoading" style="width:300px" @on-change='selected'>
							<Option v-for="(option, index) in autoCompleteData" :value="option.value" :key="index">{{option.label}}</Option>
						</Select>
					</Form-item>
					<Form-item label="部门名称(简称)" prop="department_name">
						<Input v-model="formItem.department_name" placeholder="请输入部门名称"></Input>
					</Form-item>
					<Form-item label="部门编号" prop="department_code">
						<Input v-model="formItem.department_code" placeholder="请输入部门编号"></Input>
					</Form-item>
					<Form-item label="部门级别" prop="department_level">
						<Input v-model="formItem.department_level" placeholder="请输入部门级别"></Input>
					</Form-item>
					<Form-item label="指令名称" prop="instruction_name">
						<Input v-model="formItem.instruction_name" placeholder="请输入指令名称"></Input>
					</Form-item>
					<Form-item label="详细描述" prop="instruction_desc">
						<Input v-model="formItem.instruction_desc" type="textarea" :autosize="{minRows: 10,maxRows: 20}" placeholder="请输入指令详细描述"></Input>
					</Form-item>
					<Form-item label="执行部门" prop="execute_department">
						<Select v-model="formItem.execute_department" filterable multiple style="width:360px">
							<Option v-for="item in department" :value="item.name" :key="item.name">{{ item.name }}</Option>
						</Select>
					</Form-item>
				</Form>
				<div slot="footer">
					<Button v-if="btnSave" type="primary" @click="_LibraryaddList">保存</Button>
					<Button v-if="btnChange" type="primary" @click="_LibraryeditList">修改</Button>
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
					<Button type="error" size="large" long :loading="modal_loading" @click="_LibrarydelList">确认</Button>
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
	import { LibraryList, LibraryaddList, LibraryeditList, LibrarydelList, getbumenList } from 'api/Library'
	import { LiraryThead } from 'common/js/table'
	import { mapMutations } from 'vuex'
	import { ERR_OK } from 'api/config'
	import { successNotice, errorNotice, getLocalStorage } from 'common/js/dom'
	import { cloneObj, likeStrSearch } from 'common/js/util'
	import { loadingMixin, interactModelMixin } from 'common/js/mixins'
	import { getDepList } from 'api/bumenlist'
	export default {
		mixins: [loadingMixin, interactModelMixin],
		data() {
			return {
				loading:false,
				formInline: {
					department_name: '',
					department_code: ''
				},
				tableThead: LiraryThead(this),
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
				department: [],
				depList: {},
				autoCompleteData: [],
				selectLoading: false
			}
		},
		methods: {
			// 选择部门名称
			selected(value) {
				if(this.depList.length > 0) {
					let index = this.depList.findIndex(item => value === item.department_fullname)
					//        console.log(index);
					this.formItem.department_fullname = this.depList[index].department_fullname
					console.log(this.formItem.department_fullname);
					this.formItem.department_name = this.depList[index].department_name
					this.formItem.department_level = this.depList[index].department_level
					this.formItem.department_code = this.depList[index].department_code
				}
				var str = 'level' + this.formItem.department_level
				let level = parseInt(this.formItem.department_level) + 1
				const obj = {
					'level': JSON.stringify(level),
				}
				obj[str] = this.formItem.department_name
				console.log(obj);
				// 执行部门下拉框
				getbumenList(obj).then(res => {
					console.log(obj)
					console.log(res);
					if(res.code === ERR_OK) {
						this.department = res.result.result
					}
				})
			}, // 提示部门名称
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
			_LibraryList(page, search) {
				this.loading = true
				LibraryList(page, search).then(res => {
					//        console.log(res);
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
				this._LibraryList(page);
			},
			add() {
				this.formItem = {
					department_name: '',
					department_code: '',
					department_level: '',
					instruction_name: '',
					instruction_desc: '',
					execute_department: []
				};
				this.updateTitle = "新增";
				this.btnChange = false;
				this.btnSave = true;
				this.modal1 = true;
			},
			// 保存按钮
			_LibraryaddList() {
				LibraryaddList(this.formItem).then(res => {
					//        console.log(res);
					this.modal1 = false
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '新增成功'
						});
						this._LibraryList();
					} else {
						this.$Notice.warning({
							title: '已存在'
						})
					}
				})
			},
			// 编辑
			edit(dataObj) {
				this.updateTitle = "编辑"
				this.btnSave = false;
				this.btnChange = true;
				this.modal1 = true;
				this.formItem = dataObj;
			},
			// 修改成功
			_LibraryeditList() {
				LibraryeditList(this.formItem).then(res => {
					// console.log(res)
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '修改成功'
						});
						this._LibraryList();
						this.modal1 = false;
					}
				})
			},
			// 删除
			del(row) {
				this.rowIng = cloneObj(row)
				this.modal2 = true;
			},
			_LibrarydelList() {
				let data = {
					_ids: this.rowIng._id
				}
				LibrarydelList(this.rowIng._id).then(res => {
					// console.log(res);
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '删除成功'
						});
					}
					this._LibraryList();
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
				this._LibraryList(page, search);
			}
		},
		mounted() {
			this._LibraryList();
			this._getDepList();
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
	
	.ivu-modal-header {
		background-color: #40b0ff;
		color: #fff;
		border-radius: 6px;
	}
	
	.ivu-modal-content {
		width: 700px;
		padding-right: 20px;
	}
</style>