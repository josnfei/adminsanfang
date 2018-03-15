<template>
    <div class="notice">
        <div class="title">
            <span>位置： </span>
            <Breadcrumb separator=">">
                <BreadcrumbItem>日常办公</BreadcrumbItem>
                <BreadcrumbItem>通知公告</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="search">
            <span class="search_title">状态</span>
            <Select v-model="searchVal.status" placeholder="请选择" :clearable="true" style="width:200px;padding-left: 10px;padding-right: 20px">
                <Option value="草稿">草稿</Option>
                <Option value="发布">发布</Option>
            </Select>
            <div class="searchBtn" @click="search">
                <Button type="ghost" shape="circle" icon="ios-search"></Button>
            </div>
            <div class="add pull-right" @click="add">
                <Button type="primary">
                    <span class="icon-xinzeng"></span>新增</Button>
            </div>
            <div class="add green pull-right" style="marginRight:5px" @click="release">
                <Button type="primary" icon="checkmark-circled">
                    <span></span>发布</Button>
            </div>
        </div>
        <div class="table">
            <Table @on-selection-change="selectedChange" @on-select="selected" @on-select-all="selectedAll" :loading="loading" ref="selection"
                border stripe size="small" highlight-row :columns="tableThead" :data="tableTbody">
            </Table>
        </div>
        <div class="page pageStyle pull-right">
            <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
        </div>
        <!-- 新增/修改 -->
        <div class="addPage" v-show="addPageShow">
            <div class="title">
                <span>位置： </span>
                <Breadcrumb separator=">">
                    <BreadcrumbItem>日常办公</BreadcrumbItem>
                    <BreadcrumbItem>通知公告</BreadcrumbItem>
                    <BreadcrumbItem>{{moduleTitel}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="insertInfo">
                <Form ref="formItem" :model="formItem" :rules="ruleValidate">
                    <table class="ed-table">
                        <tbody>
                            <tr>
                                <td class="ed-label">标题</td>
                                <td class="ed-content" colspan="3">
                                    <FormItem style="margin:0" prop="title">
                                        <Input v-model="formItem.title" placeholder="请输入" style="width:80%"></Input>
                                    </FormItem>
                                </td>
                                <td class="ed-label">状态</td>
                                <td class="ed-content">
                                    <FormItem style="margin: 0">
                                        <Select v-model="formItem.status" :disabled="formDisabled" placeholder="请选择" style="width:200px" disabled>
                                            <Option value="草稿">草稿</Option>
                                            <Option value="发布">发布</Option>
                                        </Select>
                                    </FormItem>
                                </td>
                            </tr>
                            <tr style="height:80px">
                                <td class="ed-label">通知公告内容</td>
                                <td class="ed-content" colspan="5">
                                    <FormItem style="margin:0" prop="notice_desc">
                                        <Input type="textarea" v-model="formItem.notice_desc" placeholder="请输入" style="width:95%"></Input>
                                    </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <td class="ed-label">上传附件</td>
                                <td class="ed-content upload" colspan="5">
                                    <div>
                                        <Upload :before-upload="handleUpload" action="http://192.168.1.138:8080/sanfangstruts/oa/sf_notice/upload?system_id=1000010">
                                            <Button type="ghost" icon="ios-cloud-upload-outline">选择上传文件</Button>
                                        </Upload>
                                        <!-- <div style="marginLeft:5px;lineHeight:33px">{{formItem.attachment_name}}
                                        </div> -->
                                        <input style="marginLeft:5px;lineHeight:33px;border:none" v-if="filename" v-model="filename"></input>
                                        <input style="marginLeft:5px;lineHeight:33px;border:none" v-else="filename" v-model="formItem.attachment_name"></input>
                                        <!-- <Button type="info" v-if="file !== null" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : '确定上传' }}</Button> -->
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="ed-label">上传图片</td>
                                <td class="ed-content" colspan="5">
                                    <div class="demo-upload-list" v-for="item in uploadList">
                                        <template v-if="uploadList.length">
                                            <img :src="imgDefaultUrl + item.path">
                                            <div class="demo-upload-list-cover">
                                                <Icon type="ios-eye-outline" @click.native="handleView(item.path)"></Icon>
                                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                        </template>
                                    </div>
                                    <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']"
                                        :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
                                        :before-upload="handleBeforeUpload" multiple type="drag" :action="uploadUrl" style="display: inline-block;width:58px;">
                                        <div style="width: 58px;height:58px;line-height: 58px;">
                                            <Icon type="camera" size="20"></Icon>
                                        </div>
                                    </Upload>
                                    <Modal title="查看图片" v-model="visible">
                                        <img :src="imgName" v-if="visible" style="width: 100%">
                                    </Modal>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Form>
            </div>
            <div class="save pull-right">
                <Button type="primary" size="large" @click="save('formItem')" style="margin-right:15px">保存</Button>
                <Button type="ghost" size="large" @click="cancel">关闭</Button>
            </div>
        </div>
        <!--确认删除  -->
        <Modal v-model="sureDelete" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除</span>
            </p>
            <div style="text-align:center">
                <p>确认删除？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="sureDdels">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { noticeThead } from "common/js/table";
    import { noticeRules } from "common/js/rules";
    import { successNotice, errorNotice, getLocalStorage } from "common/js/dom";
    import { noticeApi, releaseApi, uploadApi, url } from "api/daily-office";
    import { httpUrl } from "api/config";
    import OperationTable from "base/operation-table/operation-table";
    import { getDepList } from "api/bumenlist";
    import { initTime } from "common/js/util";
    import { mapGetters } from "vuex";
    export default {
        computed: {
            ...mapGetters(["NOTICEID"])
        },
        data() {
            return {
                apiType: "list",
                defaultList: [
                    {
                        name: "a42bdcc1178e62b4694c830f028db5c0",
                        url:
                            "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
                    },
                    {
                        name: "bc7521e033abdd1e92222d733590f104",
                        url:
                            "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
                    }
                ],
                filename: "",
                imgName: "",
                visible: false,
                uploadList: [],
                file: null,
                loadingStatus: false,
                formItem: {
                    status: "草稿"
                },
                formDisabled: false,
                ruleValidate: noticeRules,
                searchVal: {},
                tableThead: noticeThead(this),
                tableTbody: [],
                loading: false,
                total: 0,
                addPageShow: false,
                sureDelete: false,
                moduleTitel: "新增",
                deleteObj: {},
                releaseId: "",
                postObj: {
                    page: 1,
                    pageSize: 10,
                    searchValue: {},
                    order: {
                        _id: -1
                    }
                },
                uploadAttach: [],
                uploadImg: [],
                uploadUrl: "",
                imgDefaultUrl: httpUrl
            };
        },
        mounted() {
            this.uploadUrl = url();
            this.getList();
            if (this.NOTICEID) {
                this.addPageShow = true;
                this.moduleTitel = "详情";
                this.formItem = this.NOTICEID;
            }
        },
        methods: {
            selected(selection, row) {
                this.releaseId = selection.map(item => {
                    return item._id;
                });
            },
            selectedAll(selection) {
                this.releaseId = selection.map(item => {
                    return item._id;
                });
            },
            selectedChange(selection) {
                this.releaseId = selection.map(item => {
                    return item._id;
                });
            },
            // 点击发布
            release() {
                let obj = {
                    _ids: this.releaseId,
                    status: "发布"
                };
                releaseApi(obj).then(res => {
                    if (res.code === "0000") {
                        this.getList();
                        successNotice("发布成功");
                    }
                });
            },
            // 查看大图
            handleView(name) {
                this.imgName = httpUrl + name;
                this.visible = true;
            },
            // 删除图片
            handleRemove(file) {
                const fileList = this.uploadList;
                this.uploadList.splice(fileList.indexOf(file), 1);
            },
            // 图片上传成功
            handleSuccess(res, file) {
                this.uploadList.push(res.result[0]);
            },
            // 选择的文件格式不正确
            handleFormatError(file) {
                this.$Notice.warning({
                    title: "警告！",
                    desc:
                        "文件 ' + file.name + ' 格式不正确，请上传 jpg 、 jpeg 或 png 格式的图片"
                });
            },
            // 上传的图片超出指定大小限制
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: "警告！",
                    desc: "文件  " + file.name + " 太大, 不能超过2M"
                });
            },
            // 图片上传之前的钩子函数
            handleBeforeUpload(file) {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: "Up to five pictures can be uploaded."
                    });
                }
                return check;
            },
            // 选择上传的附件
            handleUpload(file) {
                this.file = file;
                this.filename = file.name;
                return false;
            },
            // 确认上传
            upload() {
                this.loadingStatus = true;
                let form = new FormData();
                form.append("file", this.file);
                uploadApi(form).then(res => {
                    if (res.code === "0000") {
                        this.uploadAttach = res.result;
                        this.file = null;
                        this.loadingStatus = false;
                    }
                });
            },
            // 获取全部数据
            getList() {
                this.loading = true;
                noticeApi("list", this.postObj).then(res => {
                    if (res.code === "0000") {
                        this.loading = false;
                        this.tableTbody = res.result.result;
                        this.total = res.result.totalSize;
                    }
                });
            },
            // 点击新增
            add() {
                this.formItem = {};
                this.filename = "";
                this.uploadList = [];
                this.moduleTitel = "新增";
                this.addPageShow = true;
                this.apiType = "new";
                this.formItem.status = "草稿";
            },
            // 点击修改
            edit(dataObj) {
                this.formItem = {};
                this.filename = "";
                this.filename = "";
                this.formItem = [];
                this.moduleTitel = "修改";
                this.addPageShow = true;
                this.apiType = "edit";
                this.formItem = dataObj;
                if (this.formItem.picture) {
                    this.uploadList = this.formItem.picture;
                }
            },
            // 点击搜索
            search() {
                for (var i in this.searchVal) {
                    if (!this.searchVal[i]) {
                        delete this.searchVal[i];
                    }
                }
                this.postObj.searchValue = this.searchVal;
                this.getList();
            },
            // 点击详情
            details(dataObj) {
                this.filename = "";
                this.formItem = {};
                this.moduleTitel = "详情";
                this.addPageShow = true;
                this.formItem = dataObj;
                if (this.formItem.picture) {
                    this.uploadList = this.formItem.picture;
                }
            },
            // 分页
            pageChange(index) {
                this.postObj.page = index;
                this.getList();
            },
            // 点击删除
            delete(dataObj) {
                this.sureDelete = true;
                this.apiType = "delete";
                this.deleteObj = {
                    _id: dataObj._id
                };
            },
            // 确认删除
            sureDdels() {
                this.sureDelete = false;
                noticeApi(this.apiType, this.deleteObj).then(res => {
                    if (res.code === "0000") {
                        successNotice(res.message);
                        this.getList();
                    } else {
                        errorNotice(res.message);
                        this.getList;
                    }
                });
            },
            // 确定新增/修改
            save(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {                        
                        // 判断有没有要上传的附件
                        if (this.file) {
                            this.loadingStatus = true;
                            let form = new FormData();
                            form.append("file", this.file);
                            uploadApi(form).then(res => {
                                if (res.code === "0000") {
                                    this.uploadAttach = res.result;
                                    this.file = null;
                                    this.loadingStatus = false;
                                    if (this.uploadList.length) {
                                        this.formItem.picture = this.uploadList.map(item => {
                                            return {
                                                name: item.name || item.filename,
                                                path: item.path
                                            };
                                        });
                                    }
                                    if (this.uploadAttach.length) {
                                        this.formItem.attachment_name = this.uploadAttach[0].filename;
                                        this.formItem.attachment_path = this.uploadAttach[0].path;
                                    }
                                    this.formItem.createby = getLocalStorage("info").username;
                                    this.formItem.createdt = initTime();
                                    noticeApi(this.apiType, this.formItem).then(res => {
                                        this.addPageShow = false;
                                        if (res.code === "0000") {
                                            successNotice(res.message);
                                            this.getList();
                                        } else {
                                            errorNotice(res.message);
                                            this.getList();
                                        }
                                    });
                                }
                            });
                        } else {
                            if (this.uploadList.length) {
                                this.formItem.picture = this.uploadList.map(item => {
                                    return {
                                        name: item.name || item.filename,
                                        path: item.path
                                    };
                                });
                            }
                            if (this.uploadAttach.length) {
                                this.formItem.attachment_name = this.uploadAttach[0].filename;
                                this.formItem.attachment_path = this.uploadAttach[0].path;
                            }
                            this.formItem.createby = getLocalStorage("info").username;
                            this.formItem.createdt = initTime();
                            noticeApi(this.apiType, this.formItem).then(res => {
                                this.addPageShow = false;
                                if (res.code === "0000") {
                                    successNotice(res.message);
                                    this.getList();
                                } else {
                                    errorNotice(res.message);
                                    this.getList();
                                }
                            });
                        }
                    }
                })
            },
            cancel() {
                this.addPageShow = false;
            }
        }
    };
</script>
<style scoped lang="scss">
    .notice {
        .green {
            button {
                background: #19be6b !important;
                padding-left: 10px;
            }
        }
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
        .search {
            margin-bottom: 15px;
            .searchBtn {
                display: inline-block;
            }
        }
        .addPage {
            padding: 0 10px;
            z-index: 3;
            height: 100%;
            width: 100%;
            background: #fff;
            position: absolute;
            top: 0;
            left: 0;
        }
        .insertInfo {
            padding-top: 60px;
            width: 100%;
            .ed-table {
                margin-bottom: 20px;
                width: 100%;
                tr {
                    height: 50px;
                    .demo-upload-list {
                        display: inline-block;
                        width: 60px;
                        height: 60px;
                        text-align: center;
                        line-height: 60px;
                        border: 1px solid transparent;
                        border-radius: 4px;
                        overflow: hidden;
                        background: #fff;
                        position: relative;
                        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
                        margin-right: 4px;
                    }
                    .demo-upload-list img {
                        width: 100%;
                        height: 100%;
                    }
                    .demo-upload-list-cover {
                        display: none;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: rgba(0, 0, 0, 0.6);
                    }
                    .demo-upload-list:hover .demo-upload-list-cover {
                        display: block;
                    }
                    .demo-upload-list-cover i {
                        color: #fff;
                        font-size: 20px;
                        cursor: pointer;
                        margin: 0 2px;
                    }
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
                    .upload {
                        >div {
                            display: flex;
                        }
                    }
                    td {
                        border: 1px solid #ccc;
                        padding: 0;
                        input[type="text"] {
                            width: 100%;
                            height: 40px;
                            border: none;
                            padding: 10px;
                        }
                    }
                }
            }
        }
    }
</style>