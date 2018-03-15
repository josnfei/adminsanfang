<template>
  <Menu-item v-if="item.children === undefined" @click="emitClick(item.link)" style="cursor:pointer" :name="item.link">{{item.name}}</Menu-item>

  <Submenu :name="index" v-else>
    <template slot="title">
      {{item.name}}
    </template>
    <Menu-item v-for="i in item.children" :key="i.name" @click="emitClick(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}</Menu-item>
  </Submenu>

</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      },
      index: {
        type: Number,
        default: 0
      }
    },
    created() {
      console.log(this.item.link)
    },
    methods: {
      emitClick(link) {
        this.$emit('emitClick', link);
      }
    }
  }

</script>

<style scoped lang="scss">

</style>