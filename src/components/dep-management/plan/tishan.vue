<template>
	<div class="tiwei">
		<div class=title>
			<span>位置： </span>
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/home/depManagement/tishan">部门管理</BreadcrumbItem>
				<BreadcrumbItem>堤山数据维护</BreadcrumbItem>
			</Breadcrumb>
		</div>
			<!--搜索-->
		<Form ref="formInline" inline :label-width="80">
			<Form-item label="工程名称">
				<Input v-model="formInline.工程名称" :maxlength="16" placeholder="请输入"></Input>
			</Form-item>
			<Form-item label="地理位置">
				<Input v-model="formInline.地理位置" :maxlength="16" placeholder="请输入"></Input>
			</Form-item>
			<Form-item label="所在河道">
				<Input v-model="formInline.所在河道" :maxlength="16" placeholder="请输入"></Input>
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
	import { tishanThead } from 'common/js/table'
	import { getUserList,getaddlist,geteditlist,getdellist } from 'api/tishan';
	import { ERR_OK } from 'api/config';
	import { successNotice, errorNotice, getLocalStorage } from 'common/js/dom';
	import { cloneObj, likeStrSearch } from 'common/js/util';
	export default {
		data() {
			return {
				loading:false,
				tableThead:tishanThead(this),
				tableTbody:[],
				current:1,
				total:1,
				formInline:{
					工程名称:'',
					地理位置:'',
					所在河道:''
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
				if(this.formInline.工程名称) {
					search.工程名称 = likeStrSearch(this.formInline.工程名称);
				}
				if(this.formInline.地理位置) {
					search.地理位置 = likeStrSearch(this.formInline.地理位置);
				}
				if(this.formInline.所在河道) {
					search.所在河道 = likeStrSearch(this.formInline.所在河道);
				}
				this._getuserlist(page,search);
			},
			add() {
				this.formItem = {
					工程名称:'',
					所在河道:'',
					所在堤围:'',
					地理位置:'',
					lat:'',
					lng:'',
					桩号:'',
					施工许可证批准文号:'',
					施工单位:'',
					监理单位:'',
					开工日期:'',
					'施工工期(天)':'',
					建设单位:'',
					行业归口部门:'',
					工程性质:'',
					破堤施工情况:'',
					复堤时间:'',
					防洪评价:{
						是否进行过防洪评价:'',
						时间:'',
						主要结论:'',
						补救措施落实情况:''
					},
					防汛行政责任人:{
						姓名:'',
						单位:'',
						职务:'',
						电话:''
					},
					防汛技术责任人:{
						姓名:'',
						单位:'',
						职务:'',
						电话:''
					},
					管理单位负责人:{
						姓名:'',
						单位:'',
						职务:'',
						电话:''
					},
					防洪预案是否编制:'',
					群众转移方案是否编制:'',
					'其他相关预案(名称)':'',
					抢险队伍:{
						'人数（人）':'',
						负责人姓名:'',
						负责人电话:'',
						联系人姓名:'',
						联系人姓名:''
					},
					防汛抢险物资储备现状情况:{
						'袋类（条）':'',
						'土工布（m²）':'',
						'砂石(m³)':'',
						'块石（m³）':'',
						'救生衣(件)':'',
						'存放点与工程距离（m）':''
					},
					填表人:'',
					联系电话:'',
					填表时间:'',
					审核人:'',
					复核人:''
				}
				getLocalStorage('id','false');
				this.$router.push('home/depManagement/tishan/tishanweihu');
			},
			edit(dataObj) {
				getLocalStorage("formItemd", dataObj);
				getLocalStorage("id", dataObj._id);
				this.$router.push('home/depManagement/tishan/tishanweihu')
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
					console.log(res)
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