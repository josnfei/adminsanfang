<template>
	<div class="home">
		<header class="home-header">
			<div class="logo"></div>
			<div class="header-content">
				<div class="home_nav clear">
					<ul ref="active">
						<li>
							<router-link to="/home/default">
								<div class="icon-home"></div>首页</router-link>
						</li>
						<li>
							<router-link to="/home/threeCommand">
								<div class="iconfont icon-fangxunyingjizhihui"></div>指挥一张图</router-link>
						</li>
						<li>
							<router-link to="/home/threeBusiness">
								<div class="icon-sanfangyewu"></div>三防业务</router-link>
						</li>
						<li>
							<router-link to="/home/depManagement">
								<div class="icon-department"></div>部门管理</router-link>
						</li>
						<li>
							<router-link to="/home/dailyOffice">
								<div class="icon-richangbangong"></div>日常办公</router-link>
						</li>
						<li>
							<router-link to="/home/tabSummary">
								<div class="icon-table"></div>报表汇总</router-link>
						</li>
						<li>
							<router-link to="/home/systemManagement">
								<div class="icon-guanli"></div>系统管理</router-link>
						</li>
						<li>
							<router-link to="/home/moveManagement">
								<div class="iconfont icon-yidongyingyong"></div>移动管理</router-link>
						</li>
					</ul>
				</div>
				<div class="home_right clear" @mouseover="show" @mouseout="hidden">
					<div class="downnav">
						<div class="touxiang">
							<span class="icon-yonghu"></span>
						</div>
						<span>{{username}}</span>
						<Icon type="chevron-down"></Icon>
					</div>
					<div class="downbody" v-show="disabled">
						<ul>
							<li>
								<Icon type="help-circled"></Icon>
								<span>系统帮助</span>
							</li>
							<li>
								<Icon type="ios-locked"></Icon>
								<span>修改密码</span>
							</li>
							<li @click="outLogin = true">
								<Icon type="log-out"></Icon>
								<span>安全退出</span>
								<Modal v-model="outLogin" title="退出提示" @on-ok="ok">
									<p>您确定要退出登录吗？</p>
								</Modal>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
		<section class="home-warpper">
			<router-view></router-view>
		</section>
	</div>
</template>

<script>
	import { setUserIng, getUserIng, setAction, getAction } from 'common/js/util'
	export default {
		watch: {
			'$route': function () {
				var domArr = this.$refs.active.children
				if (getAction()) {
					for (let i = 0; i < domArr.length; i++) {
						domArr[i].className = ''
					}
					domArr[getAction().first].className = 'active'
				}
			}
		},
		data() {
			return {
				disabled: false,
				username: "xxx",
				time: "",
				outLogin: false,
				domArr: []
			}
		},
		created() {
			this.time = new Date();
			this.username = getUserIng().username;
		},
		mounted() {
			var domArr = this.$refs.active.children
			if (!getAction()) {
				domArr[0].className = 'active'
				setAction({ "first": 0, "second": '', 'third': '' })
			} else {
				domArr[getAction().first].className = 'active'
			}
			for (let i = 0; i < domArr.length; i++) {
				domArr[i].onclick = function () {
					setAction({ "first": i, "second": '', 'third': '' })
					for (let j = 0; j < domArr.length; j++) {
						domArr[j].className = ''
					}
					this.className = 'active'
				}
			}
		},
		methods: {
			show() {
				this.disabled = true
			},
			hidden() {
				this.disabled = false
			},
			ok() {
				setUserIng({})
				this.$router.push('/')
			}
		}
	}
</script>
<style lang="scss">
	.home {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: auto;
		padding-top: 60px;
		.home-header {
			min-width: 1299px;
			position: absolute;
			top: 0;
			left: 0;
			padding-left: 380px;
			width: 100%;
			height: 60px;
			color: #FFFFFF;
			background-image: url(./img/bg_01.png);
			.logo {
				width: 380px;
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				background-image: url(./img/logo_03.png);
			}
			.header-content {
				width: 950px !important;
				float: right;
				>div {
					float: left;
				}
				.home_nav {
					>ul {
						>li:first-child {
							border-left: 1px solid rgb(22, 160, 235);
						}
						>li {
							border-right: 1px solid rgb(22, 160, 235);
							float: left;
							padding-top: 8px;
							height: 60px;
							width: 100px;
							text-align: center;
							font-size: 16px;
							font-weight: 300;
							>a {
								display: block;
								height: 100%;
								color: #fff;
								i {
									display: block;
									font-size: 26px;
								}
							}
						}
						>li:hover {
							background: #008cee;
						}
					}
				}
				.home_right {
					position: relative;
					width: 150px;
					height: 60px;
					text-align: center;
					line-height: 60px;
					font-size: 16px;
					a {
						color: #fff;
					}
					.downnav {
						width: 100%;
						background: #008cee;
						height: 60px;
					}
					.touxiang {
						width: 30px;
						height: 30px;
						background: #18bcff;
						border-radius: 50%;
						text-align: center;
						line-height: 30px;
						display: inline-block;
						position: relative;
						top: 7px;
					}
					.downbody {
						width: 100%;
						position: absolute;
						top: 60px;
						z-index: 1000000;
						background: #fff;
						li {
							height: 30px;
							line-height: 30px;
							font-size: 13px;
							padding: 0 15px;
							background: #e4f4ff;
							color: #303030;
							i {
								margin-right: 5px;
							}
						}
						li:hover {
							background: #fff;
						}
					}
				}
				.home_right:hover {
					background: rgba(0, 0, 0, .1);
				}
				.home-right {
					p {
						float: right;
						color: #fff;
						span {
							cursor: pointer;
						}
					}
					p:nth-of-type(1) {
						margin-right: 20px;
					}
					p:nth-of-type(2) {
						margin-right: 40px;
					}
				}
				.active {
					background: #008cee;
					a {
						color: #fff76c !important;
					}
				}
			}
		}

		.home-warpper {
			height: 100%;
			min-width: 1098px;
			/* overflow: auto; */
		}

	}
</style>