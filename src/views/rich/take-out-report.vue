<template>
  <div class="container">
    <el-row>
      <el-col :span="4">
        <el-select v-model="form.TransferSource" placeholder="请选择类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="mgL10">
        <el-select v-model="form.TraState" placeholder="请选择状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="mgL10">
        <el-input v-model="form.mobile" placeholder="请输入账号" />
      </el-col>
      <el-button type="primary" icon="el-icon-search" class="mgL10" @click="search">搜索</el-button>
      <el-button type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>
    </el-row>
    <el-table :data="takeOutReportData" style="width: 100%" border class="mgT20">
      <el-table-column prop="UserId" label="序号ID" width="180" />
      <el-table-column prop="UserName" label="用户名" width="180" />
      <el-table-column prop="Mobile" label="用户账号" width="180" />
      <el-table-column prop="OrderNum" label="订单号" width="180" />
      <el-table-column prop="Amount" label="数量" width="180" />
      <el-table-column label="类型" width="180">
        <template
          scope="scope"
        >{{ scope.row.TransferSource===1?'内部转账':(scope.row.TransferSource===2?'外部转入':'转出外部') }}</template>
      </el-table-column>
      <el-table-column prop="date" label="状态" width="180">
        <template scope="scope">
          <span v-if="scope.row.TraState===0">转账中</span>
          <span v-else-if="scope.row.TraState===1">转账成功</span>
          <span v-else-if="scope.row.TraState===2">转账失败</span>
          <span v-else>撤销</span>
        </template>
      </el-table-column>
      <el-table-column prop="RecTime" label="创建时间" width="180" />
      <el-table-column prop="TakeTime" label="审核时间" width="180" />
      <el-table-column prop="CoinCode" label="币种" width="180" />
      <el-table-column prop="FromAddress" label="转出地址" width="180" />
      <el-table-column prop="ToAddress" label="转入地址" width="180" />
      <el-table-column label="编辑" width="180">
        <template scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="walletTransferToByOut(scope.row.userId,0)"
          >提币</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="walletTransferToByOut(scope.row.userId,1)"
          >驳回</el-button>
        </template>
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
        TransferSource: '',
        TraState: '',
        mobile: ''
      },
      page: 1,
      size: 10,
      takeOutReportData: [],
      options: [
        {
          value: '1',
          label: '内部转账'
        },
        {
          value: '2',
          label: '外部转入'
        },
        {
          value: '3',
          label: '转出外部'
        }
      ],
      statusList: [
        {
          value: 0,
          label: '转账中'
        },
        {
          value: 1,
          label: '转账成功'
        },
        {
          value: 2,
          label: '转账失败'
        },
        {
          value: 3,
          label: '撤销'
        }
      ],
      total: 0
    }
  },
  created() {
    this.getTakeOutReport()
  },
  methods: {
    search() {
      this.page = 1
      this.getTakeOutReport()
    },
    // 导出表格
    exportExcel() {
      var data = this.takeOutReportData.map(item => {
        return [
          item.UserId,
          item.UserName,
          item.Mobile,
          item.OrderNum,

          item.Amount,
          item.TransferSource === 1
            ? '内部转账'
            : item.TransferSource === 2
              ? '外部转入'
              : '转出外部',
          item.TraState === 0
            ? '转账中'
            : item.TraState === 1
              ? '转账成功'
              : item.TraState === 2
                ? '转账失败'
                : '撤销',
          item.RecTime,
          item.TakeTime,
          item.CoinCode,
          item.FromAddress,
          item.ToAddress
        ]
      })
      this.$store.commit('ExportXlsx', {
        header: [
          '序号ID',
          '用户名',
          '用户账号',
          '订单号',
          '数量',
          '类型',
          '状态',
          '创建时间',
          '审核时间',
          '币种',
          '转出地址',
          '转入地址'
        ],
        data
      })
    },
    handleSizeChange(size) {
      this.size = size
      this.getTakeOutReport()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getTakeOutReport()
    },
    async walletTransferToByOut(id, type) {
      var dataMsg = await window.common.walletTransferToByOut({
        id,
        type
      })
      if (dataMsg.code === 1) {
        this.$message.success('操作成功')
      } else {
        this.$message.error('操作失败')
      }
    },
    async getTakeOutReport() {
      var dataMsg = await window.common.getTakeOutReport({
        page: this.page,
        size: this.size,
        mobile: this.form.mobile,
        TransferSource: this.form.TransferSource,
        TraState: this.form.TraState
      })
      console.log(dataMsg)
      if (dataMsg.code === 1) {
        this.takeOutReportData = dataMsg.data.records
        this.total = dataMsg.data.total
      } else {
        this.takeOutReportData = []
        this.total = 0
      }
    }
  }
}
</script>

<style scoped >
</style>
