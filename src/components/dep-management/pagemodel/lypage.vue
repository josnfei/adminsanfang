<template>
	<div class="lypage">
		<div class="titles">
			<div class="titles">
				<div class="btns" @click="_getedgList" style="cursor:pointer;">
					<Icon type="arrow-left-c"></Icon>
				</div>
				<BreadcrumbItem>部门上报数据录入新建</BreadcrumbItem>
			</div>

		</div>
		<div class="buttons  pull-right" style="width:300px">
			<Button class="addBtn" @click="_getaddList">
					<Icon type="plus-round"></Icon> 保存</Button>
		</div>
		<!--输入框-->
		<div class="cont">
			<Form :model="formItem" :label-width="120">
				<!--<FormItem label="部门名称" style="width:300px">
					<Input v-model="formItem.department_name" placeholder="请输入部门名称" style="width:300px"></Input>
				</FormItem>-->
				<Form-item label="部门名称(全称)" prop="department_fullname" style="width:300px">
					<Select :label='formItem.department_fullname' 
						not-found-text='无匹配部门，请重新输入' 
						v-model="formItem.department_fullname" 
						filterable remote 
						:remote-method="autoSearch" 
						:loading="selectLoading" 
						style="width:300px" 
						@on-change='selecteds'>
						<Option v-for="(option, index) in autoCompleteData" 
							:value="option.value" 
							:key="index">{{option.label}}</Option>
					</Select>
				</Form-item>
				<Form-item label="部门名称(简称)" prop="department_name">
					<Input v-model="formItem.department_name" placeholder="请输入部门名称" style="width:300px"></Input>
				</Form-item>
				<FormItem label="部门编号" style="width:300px">
					<Input v-model="formItem.department_code" placeholder="请输入部门编号" style="width:300px"></Input>
				</FormItem>
				<FormItem label="部门级别" style="width:300px">
					<Input v-model="formItem.department_level" placeholder="请输入部门级别" style="width:300px"></Input>
				</FormItem>
			</Form>
		</div>
		<!--选项表格-->
		<div class="titl">
			<h1>请选择其中一个表单</h1>
		</div>
		<div class="center">
			<Table @on-select='selected' border ref="selection" highlight-row :data="UserData" :columns="theadArr" stripe></Table>
		</div>
	</div>
</template>

<script>
	import { getaddList, getformList } from 'api/lypage'
	import { lyThead } from 'common/js/table'
	import { mapMutations } from 'vuex'
	import { ERR_OK } from 'api/config'
	import { successNotice, errorNotice, getLocalStorage, senActive } from 'common/js/dom'
	import { cloneObj, likeStrSearch } from 'common/js/util'
	import { getDepList } from 'api/bumenlist'

	export default {
		data() {
			return {
				UserData: [],
				theadArr: lyThead(this),
				formItem: {},
				depList: {},
				autoCompleteData: [],
				selectLoading: false
			}
		},
		methods: {
			// 选择部门名称
			selecteds(value) {
				if(this.depList.length > 0) {
					let index = this.depList.findIndex(item => value === item.department_fullname)
					console.log(index)
					console.log(this.depList.length)
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

			//表格列表
			_getformList(search) {
				getformList(search).then(res => {
					//					console.log(res);
					if(res.code === ERR_OK) {
						this.UserData = res.result.result
						//						this.formItem = getLocalStorage('info');
					}
				})
			},
			//选项框
			selected(selection, row) {
				//				console.log(row)
				this.formItem = Object.assign(row, this.formItem)
				//				console.log(this.formItem)
			},
			//按保存时候跳转页面给后台传数据
			_getaddList() {
				delete this.formItem['col_info']
				delete this.formItem['_id']
				delete this.formItem['createdt']
				delete this.formItem['username']
				delete this.formItem['userid']
				delete this.formItem['realname']
				delete this.formItem['roles']
				delete this.formItem['remark']
				delete this.formItem['realname']
				delete this.formItem['mobile']
				delete this.formItem['logintime']
				delete this.formItem['loginip']
				delete this.formItem['token']
				delete this.formItem['flag']
				delete this.formItem['department_fullname']
//				console.log(this.formItem)
				this.formItem.status = "草稿"
				getaddList(this.formItem).then(res => {
					//					console.log(this.formItem)
										console.log(res);
					if(res.code === ERR_OK) {
						this.$router.push('/home/depManagement/Employment')
						this.$Notice.success({
							title: '新增成功'
						});
					}
				})
			},
			_getedgList() {
				this.$router.push('/home/depManagement/Employment')
			}

		},
		mounted() {
			this.info = getLocalStorage('info')
			this._getformList();
			this._getDepList();
		}
	}
</script>

<style scoped lang="scss">
	.lypage {
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
	}
	
	.addBtn {
		background-color: #40B0FF;
		color: #FFFFFF;
	}
	
	.titl {
		margin-bottom: 20px;
		h1 {
			/*color: rgb(238, 199, 16);*/
			color: #FF7F00;
		}
	}
	
	.cont {
		width: 500px;
		margin: 0 auto;
	}
</style>