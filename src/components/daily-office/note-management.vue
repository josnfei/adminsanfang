<template>
    <div class="note-mgr">
        <div class="title">
            <span>位置： </span>
            <Breadcrumb separator=">">
                <BreadcrumbItem>日常办公</BreadcrumbItem>
                <BreadcrumbItem>短信管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="button-default">
            <div>
                <Button @click="draft">草稿箱</Button>
                <Button @click="closed">发件箱</Button>
            </div>
            <div class="pull-right">
                <Button type="primary" @click="addNote">新建短信</Button>
                <Button type="info" @click="send">发送短信</Button>
                <Button v-if="showDelete" type="success" @click="deleteNote">删除短信</Button>
            </div>
        </div>
        <div class="table">
            <Table border="" @on-selection-change="selectedChange" :loading="loading" ref="selection" stripe size="small" highlight-row
                :columns="tableThead" :data="tableTbody">
            </Table>
        </div>
        <div class="page pageStyle pull-right">
            <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
        </div>
        <Modal v-model="addPageShow" class="modal" style="width:660px">
            <div slot="header">编辑短信</div>
            <Form :model="formItem" :label-width="70">
                <Form-item label="标题:" prop="title">
                    <Input v-model="formItem.title" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="内容：" prop="message_content">
                    <textarea v-model="formItem.message_content" placeholder="请输入短信内容..." style="width:80%" name="" id="" cols="30" rows="5"></textarea>
                    <!-- <Input v-model="formItem.title" placeholder="请输入"></Input> -->
                </Form-item>
                <Form-item label="收件人：">
                    <Tree :data="treeData" show-checkbox @on-check-change="selectAddressBook"></Tree>
                </Form-item>
            </Form>
            <div slot="footer">
                <Button @click="cancel">关闭</Button>
                <Button type="primary" @click="ok">保存</Button>
                <!-- <Button v-if="btnChange" type="primary" @click="changeNotice">修改</Button> -->
            </div>
        </Modal>
        <!-- 选择收信人 -->
        <!-- <Modal class-name="modal" v-model="modelShow" title="请选择收信人" @on-ok="send">
            <Tree :data="treeData" show-checkbox @on-check-change="selectAddressBook"></Tree>
        </Modal> -->
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
    import { noteClosedThead, noteSendThead } from "common/js/table";
    import { initTime } from 'common/js/util'
    import { noteApi } from 'api/daily-office'
    import { getLocalStorage, successNotice, errorNotice } from 'common/js/dom'
    import { getDepList } from 'api/bumenlist'
    import { addressBookApi } from 'api/daily-office';
    export default {
        data() {
            return {
                showDelete: true,
                sureDelete: false,
                treeData: [],
                modelShow: false,
                loading: false,
                tableThead: noteSendThead(this),
                tableTbody: [],
                addPageShow: false,
                total: 0,
                formItem: {},
                departmentList: [],
                addressBookList: [],
                telephoneList: [],
                postObj: {
                    order: { _id: -1 },
                    page: 1,
                    pageSize: 10,
                    searchValue: {}
                },
                apiType: 'list',
                _ids: [],
                status: '草稿',
                noteList: []
            }
        },
        created() {
            this._getDepList()
            this.postObj.searchValue = {
                status: '草稿'
            }
            this.getList()
        },
        methods: {
            cancel() {
                this.addPageShow = false
            },
            closed() {
                this.status = '已发送'
                this.showDelete = false
                this.postObj.searchValue = {
                    status: '已发送'
                }
                this.getList()
            },
            draft() {
                this.showDelete = true
                this.status = '草稿'
                this.postObj.searchValue = {
                    status: '草稿'
                }
                this.getList()
            },
            getList() {
                noteApi('list', this.postObj).then(res => {
                    if (res.code === '0000') {
                        this.tableTbody = res.result.result
                        this.total = res.result.totalSize
                    }
                })
            },
            selectAddressBook(arr) {
                this.telephoneList = []
                arr.map(item => {
                    if (item.telephone) {
                        this.telephoneList.push(item.telephone)
                    }
                })
                this.formItem.send_phones = this.telephoneList
            },
            // 获取所有部门信息
            _getDepList() {
                let code = getLocalStorage('info').department_code
                let level = getLocalStorage('info').department_level
                getDepList().then(res => {
                    if (res.code === '0000') {
                        this.departmentList = this.filterDepartment(res.result.result, code, level)
                        addressBookApi('list').then(res => {
                            if (res.code === '0000') {
                                this.addressBookList = this.filterAddressBook(res.result.result)
                                this.treeData = this.getTreeData(this.departmentList, this.addressBookList)
                                this.treeData.map(item => {
                                    if (!item.children.length) {
                                        item.disabled = true
                                    }
                                })
                            }
                        })
                    }
                })
            },
            // 筛选所有下级部门
            filterDepartment(arr, code, level) {
                let newArr = []
                let str = 'level' + level
                arr.map(item => {
                    if (item.level == parseInt(level) + 1 && item[str] == code) {
                        newArr.push({
                            title: item.fullname,
                            code: item.code,
                            children: [],
                            disabled: false
                        })
                    }
                })
                return newArr
            },
            // 格式化通讯录格式
            filterAddressBook(arr) {
                let newArr = []
                arr.map(item => {
                    newArr.push({
                        department_code: item.department_code,
                        name: item.name,
                        telephone: item.telephoe,
                        title: item.name
                    })
                })
                return newArr
            },
            // 得到树形控件的数据
            getTreeData(arr1, arr2) {
                arr1.map(item => {
                    arr2.map(_item => {
                        if (item.code === _item.department_code) {
                            item.children.push(_item)
                        }
                    })
                })
                return arr1
            },
            addNote() {
                this.addPageShow = true
            },
            // 短信群发
            noteMass() {
                // this.modelShow = true
            },
            deleteNote() {
                this.sureDelete = true

            },
            selectedChange(section) {
                this._ids = []
                section.map(item => {
                    this._ids.push(item._id)
                })
                this.noteList = section
                console.log(this.noteList)
            },
            pageChange(index) {
                this.postObj.page = index
                this.getList()
            },
            ok() {
                this.formItem.status = '草稿'
                this.formItem.createby = getLocalStorage('info').username
                this.formItem.createdt = initTime()
                noteApi('new', this.formItem).then(res => {
                    this.addPageShow = false
                    if (res.code === '0000') {
                        successNotice('编辑成功')
                        this.postObj.searchValue = {
                            status: '草稿'
                        }
                        this.getList()
                    } else {
                        errorNotice('编辑失败')
                    }
                })
                // console.log(this.formItem)
            },
            // 确认发送
            send() {
                if (this.noteList.length === 1) {
                    let obj = this.noteList[0]
                    obj.sendby = getLocalStorage('info').username
                    obj.senddt = initTime()
                    noteApi('send', obj).then(res => {
                        if (res.code === '0000') {
                            this.postObj.searchValue = {
                                status: '已发送'
                            }
                            this.getList()
                            successNotice('发送成功')
                        } else {
                            errorNotice('发送失败')
                        }
                    })
                } else if (this.noteList.length === 0) {
                    errorNotice('请选择一条短信', true)
                } else {
                    errorNotice('抱歉，本系统不支持多条短信群发，请选择一条短信', true)
                }
            },
            sureDdels() {
                let obj = { _ids: this._ids.join(',') }
                noteApi('delete', obj).then(res => {
                    this.sureDelete = false
                    if (res.code === '0000') {
                        successNotice("删除成功")
                        this.postObj.searchValue = {
                            status: this.status
                        }
                        this.getList()
                    } else {
                        errorNotice("删除失败", true)
                    }
                })
            },
        }
    }
</script>
<style scoped lang="scss">
    .note-mgr {
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
            right: 0;
            display: flex;
            height: 32px;
            margin-bottom: 10px;
            >button {
                margin-right: 10px;
            }
            >.pull-right {
                position: absolute;
                right: 0;
            }
        }
    }
</style>