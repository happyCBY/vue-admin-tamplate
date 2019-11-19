<template>
  <div class="container">
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column align="center" prop="name" label="币种" />
      <el-table-column align="center" prop="sum21" label="释放奖励" />
      <el-table-column align="center" prop="sum17" label="推荐奖励" />
      <el-table-column align="center" prop="sum20" label="社区奖励" />
      <!-- <el-table-column align="center" prop="sum35" label="平级奖励" />
      <el-table-column align="center" prop="sum36" label="全球分红" />-->
      <el-table-column align="center" prop="sum" label="奖励总数" />
    </el-table>
  </div>
</template>

<script >
export default {
  data() {
    return {
      dataList: []
    }
  },
  created() {
    this.getDrillReport()
  },
  methods: {
    exportExcel() {
      var data = this.dataList.map(item => {
        return [
          item.Id,
          item.Mobile,
          item.hash,
          item.addressTo,
          item.chainId,
          item.coinCode,
          item.createdDate,
          item.amount,
          item.Status === 1 ? '未确认' : '已确认',
          item.userId,
          item.updatedBy,
          item.updatedDate,
          item.createdBy,
          item.timeStamp,
          item.orderNo,
          item.confirmNum,
          item.blockNum
        ]
      })
      this.$store.commit('ExportXlsx', {
        header: [
          '序号ID',
          '用户账号',
          '交易hash',
          '交易所OTC账户',
          '链id',
          '币种',
          '交易时间',
          '币额',
          '状态',
          '用户ID',
          '修改人',
          '修改时间',
          '记录人',
          '记录时间',
          '订单号',
          '交易被确认次数',
          '打包交易的区块数'
        ],
        data
      })
    },
    search() {
      this.getDrillReport()
    },
    async getDrillReport() {
      var dataMsg = await window.common.getDrillReport()
      if (dataMsg.code === 1) {
        this.dataList = dataMsg.data
        this.dataList = this.dataList.map(item => {
          return {
            ...item[0]
          }
        })
        console.log(this.dataList)
      } else {
        this.$message.error('获取列表失败')
      }
    }
  }
}
</script>

<style scoped >
</style>
