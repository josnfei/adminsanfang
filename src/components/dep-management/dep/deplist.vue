<template>
	<div class="deplist">
		<div class=titles>
			<span>位置： </span>
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/home/depManagement/deplist">部门管理</BreadcrumbItem>
			<BreadcrumbItem>上报预设</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<!--搜索  -->
		<Form ref="formInline" inline :label-width="80">
			<Form-item label="表单名称">
				<Input v-model="formInline.form_name" :maxlength="16" placeholder="请输入表单数据名称"></Input>
			</Form-item>
			<div class='searchBtn'><Button type="ghost" shape="circle" icon="ios-search" @click="submitsearch(1)"></Button></div>
			<div class="add pull-right" @click="addlist">
				<Button type="primary"><span class="icon-xinzeng"></span>新增</Button>
			</div>
		</Form>
		<template slot="content">
			<Modal v-model="modal2" width="360">
				<p slot="header" style="color:#f60;text-align:center">
					<Icon type="information-circled"></Icon>
					<span>删除</span>
				</p>
				<div style="text-align:center">
					<p>确认删除？</p>
				</div>
				<div slot="footer">
					<Button type="error" size="large" long :loading="modal_loading" @click="_getDelList">确认</Button>
				</div>
			</Modal>
		</template>
		
		<div class="center">
			<Table :loading="loading" border stripe size="small" highlight-row :columns="tableThead" :data="tableTbody"></Table>
			<div class="page pull-right">
				<Page :total="total" :current="current" show-total @on-change="changePage" ></Page>
			</div>
		</div>
		
	</div>
</template>
<script>
	import { getUserList, getDelList } from 'api/deplist'
	import { deplistThead } from 'common/js/table'
	import { mapMutations } from 'vuex'
	import { ERR_OK } from 'api/config'
	import { successNotice, errorNotice, getLocalStorage } from 'common/js/dom'
	import { cloneObj, likeStrSearch } from 'common/js/util'
	export default {
		data() {
			return {
				loading:false,
				modal2: false,
				modal_loading: false,
				tableThead: deplistThead(this),
				tableTbody: [],
				total: 2000,
				current: 1,
				formInline: {
					department_name: "",
					form_name: ""
				}
			}
		},
		methods: {
			// 列表
			_getUserList(page, search) {
				this.loading = true
				getUserList(page, search).then(res => {
					if(res.code === ERR_OK) {
						this.loading = false
						this.tableTbody = res.result.result;
						this.total = res.result.totalSize
					}
				})
			},
			// 页码
			changePage: function(page) {
				this.page = page;
				this.submitsearch(page);
//				this._getUserList(page);
			},
			// 按新增跳转到另外一个页面
			addlist() {
				//将id设置为false
				getLocalStorage('id', 'false')
				this.$router.push('/home/depManagement/deplist/addpage')
			},
			// 点击编辑时候跳转到另一个页面
			edit(dataObj) {
				//将id存入。可以到编辑的那个页面取出来
				getLocalStorage("id", dataObj._id);
				this.$router.push('/home/depManagement/deplist/addpage')
			},
			// 删除
			del(row) {
				this.rowIng = cloneObj(row);
				this.modal2 = true;
			},
			// 删除成功
			_getDelList() {
				let data = {
					_ids: this.rowIng._id
				}
				getDelList(this.rowIng._id).then(res => {
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '删除成功'
						});
					}
					this._getUserList();
					this.modal2 = false;
				})
			},
			// 搜索
			submitsearch(page) {
				let search = {};
				if(this.formInline.department_name) {
					search.department_name = likeStrSearch(this.formInline.department_name)
				}
				if(this.formInline.form_name) {
					search.form_name = likeStrSearch(this.formInline.form_name)
				}
				this._getUserList(page, search);
			}
		},
		mounted() {
			this._getUserList();
			this.rowIng = {};
		}
	}
</script>
<style scoped lang="scss">
	.deplist {
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