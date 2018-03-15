/* 
 * 信息 弹框 
 * @ 劳兆城 
 * @ 2017-07-26
 */

<template>
	<Modal 
		class="normal-mask-model" 
		v-model="show" 
		@on-cancel="cancel" 
		:styles="modelStyles"
		:title="title">
		<header slot="header" class="model-header">
			<span>{{title}}</span>
			<div class="model-scale" @click="scaleClick" v-if="isScale">
				<Icon :type="scaleIcon"></Icon>
			</div>
		</header>
		<slot></slot>
		<div slot="footer"></div>
	</Modal>
</template>

<script>
	import { mapGetters } from 'vuex';
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
			isScale: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			scaleIcon() {
				return this.isScaling ? 'arrow-shrink' : 'arrow-expand';
			},
			modelStyles() {
				return this.isScaling ? {
					width: '100% !important',
					height: '100%'
				} : {};
			},
			...mapGetters([
				'ifCommand'
			])
		},
		watch: {
			ifCommand(newBol) {
				if(newBol && this.show) {
					this.cancel();
				}
			}
		},
		data() {
			return {
				isScaling: false,
				show: false
			}
		},
		methods: {
			scaleClick() {
				this.isScaling = !this.isScaling;
				setTimeout(() => {
					this.$emit('scale', this.isScaling);
				}, 300);
			},
			showModel() {
				this.show = true;
			},
			cancel() {
				this.show = false;
				
				if(this.isScaling) {
					setTimeout(() => {
						this.isScaling = false;					
					}, 400);					
				}
				
				if(!this.isCancel) {
					return;
				}
				this.$emit('cancel');
			}
		}
	}
</script>

<style lang="scss">
	@import '~common/scss/color';
	.normal-mask-model {
		.ivu-modal {
			transition: .2s all;
			.ivu-modal-content {
				width: 100%;
				height: 100%;
			}
			.ivu-modal-close {
				top: 4px;
				z-index: 10;
				.ivu-icon-ios-close-empty {
					color: white;
				}
			}
			.ivu-modal-close:hover {
				.ivu-icon-ios-close-empty {
					color: #999;
				}
			}
			.ivu-modal-header {
				width: 100%;
				height: 40px;
				padding: 0;
				border: none;
				background-color: $color-default;
				border-top-left-radius: 6px;
				border-top-right-radius: 6px;
				overflow: hidden;
				.model-header {
					width: 100%;
					height: 100%;
					line-height: 40px;
					text-align: center;
					color: white;
					position: relative;
					z-index: 9;
					.model-scale {
						position: absolute;
						right: 40px;
						top: 4px;
						cursor: pointer;
						overflow: hidden;
						&:hover {
							color: #999;
						}
						.ivu-icon {
							font-size: 20px;
						}
					}
				}
			}
			.ivu-modal-body {
				height: calc(100% - 40px);
			}
			.ivu-modal-footer {
				padding: 0;
				border-top: none;
			}
		}
	}
</style>