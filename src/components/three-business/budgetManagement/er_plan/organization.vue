<template>
    <div class="orgnizatiion">
        <div class="erp_title">组织机构与职责</div>
        <div class="general_content">
            <Row class-name="fullbox">
                <Col span="4" class-name="boxleft">
                <ul ref="active">
                    <li>
                        <Icon type="arrow-right-b" color="blue" style="margin-right:8px"></Icon>
                        <span>本部门机构说明</span>
                    </li>
                    <li>
                        <Icon type="arrow-right-b" color="blue" style="margin-right:8px"></Icon>
                        <span>本部门职责说明</span>
                    </li>
                    <li>
                        <Icon type="arrow-right-b" color="blue" style="margin-right:8px"></Icon>
                        <span>成员部门职责说明</span>
                    </li>
                </ul>
                </Col>
                <Col span="20" class-name="boxright">
                <div class="boxContent" ref="textContent">
                    <textarea v-model='textareaObj.organization' name="" id="" autofocus>1</textarea>
                    <textarea v-model='textareaObj.department_duty' name="" id="" autofocus>2</textarea>
                    <textarea v-model='textareaObj.member_duty' name="" id="" autofocus>3</textarea>
                </div>
                </Col>
            </Row>
        </div>
        <div class="save pull-right">
            <Button type="primary" size="large" @click="saveBtn" v-if="isshow" style="margin-right:15px">保存</Button>
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
    import { setAction, getAction } from 'common/js/util'
    export default {
        data() {
            return {
                textareaObj: {
                    organization: '',
                    department_duty: '',
                    member_duty: ''

                },
                isshow: true,
                sure_save: false,
                textareaVaule: '',
                id: '',
                postObj: {
                    "page": 1,
                    "pageSize": 10,
                    "searchValue": {}
                },
            }
        },
        mounted() {
            var textArr = this.$refs.textContent.children
            var domArr = this.$refs.active.children
            if (!getAction().fourth && getAction().foruth !== 0) {
                domArr[0].className = 'active'
                for (let i = 0; i < textArr.length; i++) {
                    textArr[i].style.visibility = 'hidden'
                }
                textArr[0].style.visibility = 'visible'

            } else {
                domArr[getAction().fourth].className = 'active'
                textArr[getAction().fourth].style.visibility = 'hidden'
            }
            for (let i = 0; i < domArr.length; i++) {
                domArr[i].onclick = function () {
                    var obj = getAction()
                    obj.fourth = i
                    setAction(obj)
                    for (let j = 0; j < domArr.length; j++) {
                        domArr[j].className = ''
                        textArr[j].style.visibility = 'hidden'
                    }
                    this.className = 'active'
                    textArr[i].style.visibility = 'visible'
                }
            }
        },
        created() {
            this.id = this.id = getLocalStorage("id")
            var pObj = { _id: this.id }
            this.postObj.searchValue = pObj
            this._getPlanList()
            if (getLocalStorage("status") == 'details') {
                this.isshow = false
            } 
        },
        methods: {
            cancel() {
                this.$router.push("/home/threeBusiness/threeBusinessDefault")
            },
            _getPlanList() {
                getdepList(this.postObj).then(res => {
                    if (res.code === '0000') {
                        this.textareaObj = res.result.result[0]
                    }
                })
            },
            goOn() {
                senActive(2)
                updateDep(this.textareaObj).then(res => {
                    if (res.code === '0000') {
                        this.$router.push('/home/threeBusiness/er_plan/warning')
                    } else if (res.code === '0001') {
                        this.$router.push('/home/threeBusiness/er_plan/warning')
                    }
                })
            },
            saveBtn() {
                this.sure_save = true
            },
            save() {
                if (getSessionStorage('name') === 'erp') {
                    updateDep(this.textareaObj).then(res => {
                        if (res.code === '0000') {
                            this.$router.push('/home/threeBusiness/threeBusinessDefault')
                        } else {
                            this.$router.push('/home/threeBusiness/threeBusinessDefault')
                        }
                    })
                }else if(getSessionStorage('name') === 'comp'){
                    updateDep(this.textareaObj).then(res => {
                        if (res.code === '0000') {
                            this.$router.push('/home/threeBusiness/threeBusinessCommunity')
                        } else {
                            this.$router.push('/home/threeBusiness/threeBusinessCommunity')
                        }
                    })
                }else if(getSessionStorage('name') === 'top'){
                    updateDep(this.textareaObj).then(res => {
                        if (res.code === '0000') {
                            this.$router.push('/home/threeBusiness/threeBusinessTopic')
                        } else {
                            this.$router.push('/home/threeBusiness/threeBusinessTopic')
                        }
                    })
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .orgnizatiion {
        height: 100%;
        .erp_title {
            font-size: 20px;
            color: #303030;
            font-weight: bold;
            text-align: center;
        }
        .general_content {
            width: 100%;
            height: 80%;
            border: 1px solid #ccc;
            border-radius: 5px;
            .fullbox {
                height: 100%;
                .boxleft {
                    border-right: 1px solid #ccc;
                    height: 100%;
                    ul {
                        >li {
                            cursor: pointer;
                            height: 50px;
                            line-height: 50px;
                            padding-left: 20px;
                            border-bottom: 1px solid #f2f2f2;
                            font-size: 13px;
                            >span {
                                color: #333;
                            }
                        }
                        >li:hover {
                            background: #f2f2f2;
                        }
                        .active {
                            background: #f2f2f2;
                        }
                    }
                }
                .boxright {
                    height: 100%;
                    .boxContent {
                        height: 100%;
                        >textarea {
                            width: 100%;
                            height: 100%;
                            overflow: auto;
                            border: none;
                            padding: 5px 0 0 5px;
                            position: absolute;
                            top: 0;
                            left: 0;
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