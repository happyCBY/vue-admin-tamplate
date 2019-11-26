<template>
  <div class="app-container">
    <el-card>
      <el-table :data="lastActivityViewData" border style="width: 100%">
        <el-table-column prop="userId" label="用户id" />
        <el-table-column prop="username" label="用户昵称" />
        <el-table-column prop="mobile" label="手机号" />
        <el-table-column prop="date" label="类型">
          <template scope="scope">
            <span v-if="scope.row.type===1">增加用户资金（{{ scope.row.count }} USDT)</span>
            <span v-else-if="scope.row.type===2">增加用户矿机（四级矿机)</span>
            <span v-else>复投用户矿机（四级矿机）</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="时间" />
      </el-table>
      <el-pagination
        :current-page="pageIndex"
        :page-sizes="[10, 20,50]"
        :page-size="pageSize"
        :total="total"
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastActivityViewData: [],
      pageIndex: 1,
      pageSize: 50,
      total: 0,
      count: ''
    }
  },
  created() {
    this.getlastActivityView()
  },
  methods: {
    async getlastActivityView() {
      var recode = await window.common.getAdminRecordList({
        // pageSize: this.pageSize,
        page: this.pageIndex,
        size: this.pageSize
      })
      console.log(recode)

      this.count = recode.data.count
      if (recode.code === 1) {
        // recode.data.data.pageData.records.forEach(item => {
        //   item.create_time = window.parseTime(item.create_time)
        // })
        this.total = recode.data.total
        this.pageIndex = recode.data.pages
        this.pageSize = recode.data.size
        this.lastActivityViewData = recode.data.records
      } else {
        this.$message.error(recode.msg)
      }

      //   this.lastActivityViewData = recode
    },
    // pageSize改变时触发
    // handleSizeChange(size){
    //   this.pageSize = size
    //   this.pageIndex = 1
    //   this.getlastActivityView()
    // },
    // 当前页改变时触发
    handleCurrentChange(page) {
      this.pageIndex = page
      this.getlastActivityView()
    }
  }
}
</script>

<style>
</style>
