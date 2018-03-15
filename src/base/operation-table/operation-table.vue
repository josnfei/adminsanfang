<template>
    <Form ref="formItem" :model="model" :rules="rules">
        <table id="table">
            <tr v-for='(item,index) in data' :key="index">
                <td v-for='(i,index1) in item' :key="index1" :colspan="i.colspan">
                    <div class="td-label">{{i.label}}</div>
                    <div class="td-content">
                        <FormItem style="margin:8px;height:100%" :prop="i.prop">
                            <span v-if='!i.type'>{{model[i.key]}}</span>
                            <Input 
                                v-if='i.type === "text"' 
                                v-model='model[i.key]' 
                                :readonly='i.readonly || false' 
                                :disabled:='i.disabled || false' 
                                placeholder="请输入">
                            </Input>
                            <Input 
                                v-if='i.type === "password"' 
                                type="password" 
                                v-model='model[i.key]' 
                                :readonly='i.readonly || false' 
                                :disabled:='i.disabled || false' 
                                placeholder="请输入">
                            </Input>
                            <Input 
                                v-if='i.type === "textarea"' 
                                type="textarea" 
                                v-model='model[i.key]' 
                                style="height: 100%" 
                                :readonly='i.readonly || false' 
                                :disabled:='i.disabled || false' 
                                placeholder="请输入">
                            </Input>
                            <Select
                                v-if='i.type === "select"'
                                v-model='model[i.key]' 
                                :disabled='i.disabled' 
                                :multiple='i.multiple' 
                                placeholder="请选择"
                                @on-change='selectChange'>
                                    <Option 
                                    v-for='(j,_j) in i.data' 
                                    :key='_j' 
                                    :value='j.value'>{{j.label}}</Option>
                            </Select>
                            <Select
                                v-if='i.type === "autoSelect"'
                                v-model='model[i.key]' 
                                :disabled='i.disabled' 
                                :multiple='i.multiple' 
                                :filterable='i.filterable'
                                :remote='i.remote'
                                :loading='i.selectLoading'
                                :not-found-text='i.notFoundText'
                                placeholder="请选择"
                                :remote-method="autoSearch"
                                @on-change='autoSelectChange'>
                                    <Option 
                                    v-for='(j,_j) in i.data' 
                                    :key='_j' 
                                    :value='j.value'>{{j.label}}</Option>
                            </Select>
                            <DatePicker
                                v-if='i.type === "date"'
                                v-model='model[i.key]'
                                type="date" 
                                placeholder="请选择日期"
                                :readonly='i.readonly || false'
                                :disabled='i.disabled || false'
                                @on-change='dateChange'>
                            </DatePicker>
                            <Cascader 
                                v-if='i.type === "cascader"'
                                v-model='model[i.key]'
                                :data="i.data" 
                                :disabled='i.disabled || false'
                                change-on-select
                                @on-change='cascaderChange'>
                            </Cascader>
                            <RadioGroup 
                                v-if="i.type === 'radio'"
                                v-model="model[i.key]">
                                <Radio 
                                    v-for="(j,_j) in i.data" 
                                    :key="_j" 
                                    :label="j.label"
                                    :disabled="j.disabled || false">
                                </Radio>
                            </RadioGroup>
                            <CheckboxGroup 
                                v-if="i.type === 'checkbox'" 
                                v-model="model[i.key]">
                                <Checkbox
                                    v-for="(j,_j) in i.data" 
                                    :key="_j" 
                                    :label="j.label"
                                    :disabled="j.disabled || false">
                                </Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                    </div>
                </td>
            </tr>
        </table>
    </Form>
</template>

<script>
    export default {
        props: {
            model: {
                type: Object,
                default: function() {
                    return {}
                }
            },
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
            },
            labelWidth: {
                type: String,
                default: '100px'
            },
            labelBackgroundColor: {
                type: String,
                default: '#fff'
            },
            borderColor: {
                type: String,
                default: '#000'
            },
            contentBackgroundColor: {
                type: String,
                default: '#fff'
            }
        },
        data() {
            return {
                tdArr: [],
                tdLabelArr: []
            }
        },
        created() {
        },
        mounted() {
            this.tdArr = document.querySelectorAll('#table tr td')
            this.tdLabelArr = document.querySelectorAll('#table tr td .td-label')
            this.setLabelWidth()
            this.setLabelColor()
        },
        methods: {
            getRefs(){
                this.$emit('getRefs',this.$refs.formItem)
            },
            setLabelWidth() {
                for (let i = 0; i < this.tdArr.length; i++) {
                    this.tdArr[i].style.paddingLeft = this.labelWidth
                    this.tdArr[i].style.borderColor = this.borderColor
                    this.tdArr[i].style.backgroundColor = this.contentBackgroundColor
                }
                for (let j = 0; j < this.tdLabelArr.length; j++) {
                    this.tdLabelArr[j].style.width = this.labelWidth
                    this.tdLabelArr[j].style.borderColor = this.borderColor
                }
            },
            setLabelColor() {
                for (let j = 0; j < this.tdLabelArr.length; j++) {
                    this.tdLabelArr[j].style.backgroundColor = this.labelBackgroundColor
                }
            },
            selectChange(value){
                this.$emit('selectChange',value)
            },
            autoSelectChange(value){
                this.$emit('autoSelectChange',value)
            },
            autoSearch(query) {
                this.$emit('autoSearch',query)
            },
            dateChange(value){
                this.$emit('dateChange',value)
            },
            cascaderChange(value,selectedData){
                this.$emit('cascaderChange',{
                    value: value,
                    selectedData: selectedData
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    #table {
        width: 100%;
        td {
            border: 1px solid #000;
            height: 50px;
            position: relative;
            .td-label {
                border-right: 1px solid #000;
                position: absolute;
                top: 0;
                left: 0;
                text-align: center;
            }
            .td-content {
                width: 100%;
                padding: 0 10px;
                textarea{
                    height: 40px !important;
                }
            }
            .td-label,
            .td-content {
                display: inline-block;
                height: 100%;
                line-height: 50px;
            }
        }
    }
</style>
<style lang="scss">
    #table{
        textarea.ivu-input{
            height: 80%;
            transform: translateY(11%);
            box-sizing: border-box;
        }
        .ivu-cascader {
            line-height: 50px;
        }
    }
</style>