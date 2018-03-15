<template>
	<div class="Roll" ref="Roll">
		<div class="Roll-warpper" ref="Roll-warpper">
			<div 
				v-for="index in 2"
				class="Roll-box"
				:class="{needHoverStop: config.isHoverStop}"
				ref="Roll-box">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			content: {
				type: String,
				default: ''
			},
			config: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		watch: {
			content(newStr) {
				this.refresh(newStr);
			}
		},
		methods: {
			refresh(newStr) {
				setTimeout(() => {
					let warpper = this.$refs['Roll-warpper'];
					let box = this.$refs['Roll-box'];
					
					let width = this.$refs['Roll'].clientWidth;
					
					let textContent = this.content || '';
					let spacing = this.config.spacing || this.config.spacing === '0' ? this.config.spacing : width;
					let fontFamily = this.config.fontFamily || '微软雅黑';
					let fontSize = this.config.fontSize || 16;
					let fontWeight = this.config.fontWeight || '100';
					let animationDuration = this.config.speed || 30;
					
					if (newStr) {
						let len = newStr.length;
						let yu = len % 10;
						let bei = (len - yu) / 10;
						let speed = 5;
						
						if (bei === 0) {

						}else if(yu === 0) {
							animationDuration = animationDuration + ((bei - 1) * speed);
						}else {
							animationDuration = animationDuration + (bei * speed);
						}
					}
					
					let animationPlayState = this.config.isRun;
					
					box.map((item, index) => {
						item.innerHTML = textContent;
						item.style.paddingLeft = `${spacing}px`;
						item.style.fontFamily = fontFamily;
						item.style.fontSize = `${fontSize}px`;
						item.style.fontWeight = fontWeight;
						item.style.animationDuration = `${animationDuration}s`;
						
						if (!animationPlayState) {
							item.style.animationPlayState = 'paused';	
							item.style.paddingLeft = '0px';
							item.style.width = '100%';
							warpper.style.width = '100%';
							
							if(index === 1) {
								item.style.display = 'none';
							}
						}
					})
					
					let height = box[0].clientHeight;
					warpper.style.height = `${height}px`;
				}, 20)
			}
		}
	}
	
	
</script>

<style scoped lang="scss">
	.Roll {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		.Roll-warpper {
			white-space: nowrap;
			position: absolute;
			.Roll-box {
				text-align: center;
				position: absolute; 
				&:nth-of-type(1) {
					animation: RollMove1 linear infinite;					
				}
				&:nth-of-type(2) {
					animation: RollMove2 linear infinite;	
				}
			}
			&:hover .needHoverStop {
				animation-play-state: paused;	
			}
		}
	}
	
	@keyframes RollMove1 {
		0% {
			transform: translateX(0);
			opacity: 1
		}
		49.8% {
			transform: translateX(-100%);
			opacity: 1
		}
		49.9% {
			transform: translateX(-100%);
			opacity: 0
		}
		50% {
			transform: translateX(100%);
			opacity: 0
		}
		50.1% {
			transform: translateX(100%);
			opacity: 1
		}
		100% {
			transform: translateX(0);
			opacity: 1
		}
	}
	
	@keyframes RollMove2 {
		0% {
			transform: translateX(100%);
			opacity: 1
		}
		49.8% {
			transform: translateX(0);
			opacity: 1
		}
		99.7% {
			transform: translateX(-100%);
			opacity: 1
		}
		99.8% {
			transform: translateX(-100%);
			opacity: 0
		}
		99.9% {
			transform: translateX(100%);
			opacity: 0
		}
		100% {
			transform: translateX(100%);
			opacity: 1
		}
	}
</style>