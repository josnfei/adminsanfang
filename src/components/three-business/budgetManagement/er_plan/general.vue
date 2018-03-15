<template>
    <div class="general">
        <!-- 基础信息 -->
        <div class="insertInfo">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate">
                <table class="ed-table">
                    <tbody>
                        <tr>
                            <td class="ed-label">预案名称</td>
                            <td class="ed-content">
                                <FormItem style="margin:0" prop="plan_name">
                                    <Input v-model="formItem.plan_name" placeholder="请输入" :disabled="formDisabled" style="width:200px"></Input>
                                </FormItem>
                            </td>
                            <td class="ed-label">预案类型</td>
                            <td class="ed-content" colspan="5">
                                <FormItem style="margin: 0" prop="plan_type">
                                    <Select v-model="formItem.plan_type" :disabled="formDisabled" placeholder="请选择" style="width:200px">
                                        <Option value="防风">防风</Option>
                                        <Option value="防汛">防汛</Option>
                                        <Option value="防旱">防旱</Option>
                                        <Option value="防暴雨">防暴雨</Option>
                                    </Select>
                                </FormItem>
                            </td>
                            <!-- <td class="ed-label">预案类别</td>
                            <td class="ed-content">
                                <FormItem style='margin:0' prop="plan_type">
                                    <Select v-model="formItem.plan_category" :disabled="formDisabled" placeholder="请选择" style="width:200px">
                                        <Option value="部门预案">部门预案</Option>
                                        <Option value="社区预案">社区预案</Option>
                                        <Option value="专题预案">专题预案</Option>
                                    </Select>
                                </FormItem>
                            </td> -->
                        </tr>
                        <tr>
                            <td class="ed-label">执行部门（全称）</td>
                            <td class="ed-content">
                                <FormItem style="margin:0" prop="department_fullname">
                                    <Select :label='formItem.department_fullname' not-found-text='无匹配部门，请重新输入' v-model="formItem.department_fullname" filterable
                                        remote :remote-method="autoSearch" :loading="selectLoading" style="width:200px" @on-change='selected'>
                                        <Option v-for="(option, index) in autoCompleteData" :value="option.value" :key="index">{{option.label}}</Option>
                                    </Select>
                                </FormItem>
                            </td>
                            <td class="ed-label">执行部门（简称）</td>
                            <td class="ed-content" colspan="5">
                                <FormItem style="margin:0">
                                    <Input readonly v-model="formItem.department_name" placeholder="请输入" :disabled="formDisabled" style="width:200px"></Input>
                                </FormItem>
                            </td>
                            <!-- <td class="ed-label">起草人</td>
                            <td class="ed-content">
                                <FormItem style="margin:0" prop="createby">
                                    <Input v-model="formItem.createby" placeholder="请输入" :disabled="formDisabled" style="width:200px"></Input>
                                </FormItem>
                            </td> -->
                        </tr>
                        <tr v-if='name==="erp"'>
                            <td class="ed-label">总则</td>
                            <td class="ed-content" colspan="5">
                                <FormItem style="margin:0;padding-top:5px" v-if='name==="erp"'>
                                    <textarea placeholder="请输入" v-model='formItem.principle' name="" id="" autofocus></textarea>
                                </FormItem>
                            </td>
                        </tr>
                        <tr v-if='name==="comp" || name === "top"'>
                            <td class="ed-label">基本情况</td>
                            <td class="ed-content" colspan="5">
                                <FormItem style="margin:0;padding-top:5px">
                                    <textarea v-model='formItem.general_situation' name="" id="" autofocus></textarea>
                                </FormItem>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        </div>
        <div class="save pull-right">
            <Button type="primary" size="large" @click="saveBtn('formItem')" style="margin-right:15px" v-if="isshow">保存</Button>
            <Button type="ghost" size="large" @click="cancel">关闭</Button>
        </div>
        <!--确认保存  -->
        <Modal v-model="sure_save" width="360">
            <p slot="header" style="font-size:18px;text-align:center">
                <Icon type="help-circled"></Icon>
                <span>保存</span>
            </p>
            <div style="text-align:center">
                <p>保存并返回部门预案请选择
                    <span style="color: blue">Save and return</span>,继续向下操作请点击
                    <span style="color: red">Continue down</span>
                </p>
            </div>
            <div slot="footer">
                <Button type="ghost" size="small" @click="save">Save and return</Button>
                <Button type="primary" size="small" @click="goOn">Continue down</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { getLocalStorage, senActive, getSessionStorage } from 'common/js/dom'
    import { getdepList, addDep, updateDep, deleteDep } from 'api/plan_management'
    import { dep_plan } from 'common/js/rules'
    import { initTime } from 'common/js/util'
    import { getDepList } from 'api/bumenlist'
    export default {
        data() {
            return {
                selectLoading: false,
                name: '',
                isshow: true,
                readOnly: false,
                sure_save: false,
                formItem: {},
                ruleValidate: dep_plan,
                formDisabled: false,
                id: '',
                depList: [],
                autoCompleteData: [],
                postObj: {
                    "page": 1,
                    "pageSize": 10,
                    "searchValue": {},
                    'order': {
                        _id: -1
                    }
                },
            }
        },
        created() {
            this.id = getLocalStorage("id")
            var pObj = { _id: this.id }
            this.postObj.searchValue = pObj
            this._getPlanList()
            if (getLocalStorage("status") == 'details') {
                this.isshow = false
            }
            if (getSessionStorage('name') === 'erp') {
                this.name = 'erp'
            } else if (getSessionStorage('name') === 'comp') {
                this.name = 'comp'
            } else if (getSessionStorage('name') === 'top') {
                this.name = 'top'
            }
            this._getDepList()
        },
        methods: {
            // 选择执行部门
            selected(value) {
                if (this.depList.length > 0) {
                    let index = this.depList.findIndex(item => value === item.department_fullname)
                    this.formItem.department_name = this.depList[index].department_name
                    this.formItem.department_level = this.depList[index].department_level
                    this.formItem.department_code = this.depList[index].department_code
                }
            },
            autoSearch(query) {
                if (query !== '') {
                    this.selectLoading = true;
                    setTimeout(() => {
                        this.selectLoading = false;
                        this.autoCompleteData = this.depList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.autoCompleteData = [];
                }
            },
            _getDepList() {
                getDepList().then(res => {
                    this.depList = res.result.result.map(item => {
                        return {
                            value: item.fullname,
                            label: item.fullname,
                            department_name: item.name,
                            department_fullname: item.fullname,
                            department_code: item.code,
                            department_level: item.level
                        }
                    })
                })
            },
            cancel() {
                let path = getLocalStorage('formPath')
                this.$router.push(path)
            },
            _getPlanList() {
                getdepList(this.postObj).then(res => {
                    if (res.code === '0000') {
                        this.formItem = res.result.result[0]
                    }
                })
            },
            goOn() {
                senActive(1)
                if (getLocalStorage("status") === 'edit') {
                    updateDep(this.formItem).then(res => {
                        if (res.code === '0000') {
                            this.$router.push('/home/threeBusiness/er_plan/organization')
                        } else if (res.code === '0001') {
                            this.$router.push('/home/threeBusiness/er_plan/organization')
                        }
                    })
                } else {
                    this.formItem.status = '草稿'
                    let year = new Date()
                    this.formItem.plan_year = year.getFullYear()
                    this.formItem.createdt = initTime()
                    addDep(this.formItem).then(res => {
                        if (res.code === '0000') {
                            getLocalStorage("id", res.result._id)
                            this.$router.push('/home/threeBusiness/er_plan/organization')
                        } else if (res.code === '0001') {
                            this.$Notice.error({
                                title: '添加失败'
                            });
                        }
                    })
                }
            },
            saveBtn(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.formItem.createby = getLocalStorage('info').username
                        if (getSessionStorage('name') === 'erp') {
                            this.formItem.plan_category = '部门预案'
                        } else if (getSessionStorage('name') === 'comp') {
                            this.formItem.plan_category = '社区预案'
                        } else if (getSessionStorage('name') === 'top') {
                            this.formItem.plan_category = '专题预案'
                        }
                        this.sure_save = true
                    }
                })
            },
            save() {
                if (getSessionStorage('name') === 'erp') {
                    this.name = 'erp'
                    if (getLocalStorage("status") === 'edit') {
                        updateDep(this.formItem).then(res => {
                            if (res.code === '0000') {
                                this.$router.push('/home/threeBusiness/threeBusinessDefault')
                            } else if (res.code === '0001') {
                                this.$router.push('/home/threeBusiness/threeBusinessDefault')
                            }
                        })
                    } else {
                        this.formItem.status = '草稿'
                        let year = new Date()
                        this.formItem.plan_year = year.getFullYear()
                        this.formItem.createdt = initTime()
                        addDep(this.formItem).then(res => {
                            if (res.code === '0000') {
                                this.$router.push('/home/threeBusiness/threeBusinessDefault')
                            } else if (res.code === '0001') {
                                this.$router.push('/home/threeBusiness/threeBusinessDefault')
                            }
                        })
                    }
                } else if (getSessionStorage('name') === 'comp') {
                    this.name = 'comp'
                    if (getLocalStorage("status") === 'edit') {
                        updateDep(this.formItem).then(res => {
                            if (res.code === '0000') {
                                this.$router.push('/home/threeBusiness/threeBusinessCommunity')
                            } else if (res.code === '0001') {
                                this.$router.push('/home/threeBusiness/threeBusinessCommunity')
                            }
                        })
                    } else {
                        this.formItem.status = '草稿'
                        let year = new Date()
                        this.formItem.plan_year = year.getFullYear()
                        this.formItem.createdt = initTime()
                        addDep(this.formItem).then(res => {
                            if (res.code === '0000') {
                                this.$router.push('/home/threeBusiness/threeBusinessCommunity')
                            } else if (res.code === '0001') {
                                this.$router.push('/home/threeBusiness/threeBusinessCommunity')
                            }
                        })
                    }
                } else if (getSessionStorage('name') === 'top') {
                    this.name = 'top'
                    if (getLocalStorage("status") === 'edit') {
                        updateDep(this.formItem).then(res => {
                            if (res.code === '0000') {
                                this.$router.push('/home/threeBusiness/threeBusinessTopic')
                            } else if (res.code === '0001') {
                                this.$router.push('/home/threeBusiness/threeBusinessTopic')
                            }
                        })
                    } else {
                        this.formItem.status = '草稿'
                        let year = new Date()
                        this.formItem.plan_year = year.getFullYear()
                        this.formItem.createdt = initTime()
                        addDep(this.formItem).then(res => {
                            if (res.code === '0000') {
                                this.$router.push('/home/threeBusiness/threeBusinessTopic')
                            } else if (res.code === '0001') {
                                this.$router.push('/home/threeBusiness/threeBusinessTopic')
                            }
                        })
                    }
                }


            }
        }
    }
</script>
<style scoped lang="scss">
    .general {
        height: 100%;
        .erp_title {
            font-size: 20px;
            color: #303030;
            font-weight: bold;
            text-align: center;
        }
        textarea {
            width: 100%;
            height: 300px;
            line-height: 20px;
            padding-top: 5;
            padding-left: 5px;
            overflow: auto;
            border: 1px solid #dddee1;
        }
        .general_content {
            width: 95%;
            height: 290px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin: 0 auto;

        }
        .insertInfo {
            width: 100%;
            .ed-table {
                width: 100%;
                tr {
                    height: 50px;
                    .ed-label {
                        width: 150px;
                        background: #f6f6f6;
                        text-align: center;
                        color: #303030;
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .ed-content {
                        padding: 5px 1%;
                        background: #fff;
                        .more {
                            width: 30px;
                            height: 30px;
                            border: 1px solid #ccc;
                            text-align: center;
                            line-height: 30px;
                            color: #ccc;
                            font-size: 20px;
                        }
                        .more:hover {
                            border-color: #b6e1fc;
                            color: #b6e1fc;
                            cursor: pointer;
                        }
                    }
                    td {
                        border: 1px solid #ccc;
                        padding: 0;
                        input[type='text'] {
                            width: 100%;
                            height: 40px;
                            border: none;
                            padding: 10px;
                        }
                    }
                }
            }
        }
        .save {
            margin: 20px;
            margin-right: 0;
        }
    }
</style>