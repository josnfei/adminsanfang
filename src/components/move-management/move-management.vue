<template>
    <div class="move-management">
        <aside>
            <Menu :theme="theme" :active-name="acName" :open-names="['1']" @on-select="changeActive">
                <!-- <MenuItem v-for="(item,index) in dataArr" :key="index" :name="item.name">
                <span :class="item.icon"></span>
                {{item.text}}
                </MenuItem> -->
                <div>
                    <Submenu v-for="(item,index) in dataArr" :key="index" :name="item.name">
                        <template slot="title">
                            <span :class="item.icon"></span>
                            {{item.text}}
                        </template>
                        <MenuItem v-for="(i,index1) in item.children" :key="index1" :name="i.name">{{i.text}}</MenuItem>
                    </Submenu>
                </div>
            </Menu>
        </aside>
        <section>
            <div class="content">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>

<script>
    import { setAction, getAction } from 'common/js/util'
    import { getLocalStorage, getSessionStorage } from 'common/js/dom'
    export default {
        data() {
            return {
                theme: 'light',
                acName: "",
                opName: [],
                dataArr: [
                    {
                        text: '巡查管理',
                        name: '1',
                        icon: 'iconfont icon-tongxunlu',
                        children: [
                            {
                                text: '巡查任务安排',
                                name: '1-1',
                                path: '/home/moveManagement/patrol-plan',
                            }, {
                                text: '巡查任务记录',
                                name: '1-2',
                                path: '/home/moveManagement/patrol-record'
                            }
                        ]
                    }
                ]
            }
        },
        created() {
            if (!getAction().third) {
                this.acName = '1-1'
            } else {
                this.acName = getAction().third
            }
        },
        methods: {
            changeActive(name) {
                let obj = {}
                this.dataArr.map(item => {
                    item.children.map(i => {
                        if (i.name === name) {
                            obj = i
                        }
                    })
                })
                this.$router.push(obj.path)
                var activeObj = getAction()
                activeObj.third = name
                getSessionStorage('name', 'top')
                setAction(activeObj)
            }
        }
    }
</script>
<style lang="scss">
    .move-management {
        width: 100%;
        height: 100%;
        background-color: #f2f2f2;
        padding-left: 200px;
        position: relative;
        aside {
            position: absolute;
            top: 0px;
            left: 0;
            width: 200px;
            height: 100%;
            background-color: #e4f5ff;
            margin-right: 10px;
            background-size: cover;
            .ivu-menu-submenu {
                .ivu-menu-submenu-title {
                    padding-left: 43px;
                }
                position: relative;
                .icon {
                    position: absolute;
                    font-size: 28px;
                    top: 10px;
                    left: 14px;
                }
            }
            .ivu-menu-light {
                background: transparent;
                width: 200px !important;
            }
        }
        section {
            background: #fff;
            overflow: auto;
            width: 100%;
            height: 100%;
            padding: 10px;
            padding-top: 60px;
            position: relative;
            .content {
                width: 100%;
                height: 100%;
                overflow: auto;
            }
            .title {
                position: absolute;
                top: 10px;
                left: 10px;
                font-size: 20px;
                color: #333;
                margin-bottom: 10px;
                img {
                    width: 23px;
                    height: 20px;
                    transform: rotate(90deg);
                    vertical-align: middle;
                    margin-right: 10px;
                }
            }
            .table {
                width: 100%;
                margin-bottom: 20px;
            }
        }
    }
</style>