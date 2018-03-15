<!-- 人员管理 -->
<style lang="scss" scoped>
	.addBtn {
		background-color: #40b0ff;
		color: #fff;
		margin: 5px;
		height: 30px;
	}
	
	.mokuaiguanli {
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
	
	#mar {
		margin-top: 42px;
	}
</style>

<template>

	<div class="mokuaiguanli">
		<div class="title">
			<span>位置： </span>
			<Breadcrumb separator=">">
				<BreadcrumbItem>三防业务</BreadcrumbItem>
				<BreadcrumbItem>模块管理</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<Form ref="formInline" :model="formInline" inline :label-width="80" id="mar">

			<Form-item label="模块" prop="name">
				<Input v-model="formInline.username" placeholder="请输入模块"></Input>
			</Form-item>
			<Form-item label="层级" prop="level1">
				<Input v-model="formInline.level1" placeholder="请输入"></Input>
			</Form-item>
			<div class="searchBtn">
				<Button type="ghost" shape="circle" icon="ios-search" @click="submitSearch"></Button>
			</div>
		</Form>

		<!-- <Button class="addBtn" @click="addUser"><Icon type="plus-round"></Icon> 新增</Button> -->
		<!-- <Collapse class="aa"> -->
		<!-- <Panel name="1">
          条件筛选 -->
		<template slot="content">

		</template>
		<!-- </Panel> -->
		<!-- </Collapse> -->
		<div class="center table">
			<Table :loading="loading" :data="UserData" :columns="theadArr" stripe></Table>
			<Page class="pull-right" :total="total" :current="current" size="small" show-total @on-change="changePage"></Page>
		</div>

	</div>
</template>

<script>
	import { mokuaiThead } from 'common/js/table'
	import { mapMutations } from 'vuex'
	import { loadingMixin } from 'common/js/mixins'
	import { successNotice, errorNotice } from 'common/js/dom'
	import { getUserList } from 'api/mokuaiguanli'
	import { ERR_OK } from 'api/config'

	import { cloneObj, likeStrSearch } from 'common/js/util'

	export default {
		mixins: [loadingMixin],
		data() {
			return {
				loading: false,
				modal1: false,
				btnChange: false,
				btnSave: false,
				updateTitle: "",
				formInline: {
					name: '',
					level1: '',
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
				departmentNameList: [],
				bucunzai: '',
				formItem: {},
				theadArr: mokuaiThead(this)
			}
		},
		methods: {
			changePage: function(page) {

				this._getUserList(page);
			},
			cancel() {
				this.modal1 = false;
			},

			_getUserList: function(page, search) {
				this.loading = true
				getUserList(page, search).then(res => {
					console.log(res);
					if(res.code === ERR_OK) {
						this.loading = false
						this.UserData = res.result.result
						this.total = res.result.totalSize;
						this.current = res.result.page;
					}
				})
			},
			submitSearch(page) {
				let search = {};
				if(this.formInline.username) {
					search.username = likeStrSearch(this.formInline.username)
				}
				if(this.formInline.level1) {
					search.level1 = likeStrSearch(this.formInline.level1)
				}
				this._getUserList(page, search);
			}
		},
		mounted: function() {
			this._getUserList();

		}
	}
</script>