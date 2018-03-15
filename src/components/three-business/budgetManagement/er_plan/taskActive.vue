<template>
    <div class="taskActive">
        <div class="erp_title">任务行动</div>
        <div class="general_content table">
            <Table border stripe size="small" highlight-row :columns="tableThead" :data="tableTbody"></Table>
        </div>
        <!-- 详情 -->
        <div class="edit" v-if="detDisabled">
            <div class="title">
                <span>位置： </span>
                <Breadcrumb separator=">">
                    <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
                    <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">部门预案</BreadcrumbItem>
                    <BreadcrumbItem>
                        <a href="javascript:;" @click='cancel'>任务行动</a>
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
                            <td class="ta-content">{{detObj.template_no}}</td>
                            <td class="ta-label">执行部门名称</td>
                            <td class="ta-content">{{detObj.department_name}}</td>
                            <td class="ta-label">部门编号</td>
                            <td class="ta-content">{{detObj.department_code}}</td>
                        </tr>
                        <tr>
                            <td class="ta-label">部门级别</td>
                            <td class="ta-content">{{detObj.department_level}}</td>
                            <td class="ta-label">预案名称</td>
                            <td class="ta-content">{{detObj.plan_name}}</td>
                            <td class="ta-label">预案类型</td>
                            <td class="ta-content">{{detObj.plan_type}}</td>
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
                            <td class="ta-label">启动条件</td>
                            <td class="ta-content" colspan="5">{{detObj.trigger}}</td>
                        </tr>                        
                        <tr>
                            <td class="ta-label">要求上报的结果</td>
                            <td class="ta-content" colspan="5">{{detObj.result_report}}</td>
                        </tr>                        
                    </tbody>
                </table>
            </div>
            <div class="editFooter">
                <Button type="ghost" @click='cancel'>关闭</Button>
            </div>
        </div>
        <!-- 编辑 -->
        <Modal v-model="disabled" width="600">
            <p slot="header" style="font-size:20px;text-align:center">
                <span>编辑</span>
            </p>
            <div style="text-align:center">
                <Form ref="formItem" :model="formItem" :label-width="100">
                    <FormItem label="成员部门" prop="department_name">
                        <!-- <Select  :label='formItem.department_name' not-found-text='无匹配部门，请重新输入' v-model="formItem.department_name" filterable remote :remote-method="autoSearch" :loading="selectLoading">
                            <Option v-for="(option, index) in autoCompleteData" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select> -->
                        <Input readonly v-model="formItem.department_name"></Input>
                    </FormItem>
                    <FormItem label="预案名称" prop="plan_name">
                        <Input v-model="formItem.plan_name"></Input>
                    </FormItem>
                    <FormItem label="任务类型" prop="task_type">
                        <Select v-model="formItem.task_type" :disabled="formDisabled">
                            <Option value="日常任务">日常任务</Option>
                            <Option value="事前任务">事前任务</Option>
                            <Option value="事中任务">事中任务</Option>
                            <Option value="事后任务">事后任务</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="任务概要" prop="task_profile">
                        <Input v-model="formItem.task_profile"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="sureBtn('formItem')">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { taskThead } from 'common/js/table'
    import { getLocalStorage } from 'common/js/dom'
    import { getpresetTaskList, addpresetTask, editpresetTask, deletepresetTask } from 'api/task_management'
    import { getDepList } from 'api/bumenlist'
    export default {
        data() {
            return {
                autoCompleteData: [],
                departmentList: [],
                selectLoading: false,
                postObj: {
                    "page": 1,
                    "pageSize": 10,
                    "searchValue": {}
                },
                detObj: {},
                formDisabled: false,
                formItem: {},
                disabled: false,
                detDisabled: false,
                task_name: "日常任务",
                tableThead: taskThead(this),
                tableTbody: []
            }
        },
        created() {
            this.getList()
            this.postObj.searchValue = { department_name: getLocalStorage('dep_name') }
            this.getDapList()
        },
        methods: {
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
            getDapList() {
                getDepList().then(res => {
                    this.depList = res.result.result.map(item => {
                        return {
                            value: item.fullname,
                            label: item.fullname,
                            department_name:item.fullname,
                            department_code:item.code,
                            department_level:item.level
                        }
                    })
                })
            },
            getList() {
                getpresetTaskList(this.postObj).then(res => {
                    if (res.code === '0000') {
                        this.tableTbody = res.result.result
                        this.total = res.result.totalSize
                    }
                })
            },
            edit(dataObj) {
                this.formItem = dataObj
                this.disabled = true
            },
            cancel() {
                this.detDisabled = false
            },
            sureBtn(name) {
                delete this.formItem._index
                delete this.formItem._rowKey
                let index = this.depList.findIndex((item => this.formItem.department_name === item.department_name))
                this.formItem = Object.assign(this.formItem,this.depList[index])
                delete this.formItem['label']
                delete this.formItem['value']
                editpresetTask(this.formItem).then(res => {
                    if (res.code === '0000') {
                        this.disabled = false
                        this.$Notice.success({
                            title: '修改成功',
                            duration: 1
                        });
                        this.getList()
                    } else {
                        this.$Notice.error({
                            title: '修改失败',
                            duration: 1
                        });
                    }
                })
            },
            details(dataObj) {
                this.detDisabled = true
                this.detObj = dataObj
                if(!this.detObj.result_report){
                    this.detObj.result_report = this.detObj.result_respont.join(',')
                }else{
                    this.detObj.result_report = this.detObj.result_report.join(',')
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .taskActive {
        height: 100%;
        .erp_title {
            font-size: 20px;
            color: #303030;
            font-weight: bold;
            text-align: center;
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
            z-index: 999;
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
        .general_content {
            width: 100%;
            border-radius: 5px;
        }
    }
</style>