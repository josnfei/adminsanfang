<template>
	<div class="login">
		<div class="login-box">
			<div class="login-box-warpper">
				<div class="login-box-title">
					用户登录
				</div>
				<div class="login-box-content">
					<div v-show="showErro" class="verification pa">用户名或密码不正确，请重新输入</div>
					<div class="username">
						<Input v-model="info.username" size="large" placeholder="请输入账号" @on-focus="usernameFocus">
						<Icon color="#0085e1" slot="prepend" type="person" size="18"></Icon>
						</Input>
						<transition name="fade">
							<div v-show="showUsernameVer" class="verification">用户名不能为空</div>
						</transition>
					</div>
					<div class="password">
						<Input v-model="info.password" size="large" type="password" placeholder="请输入密码" @on-focus="passwordFocus">
						<Icon color="#0085e1" slot="prepend" type="locked" size="18"></Icon>
						</Input>
						<transition name="fade">
							<div v-show="showPasswordVer" class="verification">密码不能为空</div>
						</transition>
					</div>
					<div class="code">
						<Row>
							<Col span="12">
							<Input v-model="info.code" size="large" @on-focus="codeFocus" @on-enter="commit" placeholder="请输入验证码" style="width: 115px;">
							</Input>
							</Col>
							<Col span="12">
							<div class="login-code" @click="createCode" v-html="info.codeWrite"></div>
							</Col>
						</Row>
						<transition name="fade">
							<div v-show="showCodeVer" class="verification">验证码不能为空</div>
						</transition>
					</div>
					<div class="login-box-commit" @click="commit">
						<Button type="info" :loading="showLoading" long>
							<span v-if="!showLoading">登录</span>
							<span v-else>登录中...</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { goLogin } from 'api/login'
	import { setUserIng, removeAction } from 'common/js/util'
	import { getLocalStorage, successNotice, errorNotice, errorMessage } from 'common/js/dom'

	export default {
		data() {
			return {
				info: {
					username: '',
					password: '',
					code: '',
					codeWrite: ''
				},
				showErro: false,
				showUsernameVer: false,
				showPasswordVer: false,
				showCodeVer: false,
				showLoading: false
			}
		},
		created() {
			this.createCode();
		},
		methods: {
			usernameFocus() {
				this.showUsernameVer = false;
			},
			passwordFocus() {
				this.showPasswordVer = false;
			},
			codeFocus() {
				this.showCodeVer = false;
			},
			createCode() {
				this.info.codeWrite = '';
				let codeLength = 4;
				//验证码的长度
				let codeChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
					'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				];
				//所有候选组成验证码的字符，当然也可以用中文的
				for (let i = 0; i < codeLength; i++) {
					let charNum = Math.floor(Math.random() * 52);
					this.info.codeWrite += codeChars[charNum];
				}
			},
			codeWrite() { },
			commit() {
				if (this.info.code && this.info.code.toUpperCase() != this.info.codeWrite.toUpperCase()) {
					errorNotice('验证码错误', true)
					this.createCode()
					this.info.code = ''
					return
				}
				if (this.showLoading) {
					return
				}
				if (!this.info.username) {
					this.showUsernameVer = true
				}
				if (!this.info.password) {
					this.showPasswordVer = true
				}
				if (!this.info.code) {
					this.showCodeVer = true
				}
				if (this.showUsernameVer || this.showPasswordVer || this.showCodeVer) {
					return
				}
				this.showLoading = true
				goLogin({ 'username': this.info.username, 'password': this.info.password }).then(res => {
					if (res) {
						removeAction()
						this.showLoading = false
						if (res.code === '0000') {
							this.$Loading.finish();
							if (res.result.realname !== "三防综合业务管理员") {
								// this.$Message.error("非管理员没有权限进入该系统")
							}
							delete res.result.password
							setUserIng(res.result)
							this.$router.push("/home")
						}
					} else {
						this.showErro = true
						this.info.username = ''
						this.info.password = ''
						this.info.code = ''
						this.createCode();
						return
					}
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.login {
		width: 100%;
		height: 100%;
		background: url(./img/BG.png);
		background-size: cover;
		.login-box {
			width: 300px;
			height: 300px;
			position: absolute;
			top: 0;
			bottom: 0;
			right: 100px;
			margin: auto 0;
			.login-box-title {
				width: 100%;
				text-align: center;
				font-size: 20px;
				font-weight: 700;
				color: #fff;
				padding: 20px 0 15px;
			}
			.login-box-warpper {
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, .4);
				position: relative;
				.login-box-content {
					width: 240px;
					margin: 0 auto;
					.pa{
						position: absolute;
						top: 46px !important;
					}
					.username,
					.password {
						margin-bottom: 20px;
					}
					.verification {
						float: left;
						top: 38px;
						color: red;
						font-size: 12px;
					}
					.login-code {
						width: 95%;
						height: 36px;
						background-color: #dcdcdc;
						margin-left: 5%;
						letter-spacing: 3px;
						font-size: 26px;
						font-weight: bold;
						line-height: 36px;
						color: blue;
						text-align: center;
						cursor: pointer;
						user-select: none;
					}
					.login-box-commit {
						margin-top: 20px;
					}
				}
			}
		}
	}
</style>