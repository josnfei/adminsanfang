<template>
	<div class="systemManahement">
		 <aside>
			<Menu active-name="1-1" :open-names="['1']">
				<div class="ivu-menu-submenu-title" @click="clickFn('usermanage')">
				<span class="iconfont icon-yonghuguanli"></span>
          <span v-bind:class="{ yellow: user2}">用户管理</span>
        </div>
					<div class="ivu-menu-submenu-title" @click="clickFn('rolemanage')">
					<span class="iconfont icon-jiaoseguanli"></span>
          <span v-bind:class="{ yellow: role2}">角色管理</span>
        </div>
				<div class="ivu-menu-submenu-title" @click="clickFn('mokuaiguanli')">
				<span class="iconfont icon-mokuaiguanli"></span>
          <span v-bind:class="{ yellow: role}">模块管理</span>
        </div>
			<div class="ivu-menu-submenu-title" @click="clickFn('bumenlist')">
			<span class="iconfont icon-bumen"></span>
          <span v-bind:class="{ yellow: role3}">部门列表</span>
        </div>
			</Menu>
		</aside> 

		<section>
			<router-view></router-view>
		</section>
	</div>
</template>

<script>
// import sideNav from './sideNav'
	export default {
		data() {
			return {
				user1: false,
				user2: true,
				role1: true,
				role2: false,
				role: true,
				role: false,
				role3: true,
				role3: false
			}
		},
		// components:{
		// 	'side-nav':sideNav
		// },
		methods: {
			clickFn: function (name) {
				this.$router.push('/home/systemManagement/' + name);
				if (name === 'usermanage') {
					this.user1 = false;
					this.user2 = true;
					this.role1 = true;
					this.role2 = false;
					this.role = true;
					this.role = false;
					this.role3 = true;
					this.role3 = false;
					return;
				}
				if (name === 'rolemanage') {
					this.user1 = true;
					this.user2 = false;
					this.role1 = false;
					this.role2 = true;
					this.role = true;
					this.role = false;
					this.role3 = true;
					this.role3 = false;
					return;
				}
				if (name === 'mokuaiguanli') {
					this.user1 = true;
					this.user2 = false;
					this.role1 = true;
					this.role2 = false;
					this.role = false;
					this.role = true;
					this.role3 = true;
					this.role3 = false;
					return;
				}
				if (name === 'bumenlist') {
					this.user1 = true;
					this.user2 = false;
					this.role1 = true;
					this.role2 = false;
					this.role = true;
					this.role = false;
					this.role3 = false;
					this.role3 = true;
					return;
				}
			}
		}
	}
</script>
<style scoped lang="scss">
		 .systemManahement {
		width: 100%;
		height: 100%;
		background-color: #f2f2f2;
		// padding-top: 10px;
		padding-left: 200px;
		position: relative;
		} 
	aside {
			position: absolute;
			top: 0px;
			left: 0;
			width: 200px;
			height: 100%;
			margin-right: 10px;
			background-size: cover;
			// background-color:#41b0ff;
			// color:#fff;
		}
		.ivu-menu-light {
				background: transparent;
				width: 200px !important;
			}
		section {
			background: #fff;
			width: 100%;
			height: 100%;
			/* border: 1px solid #000; */
			padding: 10px;
			padding-top: 20px;
			position: relative;
			/* .title {
				position: absolute;
				top: 10px;
				left: 10px;
				font-size: 20px;
				color: #333;
				margin-bottom: 10px;
			}
			.table{
				width: 100%;
				height: 100%;
				border: 1px solid #000;
			} */
		}
		.ivu-menu .ivu-menu-light .ivu-menu-vertical{
			color:#fff;
		}

</style>