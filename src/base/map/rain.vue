<template>
	<div class="rain">
		<div class="rain-map" ref="map"></div>
		
		<loading v-show="showLoading"></loading>
	</div>
</template>

<script>
	import { loadingMixin } from 'common/js/mixins';
	import { createMap, getLayer } from 'api/map';

	export default {
		mixins: [loadingMixin],
		created() {
			this.layers = {};
		},
		mounted() {
			setTimeout(() => {
				this._initMap();
			}, 20)
		},
		data() {
			return {
				showLoading: false
			}
		},
		methods: {
			updateSize() {
				this.layers.Map.updateSize();
			},
			_initMap() {
				if(this.layers.Map === undefined) {
					this.layers['baseLayer'] = getLayer('baseLayer');
					this.layers['FsNhLayer'] = getLayer('FsNhLayer');
					this.layers['notionLayer'] = getLayer('notionLayer');
					this.layers['warnLineLayer'] = getLayer('warnLineLayer');

					let layerArr = [
						this.layers['baseLayer'],
						this.layers['FsNhLayer'],
						this.layers['notionLayer'],
						this.layers['warnLineLayer']
					];

					this.layers.Map = createMap(this.$refs['map'], layerArr, {
						zoom: 10
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.rain {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		.rain-map {
			width: 100%;
			height: 100%;
		}
	}
</style>