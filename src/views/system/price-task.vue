<template>
  <div class="container">
    <el-table :data="PriceTaskList" border>
      <el-table-column align="center" prop="id" label="序号ID" />
      <el-table-column align="center" prop="symbolFrom" label="转换币种" />
      <el-table-column align="center" prop="symbolTo" label="换币种" />
      <el-table-column align="center" prop="price" label="汇率" />
      <el-table-column align="center" prop="recTime" label="创建时间" />
      <el-table-column align="center" prop="upTime" label="更新时间" />
    </el-table>
    <el-pagination
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script >
export default {
  data() {
    return {
      PriceTaskList: [],
      page: 1,
      size: 10,
      total: 0
    }
  },
  created() {
    this.getPriceTask()
  },
  methods: {
    // 每页显示条数改变
    handleSizeChange(size) {
      this.size = size
      this.getNewsList()
    },
    // 页数改变
    handleCurrentChange(page) {
      this.page = page
      this.getNewsList()
    },
    async getPriceTask() {
      var dataMsg = await window.common.getPriceTask({
        page: this.page,
        size: this.size
      })
      if (dataMsg.code === 1) {
        this.PriceTaskList = dataMsg.data.records
        this.total = dataMsg.data.total
      } else {
        this.$message.error('获取列表失败')
      }
      console.log(dataMsg)
    }
  }
}
</script>

<style scoped >
</style>
