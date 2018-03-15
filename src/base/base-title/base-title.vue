<template>
	<div class="base-title">
		<div class="base-title-warpper">
			<div 
				class="base-title-decorate"
				:style="{
					'background-color':bgColor,
					'width': width,
					'height': height
				}"></div>
			<div 
				class="base-title-content"
				:style="{
					'font-size': fontSize,
					'color': color
				}">{{title}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			bgColor: {
				type: String,
				default: '#008cee'
			},
			color: {
				type: String,
				default: 'white'
			},
			width: {
				type: String,
				default: '6px'
			},
			height: {
				type: String,
				default: '24px'
			},
			fontSize: {
				type: String,
				default: '24px'
			}
		}
	}
</script>

<style scoped lang="scss">
	.base-title {
		width: 100%;
		.base-title-warpper {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			>.base-title-decorate {
				margin-right: 10px;
				border-radius: 0 4px 4px 0;
			}
			>.base-title-content {
				flex: 1;
			}
		}
	}
</style>