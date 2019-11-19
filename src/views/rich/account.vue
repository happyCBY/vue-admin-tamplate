<template>
  <div class="container">
    <el-row>
      <el-col :span="4">
        <el-input v-model="form.mobile" placeholder="请输入账号" />
      </el-col>
      <el-button type="primary" icon="el-icon-search" class="mgL10" @click="search">搜索</el-button>
      <el-button type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>
    </el-row>
    <el-table :data="walletList" style="width: 100%" border class="mgT20">
      <el-table-column prop="UserId" label="序号ID" />
      <el-table-column prop="Mobile" label="用户账号" />
      <el-table-column prop="UserMobile" label="手机号" />
      <el-table-column prop="UserName" label="昵称" />
      <el-table-column prop="CoinCode" label="币种" />
      <el-table-column prop="AvailableBalance" label="余额" />
      <el-table-column prop="FrozenBalance" label="冻结余额" />
      <el-table-column prop="Address" label="钱包地址" width="300" />
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
      walletList: [],
      total: 0
    }
  },
  created() {
    this.getAccount()
  },
  methods: {
    exportExcel() {
      var data = this.walletList.map(item => {
        return [
          item.UserId,
          item.Mobile,
          item.UserMobile,
          item.UserName,
          item.CoinCode,
          item.AvailableBalance,
          item.FrozenBalance,
          item.Address
        ]
      })
      this.$store.commit('ExportXlsx', {
        header: [
          '序号ID',
          '用户账号',
          '手机号',
          '昵称',
          '币种',
          '余额',
          '冻结余额',
          '钱包地址'
        ],
        data
      })
    },
    search() {
      this.getAccount()
    },
    handleSizeChange(size) {
      this.size = size
      this.getAccount()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getAccount()
    },
    async getAccount() {
      var dataMsg = await window.common.getAccount({
        page: this.page,
        size: this.size,
        mobile: this.form.mobile
      })
      if (dataMsg.code === 1) {
        this.walletList = dataMsg.data.records
        this.total = dataMsg.data.total
      } else {
        this.$message.error('获取列表失败')
      }
    }
  }
}
</script>

<style scoped >
</style>
