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
      <div class="fl mgr10 mgR10">
        <el-select v-model="form.setmealId">
          <el-option v-for="item in meals" :key="item.id" :label="item.smsName" :value="item.id" />
        </el-select>
      </div>
      <div class="fl mgR10">
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <div class="fl mgR10">
        <el-button type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>
      </div>
    </div>
    <el-table :data="transactionFlowList" style="width: 100%" border>
      <el-table-column align="center" prop="Id" label="序号ID" />
      <el-table-column align="center" prop="mobile" label="用户账号" />
      <el-table-column align="center" prop="userName" label="昵称" />
      <el-table-column align="center" prop="orderNum" label="订单号" />
      <el-table-column align="center" prop="smsName" label="套餐" />
      <el-table-column align="center" prop="buyConinCode" label="币种" />
      <el-table-column align="center" prop="setmealId" label="数量" />
      <el-table-column align="center" prop="amount" label="金额" />
      <el-table-column align="center" prop="recTime" label="购买时间" />
      <el-table-column align="center" prop="releasedAmount" label="已获得金额" />
      <el-table-column align="center" prop="RecTime" label="结束时间" />
      <el-table-column align="center" prop="settingRate" label="实际收益费率" />
      <el-table-column align="center" label="状态">
        <template scope="scope">{{ scope.row.releasedStatus===0?'进行中':'已完结' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="RecTime" label="是否可赎回">
        <template
          scope="scope"
        >{{ scope.row.ifAdvanceType===0&&scope.row.releasedStatus===0?'可赎回':'不可赎回' }}</template>
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
        time: '',
        setmealId: ''
      },
      page: 1,
      size: 10,
      transactionFlowList: [],
      total: 0,
      meals: []
    }
  },
  created() {
    this.getFinance()
    this.getMeal()
  },
  methods: {
    exportExcel() {
      var data = this.transactionFlowList.map(item => {
        return [
          item.Id,
          item.mobile,
          item.userName,
          item.orderNum,
          item.smsName,
          item.buyConinCode,
          item.amount,
          item.setmealId,
          item.recTime,
          item.releasedAmount,
          item.RecTime,
          item.settingRate,
          item.releasedStatus === 0 ? '进行中' : '已完结',
          item.ifAdvanceType === 0 && item.releasedStatus === 0
            ? '可赎回'
            : '不可赎回'
        ]
      })
      this.$store.commit('ExportXlsx', {
        header: [
          '序号ID',
          '用户账号',
          '昵称',
          '订单号',
          '套餐',
          '币种',
          '数量',
          '金额',
          '购买时间',
          '已获得金额',
          '结束时间',
          '实际收益费率',
          '状态',
          '是否可赎回'
        ],
        data
      })
    },
    handleSizeChange(size) {
      this.size = size
      this.getFinance()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getFinance()
    },
    search() {
      this.page = 1
      this.getFinance()
    },
    // 获取矿机列表
    async getMeal() {
      var dataMsg = await window.common.getMeal()
      if (dataMsg.code === 1) {
        this.meals = dataMsg.data
      } else {
        this.$message.error(dataMsg.msg)
      }
    },
    async getFinance() {
      var beginDate_String = ''
      var endDate_String = ''
      if (this.form.time) {
        beginDate_String = window.parseTime(this.form.time[0], 'YYYY-MM-DD')
        endDate_String = window.parseTime(this.form.time[1], 'YYYY-MM-DD')
      }
      console.log(this.form.setmealId)

      var dataMsg = await window.common.getFinance({
        page: this.page,
        size: this.size,
        mobile: this.form.mobile,
        beginDate: beginDate_String,
        endDate: endDate_String,
        setmealId: this.form.setmealId
      })
      if (dataMsg.code === 1) {
        this.total = dataMsg.data.Total
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
