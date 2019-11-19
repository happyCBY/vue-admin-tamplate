<template>
  <div class="container">
    <el-button size="mini" type="primary" class="mgB10" @click="addEdit">添加</el-button>
    <el-table :data="CoinConvertList" border>
      <el-table-column align="center" prop="id" label="序号ID" />
      <el-table-column align="center" prop="symbolFrom" label="转换币种" />
      <el-table-column align="center" prop="symbolTo" label="换币种" />
      <el-table-column align="center" prop="symbolRate" label="手续费" />
      <el-table-column align="center" prop="recTime" label="创建时间" />
      <el-table-column align="center" label="状态">
        <template scope="scope">{{ scope.row.status===0?'可以使用':'不可使用' }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button type="primary" size="mini" @click="addEdit(scope.row)">编辑</el-button>
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
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="50%">
      <span slot="footer" class="dialog-footer">
        <el-form :model="form" label-width="80px">
          <el-form-item label="转换币种">
            <el-input v-model="form.symbolFrom" />
          </el-form-item>
          <el-form-item label="换币种">
            <el-input v-model="form.symbolTo" />
          </el-form-item>
          <el-form-item label="手续费">
            <el-input v-model="form.symbolRate" placeholder="请输入小数" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" style="float: left; margin-left: 0" placeholder="选择状态">
              <el-option label="可用" value="0" />
              <el-option label="不可用" value="1" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script >
export default {
  data() {
    return {
      dialogVisible: false,
      CoinConvertList: [],
      page: 1,
      size: 10,
      total: 0,
      form: {
        symbolFrom: '',
        symbolTo: '',
        symbolRate: '',
        status: '0',
        id: ''
      }
    }
  },
  created() {
    this.getCoinConvert()
  },
  methods: {
    // 添加修改
    addEdit(data) {
      if (data) {
        this.form.id = data.id
        this.form.symbolFrom = data.symbolFrom
        this.form.symbolTo = data.symbolTo
        this.form.symbolRate = data.symbolRate
        this.form.status = data.status
      }
      this.dialogVisible = true
    },
    // 确认添加修改
    async sureSave(data) {
      var dataMsg
      if (data) {
        dataMsg = await window.common.coinConvert(this.form)
        if (dataMsg.code === 1) {
          this.$message.success('操作成功')
          this.getCoinConvert()
          this.dialogVisible = false
        }
      } else {
        dataMsg = await window.common.coinConvert(this.form)
        if (dataMsg.code === 1) {
          this.$message.success('操作成功')
          this.getCoinConvert()
          this.dialogVisible = false
        }
      }

      // console.log(dataMsg)
    },
    // 每页显示条数改变
    handleSizeChange(size) {
      this.size = size
      this.getNewsList()
    },
    // 页数改变
    handleCurrentChange(page) {
      this.page = page
      this.getNewsList()
    },
    async getCoinConvert() {
      var dataMsg = await window.common.getCoinConvert({
        page: this.page,
        size: this.size
      })
      if (dataMsg.code === 1) {
        this.CoinConvertList = dataMsg.data.records
        this.total = dataMsg.data.total
      } else {
        this.$message.error('获取列表失败')
      }
      console.log(dataMsg)
    }
  }
}
</script>

<style  lang="scss" scoped   >
</style>
