<template>
    <div class="task_manag">
        <div class="title">
            <span>位置： </span>
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
                <BreadcrumbItem>任务管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="search">
            <span class="search_title">部门名称</span>
            <Select clearable :label='searchVal.department_fullname' not-found-text='无匹配部门，请重新输入' v-model="searchVal.department_fullname" filterable
                remote :remote-method="autoSearch" @on-change='selected' :loading="selectLoading" style="width:200px;padding-left: 10px;padding-right: 20px">
                <Option v-for="(option, index) in autoCompleteData" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
            <span class="search_title">任务类型</span>
            <Select v-model="searchVal.task_type" placeholder="请选择" :clearable="true" style="width:200px;padding-left: 10px;padding-right: 20px">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div class="searchBtn" @click="search">
                <Button type="ghost" shape="circle" icon="ios-search"></Button>
            </div>
            <div class="refresh" @click="refresh">
                <Button>刷新</Button>
            </div>
            <div class="task_manag_add pull-right" @click="addBeforeTask" style='margin-left:15px'>
                <Button type="success">事前任务生成</Button>
            </div>
            <div class="task_manag_add pull-right" @click="add">
                <Button type="primary">添加日常任务</Button>
            </div>
        </div>
        <div class="table">
            <Table :loading="loading" border stripe size="small" highlight-row :columns="tableThead" :data="tableTbody"></Table>
        </div>
        <div class="page pull-right">
            <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
        </div>
        <!-- 新增/修改 -->
        <Modal v-model="disabled" width="650">
            <p slot="header" style="font-size:20px;text-align:center">
                <span>{{moduleTitle}}</span>
            </p>
            <div>
                <Form ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="130">
                    <FormItem label="任务概要" prop="task_profile">
                        <Input v-model="formItem.task_profile"></Input>
                    </FormItem>
                    <FormItem label="任务描述" prop="task_desc">
                        <Input type="textarea" v-model="formItem.task_desc"></Input>
                    </FormItem>
                    <FormItem label="执行部门（全称）" prop="department_name">
                        <Select clearable :label='formItem.department_fullname' not-found-text='无匹配部门，请重新输入' v-model="formItem.department_fullname" filterable
                            remote :remote-method="autoSearch" @on-change='selected' :loading="selectLoading">
                            <Option v-for="(option, index) in autoCompleteData" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="任务状态" prop="status">
                        <Select v-model="formItem.status" :disabled="formDisabled">
                            <Option value="未执行">未执行</Option>
                            <Option value="执行中">执行中</Option>
                            <Option value="已执行">已执行</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="任务负责人" prop="chargeby">
                        <Input v-model="formItem.chargeby"></Input>
                    </FormItem>
                    <FormItem label="任务负责人联系电话" prop="phoneno">
                        <Input v-model="formItem.phoneno"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="sureBtn('formItem')">确认</Button>
            </div>
        </Modal>
        <!--确认删除  -->
        <Modal v-model="sure_del" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除</span>
            </p>
            <div style="text-align:center">
                <p>确认删除？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="dels">确认</Button>
            </div>
        </Modal>
        <!-- 详情 -->
        <div class="edit" v-if="detDisabled">
            <div class="title">
                <span>位置： </span>
                <Breadcrumb separator=">">
                    <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
                    <BreadcrumbItem>
                        <a href="javascript:;" @click='cancel'>任务管理</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>详情</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="editHead">
                <span>基本信息</span>
            </div>
            <div class="editcontant">
                <table class="ta-table">
                    <tbody>
                        <tr>
                            <td class="ta-label">任务编号</td>
                            <td class="ta-content">{{detObj.task_no}}</td>
                            <td class="ta-label">执行部门名称</td>
                            <td class="ta-content">{{detObj.department_name}}</td>
                            <td class="ta-label">部门编号</td>
                            <td class="ta-content">{{detObj.department_code}}</td>
                        </tr>
                        <tr>
                            <td class="ta-label">部门级别</td>
                            <td class="ta-content">{{detObj.department_level}}</td>
                            <td class="ta-label">应急响应类型</td>
                            <td class="ta-content">{{detObj.response_type}}</td>
                            <td class="ta-label">应急响应级别</td>
                            <td class="ta-content">{{detObj.response_level}}</td>
                        </tr>
                        <tr>
                            <td class="ta-label">任务负责人</td>
                            <td class="ta-content">{{detObj.chargeby}}</td>
                            <td class="ta-label">任务负责人联系电话</td>
                            <td class="ta-content">{{detObj.phoneno}}</td>
                            <td class="ta-label">任务类型</td>
                            <td class="ta-content">{{detObj.task_type}}</td>
                        </tr>
                        <tr>
                            <td class="ta-label">任务概要</td>
                            <td class="ta-content">{{detObj.task_profile}}</td>
                            <td class="ta-label">计划开始时间</td>
                            <td class="ta-content">{{detObj.plan_startdate}}</td>
                            <td class="ta-label">计划结束时间</td>
                            <td class="ta-content">{{detObj.plan_enddate}}</td>
                        </tr>
                        <tr>
                            <td class="ta-label">任务描述</td>
                            <td class="ta-content" colspan="5">{{detObj.task_desc}}</td>
                        </tr>
                        <tr>
                            <td class="ta-label">执行状态</td>
                            <td class="ta-content">
                                <RadioGroup v-model="detObj.status">
                                    <Radio label="进行中">进行中</Radio>
                                    <Radio label="已完成">已完成</Radio>
                                    <Radio label="未完成">未完成</Radio>
                                </RadioGroup>
                            </td>
                            <td class="ta-label">任务实际开始时间</td>
                            <td class="ta-content">
                                <Input v-model="detObj.startdate" style="margin:5px;width:90%" placeholder="请输入"></Input>
                            </td>
                            <td class="ta-label">任务实际结束时间</td>
                            <td class="ta-content">
                                <Input v-model="detObj.enddate" style="margin:5px;width:90%" placeholder="请输入"></Input>
                            </td>
                        </tr>
                        <tr>
                            <td class="ta-label">要求上报的结果(单击录入)</td>
                            <td class="ta-content" colspan="5">
                                <!-- <router-link @click='saveFormObj' :to="'/home/threeBusiness/employment/'+item+'/'+detObj.department_code+'/'+detObj.department_name+'/'+detObj.department_level" v-for="(item,index) in formArr" :key="index">{{item}}</router-link> -->
                                <a href="javascript:;" @click='saveFormObj(item)' v-for="(item,index) in formArr" :key="index">{{item}}</a href="javascript#;">
                            </td>
                        </tr>
                        <tr>
                            <td class="ta-label">任务完成情况描述</td>
                            <td class="ta-content" colspan="5">
                                <Input v-model="detObj.complete_desc" type="textarea" style="margin:5px;width:90%" placeholder="请输入"></Input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="editFooter">
                <Button type="ghost" @click='cancel' style="marginRight:20px">关闭</Button>
                <Button type="primary" @click='save'>保存</Button>
            </div>
        </div>
        <!-- 录入 -->
        <div class="report" v-if='showReport'>
            <Report :departInfo='departInfo' @saveAndReturn='saveAndReturn'></Report>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { preTaskThead, taskManaThead } from "common/js/table";
    import { depTaskQuery } from "common/js/query";
    import { getTaskCryList, addTaskCry, editTaskCry, deleteTaskCry, addBeforeTask} from "api/task_management";
    import { taskManager } from "common/js/rules";
    import { getLocalStorage, successNotice, errorNotice } from "common/js/dom";
    import { initTime, filterDepartment, divisionArr } from "common/js/util";
    import { getDepList } from "api/bumenlist";
    import Report from "../../dep-management/pagemodel/Report.vue";
    import {cloneObj} from 'common/js/util'
    export default {
        components: {
            Report
        },
        computed: {
            ...mapGetters(["IsShow"])
        },
        data() {
            return {
                departmentInfo: [],
                dataList: [],
                loading: false,
                departInfo: {},
                showReport: false,
                detObj: {},
                detDisabled: false,
                autoCompleteData: [],
                departmentList: [],
                selectLoading: false,
                sure_del: false,
                delObj: {},
                disabled: false,
                formItem: {},
                formDisabled: false,
                moduleTitle: "新增",
                ruleValidate: taskManager,
                tableThead: taskManaThead(this),
                tableTbody: [],
                total: 0,
                searchVal: {
                    task_type: ""
                },
                depList: depTaskQuery().depList,
                typeList: depTaskQuery().typeList,
                postObj: {
                    order: { _id: -1 },
                    searchValue: {}
                },
                formArr: [],
                code: ''
            };
        },
        created() {
            this.getDapList();
            setTimeout(() => {
                this.getList();
            }, 100);
        },
        methods: {
            // 刷新
            refresh(){
                this.postObj.searchValue = {}
                this.getList()
            },
            saveAndReturn(value) {
                this.showReport = value;
            },
            saveFormObj(name) {
                this.departInfo = {
                    name: name,
                    department_code: this.detObj.department_code,
                    department_name: this.detObj.department_name,
                    department_level: this.detObj.department_code
                };
                this.showReport = true;
            },
            // 事前任务生成
            addBeforeTask() {
                addBeforeTask().then(res => {
                    if (res.code === "0000") {
                        this.$Message.success(res.message);
                        this.getList();
                    }
                });
            },
            // 选择执行部门全称
            selected(value) {
                if(value){
                    let index = this.departmentList.findIndex(item => value === item.department_fullname)
                    this.formItem.department_name = this.departmentList[index].department_name
                    this.formItem.department_level = this.departmentList[index].department_level
                    this.formItem.department_code = this.departmentList[index].department_code
                    this.code = this.departmentList[index].department_code
                    // this.getRespontResult({ department_code: this.formItem.department_code })
                }
            },
            // 部门自动搜索
            autoSearch(query) {
                if (query !== '') {
                    this.selectLoading = true;
                    setTimeout(() => {
                        this.selectLoading = false;
                        this.autoCompleteData = this.departmentList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.autoCompleteData = [];
                }
            },
            // 获取全部部门信息
            getDapList() {
                getDepList().then(res => {
                    if (res.code === "0000") {
                        this.departmentInfo = res.result.result;
                        this.departmentList = res.result.result.map(item => {
                            return {
                                value: item.fullname,
                                label: item.fullname,
                                department_fullname: item.fullname,
                                department_name: item.name,
                                department_code: item.code,
                                department_level: item.level
                            };
                        });
                    }
                });
            },
            // 获取任务管理列表
            getList() {
                this.dataList = [];
                this.loading = true;
                let department_name = getLocalStorage("info").department_name;
                let department_code = getLocalStorage("info").department_code;
                let department_level = getLocalStorage("info").department_level;
                getTaskCryList(this.postObj).then(res => {
                    this.loading = false;
                    if (res.code === "0000") {
                        // this.tableTbody = res.result.result
                        // this.total = res.result.totalSize
                        let departmentArr = filterDepartment(
                            this.departmentInfo,
                            department_name,
                            department_level,
                            department_code
                        );
                        res.result.result.map(i => {
                            departmentArr.map(j => {
                                if (i.department_code === j.code) {
                                    this.dataList.push(i);
                                }
                            });
                        });
                        this.tableTbody = divisionArr(this.dataList)[0];
                        this.total = this.dataList.length;
                    }
                });
            },
            // 点击新增
            add() {
                this.disabled = true;
                this.moduleTitle = "添加日常任务";
                this.formItem = {};
            },
            // 点击新增（修改）确定按钮
            sureBtn(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        let index = this.departmentList.findIndex(
                            item => this.formItem.department_name === item.value
                        );
                        this.formItem = Object.assign(
                            this.formItem,
                            this.departmentList[index]
                        );
                        delete this.formItem["label"];
                        delete this.formItem["value"];
                        if (this.moduleTitle == "添加日常任务") {
                            this.formItem.task_no = "任-" + initTime("yyyy", "task");
                            this.formItem.task_type = "日常任务";
                            addTaskCry(this.formItem).then(res => {
                                if (res.code === "0000") {
                                    this.disabled = false;
                                    successNotice(res.message)
                                    this.getList();
                                }
                            });
                        } else {
                            delete this.formItem._index;
                            delete this.formItem._rowKey;
                            editTaskCry(this.formItem).then(res => {
                                if (res.code === "0000") {
                                    this.disabled = false;
                                    this.$Notice.success({
                                        title: "修改成功",
                                        duration: 1
                                    });
                                    this.getList();
                                } else {
                                    this.$Notice.error({
                                        title: "修改失败",
                                        duration: 1
                                    });
                                }
                            });
                        }
                    }
                });
            },
            // 点击搜索按钮
            search() {
                for (var i in this.searchVal) {
                    if (!this.searchVal[i]) {
                        delete this.searchVal[i];
                    }
                }
                this.searchVal.department_code = this.code
                this.postObj.searchValue = cloneObj(this.searchVal);
                delete this.postObj.searchValue.department_fullname
                this.getList();
            },
            // 点击保存
            save() {
                editTaskCry(this.detObj).then(res => {
                    if (res.code === "0000") {
                        this.detDisabled = false;
                        this.$Notice.success({
                            title: "修改成功",
                            duration: 1
                        });
                        this.getList();
                    } else {
                        this.$Notice.error({
                            title: "修改失败",
                            duration: 1
                        });
                    }
                });
            },
            // 点击编辑按钮
            edit(dataObj) {
                this.moduleTitle = "编辑";
                this.disabled = true;
                this.formItem = dataObj;
                let index = this.departmentList.findIndex(
                    item => this.formItem.department_code === item.department_code
                );
                if (index != -1) {
                    this.formItem.department_name = this.departmentList[index].value;
                }
            },
            // 点击删除按钮
            delete(dataObj) {
                this.sure_del = true;
                this.delObj = { _id: dataObj._id };
            },
            // 点击删除确定
            dels() {
                this.sure_del = false;
                deleteTaskCry(this.delObj).then(res => {
                    if (res.code === "0000") {
                        this.getList();
                        this.$Notice.success({
                            title: "删除成功",
                            duration: 1
                        });
                    } else {
                        this.$Notice.error({
                            title: "删除失败",
                            duration: 1
                        });
                    }
                });
            },
            // 分页
            pageChange(index) {
                // this.postObj.page = index
                // this.getList()
                this.tableTbody = divisionArr(this.dataList)[index - 1];
            },
            // 点击详情按钮
            details(dataObj) {
                this.detDisabled = true;
                this.detObj = dataObj;
                this.formArr = this.detObj.result_report;
            },
            cancel() {
                this.detDisabled = false;
            }
        }
    };
</script>
<style scoped lang="scss">
    .task_manag {
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
            .refresh{
                display: inline-block;
                button{
                    border-radius: 0;
                    background: #18bdff;
                    color: #fff;

                }
            }
        }
        .edit {
            width: 100%;
            height: 100%;
            padding: 10px;
            padding-top: 60px;
            background: #fff;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 998;
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
            >.editHead {
                border-bottom: 1px solid #ccc;
                margin-bottom: 20px;
                >span {
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    font-size: 14px;
                    font-weight: 500;
                    border-bottom: 2px solid rgb(12, 102, 204);
                }
            }
            >.editcontant {
                margin-bottom: 20px;
                .ta-table {
                    width: 100%;
                    tr {
                        height: 40px;
                        .ta-label {
                            width: 150px;
                            background: #edf6fa;
                            text-align: center;
                        }
                        .ta-content {
                            padding-left: 10px;
                        }
                        td {
                            border: 1px solid #ccc;
                        }
                    }
                }
            }
        }
        .report {
            width: 100%;
            height: 100%;
            padding: 10px;
            padding-top: 60px;
            background: #fff;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 999;
        }
    }
</style>