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
      </el-row>
      <el-row>
        <el-col :span="2">矿机id:</el-col>
        <el-col :span="4" class="mgR20">
          <el-input v-model="form.repeatItcId" />
        </el-col>
        <el-col :span="3">复投矿机类型:</el-col>
        <el-col :span="4">四级矿机</el-col>
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
          <el-button @click="repeatItc">复投</el-button>
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
        password: '',
        // 复投矿机id
        repeatItcId: ''
      }
    }
  },
  methods: {
    async repeatItc() {
      if (
        this.form.user_id.trim().length !== 0 &&
        this.form.iponeNumber.trim().length !== 0 &&
        this.form.admin.trim().length !== 0 &&
        this.form.password.trim().length !== 0 &&
        this.form.repeatItcId.trim().length !== 0
      ) {
        this.$confirm('你确认执行此操作', '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

          .then(async() => {
            var data = await window.common.repeatItc({
              admin: this.form.admin,
              password: this.form.password,
              mobile: this.form.iponeNumber,
              username: this.form.user_id,
              order_id: this.form.repeatItcId
            })
            if (data.code !== -1) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: data.msg
              })
            }
          })

          .catch(() => {
            console.log(1)

            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
      } else {
        this.$message.error('输入框不能为空')
      }
    }
  }
}
</script>

<style scope>
.el-row {
  line-height: 36px;
  margin-top: 20px;
}
</style>
