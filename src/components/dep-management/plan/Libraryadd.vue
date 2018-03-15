<template>
  <div class="Libraryadd">
     <Form :model="formItem" :label-width="80">
          <Form-item label="部门名称" prop="department_name">
            <Input v-model="formItem.department_name" placeholder="请输入部门名称"></Input>
          </Form-item>
          <Form-item label="部门编号" prop="department_code">
            <Input v-model="formItem.department_code" placeholder="请输入部门编号"></Input>
          </Form-item>
          <Form-item label="部门级别" prop="department_level">
            <Input v-model="formItem.department_level" placeholder="请输入部门级别"></Input>
          </Form-item>
          <Form-item label="指令名称" prop="instruction_name">
            <Input v-model="formItem.instruction_name" placeholder="请输入指令名称"></Input>
          </Form-item>
         <Form-item label="详细描述" prop="instruction_desc">
            <Input v-model="formItem.instruction_desc" placeholder="请输入指令详细描述"></Input>
          </Form-item>
           <Form-item label="执行部门" prop="execute_department">
            <Select v-model="formItem.execute_department" filterable multiple style="width:260px">
              <Option v-for="item in department" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
          </Form-item>
        </Form>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        formItem:{
          department_name:"",
          department_code:"",
          department_level:"",
          instruction_name:"",
          instruction_desc:"",
          execute_department:""
        },
        department:[]
      }
    }
  }
</script>

<style lang="scss">
  
</style>