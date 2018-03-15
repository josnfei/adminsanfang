<template>
    <div class="CurrentWater">
        <div class="current-water-content">
            <Table border :columns="tableThead" :data="tableBody"></Table>
        </div>
    </div>
</template>

<script>
    import { homeThead } from 'common/js/table'
    import { getWaterList } from 'api/home'
    import { ERR_OK } from 'api/config'
    export default {
        data() {
            return {
                tableThead: homeThead(this),
                tableBody: [],
            }
        },
        methods: {
            getWater() {
                getWaterList().then(res => {
                    if (res.code === ERR_OK) {
                        this.tableBody = res.result
                    }
                })
            }
        },
        created() {
            this.getWater()
        }
    }
</script>
<style scoped lang="scss">
    .CurrentWater {
        height: 300px;
        position: relative;
        .current-water-content {
            width: 100%;
            height: 100%;
            overflow: auto;
        }
        .ivu-table-wrapper {
            height: 283px;
            min-width: 430px;
        }
    }
</style>