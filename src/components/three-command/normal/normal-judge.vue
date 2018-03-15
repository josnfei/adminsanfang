<template>
	<normal-mask-model 
		ref="mask-model" 
		class="normal-judge" 
		title="预警研判"
		:isCancel="true"
		@cancel="modelCancel"
		@scale="modelScale">
		<div class="normal-judge-warpper">
			<div class="normal-judge-header">
				<Tabs v-model="view">
	        <TabPane name="typhoon" label="台风路径"></TabPane>
	        <TabPane name="rain" label="降雨(格点预报)"></TabPane>
	        <TabPane name="water-level-will" label="水位预测"></TabPane>
		    </Tabs>
			</div>
			<div class="normal-judge-content" v-if="isShow">
				<component :is="view" ref="component"></component>
			</div>
		</div>
	</normal-mask-model>
</template>

<script>
	import typhoon from 'base/map/typhoon.vue';
	import rain from 'base/map/rain.vue';
	import waterLevelWill from 'base/map/waterLevelWill.vue';
	import { normalMaskModelMixin } from 'common/js/mixins';

	export default {
		mixins: [normalMaskModelMixin],
		components: {
			'typhoon': typhoon,
			'rain': rain,
			'water-level-will': waterLevelWill
		},
		data() {
			return {
				isShow: false,
				view: 'typhoon'
			}
		},
		methods: {
			modelScale(bol) {
				this.$refs['component'].updateSize()
			},
			modelCancel() {
				this.isShow = false;
			},
			showModel() {
				this.$refs['mask-model'].showModel();
				this.isShow = true;
			}
		}
	}
</script>

<style lang="scss">
	.normal-judge {
		.normal-judge-warpper {
			width: 100%;
			height: 100%;
			overflow: hidden;
			user-select: none;
			position: relative;
			.normal-judge-header {
				width: 100%;
				height: 37px;
				position: absolute;
				left: 0;
				top: 0;
				padding: 0 5px;
			}
			.normal-judge-content {
				position: absolute;
				left: 5px;
				right: 5px;
				top: 40px;
				bottom: 5px;
			}
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