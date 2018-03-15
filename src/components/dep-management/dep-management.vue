<template>
	<div class="mangerment">
		<aside>
			<Menu :theme="theme2" active-name="multiple" :open-names="opName" @on-select="clickFn" @on-open-change="changeOpen">
				<!-- <Submenu name="1">
					<template slot="title">
						<Icon type="ios-paper"></Icon>
					</template>
					<MenuItem v-for="i in items" @click="clickFn(i.link)" :name="i.link" :key="i.link" style="cursor:pointer">{{i.name}}</MenuItem>
				</Submenu> -->

				<!--单个，没有下拉框  -->
				<MenuItem v-for="i in itemd" :key="i.link" @click="clickFn('i.link')" :name="i.link">
				<span :class="i.icon"></span> {{i.name}}
				</MenuItem>
				
				<!--数据维护  -->
				<Submenu name="1">
					<template slot="title">
						<span class="iconfont icon-iconset0357"></span> 部门数据维护
					</template>
					<MenuItem v-for="i in itemx" @click="clickFn(i.link)" :name="i.link" :key="i.link" style="cursor:pointer">{{i.name}}</MenuItem>
				</Submenu>
				<Submenu name="2">
					<template slot="title">
						<span class="iconfont icon-tianjiashangbao"></span> 部门数据上报
					</template>
					<MenuItem v-for="i in items" @click="clickFn(i.link)" :name="i.link" :key="i.link" style="cursor:pointer">{{i.name}}</MenuItem>
				</Submenu>
			</Menu>
		</aside>
		<section>
			<router-view></router-view>
		</section>
	</div>
</template>

<script>
	import { setAction, getAction } from 'common/js/util'
	import { getLocalStorage, getSessionStorage } from 'common/js/dom'
	export default {
		data() {
			return {
				opName:[],
				theme2: 'light',
				itemx: [{
						name: '学校数据维护',
						link: 'school'
					}, {
						name: '水库数据维护',
						link: 'shuiku'
					}, {
						name: '山塘数据维护',
						link: 'hillpool'
					},
					{
						name: '险段数据维护',
						link: 'derstam'
					}, {
						name: '堤围数据维护',
						link: 'tiwei'
					}, {
						name: '江心洲数据维护',
						link: 'jiangxin'
					}, {
						name: '户外立式广告牌',
						link: 'waitandi'
					}, {
						name: '堤上在建工程',
						link: 'tishan'
					}, {
						name: '穿堤管道',
						link: 'ctgd'
					}, {
						name: '码头数据维护',
						link: 'matou'
					}, {
						name: '桥梁数据维护',
						link: 'qiaoliang'
					}, {
						name: '景点数据维护',
						link: 'jingdian'
					}, {
						name: '三棚数据维护',
						link: 'sanpeng'
					}, {
						name: '电力数据维护',
						link: 'dl'
					}, {
						name: '建筑工地维护',
						link: 'gongdi'
					},{
						name:'危险化学品',
						link:'weixians'
					},{
						name:'重要通信设备',
						link:'zhongysb'
					},{
						name:'危房基本信息维护',
						link:'weifang'
					},{
						name:'物资仓库信息维护',
						link:'cangku'
					},{
						name:'气象站信息维护',
						link:'qixiang'
					}
				],
				items: [{
					name: '上报预设',
					link: 'deplist'
				}, {
					name: '上报录入',
					link: 'Employment'
				}, {
					name: '表单查看',
					link: 'Listsean'
				}],
				itemd: [{
					name: '部门系统定义',
					link: 'definition',
					icon: 'iconfont icon-xitongcaidan'
				}, {
					name: '部门指令库管理',
					link: 'Library',
					icon: 'iconfont icon-zhilingmobanguanli'
				}]
			}
		},
		methods: {
			clickFn: function(name) {
				this.$router.push('/home/depManagement/' + name);
			},
			changeOpen() {
				var obj = getAction()
				obj.opName = name
				setAction(obj)
			}
		},
		mounted() {
			
		}
	}
</script>
<style scoped lang="scss">
	.mangerment {
		width: 100%;
		height: 100%;
		background-color: #e4f5ff;
		padding-left: 200px;
		position: relative;
		aside {
			position: absolute;
			top: 0;
			left: 0;
			width: 200px;
			height: 100%;
			margin-right: 10px;
			background-size: cover;
			 background-color: #e4f5ff; 
			/* color: #fff; */
		}
		.ivu-menu-light {
			background: transparent;
			width: 200px !important;
		}
		section {
			background: #fff;
			width: 100%;
			height: 100%;
			padding: 10px;
			padding-top: 60px;
			position: relative;
			overflow: auto;
			.title {
				position: absolute;
				top: 10px;
				left: 10px;
				font-size: 20px;
				color: #333;
				margin-bottom: 10px;
				img {
					width: 23px;
					height: 20px;
					transform: rotate(90deg);
					vertical-align: middle;
					margin-right: 10px;
				}
			}
			.table {
				width: 100%;
				margin-bottom: 20px;
			}
		}
	}
</style>