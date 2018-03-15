<template>
    <div class="relist">
      <div class=title>
        	<span>位置： </span>
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/home/threeBusiness/threeBusinessDefault">三防业务</BreadcrumbItem>
				<BreadcrumbItem>人员管理</BreadcrumbItem>
			</Breadcrumb>
      </div>
      <!--搜索-->
       <Form ref="formInline" :model="formInline" inline :label-width="80">
            <Form-item label="部门名称" prop="name">
              <Input v-model="formInline.name" placeholder="请输入名称"></Input>
            </Form-item>
            <Form-item label="全称" prop="fullname">
              <Input v-model="formInline.fullname" placeholder="请输入全称"></Input>
            </Form-item>
             <Button type="ghost" shape="circle" icon="ios-search"></Button>
              <Button class="addBtn pull-right"><Icon type="plus-round" ></Icon> 新增</Button>
          </Form>

      <div class="table">
			  <Table border stripe size="small" highlight-row :columns="tableThead" :data="tableTbody"></Table>
		  </div>
    </div>
</template>

<script>
import {depmanageThead} from 'common/js/table'
    export default {
        data() {
            return {
              formInline: {
              name: '',
              fullname: ''
              },
              tableThead:depmanageThead(this),
              tableTbody:[]
            }
        },
        methods: {
        }
    }
</script>
<style scoped lang="scss">
.relist{
    height:100%;
    .title {
      margin-bottom:10px;
      .jto {
        width:23px;
        height:20px;
        margin-right:10px;
      }
    }
}
.addBtn {
    background-color: #40b0ff;
    color: #fff;
    margin: 5px;
    height: 30px;
  }
</style>