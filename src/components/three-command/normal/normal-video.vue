<template>
	<normal-mask-model 
		ref="mask-model" 
		class="normal-video" 
		title="集成通信指挥"
		:isCancel="true"
		@cancel="modelCancel"
		@scale="modelScale">
		<div class="normal-video-warpper">
			
		</div>
	</normal-mask-model>
</template>

<script>
	import { normalMaskModelMixin } from 'common/js/mixins';
	
	export default {
		mixins: [normalMaskModelMixin],
		methods: {
			modelCancel() {
				
			},
			modelScale() {
				
			},
			showModel() {
				this.$refs['mask-model'].showModel();
			}
		}
	}
</script>

<style lang="scss">
	.normal-video {
		.normal-video-warpper {
			width: 100%;
			height: 100%;
			overflow: hidden;
			user-select: none;
			position: relative;
		}
		.ivu-modal {
			width: 900px !important;
			height: 550px;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			position: absolute;
			.ivu-modal-body {
				padding: 0;
				position: relative;
				overflow: hidden;
				background-color: white;
			}
		}
	}
</style>