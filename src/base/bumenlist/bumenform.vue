<template>
  <div class="bumenform">
   <Modal v-model="modal1">
            <div slot="header">{{updateTitle}}</div>
            <Form :model="formItem" :label-width="80">
              <Form-item label="部门" prop="name">
                <Input v-model="formItem.name" placeholder="请输入名称"></Input>
              </Form-item>
              <Form-item label="全称" prop="fullname">
                <Input v-model="formItem.fullname" placeholder="请输入全称"></Input>
              </Form-item>
              <!-- <Form-item label="所在部门" prop="system_name">
                <Input v-model="formItem.system_name" placeholder="请输入所在部门"></Input>
              </Form-item> -->
              <Form-item label="部门编号" prop="code">
                <Input v-model="formItem.code" placeholder="请输入编号"></Input>
              </Form-item>
              <Form-item label="部门层级" prop="level">
                <Input v-model="formItem.level" placeholder="请输入层级"></Input>
              </Form-item>
              <Form-item label="部门层级1" prop="level1">
                <Input v-model="formItem.level1" placeholder="请输入层级"></Input>
              </Form-item>
              <Form-item label="部门层级2" prop="level2">
                <Input v-model="formItem.level2" placeholder="请输入层级"></Input>
              </Form-item>
              <Form-item label="部门层级3" prop="level3">
                <Input v-model="formItem.level3" placeholder="请输入层级"></Input>
              </Form-item>
              <Form-item label="部门层级4" prop="level4">
                <Input v-model="formItem.level4" placeholder="请输入层级"></Input>
              </Form-item>
              <Form-item label="部门层级5" prop="level5">
                <Input v-model="formItem.level5" placeholder="请输入层级"></Input>
              </Form-item>

              <Input v-model="formItem.index" v-if="bucunzai"></Input>
            </Form>
            <div slot="footer">
              <Button v-if="btnSave" type="primary" @click="ok">保存</Button>
              <Button v-if="btnChange" type="primary" @click="changeNotice">修改</Button>
            </div>
          </Modal>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'
import {bumenRules} from 'common/js/rules'
import {cloneObj} from 'common/js/util'

  export default {
    data() {
      return {
        formItem:{
          name:'',
          // shortname:'',
          fullname:'',
          // system_name:'',
          code:'',
          level:'',
          level1:'',
          level2:'',
          level3:'',
          level4:'',
          level5:''
        },
        updateTitle:"",
        modal1:false,
        rules:bumenRules,
        btnSave:false,
        btnChange:false
      }
    }
  }
</script>

<style lang="scss" >
.modalSec {
  .ivu-modal-mask {
    position: absolute;
  }
  .ivu-modal {
    width: 80%;
    height: 80%;
    max-width: 1300px;
    max-height: 767px;
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .ivu-modal-wrap {
    position: absolute;
    overflow: hidden;
  }
  .ivu-modal-content {
    width: 100%;
    height: 100%;
  }
  .ivu-modal-header {
    padding: 0;
    background-color: #008cee;
  }
  .ivu-modal-header-inner {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: white;
  }
  .ivu-modal-close {
    top: 4px;
  }
  .ivu-modal-close .ivu-icon-ios-close-empty {
    color: white;
  }
  .ivu-modal-close .ivu-icon-ios-close-empty:hover {
    color: #444444;
  }
  .ivu-modal-body {
    width: 100%;
    position: absolute;
    top: 41px;
    bottom: 0;
    padding: 0;
    overflow: auto;
    font-size: 16px;
  }
}
.waterMapModal {
  .ivu-modal {
    width: 1024px;
    height: 600px;
  }
}
.modalSecSmall {
    .ivu-modal-mask {
        position: absolute;
    }
    .ivu-modal {
        width: 600px;
        height: 390px;
        max-width: 600px;
        max-height: 390px;
        background-color: white;
        border-radius: 5px;
        overflow: hidden;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
    .ivu-modal-wrap {
        position: absolute;
        overflow: hidden;
    }
    .ivu-modal-content {
        width: 100%;
        height: 100%;
    }
    .ivu-modal-header {
        background-color: #008cee;
    }
    .ivu-modal-header-inner {
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        color: white;
    }
    .ivu-modal-close .ivu-icon-ios-close-empty {
        color: white;
    }
    .ivu-modal-body {
        width: 100%;
        position: absolute;
        top: 50px;
        bottom: 0;
        padding: 0;
        overflow: auto;
        font-size: 16px;
    }
}

.modalInnerRiver{
  .ivu-modal-mask {
    position: absolute;
  }
  .ivu-modal {
    width: 1024px;
    height: 600px;
    max-width: 1024px;
    max-height: 600px;
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .ivu-modal-wrap {
    position: absolute;
    overflow: hidden;
  }
  .ivu-modal-content {
    width: 100%;
    height: 100%;
  }
  .ivu-modal-header {
    background-color: #008cee;
  }
  .ivu-modal-header-inner {
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: white;
  }
  .ivu-modal-close .ivu-icon-ios-close-empty {
    color: white;
  }
  .ivu-modal-body {
    width: 100%;
    position: absolute;
    top: 50px;
    bottom: 0;
    padding: 0;
    overflow: auto;
    font-size: 16px;
  }
}



</style>