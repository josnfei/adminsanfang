<template>
	<div class="role-tree-node">
		<ul >
			<li :class="{'role-tree-expand-have': !data.children || !data.children.length}">
				<span 
					v-show="data.children && data.children.length" 
					class="role-tree-expand" 
					:class="{'role-tree-isExpand': show}"
					@click="handleExpand">
							<Icon type="arrow-right-b"></Icon>
					</span>	
					<Checkbox
						v-model="data[checkedStr]"	
							@on-change="handleCheck">{{data[keyStr]}}</Checkbox>
					<div v-show="show">
						<role-tree-node 
							ref="role-tree-node"
							v-for="item in data.children"
							:data="item"
							:keyStr="keyStr"
							:key="keyStr"
							:checkedStr="checkedStr"></role-tree-node>
					</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'role-tree-node',
		props: {
			data: {
				type: Object,
				default: () => {
					return {}
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
		data() {
			return {
				show: false
			}
		},
		methods: {
			handleExpand() {
				this.show = !this.show;
			},
			allChose(data, bol) {
				if (data.children) {
					data.children.map(item => {
						item[this.checkedStr] = bol;
						console.log(item[this.checkedStr])
						if (item.children) {
							this.allChose(item, bol);
						}
					})
				}
			},
			handleCheck(bol) {
				this.allChose(this.data, bol);
				console.log(this.data,bol)
			},
			refreshExpand() {
				if(this.$refs['role-tree-node']) {
					if(!this.show) {
						this.show = true;
					}
					if(this.data.children) {
						this.data.children.map((item, index) => {
							this.$refs['role-tree-node'][index].refreshExpand();
						})
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.role-tree-node {
		padding-left: 20px;
		.role-tree-expand-have {
			padding-left: 9px;
		}
		.role-tree-expand {
			display: inline-block;
			transition: .2s;
		}
		.role-tree-expand:hover {
			cursor: pointer;
		}
		.role-tree-isExpand {
			transform: rotate(90deg);
		}
	}
</style>