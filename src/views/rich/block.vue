<template>
  <div class="container">
    <el-row>
      <el-col :span="4">
        <el-select v-model="form.coinCode" placeholder="请选择币种">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-button type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>
    </el-row>
    <el-table :data="blockList" style="width: 100%" border class="mgT20">
      <el-table-column prop="Address" label="钱包地址" width="300" />
      <el-table-column prop="UserId" label="用户ID" />
      <el-table-column prop="Mobile" label="用户账号" />
      <el-table-column prop="UserMobile" label="手机号" />
      <el-table-column prop="AvailableBalance" label="链上余额" />
      <el-table-column label="编辑" width="180">
        <template scope="scope">
          <el-button @click="turnOut(scope.row)">转出</el-button>
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
        coinCode: 'ETH'
      },
      page: 1,
      size: 10,
      blockList: [],
      options: [
        {
          value: 'MUSK',
          label: 'MUSK'
        },
        {
          value: 'ETH',
          label: 'ETH'
        }
      ],
      total: 0
    }
  },
  created() {
    this.transactionOut()
  },
  methods: {
    handleSizeChange(size) {
      this.size = size
      this.transactionOut()
    },
    handleCurrentChange(page) {
      this.page = page
      this.transactionOut()
    },
    exportExcel() {
      var data = this.blockList.map(item => {
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
        header: ['钱包地址', '用户ID', '用户账号', '手机号', '链上余额'],
        data
      })
    },
    change() {
      this.transactionOut()
    },
    turnOut(id) {},
    async transactionOut() {
      var dataMsg = await window.common.transactionOut({
        page: this.page,
        size: this.size,
        coinCode: this.form.coinCode
      })
      if (dataMsg.code === 1) {
        this.blockList = dataMsg.data.records
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
