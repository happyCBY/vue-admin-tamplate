<template>
  <div class="container">
    <el-row>
      <el-col v-for="(item,index) in appData" :key="index" :span="12">
        <div>
          <span>设备：</span>
          <span>{{ item.descript }}</span>
        </div>
        <div>
          <span>当前版本：</span>
          <span>{{ item.version }}</span>
        </div>
        <el-button type="primary" @click="updata(item)">修改</el-button>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @close="closeDia">
      <el-row>
        <el-col :span="6">版本号：</el-col>
        <el-col :span="18">
          <el-input v-model="updataData.version" />
        </el-col>
      </el-row>
      <el-row class="mgT20">
        <el-col :span="6">是否更新：</el-col>
        <el-col :span="18">
          <el-select
            v-model="updataData.isQG"
            style="float: left; margin-left: 0; width: 100%"
            placeholder="选择状态"
          >
            <el-option label="更新" :value="0" />
            <el-option label="不更新" :value="1" />
          </el-select>
        </el-col>
      </el-row>

      <el-row class="mgT20">
        <el-col :span="6">强制更改</el-col>
        <el-col :span="18">
          <el-radio v-model="status" :label="1">是</el-radio>
          <el-radio v-model="status" :label="0">否</el-radio>
        </el-col>
      </el-row>
      <div class="mgT20" style="color:red">当填写的版本号比原版本号低时，强制更新会将版本号降低</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureUpdata">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script >
export default {
  data() {
    return {
      appData: [],
      dialogVisible: false,
      updataData: {
        id: '',
        version: '',
        isQG: ''
      },
      status: 1
    }
  },
  created() {
    this.getVersion()
  },
  methods: {
    async getVersion() {
      var dataMsg = await window.common.getVersion()
      if (dataMsg.code === 1) {
        this.appData = dataMsg.data
      }
    },
    // 点击修改按钮
    updata(data) {
      this.dialogVisible = true
      for (var i in this.updataData) {
        this.updataData[i] = data[i]
      }
      console.log(this.updataData)
    },
    // 确认修改
    async sureUpdata() {
      var dataMsg = await window.common.setVersion({
        ...this.updataData,
        status: this.status
      })
      console.log(dataMsg)
      if (dataMsg.code === 1) {
        this.$message.success('操作成功')
        this.getVersion()
        this.dialogVisible = false
      } else {
        this.$message.error(dataMsg.msg)
      }
    },
    // 关闭对话框
    closeDia() {
      for (var i in this.updataData) {
        this.updataData[i] = ''
      }
    }
  }
}
</script>

<style scoped >
</style>
