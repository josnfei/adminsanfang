<template>
	<div class="tiwei">
		<div class=title>
			<span>位置： </span>
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/home/depManagement/sanpeng">部门管理</BreadcrumbItem>
				<BreadcrumbItem>三棚数据维护</BreadcrumbItem>
			</Breadcrumb>
		</div>
			<!--搜索-->
		<Form ref="formInline" inline :label-width="80">
			<Form-item label="名称">
				<Input v-model="formInline.名称" :maxlength="16" placeholder="请输入"></Input>
			</Form-item>
			<Form-item label="建筑地址">
				<Input v-model="formInline.建筑地址" :maxlength="20" placeholder="请输入"></Input>
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
					<Button type="error" size="large" long  @click="dels">确认</Button>
				</div>
			</Modal>
		</template>
	</div>
</template>

<script>
	import { sanpengThead } from 'common/js/table'
	import { getUserList,getaddlist,geteditlist,getdellist } from 'api/sanpeng';
	import { ERR_OK } from 'api/config';
	import { successNotice, errorNotice, getLocalStorage } from 'common/js/dom';
	import { cloneObj, likeStrSearch } from 'common/js/util';
	export default {
		data() {
			return {
				loading:false,
				tableThead:sanpengThead(this),
				tableTbody:[],
				current:1,
				total:1,
				formInline:{
					名称:'',
					建筑地址:'',
				},
				modal2:false
			}
		},
		methods:{
			changePage(page) {
				this.page = page;
				this.submitsearch(page);
//				this._getuserlist(page);
			},
			_getuserlist(page,search) {
				this.loading = true
				getUserList(page,search).then(res => {
					if(res.code === ERR_OK) {
						this.loading = false
						this.tableTbody = res.result.result;
						this.total = res.result.totalSize;
					}
				})
			},
			submitsearch(page) {
				let search = {}
				if(this.formInline.名称) {
					search.名称 = likeStrSearch(this.formInline.名称);
				}
				if(this.formInline.建筑地址) {
					search.建筑地址 = likeStrSearch(this.formInline.建筑地址);
				}
				
				this._getuserlist(page,search);
			},
			add() {
				this.formItem = {
					经度:'',
					纬度:'',
					名称:'',
					类型:'',
					建筑地址:'',
					建筑用途:'',
					满负荷运行人数:'',
					房屋所有者法人代表姓名:'',
					房屋所有者法人代表电话:'',
					房屋使用人法人代表姓名:'',
					房屋使用人法人代表电话:'',
					村居委会名称:'',
					村居委主任姓名:'',
					村居委主任电话:'',
					村居委三防责任人姓名:'',
					村居委三防责任人电话:'',
					填表人:'',
					填表人联系电话:'',
					填表时间:''
				}
				getLocalStorage('id','false');
				this.$router.push('home/depManagement/sanpeng/sanpengweihu');
			},
			edit(dataObj) {
				getLocalStorage("formItemd", dataObj);
				getLocalStorage("id", dataObj._id);
				this.$router.push('home/depManagement/sanpeng/sanpengweihu')
			},
			del(row) {
				this.rowIng = cloneObj(row)
				this.modal2 = true;
			},
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
			margin: 0px;
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