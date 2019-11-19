<template>
  <div class="container">
    <el-table :data="recommendList" border>
      <el-table-column align="center" prop="id" label="序号ID" />
      <el-table-column align="center" prop="shareLevel" label="等级" />
      <el-table-column align="center" prop="dai1" label="1级" />
      <el-table-column align="center" prop="dai2" label="2级" />
      <el-table-column align="center" prop="dai3" label="3级" />
      <el-table-column align="center" prop="dai4" label="4级" />
      <el-table-column align="center" prop="dai5" label="5级" />
      <el-table-column align="center" prop="dai6" label="6级" />
      <el-table-column align="center" prop="dai7" label="7级" />
      <el-table-column align="center" prop="dai8" label="8级" />
      <el-table-column align="center" prop="dai9" label="9级" />
      <el-table-column align="center" prop="dai10" label="10级" />
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
      recommendList: [],
      page: 1,
      size: 10,
      total: 0
    }
  },
  created() {
    this.getRecommend()
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
    async getRecommend() {
      var dataMsg = await window.common.getRecommend({
        page: this.page,
        size: this.size
      })
      if (dataMsg.code === 1) {
        this.recommendList = dataMsg.data.records
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
