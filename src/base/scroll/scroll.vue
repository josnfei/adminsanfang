/*
 	author: 'Laozhaocheng',
 	desc: '这个自定义滚动条，必须配合Vuex里bodySize运行，否则会失败'
 */

<template>
	<div 
		class="scroll" 
		:class="{'Yscroll': direction === 'y', 'Xscroll': direction === 'x'}"
		ref="scroll">
		<div 
			class="scroll-warpper" 
			ref="scroll-warpper">
			<slot></slot>			
		</div>
		<div 
			v-show="showScroll"
			class="scroll-box"
			ref="scroll-box">
			<div 
				class="scroll-move" 
				ref="scroll-move" 
				@mousedown="scrollDown"
				@mouseenter="scrollEnter"
				@mouseleave="scrollLeave"></div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import { prefixStyle } from 'common/js/dom';
	
	const userSelect = prefixStyle('user-select');
	
	export default {
		props: {
			data: {
				//告诉滚动条,当什么数据更新时， refresh滚动条
				type: Array,
				default: () => {
					return []
				}
			},
			width: {
				//滚动条宽度
				type: String,
				default: '15'
			},
			bgColor: {
				//滚动条背景颜色
				type: String,
				default: 'white'
			},
			color: {
				//滚动条颜色
				type: String,
				default: 'red'
			},
			hoverColor: {
				//滚动条颜色，鼠标移入时颜色
				type: String,
				default: ''
			},
			isNeedPad: {
				//是否需要padding撑开，做表格时，填入false
				type: Boolean,
				default: true
			},
			customInitScroll: {
				//是否需要自定义初始化滚动条，用于异步操作
				type: Boolean,
				default: false
			},
			direction: {
				//滚动条位置，X轴或Y轴，目前不支持，X和Y轴同时开放
				type: String,
				default: 'y'
			}
		},
		computed: {
			...mapGetters([
				'bodySize'
			])
		},
		watch: {
			bodySize() {
				this.onResize();
			},
			data(newVal) {
				setTimeout(() => {
					this.onResize();		
				}, 20)
			}
		},
		mounted() {
			setTimeout(() => {
				if(!this.customInitScroll) {
					this.initScroll();
				}
				this.onmouseWheel(this.$refs['scroll'], this.scrollWheel)
			}, 20)
		},
		data() {
			return {
				showScroll: false	
			}
		},
		methods: {
			onResize() {
				if(
					this.scroll === undefined ||
					this.scrollWarpper === undefined ||
					this.scrollBox === undefined ||
					this.scrollMove === undefined 
				) {
					return
				}
				
				if(this.direction === 'x') {
					this.scrollMove.style.left = ''
					this.scrollWarpper.style.left = ''
				}else {
					this.scrollMove.style.top = ''
					this.scrollWarpper.style.top = ''
				}
				this.initScroll()
			},
			scrollToStart() {
				if(this.direction === 'x') {
					this.scrollMove.style.left = ''
					this.scrollWarpper.style.left = ''
				}else {
					this.scrollMove.style.top = ''
					this.scrollWarpper.style.top = ''
				}
			},
			scrollToEnd() {
				if(this.direction === 'x') {
					let X = this.scroll.offsetWidth - this.scrollMove.offsetWidth
				
					this.scrollMove.style.left = `${X}px`
					this.scrollWarpper.style.left = `${-X / (this.sW / this.swW)}px`
				}else {
					let Y = this.scroll.offsetHeight - this.scrollMove.offsetHeight
				
					this.scrollMove.style.top = `${Y}px`
					this.scrollWarpper.style.top = `${-Y / (this.sH / this.swH)}px`
				}
			},
			scrollDown(event) {
				if(!this.showScroll) {
					return
				}
				if(this.direction === 'x') {
					let startX = event.clientX - this.scrollMove.offsetLeft
					document.onmousemove = (event) => {
						document.getElementsByTagName('html')[0].style[userSelect] = 'none'
						document.getElementsByTagName('html')[0].style['cursor'] = 'default'
						
						this.scrollEnter()
						
						let X = event.clientX - startX
						
						if (X < 0) {
							X = 0
						}
						
						if (X > this.scroll.offsetWidth - this.scrollMove.offsetWidth) {
							X = this.scroll.offsetWidth - this.scrollMove.offsetWidth
						}
						
						this.scrollMove.style.left = `${X}px`
						this.scrollWarpper.style.left = `${-X / (this.sW / this.swW)}px`
					}
					document.onmouseup = () => {
						this.scrollLeave()
						document.getElementsByTagName('html')[0].style[userSelect] = ''
						document.getElementsByTagName('html')[0].style['cursor'] = ''
						document.onmousemove = null
					}
				}else {
					let startY = event.clientY - this.scrollMove.offsetTop
					document.onmousemove = (event) => {
						document.getElementsByTagName('html')[0].style[userSelect] = 'none'
						document.getElementsByTagName('html')[0].style['cursor'] = 'default'
						
						this.scrollEnter()
						
						let Y = event.clientY - startY
						
						if (Y < 0) {
							Y = 0
						}
						
						if (Y > this.scroll.offsetHeight - this.scrollMove.offsetHeight) {
							Y = this.scroll.offsetHeight - this.scrollMove.offsetHeight
						}
						
						this.scrollMove.style.top = `${Y}px`
						this.scrollWarpper.style.top = `${-Y / (this.sH / this.swH)}px`
					}
					document.onmouseup = () => {
						this.scrollLeave()
						document.getElementsByTagName('html')[0].style[userSelect] = ''
						document.getElementsByTagName('html')[0].style['cursor'] = ''
						document.onmousemove = null
					}
				}
			},
			scrollWheel(event, down) {
				if(!this.showScroll) {
					return
				}
				let wheel = (event.wheelDelta / 120) ||  -(event.detail / 3)
				
				if(this.direction === 'x') {
					let smL = this.scrollMove.offsetLeft
					let swL = this.scrollWarpper.offsetLeft
					
					let smX = smL - wheel * 20
					let swX = swL + (wheel * 20) / (this.sW / this.swW)
					
					if (smX < 0) {
						smX = 0
					}
					
					if (smX > this.scroll.offsetWidth - this.scrollMove.offsetWidth) {
						smX = this.scroll.offsetWidth - this.scrollMove.offsetWidth
					}
					
					if(swX < this.sW - this.swW) {
						swX = this.sW - this.swW
					}
					
					if(swX > 0) {
						swX = 0
					}
					
					
					this.scrollMove.style.left = `${smX}px`
					this.scrollWarpper.style.left = `${swX}px`
				}else {
					let smT = this.scrollMove.offsetTop
					let swT = this.scrollWarpper.offsetTop
					
					let smY = smT - wheel * 20
					let swY = swT + (wheel * 20) / (this.sH / this.swH)
					
					if (smY < 0) {
						smY = 0
					}
					
					if (smY > this.scroll.offsetHeight - this.scrollMove.offsetHeight) {
						smY = this.scroll.offsetHeight - this.scrollMove.offsetHeight
					}
					
					if(swY < this.sH - this.swH) {
						swY = this.sH - this.swH
					}
					
					if(swY > 0) {
						swY = 0
					}
					
					this.scrollMove.style.top = `${smY}px`
					this.scrollWarpper.style.top = `${swY}px`
				}
			},
			scrollEnter() {
				if(!this.hoverColor) {
					return
				}
				this.scrollMove.style.backgroundColor = this.hoverColor
			},
			scrollLeave() {
				if(!this.hoverColor) {
					return
				}
				this.scrollMove.style.backgroundColor = this.color
			},
			onmouseWheel(obj, cbfn) { //鼠标滚轮兼容事件
				var down = true;
				if(window.navigator.userAgent.indexOf("Firefox") > -1) {
					obj.addEventListener("DOMMouseScroll", fn, false);
				} else {
					obj.onmousewheel = fn;
				}
			
				function fn(event) {
					var event = event || window.event;
					if(event.detail) {
						down = event.detail > 0 ? true : false;
					} else {
						down = event.wheelDelta < 0 ? true : false;
					}
					cbfn.call(obj, event, down);
					if(event.preventDefault) {
						event.preventDefault();
					} else {
						window.event.returnValue = false;
					}
					return false;
				}
			},
			initScroll() {
				this.scroll = this.$refs['scroll']
				this.scrollWarpper = this.$refs['scroll-warpper']
				
				this.scrollBox = this.$refs['scroll-box']
				this.scrollMove = this.$refs['scroll-move']
				
				if(
					this.scroll === undefined ||
					this.scrollWarpper === undefined ||
					this.scrollBox === undefined ||
					this.scrollMove === undefined 
				) {
					return
				}
				
				if(this.direction === 'x') {
					this.scrollMove.style.left = ''
					this.scrollWarpper.style.left = ''
					
					this.sW = this.scroll.offsetWidth
					this.swW = this.scrollWarpper.offsetWidth
					
					if(this.sW < this.swW) {
						this.showScroll = true
						setTimeout(() => {
							if(this.isNeedPad) {
								this.scrollWarpper.style.paddingBottom = `${+this.width + 2}px`								
							}
							
							this.scrollBox.style.height = `${this.width}px`
							this.scrollBox.style.backgroundColor = this.bgColor
							
							this.scrollMove.style.width = `${this.sW / this.swW * this.sW}px`
							this.scrollMove.style.backgroundColor = this.color
						}, 20)
					}else {
						this.scrollWarpper.style.paddingBottom = ''
						this.showScroll = false
					}
				}else {
					this.scrollMove.style.top = ''
					this.scrollWarpper.style.top = ''
					
					this.sH = this.scroll.offsetHeight
					this.swH = this.scrollWarpper.offsetHeight
					if(this.sH < this.swH) {
						this.showScroll = true
						setTimeout(() => {
							if(this.isNeedPad) {
								this.scrollWarpper.style.paddingRight = `${+this.width + 2}px`								
							}
							
							this.scrollBox.style.width = `${this.width}px`
							this.scrollBox.style.backgroundColor = this.bgColor
							
							this.scrollMove.style.height = `${this.sH / this.swH * this.sH}px`
							this.scrollMove.style.backgroundColor = this.color
						}, 20)
					}else {
						this.scrollWarpper.style.paddingRight = ''
						this.showScroll = false
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.scroll {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
		.scroll-warpper {
			position: absolute;
		}
		.scroll-box {
			position: absolute;
			.scroll-move {
				border-radius: 5px;
				position: absolute;
			}
		}
		&.Yscroll {
			.scroll-warpper {
				width: 100%;
			}
			.scroll-box {
				height: 100%;
				right: 0;
				top: 0;
				.scroll-move {
					width: 100%;
				}
			}
			
		}
		&.Xscroll {
			.scroll-warpper {
				height: 100%;
			}
			.scroll-box {
				width: 100%;
				left: 0;
				bottom: 0;
				.scroll-move {
					height: 100%;
				}
			}
		}
	}
</style>