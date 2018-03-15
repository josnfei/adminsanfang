<template>
	<div class="robot" v-show="showRobot">
		<!--机器人说话区域-->
		<!--<div class="robotSpeak">
			<Poptip title="提示标题" content="提示内容">
		        <Button>click 激活</Button>
		    </Poptip>
		</div>-->
		
		<!--机器人-->
		<div class="robotHome">
			<Poptip 
				v-model="showPoptip" 
				:content="poptipContent"
				@on-popper-hide="imgEnd"
				width="250px">
				<div slot="title" class="robot-poptip-title">{{poptipTitle}}</div>
				<div ref="robot" class="robotImg">
					<!--<img ref="poptip" :src="robotImg" class="robotImg"/>-->
				</div>
			</Poptip>
		</div>
	</div>
</template>

<script>
	import { Static, ERR_OK } from 'api/config';
//	import { ACTION_KEYS } from 'api/socket';
	import { createHtml } from 'common/js/dom';
//	import { mapGetters } from 'vuex';
	
	export default {
		created() {
//			this.$bus.on(ACTION_KEYS['emergency_message'], this._emergency_message);
			
			this.imgGroup = [];
			
			this.createImgGroup();
		},
//		beforeDestroy() {
//			this.$bus.off(ACTION_KEYS['emergency_message'], this._emergency_message);
//		},
		computed: {
//			...mapGetters([
//				'robotSay'
//			])
		},
		watch: {
//			robotSay(item) {
//				this.imgStart();
//				this.poptipTitle = item.title;
//				this.poptipContent = item.content;
//			}
		},
		data() {
			return {
				robotIndex: 0,
				robotImg: '',
				showRobot: false,
				showPoptip: false,
				poptipTitle: '',
				poptipContent: ''
			}
		},
		methods: {
			imgStart() {
				let time = null;
				this.showRobot = true;
				clearInterval(time);
				time = setInterval(() => {
					if (this.robotIndex > 5) {
						clearInterval(time);
						this.showPoptip = true;
						this.$refs['robot'].innerHTML = '';
						this.$refs['robot'].appendChild(this.imgGroup[this.imgGroup.length - 1])
						return;
					}
					this.$refs['robot'].innerHTML = '';
					this.$refs['robot'].appendChild(this.imgGroup[this.robotIndex]);
					this.robotIndex++;
				}, 100)
			},
			imgEnd() {
				let time = null;
				clearInterval(time);
				time = setInterval(() => {
					if (this.robotIndex < 0) {
						clearInterval(time);
						this.showRobot = false;
						this.robotIndex = 0;
						return;
					}
					this.$refs['robot'].innerHTML = '';
					this.$refs['robot'].appendChild(this.imgGroup[this.robotIndex]);
					this.robotIndex--;
				}, 100)
			},
			createImgGroup() {
				let str = 'img/robot/robot';
				this.imgGroup = [];
				for (var i = 1;i < 8;i++) {
					let img = createHtml('img');
					if (i === 7) {
						img.src = `${Static}${str}ed.gif`;
					}else {
						img.src = `${Static}${str}${i}.png`;				
					}
					this.imgGroup.push(img);
				}
			},
			_emergency_message(data) {
				if(data.code === ERR_OK) {
					let obj = {};
					let result = JSON.parse(data.result);
	//				obj['title'] = result['event'];
	//				obj['content'] = result['question'];
	//				this.SET_ROBOTSAY(obj);
					this.poptipTitle = result['event'];
					this.poptipContent = result['question'];
					this.imgStart();
				}
			}
		}
	}
</script>

<style lang="scss">
	
	.robot {
		width: 200px;
		height: 80px;
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 9999;
		.robotHome {
			width: 100%;
			height: 100%;
			background-image: url(./img/robotHome.png);
			background-size: 100% 100%;
			.ivu-poptip-popper {
				max-width: 220px;
			}
			.ivu-poptip-inner{
				background-color: #FDF3D9;
				white-space: normal;
			}
			.ivu-poptip-title:after {
				background-color: rgba(0,0,0,.6);
			}
			.ivu-poptip-arrow:after {
				border-top-color: #FDF3D9;
			}
			.robotImg {
				width: 100%;
				height: 100%;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	@media only screen and (max-width: 1025px) {
		.robot {
			width: 150px;
			height: 60px;
		}
	}
</style>
