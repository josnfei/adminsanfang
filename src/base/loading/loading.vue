<template>
	<div class="loading" ref="loading" v-if="type === 'square'">
		<div class="loading-warpper" ref="loading-warpper">
			<div class="loading-content" ref="loading-content"></div>
			<div class="loading-title">{{title}}</div>
		</div>
	</div>
	<div 
		class="circular-loading animated" 
		v-else-if="type === 'circular'">
		<div class="circular-loadingBox">
			<Spin fix>
				<div class="loader">
					<svg class="circular" viewBox="25 25 50 50">
						<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
					</svg>
				</div>
			</Spin>
		</div>
	</div>
</template>

<script>
	let loading = loading || {};

	(function(loading) {

		loading.init = function(obj, oops, backFn) {
			var ops = {
				loadtype: 1,
				color: "#ed5565",
				top: "0",
				width: "100%",
				height: "100%",
				scale: 1
			}
			for(var key in oops) {
				ops[key] = oops[key];
			}

			obj.innerHTML = '<div class="loader">' + getLoadingType(ops.loadtype) + '</div>';
			obj.style.backgroundColor = ops.color;
			obj.children[0].style.width = ops.width;
			obj.children[0].style.height = ops.height;
			obj.children[0].style.top = ops.top;
			obj.children[0].style.transform = 'scale(' + ops.scale + ')'

			setTimeout(function() {
				if(backFn) {
					backFn();
				}
			}, ops.time);

		}

		function getLoadingType(n) {
			var type = [
				'<div class="loader-inner ball-pulse"><div></div><div></div><div></div></div>',
				'<div class="loader-inner ball-grid-pulse"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
				'<div class="loader-inner ball-clip-rotate"><div></div></div>',
				'<div class="loader-inner ball-clip-rotate-pulse"><div></div><div></div></div>',
				'<div class="loader-inner square-spin"><div></div></div>',
				'<div class="loader-inner ball-clip-rotate-multiple"><div></div><div></div></div>',
				'<div class="loader-inner ball-pulse-rise"><div></div><div></div><div></div><div></div><div></div></div>',
				'<div class="loader-inner ball-rotate"><div></div></div>',
				'<div class="loader-inner cube-transition"><div></div><div></div></div>',
				'<div class="loader-inner ball-zig-zag"><div></div><div></div></div>',
				'<div class="loader-inner ball-zig-zag-deflect"><div></div><div></div></div>',
				'<div class="loader-inner ball-triangle-path"><div></div><div></div><div></div></div>',
				'<div class="loader-inner ball-scale"><div></div></div>',
				'<div class="loader-inner line-scale"><div></div><div></div><div></div><div></div><div></div></div>',
				'<div class="loader-inner line-scale-party"><div></div><div></div><div></div><div></div></div>',
				'<div class="loader-inner ball-scale-multiple"><div></div><div></div><div></div></div>',
				'<div class="loader-inner ball-pulse-sync"><div></div><div></div><div></div></div>',
				'<div class="loader-inner ball-beat"><div></div><div></div><div></div></div></div>',
				'<div class="loader-inner line-scale-pulse-out"><div></div><div></div><div></div><div></div><div></div></div>',
				'<div class="loader-inner line-scale-pulse-out-rapid"><div></div><div></div><div></div><div></div><div></div></div>',
				'<div class="loader-inner ball-scale-ripple"><div></div></div>',
				'<div class="loader-inner ball-scale-ripple-multiple"><div></div><div></div><div></div></div>',
				'<div class="loader-inner ball-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
				'<div class="loader-inner line-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
				'<div class="loader-inner triangle-skew-spin"><div></div></div>',
				'<div class="loader-inner pacman"><div></div><div></div><div></div><div></div><div></div></div>',
				'<div class="loader-inner ball-grid-beat"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
				'<div class="loader-inner semi-circle-spin"><div></div></div>'
			]
			return(n == undefined || n > type.length - 1) ? type[0] : type[n];
		}

	})(loading)
	export default {
		props: {
			type: {
				type: String,
				default: 'square'
			},
			title: {
				type: String,
				default: '加载中'
			}
		},
		mounted() {
			if(this.type === 'square') {
				loading.init(this.$refs['loading-content'], {
					loadtype: 22,
					color: '#039',
					scale: 0.35,
					top: '-10px'
				})				
			}
		}
	}
</script>

<style lang="scss">
	.loading {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 101;
		user-select: none;
		.loading-warpper {
			width: 80px;
			height: 80px;
			padding: 10px 0;
			background-color: rgba(0, 0, 0, .6);
			border-radius: 5px;
			position: absolute;
			box-sizing: border-box;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			color: white;
			text-align: center;
			.loading-content {
				width: 100%;
				text-align: center;
			}
			.loading-title {
				width: 100%;
				position: absolute;
				bottom: 2px;
				text-align: center;
				padding: 5px;
				box-sizing: border-box;
			}
		}
	}
	
	.circular-loading {
		z-index: 1000;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(255,255,255,1);
		.circular-loadingBox {
			width: 100px;
			height: 100px;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			.ivu-spin-fix {
				background-color: rgba(255,255,255,0);
				.loader {
					width: 30px;
					height: 30px;
					position: relative;
					margin: 0 auto;
					.circular {
						-webkit-animation: rotate 2s linear infinite;
						animation: rotate 2s linear infinite;
						height: 100%;
						-webkit-transform-origin: center center;
						transform-origin: center center;
						width: 100%;
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						margin: auto;
						.path {
							stroke-dasharray: 1, 200;
							stroke-dashoffset: 0;
							-webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
							animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
							stroke-linecap: round;
						}
					}
				}
				
			}
		}
	}
	@keyframes rotate {
		100% {
			transform: rotate(1turn);
		}
	}
	
	@keyframes dash {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 89, 200;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 89, 200;
			stroke-dashoffset: -124;
		}
	}
	
	@keyframes color {
		0%,
		100% {
			stroke: #d62d20;
		}
		40% {
			stroke: #0057e7;
		}
		66% {
			stroke: #008744;
		}
		80%,
		90% {
			stroke: #ffa700;
		}
	}
</style>