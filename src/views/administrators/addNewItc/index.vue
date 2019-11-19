<template>
  <div class="app-container">
    <el-card>
      <el-row>
        <el-col :span="2">用户名:</el-col>
        <el-col :span="4" class="mgR20">
          <el-input v-model="form.user_id" />
        </el-col>
        <el-col :span="2">手机号:</el-col>
        <el-col :span="4" class="mgR20">
          <el-input v-model="form.iponeNumber" />
        </el-col>
        <el-col :span="3">新增矿机类型:</el-col>
        <el-col :span="4">
          四级矿机
          <!-- <el-select v-model="form.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>-->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">管理员账号:</el-col>
        <el-col :span="4">
          <el-input v-model="form.admin" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">管理员密码:</el-col>
        <el-col :span="4">
          <el-input v-model="form.password" />
        </el-col>
      </el-row>
      <el-row>
        <!-- 占位 -->
        <el-col :span="2">
          <p />
        </el-col>
        <el-col :span="4">
          <el-button @click="addKJ">添加</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user_id: '',
        iponeNumber: '',
        admin: '',
        password: ''
      }
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    async addKJ() {
      if (
        this.form.user_id.trim().length !== 0 &&
        this.form.iponeNumber.trim().length !== 0 &&
        this.form.admin.trim().length !== 0 &&
        this.form.password.trim().length !== 0
      ) {
        this.$confirm('你确认执行此操作', '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

          .then(async() => {
            var addKjData = await window.common.addNewItc({
              username: this.form.user_id,
              mobile: this.form.iponeNumber,
              admin: this.form.admin,
              password: this.form.password
            })
            console.log(addKjData)

            if (addKjData.code !== -1) {
              this.$message.success('操作成功')
            } else {
              this.$message.error(addKjData.msg)
            }
          })

          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
      } else {
        this.$message.error('输入框不能为空')
      }
    }
    // 获得矿机类型
    // getList() {
    //   this.listLoading = true
    //   getMeal(this.listQuery).then(response => {
    //     response.data.list.forEach((item) => {
    //       const obj = {
    //         value: item.Id,
    //         label: item.SmsName
    //       }
    //       this.options.push(obj)
    //     })
    //   })
    // }
  }
}
</script>

<style less scoped >
.el-row {
  line-height: 36px;
  margin-top: 20px;
}
</style>
