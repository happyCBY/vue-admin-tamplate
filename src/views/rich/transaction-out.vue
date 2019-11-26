<template>
  <div class="container">
    <el-row>
      <el-col :span="4">
        <el-input v-model="form.mobile" placeholder="请输入账号" />
      </el-col>
      <el-button type="primary" icon="el-icon-search" class="mgL10" @click="search">搜索</el-button>
      <el-button type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>
    </el-row>
    <el-row class="mgT10">
      <span v-for="(item,index) in sum" :key="index" class="mgR20" :span="6">
        <span>币种：</span>
        <span class="mgR10">{{ item.coinCode }}</span>
        <span>总额：</span>
        <span>{{ item.amount }}</span>
      </span>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border class="mgT10">
      <el-table-column prop="Id" label="序号ID" />
      <el-table-column prop="Mobile" label="用户账号" />
      <el-table-column prop="hash" label="交易hash" width="90" />
      <el-table-column prop="addressTo" label="交易所OTC账户" width="130" />
      <el-table-column prop="addressFrom" label="交易发起账户" width="120" />
      <el-table-column prop="chainId" label="链id" />
      <el-table-column prop="coinCode" label="币种" />
      <el-table-column prop="Status" label="状态">
        <template scope="scope">{{ scope.row.Status === 1?'未确认':'已确认' }}</template>
      </el-table-column>
      <el-table-column prop="userId" label="用户ID" />
      <el-table-column prop="transferAmountFrom" label="申请数量" />
      <el-table-column prop="transferAmountTo" label="到账数量" />
      <el-table-column prop="chargeMoney" label="手续费" />
      <el-table-column prop="createdDate" label="交易时间" />
      <el-table-column prop="createdBy" label="记录人" />
      <el-table-column prop="timeStamp" label="记录时间" />
      <el-table-column prop="confirmNum" label="交易被确认次数" width="120" />
      <el-table-column prop="blockNum" label="打包交易的区块数" width="140" />
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
      form: {
        mobile: ''
      },
      page: 1,
      size: 10,
      dataList: [],
      total: 0,
      sum: []
    }
  },
  created() {
    this.getTransactionOut()
  },
  methods: {
    handleSizeChange(size) {
      this.size = size
      this.dataList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.dataList()
    },
    exportExcel() {
      var data = this.dataList.map(item => {
        return [
          item.Id,
          item.Mobile,
          item.hash,
          item.addressTo,
          item.addressFrom,
          item.chainId,
          item.coinCode,
          item.Status === 1 ? '未确认' : '已确认',
          item.userId,
          item.transferAmountFrom,
          item.transferAmountTo,
          item.chargeMoney,
          item.createdDate,
          item.createdBy,
          item.timeStamp,
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
          '交易发起账户',
          '链id',
          '币种',
          '状态',
          '用户ID',
          '申请数量',
          '到账数量',
          '手续费',
          '交易时间',
          '记录人',
          '记录时间',
          '交易被确认次数',
          '打包交易的区块数'
        ],
        data
      })
    },
    search() {
      this.page = 1
      this.getTransactionOut()
    },
    async getTransactionOut() {
      var dataMsg = await window.common.getTransactionOut({
        page: this.page,
        size: this.size,
        Mobile: this.form.mobile
      })
      if (dataMsg.code === 1) {
        this.dataList = dataMsg.data.list
        this.dataList.forEach(item => {
          item.createdDate = window.parseTime(item.createdDate)
          item.timeStamp = window.parseTime(item.timeStamp)
        })
        this.total = dataMsg.data.total
        this.sum = dataMsg.data.sum
      } else {
        this.$message.error('获取列表失败')
      }
    }
  }
}
</script>

<style scoped >
</style>
