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
      <el-table-column align="center" prop="Id" label="序号ID" />
      <el-table-column align="center" prop="Mobile" label="用户账号" />
      <el-table-column align="center" prop="hash" label="交易hash" width="150" />
      <el-table-column align="center" prop="addressTo" label="交易所OTC账户" width="130" />
      <el-table-column align="center" prop="chainId" label="链id" />
      <el-table-column align="center" prop="coinCode" label="币种" />
      <el-table-column align="center" prop="createdDate" label="交易时间" width="160" />
      <el-table-column align="center" prop="amount" label="币额" />
      <el-table-column align="center" prop="Status" label="状态">
        <template scope="scope">{{ scope.row.Status === 1?'未确认':'已确认' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="userId" label="用户ID" />
      <el-table-column align="center" prop="updatedBy" label="修改人" />
      <el-table-column align="center" prop="updatedDate" label="修改时间" />
      <el-table-column align="center" prop="createdBy" label="记录人" />
      <el-table-column align="center" prop="timeStamp" label="记录时间" />
      <el-table-column align="center" prop="orderNo" label="订单号" />
      <el-table-column align="center" prop="confirmNum" label="交易被确认次数" width="120" />
      <el-table-column align="center" prop="blockNum" label="打包交易的区块数" width="140" />
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
    this.getTransaction()
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
      this.getTransaction()
    },
    async getTransaction() {
      var dataMsg = await window.common.getTransaction({
        page: this.page,
        size: this.size,
        Mobile: this.form.mobile
      })
      if (dataMsg.code === 1) {
        this.dataList = dataMsg.data.list
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
