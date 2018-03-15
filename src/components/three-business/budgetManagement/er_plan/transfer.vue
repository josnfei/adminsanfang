<template>
    <div class="training">
        <div class="erp_title">人员转移安置</div>
        <div class="general_content">
            <textarea v-model='textareaVaule' name="" id="" autofocus></textarea>
        </div>
        <div class="save pull-right">
            <Button type="primary" size="large" @click="save" v-if="isshow" style="margin-right:15px">保存</Button>
            <Button type="ghost" size="large" @click="cancel">关闭</Button>
        </div>
    </div>
</template>

<script>
    import {getLocalStorage,getSessionStorage} from 'common/js/dom'
    import { getdepList, addDep, updateDep, deleteDep } from 'api/plan_management'
    export default {
        data() {
            return {
                isshow: true,
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
            _getPlanList() {
				getdepList(this.postObj).then(res => {
					if (res.code === '0000') {
                        this.textareaVaule = res.result.result[0].settledown
					}
				})
            },
            save(){
                var pObj = {
                    _id: this.id,
                    settledown: this.textareaVaule
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
    .training {
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