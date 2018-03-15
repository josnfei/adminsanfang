<template>
    <div class="post">
        <div class="title">
            <span>位置： </span>
            <Breadcrumb separator=">">
                <BreadcrumbItem>日常办公</BreadcrumbItem>
                <BreadcrumbItem>公文管理</BreadcrumbItem>
                <BreadcrumbItem>发文处理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="top">
            <Button v-if="!circulatedShow" type="success" @click="send">
                <Icon type="paper-airplane"></Icon>
                发送
            </Button>
            <Button v-if="circulatedShow" type="success" @click="circulated">
                <Icon type="paper-airplane"></Icon>
                传阅
            </Button>
            <Button v-if="!circulatedShow" @click="draft">存草稿</Button>
            <Button @click="cancel">取消</Button>
        </div>
        <div class="center">
            <!-- <div class="divStyle">
                <span style="color:rgb(30, 107, 223)">收件人：</span>
                <input type="text" placeholder="输入收件人姓名">
            </div> -->
            <div class="divStyle">
                <span style="color:rgb(30, 107, 223)">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题：</span>
                <input type="text" v-model="model.title">
            </div>
            <!-- <div class="post-dep clear">
                <div class="label">
                    <span style="color:gray">发送部门：</span>
                </div>
                <CheckboxGroup v-model="model.department_code">
                    <Checkbox v-for="(item,index) in departmentList" :key="index" :label="item.department_name"></Checkbox>
                </CheckboxGroup>
            </div> -->
            <div class="fujian divStyle">
                <!-- <Upload :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/">
                    <Icon type="paperclip"></Icon>
                    <span class="addDocument">添加附件</span>
                    <span>{{filename}}</span>
                </Upload> -->
                <Upload :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/">
                    <Icon type="paperclip"></Icon>
                    <span class="addDocument">添加附件</span>
                </Upload>
                <input v-if="filename" v-model="filename"></input>
                <input v-else="filename" v-model="model.attachment_name"></input>
            </div>
            <div class="textarea">
                <quill-editor v-model="model.deo_detail">
                </quill-editor>
            </div>
        </div>
        <div class="bottom">
            <Button v-if="!circulatedShow" type="success" @click="send">
                <Icon type="paper-airplane"></Icon>
                发送
            </Button>
            <Button v-if="circulatedShow" type="success" @click="circulated">
                <Icon type="paper-airplane"></Icon>
                传阅
            </Button>
            <Button @click="cancel">取消</Button>
        </div>
        <Modal v-model="senDep" title="请选择需要发送的部门" @on-ok="ok">
            <CheckboxGroup @on-change="checkSelect" v-model="checkBox">
                <Checkbox v-for="(item,index) in depList" :key="index" :label="item.department_name"></Checkbox>
            </CheckboxGroup>
        </Modal>
    </div>
</template>

<script>
    import { getDepList } from 'api/bumenlist'
    import { addresseeApi, uploadApi } from 'api/daily-office'
    import { getLocalStorage } from 'common/js/dom'
    import { initTime } from 'common/js/util'
    export default {
        props: {
            model: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        data() {
            return {
                filename: '',
                file: null,
                loadingStatus: false,
                circulatedShow: false,
                senDep: false,
                depList: [],
                departmentList: [],
                checkBox: [],
                nextDepList: [],
                uploadAttach: [],
                resultArr: []
            };
        },
        created() {
            if (this.model.status === '发布') {
                this.circulatedShow = true
            }
            this.getDepartment()
            getLocalStorage('info').department_level
        },
        methods: {
            handleUpload(file) {
                this.file = file;
                this.filename = file.name
                return false;
            },
            upload() {
                this.loadingStatus = true;
                let form = new FormData()
                form.append("file", this.file)
                uploadApi(form).then(res => {
                    if (res.code === '0000') {
                        this.uploadAttach = res.result
                        this.file = null
                        this.loadingStatus = false
                    }
                })
            },
            circulated() {
                this.senDep = true
                this.depList = this.nextDepList
                this.$emit('circulated', this.model)
            },
            checkSelect(arr) {
                let checkboxArr = []
                arr.map(item => {
                    this.departmentList.map(_item => {
                        if (item === _item.department_name) {
                            checkboxArr.push(_item)
                        }
                    })
                })
                this.resultArr = checkboxArr
            },
            ok() {
                if (this.file) {
                    let form = new FormData()
                    form.append("file", this.file)
                    uploadApi(form).then(res => {
                        if (res.code === '0000') {
                            this.file = null
                            this.loadingStatus = false
                            this.model.status = '发布'
                            this.model.createby = getLocalStorage('info').username
                            this.model.created = initTime()
                            this.model.releasedt = initTime()
                            this.model.releaseby = getLocalStorage('info').username
                            this.model.receiveby = []
                            this.model.attachment_name = res.result[0].filename
                            this.model.attachment_path = res.result[0].path
                            if (this.circulatedShow == true) {
                                this.model.department_code = this.model.department_code.concat(this.resultArr)
                            } else {
                                this.model.department_code = this.resultArr
                            }
                            this.$emit("send", this.model);
                        }
                    })
                } else {
                    this.model.status = '发布'
                    this.model.createby = getLocalStorage('info').username
                    this.model.created = initTime()
                    this.model.releasedt = initTime()
                    this.model.releaseby = getLocalStorage('info').username
                    this.model.receiveby = []
                    if (this.circulatedShow == true) {
                        this.model.department_code = this.model.department_code.concat(this.resultArr)
                    } else {
                        this.model.department_code = this.resultArr
                    }
                    this.$emit("send", this.model);
                }
            },
            // 存为草稿
            draft() {
                if (this.file) {
                    let form = new FormData()
                    form.append("file", this.file)
                    uploadApi(form).then(res => {
                        if (res.code === '0000') {
                            // this.uploadAttach = res.result
                            this.file = null
                            this.loadingStatus = false
                            this.model.status = '草稿'
                            this.model.createby = getLocalStorage('info').username
                            this.model.created = initTime()
                            this.model.releasedt = ''
                            this.model.releaseby = ''
                            this.model.receiveby = []
                            if (this.circulatedShow == true) {
                                this.model.department_code = this.model.department_code.concat(this.resultArr)
                            } else {
                                this.model.department_code = this.resultArr
                            }
                            this.$emit("draft", this.model);
                        }
                    })
                } else {
                    this.model.status = '草稿'
                    this.model.createby = getLocalStorage('info').username
                    this.model.created = initTime()
                    this.model.releasedt = ''
                    this.model.releaseby = ''
                    this.model.receiveby = []
                    this.model.attachment_name = res.result[0].filename
                    this.model.attachment_path = res.result[0].path
                    if (this.circulatedShow == true) {
                        this.model.department_code = this.model.department_code.concat(this.resultArr)
                    } else {
                        this.model.department_code = this.resultArr
                    }
                    this.$emit("draft", this.model);
                }
            },
            // 点击发送
            send() {
                this.senDep = true
                this.depList = this.departmentList
            },
            // 点击取消
            cancel() {
                this.$emit('cancel', 'false')
            },
            // 获取全部部门信息
            getDepartment() {
                getDepList().then(res => {
                    if (res.code === "0000") {
                        let level = getLocalStorage('info').department_level
                        let code = getLocalStorage('info').department_code
                        res.result.result.map(item => {
                            if (item.level == level) {
                                this.departmentList.push({
                                    "department_name": item.fullname,
                                    "department_code": item.code
                                })
                            }
                            if (item['level' + level] == code && item.level == parseInt(level) + 1) {
                                this.departmentList.push({
                                    "department_name": item.fullname,
                                    "department_code": item.code
                                })
                                this.nextDepList.push({
                                    "department_name": item.fullname,
                                    "department_code": item.code
                                })
                            }
                        });
                    }
                });
            },
        }
    };
</script>
<style scoped lang="scss">
    .post {
        height: 100%;
        .title {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: row;
            width: 100%;
            background: rgb(237, 246, 250);
            height: 50px;
            line-height: 50px;
            padding-left: 10px;
            >span {
                font-size: 14px;
                font-weight: 600;
            }
        }
        .top {
            margin-top: 60px;
        }
        .center {
            .fujian {
                div {
                    display: inline-block;
                }
                .addDocument:hover {
                    color: blue;
                }
                .addDocument {
                    color: rgb(30, 107, 223);
                    cursor: pointer;
                }
                i {
                    position: relative;
                    top: 2px;
                    font-size: 20px;
                }
            }
            .bottom{
                margin-top: 30px;
            }
            .divStyle {
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #ccc;
                input {
                    height: 30px;
                    width: 70%;
                    border: none;
                }
            }
            .post-dep {
                position: relative;
                padding: 10px 0 10px 60px;
                border-bottom: 1px solid #ccc;
                .label {
                    width: 60px;
                    padding-top: 10px;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            }
            .textarea {
                height: 550px;
                .quill-editor {
                    height: 500px;
                }
            }
        }
    }
</style>