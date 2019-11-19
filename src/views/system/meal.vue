<template>
  <div class="container">
    <el-table :data="mealList" border>
      <el-table-column align="center" prop="id" label="序号ID" />
      <el-table-column align="center" prop="smsName" label="矿机类型" />
      <el-table-column align="center" prop="settingDay" label="天数" />
      <el-table-column align="center" prop="settingDesc" label="月收益" />
      <el-table-column align="center" prop="settingRate" label="每天产生汇率" />
    </el-table>
  </div>
</template>

<script >
export default {
  data() {
    return {
      mealList: []
    }
  },
  created() {
    this.getMeal()
  },
  methods: {
    async getMeal() {
      var dataMsg = await window.common.getMeal()
      if (dataMsg.code === 1) {
        this.mealList = dataMsg.data
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
