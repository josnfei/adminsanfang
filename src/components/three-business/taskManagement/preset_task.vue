<template>
    <div class="preset_task">
        <div class="title">
            <span>位置： </span>
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
                <BreadcrumbItem>预设任务</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="search">
            <span class="search_title">部门名称</span>
            <Select clearable :label='searchVal.department_fullname' not-found-text='无匹配部门，请重新输入' v-model="searchVal.department_fullname" filterable
			 remote :remote-method="autoSearch" :loading="selectLoading" style="width:200px;padding-left: 10px;padding-right: 20px"
			 @on-change='selected'>
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
            <div class="add pull-right" @click="add">
                <Button type="primary"><span class="icon-xinzeng"></span>新增</Button>
            </div>
        </div>
        <div class="table">
            <Table :loading="loading" border stripe size="small" highlight-row :columns="tableThead" :data="tableTbody"></Table>
        </div>
        <div class="page pull-right">
            <Page show-total :total="total" @on-change="pageChange" show-elevator></Page>
        </div>
        <!-- 新增/修改 -->
        <div class="edit" v-if="disabled">
            <div class="title">
                <span>位置： </span>
                <Breadcrumb separator=">">
                    <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
                    <BreadcrumbItem>
                        <a href="javascript:;" @click='cancel'>预设任务</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>{{moduleTitle}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="editHead">
                <span>基本信息</span>
            </div>
            <div class="editcontant">
                <Form ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="0">
                    <table class="ed-table">
                        <tbody>
                            <tr>
                                <td class="ed-label">执行部门全称</td>
                                <td class="ed-content">
                                    <FormItem label="" prop="department_fullname" style="margin: 0">
                                        <Select clearable :label='formItem.department_fullname' not-found-text='无匹配部门，请重新输入' @on-change='selected' v-model="formItem.department_fullname"
                                            filterable remote :remote-method="autoSearch" :loading="selectLoading" style="width:80%">
                                            <Option v-for="(option, index) in autoCompleteData" :value="option.value" :key="index">{{option.label}}</Option>
                                        </Select>
                                    </FormItem>
                                </td>
                                <td class="ed-label">执行部门简称</td>
                                <td class="ed-content">
                                    <FormItem label="" style="margin: 0">
                                        <Input readonly placeholder="请输入" style="width:80%" v-model="formItem.department_name"></Input>
                                    </FormItem>
                                </td>
                                <td class="ed-label">预案名称</td>
                                <td class="ed-content">
                                    <FormItem label="" prop="plan_name" style="margin: 0">
                                        <Input placeholder="请输入" style="width:80%" v-model="formItem.plan_name"></Input>
                                    </FormItem>
                                </td>
                            </tr>

                            <tr>
                                <td class="ed-label">预案类型</td>
                                <td class="ed-content">
                                    <FormItem label="" prop="plan_type" style="margin: 0">
                                        <Select placeholder="请选择" style="width:80%" v-model="formItem.plan_type" :disabled="formDisabled" @on-change='planTypeSelect'>
                                            <Option value="防风">防风</Option>
                                            <Option value="防汛">防汛</Option>
                                            <Option value="防旱">防旱</Option>
                                            <Option value="防暴雨">防暴雨</Option>
                                        </Select>
                                    </FormItem>
                                </td>

                                <td class="ed-label">任务类型</td>
                                <td class="ed-content">
                                    <FormItem label="" prop="task_type" style="margin: 0">
                                        <Select placeholder="请选择" style="width:80%" v-model="formItem.task_type" :disabled="formDisabled">
                                            <Option value="日常任务">日常任务</Option>
                                            <Option value="事前任务">事前任务</Option>
                                            <Option value="事中任务">事中任务</Option>
                                            <Option value="事后任务">事后任务</Option>
                                        </Select>
                                    </FormItem>
                                </td>

                                <td class="ed-label">任务概要</td>
                                <td class="ed-content" colspan="3">
                                    <FormItem label="" prop="task_profile" style="margin: 0">
                                        <Input placeholder="请输入" style="width:width:80%" v-model="formItem.task_profile"></Input>
                                    </FormItem>
                                </td>

                            </tr>

                            <tr>
                                <td class="ed-label">任务负责人</td>
                                <td class="ed-content">
                                    <FormItem label="" prop="chargeby" style="margin: 0">
                                        <Input placeholder="请输入" style="width:width:80%" v-model="formItem.chargeby"></Input>
                                    </FormItem>
                                </td>
                                <td class="ed-label">负责人电话</td>
                                <td class="ed-content" colspan="3">
                                    <FormItem label="" prop="phoneno" style="margin: 0">
                                        <Input placeholder="请输入" style="width:width:80%" v-model="formItem.phoneno"></Input>
                                    </FormItem>
                                </td>
                            </tr>

                            <tr style="height: 80px">
                                <td class="ed-label">任务描述</td>
                                <td class="ed-content" colspan="5">
                                    <FormItem label="" prop="task_desc" style="margin: 0">
                                        <Input placeholder="请输入" type="textarea" style="width:100%; height:100%" v-model="formItem.task_desc"></Input>
                                    </FormItem>
                                </td>
                            </tr>

                            <tr style="height: 80px">
                                <td class="ed-label">启动条件(说明)</td>
                                <td class="ed-content" colspan="5">
                                    <FormItem label="" prop="trigger" style="margin: 0">
                                        <Input placeholder="请输入" type="textarea" v-model="formItem.trigger" style="width:100%"></Input>
                                    </FormItem>
                                </td>
                            </tr>

                            <tr>
                                <td class="ed-label">应急响应类别</td>
                                <td class="ed-content" colspan="5">
                                    <FormItem label="" style="margin: 0">
                                        <RadioGroup v-model="formItem.response_type">
                                            <Radio label="防风">防风</Radio>
                                            <Radio label="防汛">防汛</Radio>
                                            <Radio label="防暴风">防暴风</Radio>
                                            <Radio label="防旱">防旱</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </td>
                            </tr>

                            <tr>
                                <td class="ed-label">应急响应级别</td>
                                <td class="ed-content" colspan="5">
                                    <FormItem label="" style="margin: 0">
                                        <RadioGroup v-model="formItem.response_level">
                                            <Radio label="I级">I级</Radio>
                                            <Radio label="II级">II级</Radio>
                                            <Radio label="III级">III级</Radio>
                                            <Radio label="IV级">IV级</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </td>
                            </tr>

                            <tr>
                                <td class="ed-label">计划开始时间</td>
                                <td class="ed-content">
                                    <FormItem label="" prop="plan_startdate" style="margin: 0">
                                        <Input placeholder="请输入" v-model="formItem.plan_startdate" style="width:width:80%"></Input>
                                    </FormItem>
                                </td>

                                <td class="ed-label">计划结束时间</td>
                                <td class="ed-content" colspan="3">
                                    <FormItem label="" prop="plan_enddate" style="margin: 0">
                                        <!-- <InputNumber :min="0" v-model="num"></InputNumber>
                                        <Select v-model='endType' style="width:80px">
                                            <Option value="天"></Option>
                                            <Option value="小时"></Option>
                                        </Select>
                                        <span>内</span> -->
                                        <Input v-model="formItem.plan_enddate" style="width:200px" placeholder="请输入"></Input>
                                    </FormItem>
                                </td>
                            </tr>

                            <tr>
                                <td class="ed-label">要求上报的结果</td>
                                <td class="ed-content" colspan="5">
                                    <FormItem label="" prop="result_report" style="margin: 0">
                                        <CheckboxGroup v-model="formItem.result_report">
                                            <Checkbox v-for='item in responseResult' :key='item._id' :label="item.form_name"></Checkbox>
                                        </CheckboxGroup>
                                    </FormItem>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </Form>
            </div>
            <div class="editFooter">
                <Button type="ghost" @click='cancel' style="margin-right: 10px">关闭</Button>
                <Button type="primary" @click="sureBtn('formItem')">保存</Button>
            </div>
        </div>
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
    </div>
</template>

<script>
    import { preTaskThead } from 'common/js/table'
    import { initTime, filterDepartment, divisionArr } from 'common/js/util'
    import { depTaskQuery } from 'common/js/query'
    import { presetTask } from 'common/js/rules'
    import { getpresetTaskList, addpresetTask, editpresetTask, deletepresetTask } from 'api/task_management'
    import { getDepList } from 'api/bumenlist'
    import { getuserListAll } from 'api/Employment'
    import { getLocalStorage } from 'common/js/dom'
    export default {
        data() {
            return {
                departmentInfo: [],
                dataList: [],
                loading: false,
                endType: '天',
                responseResult: [],
                autoCompleteData: [],
                departmentList: [],
                selectLoading: false,
                num: 1,
                detObj: {},
                sure_del: false,
                delObj: {},
                formDisabled: false,
                detDisabled: true,
                formItem: {},
                ruleValidate: presetTask,
                disabled: false,
                moduleTitle: '新增',
                tableThead: preTaskThead(this),
                tableTbody: [],
                total: 0,
                searchVal: {
                    department_name: '',
                    task_type: '',
                },
                depList: depTaskQuery().depList,
                typeList: depTaskQuery().typeList,
                postObj: {
                    'order': {_id: -1},
                    'searchValue': {}
                }
            }
        },
        mounted() {
            this.getDapList()
            setTimeout(() => {
				this.getList()
			}, 100);
        },
        methods: {
            // 刷新
            refresh(){
                this.postObj.searchValue = {}
                this.getList()
            },
            // 选择预案类型
            planTypeSelect(value){
                // this.getRespontResult()
                var arr = []
                this.responseResult.map(item => {
                    if(item.plan_type === '全部' || item.play_type === value){
                        arr.push(item)
                    }
                })
                this.responseResult = arr
            },
            // 选择执行部门全称
            selected(value) {
                if(value){
                    let index = this.departmentList.findIndex(item => value === item.department_fullname)
                    this.formItem.department_name = this.departmentList[index].department_name
                    this.formItem.department_level = this.departmentList[index].department_level
                    this.formItem.department_code = this.departmentList[index].department_code
                    this.getRespontResult({ department_code: this.formItem.department_code })
                }
            },
            getRespontResult(search) {
                getuserListAll(search).then(res => {
                    if (res.code === '0000') {
                        this.responseResult = res.result.result
                    }
                })
            },
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
            getDapList() {
                getDepList().then(res => {
                    this.departmentInfo = res.result.result
                    this.departmentList = res.result.result.map(item => {
                        return {
                            value: item.fullname,
                            label: item.fullname,
                            department_fullname: item.fullname,
                            department_name: item.name,
                            department_code: item.code,
                            department_level: item.level
                        };
                    })
                })
            },
            getList() {
                this.loading = true
                this.dataList = []
                let department_name = getLocalStorage('info').department_name
                let department_code = getLocalStorage('info').department_code
                let department_level = getLocalStorage('info').department_level
                getpresetTaskList(this.postObj).then(res => {
                    this.loading = false
                    if (res.code === '0000') {
                        // this.tableTbody = res.result.result
                        // this.total = res.result.totalSize
                        let departmentArr = filterDepartment(this.departmentInfo, department_name, department_level, department_code)
                        res.result.result.map(i => {
                            departmentArr.map(j => {
                                if (i.department_code === j.code) {
                                    this.dataList.push(i)
                                }
                            })
                        })
                        this.tableTbody = divisionArr(this.dataList)[0]
                        this.total = this.dataList.length
                    }
                })
            },
            cancel() {
                this.disabled = false
            },
            add() {
                this.disabled = true
                this.moduleTitle = '新增'
                this.formItem = {}
            },
            sureBtn(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.formItem.plan_enddate = this.num + this.endType + '内'
                        delete this.formItem['label']
                        delete this.formItem['value']
                        if (this.moduleTitle == '新增') {
                            addpresetTask(this.formItem).then(res => {
                                if (res.code === '0000') {
                                    this.disabled = false
                                    this.getList()
                                    this.$Notice.success({
                                        title: '新增成功',
                                        duration: 1
                                    });
                                } else {
                                    this.$Notice.error({
                                        title: '新增失败',
                                        duration: 1
                                    });
                                }
                            })
                        } else {
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
                        }
                    }
                })

            },
            search() {
                for (var i in this.searchVal) {
                    if (!this.searchVal[i]) {
                        delete this.searchVal[i];
                    }
                }
                this.postObj.searchValue = this.searchVal
                this.getList()
            },
            edit(dataObj) {
                this.moduleTitle = '编辑'
                this.disabled = true
                this.formItem = dataObj
                // this.num = parseInt(this.formItem.plan_enddate.slice(-3, -2))
                this.getRespontResult({ department_code: this.formItem.department_code })
                var arr = []
                this.responseResult.map(item => {
                    if(item.plan_type === '全部' || item.play_type === this.formItem.plan_type){
                        arr.push(item)
                    }
                })
                this.responseResult = arr
                // console.log(dataObj)
            },
            delete(index, dataObj) {
                this.sure_del = true
                this.delObj = { _id: dataObj._id }
            },
            dels() {
                this.sure_del = false
                deletepresetTask(this.delObj).then(res => {
                    if (res.code === '0000') {
                        this.$Notice.success({
                            title: '删除成功',
                            duration: 1
                        });
                        this.getList()
                    }
                })
            },
            pageChange(index) {
                // this.postObj.page = index
                // this.getList()
                this.tableTbody = divisionArr(this.dataList)[index - 1]
            }
        }
    }
</script>

<style scoped lang="scss">
    .preset_task {
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
        .edit {
            width: 100%;
            height: 100%;
            padding: 10px;
            padding-top: 60px;
            background: #fff;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
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
                .ed-table {
                    width: 100%;
                    tr {
                        height: 50px;
                        .ed-label {
                            width: 150px;
                            background: #edf6fa;
                            text-align: center;
                        }
                        .ed-content {
                            padding: 5px 1%;
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
    }
</style>