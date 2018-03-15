<template>
	<div class="daily-office">
		<aside>
			<Menu :theme="theme" :active-name="acName" :open-names="opName" @on-select="changeActive">
				<MenuItem v-for="(item,index) in dataArr" :key="index" :name="item.name">
				<span :class="item.icon"></span>
				{{item.text}}
				</MenuItem>
				<div>
					<!-- <Submenu v-for="(item1,index) in downArr" :key="index" :name="item1.name">
						<template slot="title">
							<span :class="item1.icon"></span>
							{{item1.text}}
						</template>
						<MenuItem v-for="(i,index1) in item1.children" :key="index1" :name="i.name">{{i.text}}</MenuItem>
					</Submenu> -->
				</div>
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
				opName: [],
				dataArr: [
					{
						text: '通讯录管理',
						name: '1',
						path: '/home/dailyOffice/addressBook',
						icon: 'iconfont icon-tongxunlu'
					},
					{
						text: '通知公告',
						name: '2',
						path: '/home/dailyOffice/notice',
						icon: 'iconfont icon-tongzhigonggao1'
					},
					{
						text: '资料管理',
						name: '3',
						path: '/home/dailyOffice/dataManagement',
						icon: 'iconfont icon-tiaochaziliaoguanli'
					},
					{
						text: '短信管理',
						name: '4',
						path: '/home/dailyOffice/noteManagement',
						icon: 'iconfont icon-duanxin'
					},
					{
						text: '专题信息订阅',
						name: '5',
						path: '/home/dailyOffice/thematicInformation',
						icon: 'iconfont icon-dingyue1'
					},
					{
						text: '公文收发',
						name: '6',
						path: '/home/dailyOffice/addressee',
						icon: 'iconfont icon-ai-briefcase'
					}
				],
				downArr: [
					{
						text: '公文收发',
						name: '6',
						icon: 'iconfont icon-ai-briefcase',
						children: [
							{
								text: '收文处理',
								name: '6-1',
								path: '/home/dailyOffice/addressee'
							}, {
								text: '写公文',
								name: '6-2',
								path: '/home/dailyOffice/post'
							}
						]
					}
				]
			}
		},
		created() {
			if (!getAction().third) {
				this.acName = '1'
			} else {
				this.acName = getAction().third
			}
		},
		methods: {
			changeActive(name) {
				let index = this.dataArr.findIndex(item => {
					return item.name === name
				})
				if (index === -1) {
					let obj = {}
					this.downArr.map(item => {
						item.children.map(i => {
							if(i.name === name){
								obj = i
							}
						})
					})
					this.$router.push(obj.path)
				} else {
					this.$router.push(this.dataArr[index].path)
				}
				var obj = getAction()
				obj.third = name
				getSessionStorage('name', 'top')
				setAction(obj)
			}
		}
	}
</script>
<style lang="scss">
	.daily-office {
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
				overflow: auto;
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