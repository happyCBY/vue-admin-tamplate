<template>
  <div class="container">
    <div class="ofh mgB20">
      <div class="fl mgR10">
        <el-input v-model="form.mobile" placeholder="用户账号" />
      </div>

      <div class="fl mgR10">
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
        />
      </div>
      <div class="fl mgR10">
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <div class="fl mgR10">
        <el-button type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>
      </div>
    </div>
    <el-table :data="transactionFlowList" style="width: 100%" border>
      <el-table-column align="center" prop="UserId" label="序号ID" />
      <el-table-column align="center" prop="Mobile" label="用户账号" />
      <el-table-column align="center" prop="UserName" label="昵称" />
      <el-table-column align="center" prop="OldJifen" label="前数量" />
      <el-table-column align="center" prop="Jifen" label="数量" />
      <el-table-column align="center" prop="NewJifen" label="后数量" />
      <el-table-column align="center" prop="CoinCode" label="币种" />
      <el-table-column align="center" label="交易说明">
        <template scope="scope">{{ scope.row.TransferType===0?'闪兑':'转账' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="RecTime" label="时间" width="200" />
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
        mobile: '',
        time: ''
      },
      page: 1,
      size: 10,
      transactionFlowList: [],
      total: 0
    }
  },
  created() {
    this.getTransactionFlow()
  },
  methods: {
    exportExcel() {
      var data = this.transactionFlowList.map(item => {
        return [
          item.UserId,
          item.Mobile,
          item.UserName,
          item.OldJifen,
          item.Jifen,
          item.NewJifen,
          item.CoinCode,
          item.TransferType === 0 ? '闪兑' : '转账',
          item.RecTime
        ]
      })
      this.$store.commit('ExportXlsx', {
        header: [
          '序号ID',
          '用户账号',
          '昵称',
          '前数量',
          '数量',
          '后数量',
          '币种',
          '交易说明',
          '时间'
        ],
        data
      })
    },
    handleSizeChange(size) {
      this.size = size
      this.getTransactionFlow()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getTransactionFlow()
    },
    search() {
      this.page = 1
      this.getTransactionFlow()
    },
    async getTransactionFlow() {
      var beginDate_String = ''
      var endDate_String = ''
      if (this.form.time) {
        beginDate_String = window.parseTime(this.form.time[0], 'YYYY-MM-DD')
        endDate_String = window.parseTime(this.form.time[1], 'YYYY-MM-DD')
      }

      var dataMsg = await window.common.getTransactionFlow({
        page: this.page,
        size: this.size,
        mobile: this.form.mobile,
        beginDate: beginDate_String,
        endDate: endDate_String
      })
      if (dataMsg.code === 1) {
        this.total = dataMsg.data.total
        this.transactionFlowList = dataMsg.data.records
      } else {
        this.$message.error('获取列表失败')
      }
    }
  }
}
</script>

<style scoped >
</style>
