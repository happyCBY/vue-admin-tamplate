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
      <el-table-column align="center" prop="Mobile" label="账号" />
      <el-table-column align="center" prop="UserMobile" label="手机" />
      <el-table-column align="center" prop="UserName" label="昵称" />
      <el-table-column align="center" prop="SymbolFrom" label="转换币种" />
      <el-table-column align="center" prop="SymbolTo" label="换币种" />
      <el-table-column align="center" prop="OrderNum" label="订单号" />
      <el-table-column align="center" prop="SumAmount" label="转换前额度" />
      <el-table-column align="center" prop="Amount" label="转换后额度" />
      <el-table-column align="center" prop="ServiceAmount" label="转换手续费" />
      <el-table-column align="center" prop="RecTime" label="时间" />
      <el-table-column align="center" prop="SymbolRate" label="转换率" />
      <el-table-column align="center" prop="FeeUnitRate" label="手续费单位" />
      <el-table-column align="center" prop="State" label="转换状态">
        <template scope="scope">{{ scope.row.State===1?'转换成功':'转换失败' }}</template>
      </el-table-column>
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
    this.getFlashExchange()
  },
  methods: {
    // 导出表格
    exportExcel() {
      var data = this.transactionFlowList.map(item => {
        return [
          item.UserId,
          item.Mobile,
          item.UserMobile,
          item.UserName,
          item.SymbolFrom,
          item.SymbolTo,
          item.OrderNum,
          item.SumAmount,
          item.Amount,
          item.ServiceAmount,
          item.RecTime,
          item.SymbolRate,
          item.FeeUnitRate,
          item.State === 1 ? '转换成功' : '转换失败'
        ]
      })
      this.$store.commit('ExportXlsx', {
        header: [
          '序号ID',
          '账号',
          '手机',
          '昵称',
          '转换币种',
          '换币种',
          '订单号',
          '转换前额度',
          '转换后额度',
          '转换手续费',
          '时间',
          '转换率',
          '手续费单位',
          '转换状态'
        ],
        data
      })
    },
    handleSizeChange(size) {
      this.size = size
      this.getFlashExchange()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getFlashExchange()
    },
    search() {
      this.page = 1
      this.getFlashExchange()
    },
    async getFlashExchange() {
      var beginDate_String = ''
      var endDate_String = ''
      if (this.form.time) {
        beginDate_String = window.parseTime(this.form.time[0], 'YYYY-MM-DD')
        endDate_String = window.parseTime(this.form.time[1], 'YYYY-MM-DD')
      }

      var dataMsg = await window.common.getFlashExchange({
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
