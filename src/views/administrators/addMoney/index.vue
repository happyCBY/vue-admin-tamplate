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
        <el-col :span="2">增加金额:</el-col>
        <el-col :span="4">
          <el-input v-model="form.value" />
        </el-col>
        <el-col :span="2" style="margin-left: 10px;">USDT</el-col>
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
          <!-- <input type="password" class="password" > -->
          <el-input v-model="form.password" />
        </el-col>
      </el-row>
      <el-row>
        <!-- 占位 -->
        <el-col :span="2">
          <p />
        </el-col>
        <el-col :span="4">
          <el-button @click="addMoney">提交</el-button>
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
        value: ''
      }
    }
  },
  methods: {
    async addMoney() {
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
            var data = await window.common.addMoney({
              username: this.form.user_id,
              mobile: this.form.iponeNumber,
              admin: this.form.admin,
              password: this.form.password,
              usdt: this.form.value
            })
            console.log(data.code)

            if (data.code !== -1) {
              this.$message.success('操作成功')
            } else {
              this.$message.error(data.msg)
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
  }
}
</script>

<style scope>
.el-row {
  line-height: 36px;
  margin-top: 20px;
}
.password {
  line-height: 36px;
  height: 36px;
  width: 100%;
  border-radius: 4px;
  outline: 0;
  padding: 0 15px;
}
</style>
