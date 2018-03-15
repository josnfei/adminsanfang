<template>
    <div class="addressee">
        <div class="title">
            <span>位置： </span>
            <Breadcrumb separator=">">
                <BreadcrumbItem>日常办公</BreadcrumbItem>
                <BreadcrumbItem>公文管理</BreadcrumbItem>
                <BreadcrumbItem>收文处理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="button-default">
            <Button @click="deleteBtn">删除</Button>
            <!-- <Button @click="circulated">传阅</Button> -->
            <Button @click="addressee">收文</Button>
            <Button @click="drafBox">草稿 </Button>
            <div class="post-document">
                <Button type="info" @click="postBtn">发公文</Button>
            </div>
        </div>
        <div class="table">
            <Table @on-selection-change="selectedChange" :loading="loading" ref="selection" stripe size="small" highlight-row :columns="tableThead"
                :data="tableTbody">
            </Table>
        </div>
        <div class="page pageStyle pull-right">
            <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
        </div>
        <div class="postPage" v-if="postPageShow">
            <post-document :model="formItem" @circulated='circulated' @send="send" @cancel="cancel" @draft="draft"></post-document>
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
    import { addresseeThead, draftThead } from "common/js/table";
    import { addresseeApi } from "api/daily-office";
    import { successNotice, errorNotice, getLocalStorage } from "common/js/dom";
    import postDocument from "./post";
    export default {
        components: {
            postDocument
        },
        data() {
            return {
                sureDelete: false,
                postObj: {
                    page: 1,
                    pageSize: 10,
                    searchValue: {},
                    order: {
                        _id: -1
                    }
                },
                formItem: {},
                postPageShow: false,
                total: 0,
                tableThead: addresseeThead(this),
                tableTbody: [],
                loading: false,
                postDocument: false,
                _ids: [],
                status: '收文',
                apiType: 'list'
            };
        },
        created() {
            this.getList();
        },
        methods: {
            // 点击新增页传阅
            circulated(){
                this.apiType = 'edit'
            },
            // 点击草稿
            drafBox() {
                this.status = '草稿'
                this.tableThead = draftThead(this);
                this.getDraftList();
            },
            // 点击收文
            addressee() {
                this.status = '收文'
                this.tableThead = addresseeThead(this);
                this.getList();
            },
            // 获取所有草稿状态的数据
            getDraftList() {
                this.postObj.searchValue = {
                    status: "草稿"
                };
                addresseeApi("list", this.postObj).then(res => {
                    if (res.code === "0000") {
                        this.tableTbody = res.result.result;
                        this.total = res.result.totalSize;
                    }
                });
            },
            // 获取所有收文状态的数据
            getList() {
                this.postObj.searchValue = {
                    status: "发布"
                };
                addresseeApi("list", this.postObj).then(res => {
                    if (res.code === "0000") {
                        this.tableTbody = res.result.result;
                        this.total = res.result.totalSize;
                    }
                });
            },
            // 点击删除按钮
            deleteBtn() {
                this.sureDelete = true
            },
            selectedChange(selection) {
                this._ids = [];
                selection.map(item => {
                    this._ids.push(item._id);
                });
            },
            pageChange() { },
            // 确认删除
            sureDdels() {
                this.sureDelete = false;
                addresseeApi("delete", { _ids: this._ids.join(",") }).then(res => {
                    if (res.code === "0000") {
                        successNotice("删除成功");
                        this.getList();
                    } else {
                        successNotice('删除失败')
                    }
                });
                if(this.status === '草稿'){
                    this.getDraftList()
                }else{
                    this.getList()
                }
            },
            // 点击发公文
            postBtn() {
                this.apiType = 'new'
                this.formItem = {};
                this.postPageShow = true;
            },
            details(obj) {
                this.postPageShow = true;
                console.log(obj)
                this.formItem = obj;
            },
            // 确定发送
            send(obj) {
                addresseeApi(this.apiType, obj).then(res => {
                    if (res.code === "0000") {
                        this.postPageShow = false;
                        successNotice("发布成功");
                        this.getList();
                    }
                });
            },
            // 点击取消
            cancel() {
                this.postPageShow = false;
            },
            // 存为草稿
            draft(obj) {
                addresseeApi("new", obj).then(res => {
                    if (res.code === "0000") {
                        this.postPageShow = false;
                        successNotice("已成功存为草稿");
                        this.getList();
                    }
                });
            }
        }
    };
</script>
<style scoped lang="scss">
    .addressee {
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
        .button-default {
            position: relative;
            display: flex;
            margin-bottom: 10px;
            >button {
                margin-right: 10px;
            }
            .post-document {
                position: absolute;
                right: 0;
            }
        }
        .postPage {
            padding: 0 10px;
            z-index: 3;
            height: 100%;
            width: 100%;
            background: #fff;
            position: absolute;
            top: 0;
            left: 0;
        }
        .buttons {
            display: flex;
            margin-bottom: 10px;
            >div:nth-child(2) {
                display: flex;
                margin: 0 10px;
                border-radius: 5px;
                overflow: hidden;
                button {
                    border-radius: 0;
                }
            }
        }
    }
</style>