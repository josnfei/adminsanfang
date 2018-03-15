<template>
    <div class="er_action">
        <div class="erp_title">应急响应行动</div>
        <div class="general_content">
            <textarea v-model='textareaVaule' name="" id="" autofocus></textarea>
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
                <p>保存并返回部门预案请选择<span style="color: blue">Save and return</span>,继续向下操作请点击<span style="color: red">Continue down</span></p>
            </div>
            <div slot="footer">
                <Button type="ghost" size="small" @click="save">Save and return</Button>
                <Button type="primary" size="small" @click="goOn">Continue down</Button>
            </div>
        </Modal> 
    </div>
</template>

<script>
    import {getLocalStorage,senActive,getSessionStorage} from 'common/js/dom'
    import { getdepList, addDep, updateDep, deleteDep } from 'api/plan_management'
    export default {
        data() {
            return {
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
        created(){
            this.id = this.id = getLocalStorage("id")
            var pObj  = {_id: this.id}
            this.postObj.searchValue = pObj
            this._getPlanList()
            if (getLocalStorage("status") == 'details') {
                this.isshow = false
            } 
        },
        methods: {
            cancel(){
                this.$router.push("/home/threeBusiness/threeBusinessDefault")
            },
            saveBtn(){
                this.sure_save = true
            },
            _getPlanList() {
				getdepList(this.postObj).then(res => {
					if (res.code === '0000') {
                        this.textareaVaule = res.result.result[0].response
					}
				})
            },
            goOn(){
                senActive(5)
                var pObj = {
                    _id: this.id,
                    response: this.textareaVaule
                }
                updateDep(pObj).then(res => {
                    if (res.code === '0000') {
                        this.$router.push('/home/threeBusiness/er_plan/aftermath')
                    }else if(res.code === '0001'){
                        this.$router.push('/home/threeBusiness/er_plan/aftermath')
                    }
                })
            },
            save(){
                var pObj = {
                    _id: this.id,
                    response: this.textareaVaule
                }
                if (getSessionStorage('name') === 'erp') {
                    updateDep(pObj).then(res => {
                        if (res.code === '0000') {
                            this.$router.push('/home/threeBusiness/threeBusinessDefault')
                        } else {
                            this.$router.push('/home/threeBusiness/threeBusinessDefault')
                        }
                    })
                }else if(getSessionStorage('name') === 'comp'){
                    updateDep(pObj).then(res => {
                        if (res.code === '0000') {
                            this.$router.push('/home/threeBusiness/threeBusinessCommunity')
                        } else {
                            this.$router.push('/home/threeBusiness/threeBusinessCommunity')
                        }
                    })
                }else if(getSessionStorage('name') === 'top'){
                    updateDep(pObj).then(res => {
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
    .er_action {
        height: 100%;
        .erp_title {
            font-size: 20px;
            color: #303030;
            font-weight: bold;
            text-align: center;
        }
        .general_content{
            width: 100%;
            height: 80%;
            border: 1px solid #ccc;
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
            margin-right: 0;
        }
    }
</style>