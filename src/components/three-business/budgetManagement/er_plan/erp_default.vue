<template>
    <div class="erp_default">
        <div class="title">
            <span>位置： </span>
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
                <BreadcrumbItem>部门预案</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div class="tab_nav clear">
                <ul ref="active">
                    <li>
                        <router-link to="/home/threeBusiness/er_plan/general">
                            <span>基本信息</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/home/threeBusiness/er_plan/organization">
                            <span>组织机构</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/home/threeBusiness/er_plan/warning">
                            <span>预警与预防</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/home/threeBusiness/er_plan/security">
                            <span>保障措施</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/home/threeBusiness/er_plan/er_action">
                            <span>应急响应行动</span>
                        </router-link>
                    </li>
                    <li v-if='name==="erp"'>
                        <router-link to="/home/threeBusiness/er_plan/aftermath">
                            <span>善后工作</span>
                        </router-link>
                    </li>
                    <li v-if='name==="erp"'>
                        <router-link to="/home/threeBusiness/er_plan/training">
                            <span>培训与演练</span>
                        </router-link>
                    </li>
                    <li v-if='name==="comp" || name === "top"'>
                        <router-link to="/home/threeBusiness/er_plan/transfer">
                            <span>人员转移安置</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/home/threeBusiness/er_plan/dataTable">
                            <span>数据表格</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/home/threeBusiness/er_plan/taskActive">
                            <span>任务行动</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="branch">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import { getLocalStorage, getSessionStorage } from 'common/js/dom'
    import { setAction, getAction } from 'common/js/util'
    export default {
        data() {
            return {
                name: ''
            }
        },
        watch: {
            '$route': function () {
                var arr = this.$refs.active.children
                for (var i = 0; i < arr.length; i++) {
                    arr[i].className = ''
                }
                arr[getAction().second].className = "sen_active"
            }
        },
        created() {
            this.name = getSessionStorage('name')
            this.active_no = getLocalStorage("action")
        },
        mounted() {
            var domArr = this.$refs.active.children
            if (!getAction().second) {
                domArr[0].className = 'active'
            } else {
                domArr[getAction().second].className = 'active'
            }
            for (let i = 0; i < domArr.length; i++) {
                domArr[i].onclick = function () {
                    var obj = getAction()
                    obj.second = i
                    setAction(obj)
                    for (let j = 0; j < domArr.length; j++) {
                        domArr[j].className = ''
                    }
                    this.className = 'active'
                }
            }
        },
        methods: {
        }
    }
</script>
<style scoped lang="scss">
    .erp_default {
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
        .content {
            padding-top: 40px;
            position: relative;
            .tab_nav {
                position: absolute;
                top: 0;
                width: 100%;
                padding-right: 20px;
                height: 40px;
                border-bottom: 1px solid #ccc;
                >ul {
                    display: flex;
                    flex-direction: row;
                    li:nth-child(1) {
                        margin-left: 0;
                    }
                    >li {
                        height: 40px;
                        font-size: 12px;
                        line-height: 40px;
                        text-align: center;
                        width: 10%;
                        margin: 0 5px;
                        border: 1px solid #ccc;
                        border-radius: 2px;
                        border-bottom: none;
                        background-color: #f9fdff;
                        >a {
                            width: 100%;
                            height: 100%;
                            display: block;
                            font-weight: bold;
                            color: #303030;
                            font-size: 14px;
                        }
                    }
                    >li:hover {
                        background-color: #fff;
                        >a {
                            color: #000;
                        }
                    }
                }
            }
            .active {
                background-color: #fff;
                color: #000;
                >a {
                    background: #e4f5ff;
                    color: #008cee !important;
                }
            }
            a {
                width: auto;
                height: auto;
            }
            height: 100%;
            .erp_title {
                font-size: 20px
            }
            >.branch {
                height: 100%;
                background: #e4f5ff;
                padding: 20px;
            }
        }
    }
</style>