<template>
	<Form :model="formItem" :rules="rules" ref="formItem">
		<FormItem 
			class="action-formItem"
			v-for="item in data"
			:class="{isDefault: item.size === 'default'}"
			:label="item.label"
			:label-width="item.labelWidth || 80"
			:prop="item.key">
            <Input 
            	v-if="item.type === 'text'"
            	v-model="formItem[item.key]" 
            	:placeholder="`输入${item.label}`" 
            	:size="item.size || 'small'"
            	:number="item.isNum || false"
            	:readonly="item.isRead || false"
            	:disabled="item.isDisabled || false"></Input>
            <DatePicker 
            	class="formItems-date"
            	v-if="item.type === 'date'"
            	v-model="formItem[item.key]" 
            	:placeholder="`输入${item.label}`" 
            	:size="item.size || 'small'"
            	:type="item.dateType || 'date'"
            	@on-change="dateChange(item)"></DatePicker>
            <Select 
            	v-if="item.type === 'select'"
            	v-model="formItem[item.key]"
            	:placeholder="`选择${item.label}`"
				:placement="item.place || 'bottom'"
            	:size="item.size || 'small'"
            	:filterable="item.search || false"
            	:clearable="item.clear || true"
            	@on-change="selectChange(item.key)">
		        <Option 
		        	v-for="items in item.data" 
		        	:value="items.value" 
		        	:key="items.value">
		        	{{ items.label }}
		        </Option>
		    </Select>
		    <Cascader 
		    	v-if="item.type === 'cascader'"
		    	v-model="formItem[item.key]"
		    	:data="item.data" 
		    	:placeholder="`选择${item.label}`"
            	:size="item.size === 'default' ? null : 'small'"
            	:filterable="item.search || false"
            	:clearable="item.clear || true"
            	class="form-cascader"></Cascader>
       	</FormItem>
	</Form>
</template>

<script>
	import { dateFormat, dateTimeFormat } from 'common/js/config'
	import { timeFilter } from  'common/js/util'
	
	export default {
		props: {
			data: {
				type: Array,
				default: function () {
			        return []
			    }
			},
			rules: {
				type: Object,
				default: function () {
			        return {}
			    }
			}
		},
		mounted() {
			this.initFormItem()
		},
		data() {
			return {
				formItem: {}
			}
		},
		methods: {
			dateChange(item) {
				setTimeout(() => {
					if(!this.formItem[item.key]) {
						return
					}
					let time = null
					if (item.type === 'date') {
						time = timeFilter(this.formItem[item.key], dateFormat)							
					}else {
						time = timeFilter(this.formItem[item.key], dateTimeFormat)							
					}
					this.setFormItem(item.key, time)
				},20)
			},
			selectChange(key) {
				this.$emit('selectChange', {
					key,
					val: this.formItem[key]
				})
			},
			initFormItem() {
				this.formItem = {}
				this.data.map(item => {
					if (item.type === 'cascader') {
						this.$set(this.formItem, item.key, [])	
					}else {
						this.$set(this.formItem, item.key, '')						
					}
				})
			},
			getFormItem() {
				for (let key in this.formItem) {
					if (this.formItem[key] === undefined) {
						this.formItem[key] = ''
					}
				}
				return this.formItem
			},
			setFormItems(obj) {
				this.formItem = obj
			},
			setFormItem(key, val) {
				this.$set(this.formItem, key, val)
			},
			validate() {
				let bol = false
				this.$refs.formItem.validate((valid) => {
                   	bol = valid
               	})
				return bol
			},
			clearValidate() {
				this.$refs.formItem.resetFields()
			}
		}
	}
</script>

<style lang="scss">
	.action-formItem {
		margin-bottom: 8px;
		.formItems-date {
			width: 100%;
		}
		.form-cascader {
			position: relative;
			top: 5px;
			+ .ivu-form-item-error-tip {
				padding-top: 7px;
			}
		}
	}
	.isDefault {
		margin-bottom: 15px;
		.ivu-form-item-content {
			.ivu-form-item-error-tip {
				padding-top: 2px;
			}
		} 
		.form-cascader {
			top: 0;
		}
	}
</style>