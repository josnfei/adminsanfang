<template>
    <div class="data_table">
        <div class="erp_title">数据表格</div>
        <div class="general_content table">
            <Table border stripe size="small" highlight-row :columns="tableThead" :data="tableTbody"></Table>
        </div>
    </div>
</template>

<script>
    import { getLocalStorage, getSessionStorage } from 'common/js/dom'
    import { dataThead } from 'common/js/table'
    import { getuserList } from 'api/Employment'
    import { mapMutations } from 'vuex';
    export default {
        data() {
            return {
                isshow: true,
                tableThead: dataThead(this),
                tableTbody: [],
                id: ''
            }
        },
        created() {
            this.id = this.id = getLocalStorage("id")
            this.getList()
            if (getLocalStorage("status") == 'details') {
                this.isshow = false
            } 
        },
        methods: {
            cancel() {
                this.$router.push("/home/threeBusiness/threeBusinessDefault")
            },
            getList(page) {
                getuserList(page,{department_name: getLocalStorage('dep_name')}).then(res => {
                    if (res.code === '0000') {
                        this.tableTbody = res.result.result
                    }
                })
            },
            details(dataObj) {
				getLocalStorage('id', 'true')
				getLocalStorage("id", dataObj._id)
				this.SET_DEPARTREPORTINFO(dataObj);
				getLocalStorage('form_name', dataObj.form_name)
				this.$router.push('/home/threeBusiness/er_plan/seans')
			},
            ...mapMutations([
				'SET_DEPARTREPORTINFO'
			])
        }
    }
</script>
<style scoped lang="scss">
    .data_table {
        height: 100%;
        height: 100%;
        .erp_title {
            font-size: 20px;
            color: #303030;
            font-weight: bold;
            text-align: center;
        }
        .general_content{
            width:100%;
            height: 80%;
            border-radius: 5px;
            textarea{
                width: 100%;
                height: 100%;
                overflow: auto;
                border: none;
            }
        }
        .save{
            margin: 20px;
        }
    }
</style>