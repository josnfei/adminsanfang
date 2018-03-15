<template>
  <div class="patrol-plan">
    <div class="title">
      <span>位置： </span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>移动管理</BreadcrumbItem>
        <BreadcrumbItem>巡查管理</BreadcrumbItem>
        <BreadcrumbItem>巡查任务安排</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <span class="search_title">所属部门</span>
      <Select :label='searchVal.department_name' not-found-text='无匹配部门，请重新输入' v-model="searchVal.department_name" filterable remote
        :remote-method="autoSearch" :loading="selectLoading" style="width:200px;padding-left: 10px;padding-right: 20px" @on-change='selected'>
        <Option v-for="(option, index) in autoCompleteData" :value="option.value" :key="index">{{option.label}}</Option>
      </Select>
      <div class="searchBtn" @click="search">
        <Button type="ghost" shape="circle" icon="ios-search"></Button>
      </div>
      <div class="add pull-right" @click="add">
        <Button type="primary">
          <span class="icon-xinzeng"></span>新增</Button>
      </div>
      <div class="add green pull-right" style="marginRight:5px" @click="release">
        <Button type="primary" icon="checkmark-circled">
          <span></span>发布</Button>
      </div>
    </div>
    <div class="table">
      <Table @on-selection-change="selectChange" :loading="loading" border stripe size="small" highlight-row :columns="tableThead"
        :data="tableTbody">
      </Table>
    </div>
    <div class="page pageStyle pull-right">
      <Page :total="total" @on-change="pageChange" show-elevator show-total></Page>
    </div>
    <!-- 新增/修改 -->
    <div class="addPage" v-if="addPageShow">
      <div class="title">
        <span>位置： </span>
        <Breadcrumb separator=">">
          <BreadcrumbItem>移动管理</BreadcrumbItem>
          <BreadcrumbItem>巡查管理</BreadcrumbItem>
          <BreadcrumbItem>巡查任务安排</BreadcrumbItem>
          <BreadcrumbItem>{{moduleTitel}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <add-plan :model="formItem" @save="save" @cencel="cancel"></add-plan>
    </div>
    <!--确认删除  -->
    <Modal v-model="sureDelete" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除</span>
      </p>
      <div style="text-align:center">
        <p>确认删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="sureDdels">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { patrolPlanThead } from "common/js/table";
  import { successNotice, errorNotice } from "common/js/dom";
  import { patrolPlanApi } from "api/move-management";
  import AddPlan from "./addPlan.vue";
  import { getDepList } from "api/bumenlist";
  export default {
    components: {
      AddPlan
    },
    data() {
      return {
        sureDelete: false,
        addPageShow: false,
        moduleTitel: "新增",
        apiType: "list",
        formItem: {
          patrolman: [],
          status: "草稿",
          task_route: []
        },
        searchVal: {},
        tableThead: patrolPlanThead(this),
        tableTbody: [],
        loading: false,
        total: 0,
        deleteObj: {},
        selectLoading: false,
        autoCompleteData: [],
        departmentList: {},
        postObj: {
          page: 1,
          pageSize: 10,
          searchValue: {},
          order: {
            _id: -1
          }
        },
        releaseId: []
      };
    },
    created() {
      this.getList();
      this.getDepartment();
    },
    methods: {
      selectChange(section) {
        this.releaseId = []
        section.map(item => {
          this.releaseId.push(item._id)
        })
      },
      // 点击发布
      release() {
        let obj = {
          _ids: this.releaseId,
          status: "发布"
        };
        patrolPlanApi('publish', obj).then(res => {
          if (res.code === "0000") {
            this.getList();
            successNotice("发布成功");
          }
        });
      },
      selected(value) {
        let index = this.departmentList.findIndex(item => value === item.department_fullname)
        this.searchVal.department_name = this.departmentList[index].department_fullname
      },
      autoSearch(query) {
        if (query !== '') {
          this.selectLoading = true;
          setTimeout(() => {
            this.selectLoading = false;
            this.autoCompleteData = this.departmentList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
          }, 200);
        } else {
          this.autoCompleteData = [];
        }
      },
      // 获取所有数据
      getList() {
        this.loading = true;
        patrolPlanApi("list", this.postObj).then(res => {
          if (res.code === "0000") {
            this.loading = false;
            this.tableTbody = res.result.result;
            this.total = res.result.totalSize;
          }
        });
      },
      // 获取全部部门信息
      getDepartment() {
        getDepList().then(res => {
          if (res.code === "0000") {
            this.departmentList = res.result.result.map(item => {
              return {
                value: item.fullname,
                label: item.fullname,
                department_fullname: item.fullname,
                department_name: item.name,
                department_code: item.code,
                department_level: item.level
              };
            });
          }
        });
      },
      // 点击搜索
      search() {
        for (var i in this.searchVal) {
          if (!this.searchVal[i]) {
            delete this.searchVal[i];
          }
        }
        this.postObj.searchValue = this.searchVal;
        this.getList();
      },
      // 点击新增
      add() {
        this.formItem = {
          patrolman: [],
          status: "草稿",
          task_route: []
        };
        this.addPageShow = true;
        this.moduleTitel = "新增";
        this.apiType = "new";
      },
      // 分页
      pageChange() {
        this.postObj.page = index;
        this.getList();
      },
      // 新增/修改保存
      save(dataObj) {
        let obj = dataObj.obj
        dataObj.refs.validate((valid) => {
          if (valid) {
            patrolPlanApi(this.apiType, obj).then(res => {
              this.addPageShow = false;
              if (res.code === "0000") {
                successNotice(res.message);
                this.getList();
              } else {
                errorNotice(res.message);
                this.getList();
              }
            });
          }
        })
      },
      // 新增/修改关闭
      cancel(value) {
        this.addPageShow = false;
      },
      // 点击修改
      edit(dataObj) {
        // console.log(dataObj)
        this.moduleTitel = "修改";
        this.apiType = "edit";
        this.addPageShow = true;
        this.formItem = dataObj;
        if (this.formItem.patrolman) {
          this.formItem.patrolman.map(item => {
            return item;
          });
        }
      },
      // 点击删除
      delete(dataObj) {
        this.sureDelete = true;
        this.apiType = "delete";
        this.deleteObj = {
          _id: dataObj._id
        };
      },
      // 确认删除
      sureDdels() {
        this.sureDelete = false;
        patrolPlanApi(this.apiType, this.deleteObj).then(res => {
          if (res.code === "0000") {
            successNotice(res.message);
            this.getList();
          } else {
            errorNotice(res.message);
            this.getList;
          }
        });
      },
      // 详情
      details(dataObj) {
        this.formItem = dataObj;
        this.addPageShow = true;
      }
    }
  };
</script>
<style scoped lang="scss">
  .patrol-plan {
    .green {
      button {
        background: #19be6b !important;
        padding-left: 10px;
      }
    }
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
    .search {
      margin-bottom: 15px;
      .searchBtn {
        display: inline-block;
      }
    }
    .addPage {
      padding: 0 10px;
      z-index: 3;
      height: 100%;
      width: 100%;
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      form {
        margin-top: 60px;
        margin-bottom: 20px;
      }
    }
  }
</style>