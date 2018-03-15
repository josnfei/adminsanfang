<template>
    <div class="role-trees">
        <Tree :data="data" show-checkbox @on-check-change="checkChange"></Tree>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            return {
            }
        },
        created() {
            // this.setStatus(this.data)
        },
        methods: {
            checkChange(arr) {
                // console.log(this.data)
                this.$emit('checkChange', arr)
            },
            setStatus(arr) {
                arr.map(item => {
                    item.checked = false
                    if (item.children && item.children.length) {
                        this.setStatus(item.children)
                    }
                })
                return arr
            }
        }
    }
</script>
<style scoped>
</style>