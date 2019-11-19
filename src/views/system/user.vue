<template>
  <div class="container">
    <el-button size="mini" type="primary" class="mgB10" @click="addEdit">添加</el-button>
    <el-table :data="systemUsertList" border>
      <el-table-column align="center" prop="id" label="序号ID" />
      <el-table-column align="center" prop="username" label="账号" />
      <el-table-column align="center" prop="symbolTo" label="密码">******</el-table-column>
      <el-table-column align="center" prop="rolename" label="角色" />
      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button type="primary" size="mini" @click="addEdit(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="del(scope.row.id)">删除</el-button>
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
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="50%" @close="diaClose">
      <span slot="footer" class="dialog-footer">
        <el-form :model="form" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" />
          </el-form-item>
          <el-form-item label="角色">
            <el-select
              v-model="roleList"
              multiple
              style="float: left; margin-left: 0"
              placeholder="角色"
            >
              <el-option
                v-for="item in role"
                :key="item.id"
                :label="item.rolename"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import validEmail from '@/utils/validate'

export default {
  data() {
    return {
      dialogVisible: false,
      systemUsertList: [],
      page: 1,
      size: 10,
      total: 0,
      role: [],
      form: {
        username: '',
        password: '',
        id: ''
      },
      roleList: []
    }
  },
  created() {
    console.log(validEmail)
    this.getSystemUser()
  },
  methods: {
    // 关闭对话框回调 清空内容
    diaClose() {
      this.form.username = ''
      this.form.password = ''
      this.form.id = ''
      this.roleList = []
    },
    // 删除角色
    async del(id) {
      var dataMsg = await window.common.delSystemUser({ id })
      if (dataMsg.code === 1) {
        this.$message.success('删除成功')
        this.getSystemUser()
      } else {
        this.$message.error('删除失败')
      }
    },
    // 添加修改 弹出对话框 如果是修改则 初始化信息
    addEdit(data) {
      if (data.id) {
        this.form.id = data.id
        this.form.username = data.username
        var arr = []
        data.roleIds.split(',').forEach(item => {
          if (item !== '') {
            arr.push(Number(item))
          }
        })
        this.roleList = arr
      }

      this.dialogVisible = true
    },
    // 确认添加修改
    async sureSave() {
      if (
        this.form.username.trim().length === 0 ||
        this.form.password.trim().length === 0
      ) {
        this.$message.error('用户名或密码不能为空')
        return
      }
      if (this.roleList.length === 0) {
        this.$message.error('请选择角色')
        return
      }
      var str = ''
      // 将选取的角色数组拼接成字符串
      this.roleList.forEach((item, index) => {
        if (index !== this.roleList.length - 1) {
          str += item + ','
        } else {
          str += item
        }
      })
      var data = {
        ...this.form,
        roleList: str
      }
      var dataMsg = await window.common.systemUser(data)
      if (dataMsg.code === 1) {
        this.$message.success('操作成功')
        this.getSystemUser()
        this.dialogVisible = false
      } else {
        this.$message.error(dataMsg.msg)
      }
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
    // 获得角色列表
    async getSystemUser() {
      var dataMsg = await window.common.getSystemUser({
        page: this.page,
        size: this.size
      })
      if (dataMsg.code === 1) {
        this.role = dataMsg.data.roleName
        this.systemUsertList = dataMsg.data.page.records
        // 将用户所拥有的角色拼接成字符串
        this.systemUsertList.forEach(item => {
          var str = ''
          this.role.forEach(roleItem => {
            if (item.roleIds.indexOf(roleItem.id) !== -1) {
              str += roleItem.rolename + ' '
            }
          })
          item.rolename = str
        })
        this.total = dataMsg.data.page.total
      } else {
        this.$message.error('获取列表失败')
      }
    }
  }
}
</script>

<style  lang="scss" scoped   >
</style>
