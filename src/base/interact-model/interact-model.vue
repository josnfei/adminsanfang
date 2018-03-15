/* 可移动信息框
* @ 劳兆城 
* @ 2017-08-30*/

<template>
	<transition name="animate-box">
		<div class="interact-model" ref="interact-model" v-show="show">
			<div 
				class="interact-model-header" 
				ref="interact-model-header"
				@mousedown="boxDown">
				<div class="title">{{title}}</div>
				<div 
					class="close" 
					@click="hideModel" 
					@mousedown.stop>&times;</div>
			</div>
			<div class="interact-model-content">
				<slot></slot>				
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			isCancel: {
				type: Boolean,
				default: false
			},
			isInteract: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				show: false
			}
		},
		methods: {
			showModel() {
				this.show = true
			},
			hideModel() {
				this.show = false
				if (!this.isCancel) {
					return
				}
				this.$emit('cancel')
			},
			boxDown(event) {
				if(!this.isInteract) {
					return
				}
				let div = this.$refs['interact-model']
				let divW = div.offsetWidth
				let divH = div.offsetHeight
				let parentW = div.offsetParent.offsetWidth
				let parentH = div.offsetParent.offsetHeight
				let startX = event.clientX - div.offsetLeft
				let startY = event.clientY - div.offsetTop
				document.onmousemove = (event) => {
					let X = event.clientX - startX
					let Y = event.clientY - startY
					if(X < 0) {
						X = 0
					}
					
					if(X + divW > parentW) {
						X = parentW - divW
					}
					
					if(Y < 0) {
						Y = 0
					}
					
					if(Y + divH > parentH) {
						Y = parentH - divH
					}
					div.style.margin = 0 
					div.style.left = `${X}px`
					div.style.top = `${Y}px`
				}
				document.onmouseup = (e) => {
					document.onmousemove = null
				}
			}
		}
	}
</script>

<style scoped lang="scss">

	// @import url("~common/less/color.less");
	
	.interact-model {
		position: absolute;
		z-index: 100;
		background-color: #F7F6F6;
		border-radius: 5px 5px 0 0;
		overflow: hidden;
		user-select: none;
		.interact-model-header {
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			background-color: #008cee;
			color: white;
			font-size: 14px;
			border-radius: 5px 5px 0 0;
			position: relative;
			.title {
				cursor: default;
			}
			.close {
				position: absolute;
				font-size: 21px;
				right: 16px;
				top: -1px;
				cursor: pointer;
			}
			.close:hover {
				color: #999;
			}
		}
		.interact-model-content {
			width: 100%;
			height: e('calc(100% - 40px)');
			position: relative;
			border: 1px solid #dddee1;
			border-top: none;
		}
	}
	.animate-box-enter-active,
	.animate-box-leave-active {
		transition: all .4s;
	}
	
	.animate-box-enter,
	.animate-box-leave-to {
		transform: scale(.8);
		opacity: 0;
	}
</style>