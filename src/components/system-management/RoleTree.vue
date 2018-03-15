<template>
	<div class="role-tree">
		<role-tree-node
			ref="role-tree-node"
			 v-for="item in data" 
			:data="item"
			:keyStr="keyStr"
			:key="keyStr"
			:checkedStr="checkedStr"></role-tree-node>
	</div>
</template>

<script>
	import RoleTreeNode from './RoleTreeNode';
	
	export default {
		components: {
			'role-tree-node': RoleTreeNode
		},
		props: {
			data: {
				type: Array,
				default: () => {
					return []
				}
			},
			keyStr: {
				type: String,
				default: 'title'
			},
			checkedStr: {
				type: String,
				default: 'checked'
			}
		},
		methods: {
			getData() {
				return this.data;
			},
			refreshExpand() {
				if(this.$refs['role-tree-node']) {
					this.data.map((item, index) => {
						this.$refs['role-tree-node'][index].refreshExpand();
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.role-tree {
		user-select: none;
		.role-tree-warpper {
			padding-left: 15px;
		}
	}
</style>