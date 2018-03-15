<template>
	<div id="threeCommand">
		
		<!--正常情况下的指挥图首页-->
		<div class="threeCommand-normal" v-if="!ifCommand">
			<normal-home></normal-home>
		</div>
		
		<!--指挥情况下的指挥图首页-->
		<!-- <div class="threeCommand-command" v-if="ifCommand">
			<command-home></command-home>
		</div> -->
        
        <!-- <robot></robot> -->
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import normalHome from './normal/normal-home.vue';
	import robot from './robot/robot.vue';
	
	export default {
		computed: {
			...mapGetters([
				'ifCommand'
			])
		},
		methods: {
		},
		components: {
			'normal-home': normalHome,
			'robot': robot
		}
	}
</script>

<style lang="scss">
	@import "~common/scss/color";
	
	#threeCommand {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		.threeCommand-normal {
			width: 100%;
			height: 100%;
		}
		.threeCommand-duty {
			width: 100%;
			height: 100%;
		}
		.threeCommand-command {
			width: 100%;
			height: 100%;
		}
	}
</style>