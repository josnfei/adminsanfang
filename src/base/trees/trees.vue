<template>
	<div class="trees">
		<div 
			class="trees-warpper" 
			v-for="item in trees"
			:style="{'margin-left': `${item.left}px`}">
			<trees-node 
				:treeData="item.children" 
				:nodeWidth="nodeWidth"
				@nodeClick="nodeClick"
				@expandClick="expandClick"></trees-node>			
		</div>
	</div>
</template>

<script>
	import treesNode from 'base/trees/trees-node.vue';
	
	export default {
		props: {
			treeData: {
				type: Array,
				default: () => {
					return []
				}
			},
			boxWidth: {
				type: String,
				default: '900'
			},
			isExpand: {
				type: Boolean,
				default: false
			}
		},
		created() {
			this.nodeWidth = 34;
			this.boxCenterLeft = (+this.boxWidth - this.treeData.length * this.nodeWidth) / 2;
			
			this.trees.push({
				children: this.treeData,
				left: this.boxCenterLeft
			})
		},
		data() {
			return {
				trees: []
			}
		},
		methods: {
			nodeClick(obj) {
				this.$emit('nodeClick', obj);
			},
			expandClick(obj) {
				let arr = obj.item.level.split('/');
				this.trees = this.trees.slice(0, arr.length);
				
				if (obj.isChecked) {
					let left = (obj.index * this.nodeWidth) + (this.nodeWidth / 2) + this.trees[arr.length - 1].left;
					left = left - (obj.item.children.length * this.nodeWidth / 2);
					
					if(left < 0) {
						left = 0;
					}
					
					this.trees.push({
						children: obj.item.children,
						left: left
					});
				}
				
				if(this.isExpand) {
					this.$emit('expand');
				}
			}
		},
		components: {
			'trees-node': treesNode
		}
	}
</script>

<style scoped lang="scss">
	.trees {
		position: relative;	
		user-select: none;	
	}
</style>