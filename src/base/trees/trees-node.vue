<template>
	<div class="trees-node" ref="trees-node" :style="{'width': width.all}">
		<div class="trees-node-line" :style="{'width': width.line}"></div>
		<ul class="trees-node-list clear">
			<li class="trees-node-detail pull-left" v-for="(item, index) in treeData">
				<div class="topXian"></div>
				<div class="box" :class="item.cls" @click="nodeClick(item, index)">
					<img :src="item.img | imgPath" />
				</div>
				<div class="name">
					{{item.name}}
				</div>
				<div class="expand" v-show="item.children && item.children.length">
					<div class="expand-icon" @click="expandClick(item, index)">
						<span class="iconfont" 
							:class="{'icon-jia': !item.isChecked, 'icon-jian': item.isChecked}"></span>
					</div>
					<div class="botXian" v-show="item.isChecked"></div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { Static } from 'api/config';

	export default {
		name: 'trees-node',
		props: {
			treeData: {
				type: Array,
				default: () => {
					return []
				}
			},
			nodeWidth: {
				type: Number,
				default: 34
			}
		},
		filters: {
			imgPath(str) {
				return `${Static}img/threeCommand/${str}`
			}
		},
		computed: {
			width() {
				return {
					all: `${this.treeData.length * this.nodeWidth}px`,
					line: `${(this.treeData.length - 1) * this.nodeWidth}px`
				}
			}
		},
		methods: {
			filterIsChecked(item, bol) {
				item.children.map(items => {
					if(items.isChecked) {
						items.isChecked = bol;
					}
					
					if(items.children) {
						this.filterIsChecked(items);
					}
				})
			},
			nodeClick(item, index) {
				this.$emit('nodeClick', {
					item,
					index
				})
			},
			expandClick(item, index) {
				if(item.isChecked) {
					item.isChecked = false;
					this.filterIsChecked(item, false);
				}else {
					this.treeData.map(items => {
						items.isChecked = false;
					})
					
					item.isChecked = true;
				}
				
				this.$emit('expandClick', {
					index,
					item,
					isChecked: item.isChecked
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '~common/scss/color';
	.trees-node {
		.trees-node-line {
			border-top: 1px solid white;
			margin: 0 auto;
		}
		.trees-node-list {
			color: white;
			.trees-node-detail {
				padding: 0 3px;
				box-sizing: border-box;
				text-align: center;
				>.topXian {
					height: 18px;
					border-left: 1px solid white;
					margin-left: 14px;
				}
				>.box {
					width: 28px;
					height: 28px;
					border-radius: 5px;
					background-color: #a6d18a;
					padding: 1px;
					cursor: pointer;
					>img {
						width: 26px;
						height: 26px;
					}
				}
				>.name {
					
				}
				>.expand {
					width: 100%;
					height: 100%;
					cursor: pointer;
					text-align: center;
					> .expand-icon {
						> .iconfont {
							font-size: 12px;
							color: $color-yellow;
						}						
					}
					>.botXian {
						border-left: 1px solid white;
						height: 18px;
						margin-left: 14px;
					}
				}
			}
		}
	}
</style>