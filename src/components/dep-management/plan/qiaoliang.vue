<template>
	<div class="tiwei">
		<div class=title>
			<span>位置： </span>
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/home/depManagement/qiaoliang">部门管理</BreadcrumbItem>
				<BreadcrumbItem>桥梁数据维护</BreadcrumbItem>
			</Breadcrumb>
		</div>
			<!--搜索-->
		<Form ref="formInline" inline :label-width="80">
			<Form-item label="桥梁名称">
				<Input v-model="formInline.桥梁名称" :maxlength="16" placeholder="请输入"></Input>
			</Form-item>
			<Form-item label="所在河道">
				<Input v-model="formInline.所在河道" :maxlength="16" placeholder="请输入"></Input>
			</Form-item>
			<Form-item label="主管部门">
				<Input v-model="formInline.主管部门" :maxlength="16" placeholder="请输入"></Input>
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
	import { qiaoliangThead } from 'common/js/table'
	import { getUserList,getaddlist,geteditlist,getdellist } from 'api/qiaoliang';
	import { ERR_OK } from 'api/config';
	import { successNotice, errorNotice, getLocalStorage } from 'common/js/dom';
	import { cloneObj, likeStrSearch } from 'common/js/util';
	export default {
		data() {
			return {
				loading:false,
				tableThead:qiaoliangThead(this),
				tableTbody:[],
				current:1,
				total:1,
				formInline:{
					桥梁名称:'',
					所在河道:'',
					主管部门:''
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
				if(this.formInline.桥梁名称) {
					search.桥梁名称 = likeStrSearch(this.formInline.桥梁名称);
				}
				if(this.formInline.所在河道) {
					search.所在河道 = likeStrSearch(this.formInline.所在河道);
				}
				if(this.formInline.主管部门) {
					search.主管部门 = likeStrSearch(this.formInline.主管部门);
				}
				this._getuserlist(page,search);
			},
			add() {
				this.formItem = {
					桥梁名称:'',
					所在河道:'',
					'长度(m)':'',
					'防洪标准（重现期）':'',
					lat:'',
					lng:'',
					'建设时间（年）':'',
					使用年限:'',
					管理单位:'',
					主管部门:'',
					管理单位行政区划:'',
					管理单位负责人:{
						姓名:'',
						职务:'',
						电话:''
					},
					桥梁等级:'',
					结构型式:'',
					用途:'',
					桥梁左岸信息:{
						位置:'',
						所在堤围:'',
						'所在桩号(m)':'',
						'位于堤围上桥墩的数量(个)':'',
						'跨越堤围处净空（m）':''
					},
					桥梁右岸信息:{
						位置:'',
						所在堤围:'',
						'所在桩号(m)':'',
						'位于堤围上桥墩的数量(个)':'',
						'跨越堤围处净空（m）':''
					},
					防洪评价:{
						是否进行过防洪评价:'',
						时间:'',
						主要结论:'',
						补救措施落实情况:''
					},
					填表人:'',
					联系电话:'',
					填表时间:'',
					审核人:'',
					复核人:''
				}
				getLocalStorage('id','false');
				this.$router.push('home/depManagement/qiaoliang/qiaoliangweihu');
			},
			edit(dataObj) {
				getLocalStorage("formItemd", dataObj);
				getLocalStorage("id", dataObj._id);
				this.$router.push('home/depManagement/qiaoliang/qiaoliangweihu')
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