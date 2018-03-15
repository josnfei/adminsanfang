<template>
	<div class="three-business">
		<aside>
			<Menu :theme="theme" :active-name="acName" :open-names="opName" @on-select="changeActive" @on-open-change="changeOpen">
				<Submenu name="1">
					<template slot="title">
						<span class="iconfont icon-yingjiyuan">
							<span class="path1"></span>
							<span class="path2"></span>
						</span>
						预案管理
					</template>
					<router-link to="/home/threeBusiness/threeBusinessDefault">
						<MenuItem name="1-1">部门预案</MenuItem>
					</router-link>
					<router-link to="/home/threeBusiness/threeBusinessCommunity">
						<MenuItem name="1-2">社区预案</MenuItem>
					</router-link>
					<router-link to="/home/threeBusiness/threeBusinessTopic">
						<MenuItem name="1-3">专题预案</MenuItem>
					</router-link>
					<router-link to="/home/threeBusiness/threeBusinessApproval">
						<MenuItem name="1-4">预案审批</MenuItem>
					</router-link>
				</Submenu>
				<Submenu name="2">
					<template slot="title">
						<span class="iconfont icon-fuwurenwuguanli">
							<span class="path1"></span>
							<span class="path2"></span>
						</span>
						演练管理
					</template>
					<router-link to="/home/threeBusiness/prPlan">
						<MenuItem name="2-1">演练计划</MenuItem>
					</router-link>
					<router-link to="/home/threeBusiness/prTask">
						<MenuItem name="2-2">演练任务</MenuItem>
					</router-link>
					<router-link to="/home/threeBusiness/prRole">
						<MenuItem name="2-3">演练角色</MenuItem>
					</router-link>
					<router-link to="/home/threeBusiness/prData">
						<MenuItem name="2-4">初始化数据</MenuItem>
					</router-link>
					<router-link to="/home/threeBusiness/prReport">
						<MenuItem name="2-5">演练报告</MenuItem>
					</router-link>
				</Submenu>
				<Submenu name="3">
					<template slot="title">
						<span class="iconfont icon-renwuguanli">
							<span class="path1"></span>
							<span class="path2"></span>
						</span>
						任务管理
					</template>
					<router-link to="/home/threeBusiness/psTask">
						<MenuItem name="3-1">预设任务</MenuItem>
					</router-link>
					<router-link to="/home/threeBusiness/magTask">
						<MenuItem name="3-2">任务管理</MenuItem>
					</router-link>
				</Submenu>
				<Submenu name="4">
					<template slot="title">
						<span class="iconfont icon-jinggao">
							<span class="path1"></span>
							<span class="path2"></span>
						</span>
						应急响应
					</template>
					<router-link to="/home/threeBusiness/erManagement">
						<MenuItem name="4-1">应急响应管理</MenuItem>
					</router-link>
					<router-link to="/home/threeBusiness/erLevel">
						<MenuItem name="4-2">应急响应级别</MenuItem>
					</router-link>
					<router-link to="/home/threeBusiness/erCard">
						<MenuItem name="4-3">联合值守看板</MenuItem>
					</router-link>
				</Submenu>
			</Menu>
		</aside>
		<section>
			<div class="content">
				<router-view></router-view>
			</div>
		</section>
	</div>
</template>

<script>
	import { setAction, getAction } from 'common/js/util'
	import { getLocalStorage, getSessionStorage } from 'common/js/dom'
	export default {
		data() {
			return {
				theme: 'light',
				acName: "",
				opName: []
			}
		},
		created() {
			if (!getAction().third) {
				this.acName = '1-1'
				this.opName = ['1']
			} else {
				this.acName = getAction().third
				this.opName = getAction().opName
			}
		},
		methods: {
			changeActive(name) {
				// location.reload()
				if (name === '1-1') {
					getSessionStorage('name', 'erp')
				} else if (name === '1-2') {
					getSessionStorage('name', 'comp')
				} else if (name === '1-3') {
					getSessionStorage('name', 'top')
				}
				var obj = getAction()
				obj.third = name
				setAction(obj)
			},
			changeOpen(name) {
				var obj = getAction()
				obj.opName = name
				setAction(obj)
			}
		}
	}
</script>
<style scoped lang="scss">
	.three-business {
		width: 100%;
		height: 100%;
		background-color: #f2f2f2;
		padding-left: 200px;
		position: relative;
		aside {
			position: absolute;
			top: 0px;
			left: 0;
			width: 200px;
			height: 100%;
			background-color: #e4f5ff;
			margin-right: 10px;
			background-size: cover;
			.ivu-menu-submenu {
				.ivu-menu-submenu-title {
					padding-left: 43px;
				}
				position: relative;
				.icon {
					position: absolute;
					font-size: 28px;
					top: 10px;
					left: 14px;
				}
			}
			.ivu-menu-light {
				background: transparent;
				width: 200px !important;
			}
		}
		section {
			background: #fff;
			overflow: auto;
			width: 100%;
			height: 100%;
			padding: 10px;
			padding-top: 60px;
			position: relative;
			.content {
				width: 100%;
				height: 100%;
				min-width: 1000px;
				overflow: hidden;
			}
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