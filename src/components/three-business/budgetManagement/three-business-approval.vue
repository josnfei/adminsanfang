<template>
    <div class="three-business-approval">
        <div class="title">
			<span>位置： </span>
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
				<BreadcrumbItem>预案审批</BreadcrumbItem>
			</Breadcrumb>
		</div>
        <div class="search">
            <span class="search_title">执行部门</span>
            <Select v-model="searchVal.department_name" placeholder="请选择" :clearable="true" style="width:200px;padding-left: 10px;padding-right: 20px">
                <Option v-for="item in depList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span class="search_title">起草人</span>
            <Select v-model="searchVal.createby" placeholder="请选择" :clearable="true" style="width:200px;padding-left: 10px;padding-right: 20px">
                <Option v-for="item in draftsmanList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div class="searchBtn" @click="search">
                <Button type="ghost" shape="circle" icon="ios-search"></Button>
            </div>
        </div>
        <div class="table">
            <Table :loading="loading" border stripe size="small" highlight-row :columns="tableThead" :data="tableTbody"></Table>
        </div>
        <div class="page pull-right">
            <Page :total="total" @on-change="pageChange" show-elevator></Page>
        </div>
    </div>
</template>

<script>
    import { getAprList, approve, withdraw, submit } from 'api/plan_management'
    import { setUserIng, getUserIng } from 'common/js/util'
    import { dep_plan } from 'common/js/rules'
    import { approvalThead } from 'common/js/table'
    import { initTime } from 'common/js/util'
    import { depPlanQuery } from 'common/js/query'
    import { getLocalStorage, successNotice, errorNotice } from 'common/js/dom'
    export default {
        data() {
            return {
                loading: false,
                tableThead: approvalThead(this),
                tableTbody: [],
                total: 0,
                searchVal: {
                    department_name: '',
                    status: '',
                    createby: ''
                },
                depList: depPlanQuery().depList,
                statusList: depPlanQuery().statusList,
                draftsmanList: depPlanQuery().draftsmanList,
                postObj: {
                    'order': {_id: -1},
                    'page': 1,
                    'pageSize': 10,
                    'searchValue': {"status": '待审批'}
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.loading = true
                getAprList(this.postObj).then(res => {
                    if (res.code === '0000') {
                        this.loading = false
                        this.tableTbody = res.result.result
                        this.total = res.result.totalSize
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
                this.postObj.searchValue.status = "待审批"
				this.getList()
				
            },
            pageChange(index) {
                this.postObj.page = index
                this.getList()
            },
            details(dataObj) {
                getLocalStorage("id",dataObj._id)
				this.$router.push({ path: '/home/threeBusiness/erp_default' })
			},
            approval(dataObj) {
                var username = getUserIng().username;
                var pObj = { "_id": dataObj._id, "status": '生效', 'approveby':username, 'approvedt':initTime()}
                approve(pObj).then(res => {
                    if(res.code === '0000'){
                        this.getList()
                    }
                })
            },
            back(dataObj) {
                var username = getUserIng().username;
                var pObj = { "_id": dataObj._id, "status": '草稿', 'approveby':username, 'approvedt':initTime()}
                withdraw(pObj).then(res => {
                    if(res.code === '0000'){
                        this.getList()
                    }
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    .three-business-approval {
        height: 100%;
        .title{
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
			>span{
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
    }
</style>