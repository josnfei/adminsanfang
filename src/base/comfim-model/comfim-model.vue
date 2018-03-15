<template>
	<Modal 
		class="comfim-model" 
		:title="title" 
		:mask-closable="isMaskClickClose"
		v-model="show"
		@on-cancel="hideModel">
		<div class="comfim-model-body">
			<div class="comfim-model-type" v-if="isNeedIcon">
				<span class="iconfont" :class="iconType"></span>
			</div>
			<div class="comfim-model-content">
				<slot></slot>
			</div>
		</div>
		<div class="comfim-model-footer clear" slot="footer">
			<div class="comfim-model-sure pull-right" @click="sure">
				<Button type="primary" class="sure-button" :loading="showLoading">确认</Button>
			</div>
			<div class="comfim-model-cancel pull-right" @click="hideModel">
				<button class="cancel-button">取消</button>
			</div>
		</div>
	</Modal>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				default: 'question'
			},
			title: {
				type: String,
				default: ''
			},
			isNeedIcon: {
				type: Boolean,
				default: true
			},
			isCancel: {
				type: Boolean,
				default: false
			},
			isMaskClickClose: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			iconType() {
				let str = '';
				switch(this.type) {
					case 'warn':
						str = 'icon-tanhao';
						break;
					case 'error':
						str = 'icon-chahao';
						break;
					default:
						str = 'icon-wenhao';
						break;
				}
				
				return str
			}
		},
		data() {
			return {
				show: false,
				showLoading: false
			}
		},
		methods: {
			controlLoading(bol) {
				this.showLoading = bol;
			},
			sure() {
				this.$emit('sure');
			},
			hideModel() {
				this.show = false;
				
				if(!this.isCancel) {
					return;
				}
				this.$emit('cancel');
			},
			showModel() {
				this.show = true;
			}
		}
	}
</script>

<style lang="scss">
	@import '~common/scss/color.scss';
	
	.comfim-model {
		.ivu-modal {
			width: 400px !important;
			height: 200px;
			transition: .2s all;	
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			.comfim-model-body {
				width: 100%;
				height: 100%;
				display: flex;
				.comfim-model-type {
					height: 100%;
					line-height: 68px;
					flex: 1;
					text-align: center;
					> .iconfont {
						font-size: 65px;
					}
					> .icon-wenhao {
						color: #70a9fc;						
					}
					> .icon-tanhao {
						color: $color-warning;						
					}
					> .icon-chahao {
						color: $color-danger;						
					}
				}
				.comfim-model-content {
					flex: 1;
					overflow: hidden;
				}
			}
			.comfim-model-footer {
				.comfim-model-cancel {
					margin-right: 5px;
					.cancel-button {
						color: white;
						background-color: #546a79;	
						border: 0;
						padding: 6px 24px;	
						border-radius: 5px;	
						cursor: pointer;
					}
				}
				.comfim-model-sure {
					.sure-button {
						color: white;
						background-color: #0094d9;
						border: 0;		
						padding: 6px 24px;	
						border-radius: 5px;	
						cursor: pointer;		
					}
				}
			}
			.ivu-modal-content {
				width: 100%;
				height: 100%;
				border-radius: 2px;
				box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
				.ivu-modal-body {
					width: 100%;
					height: calc(100% - 100px);
				}
			}
		}
	}
</style>