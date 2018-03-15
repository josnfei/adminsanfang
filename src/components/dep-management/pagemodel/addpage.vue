<template>
	<div class="addPage">
		<div class=title>
			<!--<BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">部门管理</BreadcrumbItem>-->
			<BreadcrumbItem>上报数据表单定义</BreadcrumbItem>
			<div class="buttons  pull-right" style="width:300px">
				<Button class="addBtn" @click="add">
          <Icon type="plus-round"></Icon> 添加栏位</Button>
				<Button type="primary" @click="_gettiaoList" v-if="btns">新增保存</Button>
				<Button type="warning" @click="_gettiaoeditList" v-if="btn">修改保存</Button>
			</div>
		</div>

		<!--输入框  -->
		<div class="cont">
			<Form :model="formItem" :label-width="80" class="forms">
				<Form-item label="对应预案" prop="plan_type" style="width:300px">
					<Select v-model="formItem.plan_type" style="width:300px">
						<Option v-for="item in deparList" :value="item.plan_type" :key="item.plan_type">{{item.plan_type}}
						</Option>
					</Select>
				</Form-item>
				<FormItem label="表单名称" style="width:600px">
					<Input v-model="formItem.form_name" :disabled="formDisabled" placeholder="请输入表单名称" style="width:600px"></Input>
				</FormItem>

			</Form>
		</div>
		<!--模态框  -->
		<template slot="content">
			<Modal v-model="modal1">
				<div slot="header">{{updateTitle}}</div>
				<Form :model="formItem" :label-width="80">
					<Form-item label="栏位名称">
						<Input v-model="formItem.col_info[0]['栏位名称']" placeholder="请输入栏位名称"></Input>
					</Form-item>
					<FormItem label="栏位类型">
						<Select v-model="formItem.col_info[0]['栏位类型']">
							<Option value="文字">文字</Option>
							<Option value="数字">数字</Option>
						</Select>
					</FormItem>
					<Form-item label="栏位说明">
						<Input v-model="formItem.col_info[0]['栏位说明']" placeholder="请输入栏位说明"></Input>
					</Form-item>
				</Form>
				<div slot="footer">
					<Button type="primary" @click="_getaddList">保存</Button>
				</div>
			</Modal>
			<!--确认删除  -->
			<Modal v-model="modal2" width="360">
				<p slot="header" style="color:#f60;text-align:center">
					<Icon type="information-circled"></Icon>
					<span>删除</span>
				</p>
				<div style="text-align:center">
					<p>确认删除此栏位？</p>
				</div>
				<div slot="footer">
					<Button type="error" size="large" long :loading="modal_loading" @click="_getDelList">确认</Button>
				</div>
			</Modal>
		</template>
		<!--表格  -->
		<div class="center table">
			<!--<Table @on-select='selected' ref="selection" border highlight-row :data="UserData" :columns="theadArr" stripe></Table>-->
			<Table border highlight-row :data="UserData" :columns="theadArr" stripe></Table>
		</div>
	</div>

</template>

<script>
	import { addThaed } from 'common/js/table'
	import { mapMutations } from 'vuex'
	import { ERR_OK } from 'api/config'
	import { successNotice, errorNotice, getLocalStorage, senActive } from 'common/js/dom'
	import { cloneObj, likeStrSearch } from 'common/js/util'
	import { getUserList, getAddLists, getDelList, getaddList, geteditList } from 'api/addpage'
	export default {
		data() {
			return {
				index: 0,
				modal2: false,
				modal_loading: false,
				updateTitle: "",
				modal1: false,
				formDisabled: false,
				btns: true,
				btn: false,
				formItem: {
					department_name: "",
					department_code: "",
					department_level: "",
					plan_type: [],
					form_name: "",
					col_info: [{}]
				},
				departmentNameList: [{
					name: '文字',
				}, {
					name: '数字'
				}],
				UserData: [],
				theadArr: addThaed(this),
				deparList: [{
						plan_type: '全部'
					},
					{
						plan_type: '防风'
					},
					{
						plan_type: '防汛'
					},
					{
						plan_type: '防旱'
					},
					{
						plan_type: '防暴雨'
					}
				],
			}
		},
		methods: {

			// 表格列表
			_getUserList(search) {
				search = {
					_id: this.id
				}
				//判断这个id是否是新增还是编辑，如果是新增表格内容那些就为空
				if(getLocalStorage('id') != 'false') {
					getUserList(search).then(res => {
						if(res.code === ERR_OK) {
							this.formDisabled = true
							this.btn = true
							this.btns = false
							this.formItem = res.result.result[0]
							this.UserData = res.result.result[0].col_info;
						}
					})
				}
			},
			// 点击新增按钮
			add() {
				//模态框显示
				this.modal1 = true;
				//模态框的标题
				this.updateTitle = "新增";
				//将要新增的东西列出来
				this.formItem.col_info = [{
					栏位名称: '',
					栏位类型: '',
					栏位说明: ''
				}]
			},
			// 模态框点击保存按钮
			_getaddList() {
				this.modal1 = false
				this.UserData.push(this.formItem.col_info[0])
			},
			// 页面点击新增按钮
			_gettiaoList() {
				this.formItem.col_info = this.UserData
				// 新增保存时候调用新增的接口
				getaddList(this.formItem).then(res => {
					console.log(res);
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '新增成功'
						});
						this.$router.push('/home/depManagement/deplist');
					}else if(res.code === '0001') {
						this.$Notice.warning({
							title:'已存在此表'
						})
					}
				})
			},
			//页面点击修改按钮
			_gettiaoeditList() {
				this.formItem.col_info = this.UserData
				geteditList(this.formItem).then(res => {
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '修改成功'
						});
						this.$router.push('/home/depManagement/deplist');
					}
				})
			},
			// 页面点击删除按钮
			_getDelList() {
				this.UserData.splice(this.index._index, 1);
				this.modal2 = false
			},
			// 删除
			del(index) {
				this.modal2 = true
				this.index = index
			},
		},
		mounted() {
			this.rowIng = {};
		},
		created() {
			this.id = getLocalStorage("id");
			this._getUserList()
		}
	}
</script>

<style scoped lang="scss">
	.title {
		font-size: 20px;
		margin-bottom: 40px;
	}
	
	.cont {
		/* text-align: center; */
		margin: 0 auto;
		width: 200rem;
	}
	
	.addPage {
		text-align: center;
		/* width: 30rem; */
		height: 100%
	}
	
	.mangerment section {
		overflow: hidden;
	}
	/* .mangerment section .title{
    left:20rem;
  } */
</style>