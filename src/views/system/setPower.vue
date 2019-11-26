<template>
  <div class="container">
    <el-select v-model="rolesID" placeholder="请选择" @change="selectChange">
      <el-option
        v-for="item in rolesList"
        :key="item.role.id"
        :label="item.role.rolename"
        :value="item.role.id"
      />
    </el-select>
    <el-button @click="addRole">新增角色</el-button>
    <el-row>
      <div class="mgT20 mgB20">当前角色路由权限</div>
      <div>
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      </div>
      <el-checkbox-group v-model="selectRouterName">
        <el-checkbox v-for="(item,index) in allRouter" :key="index" :label="item.urlname" />
      </el-checkbox-group>
    </el-row>
    <el-button class="mgT20" type="primary" @click="setPower">修改权限</el-button>
    <el-dialog
      title="新增角色"
      :visible.sync="dialogVisible"
      width="50%"
      @close="closeDia"
      @open="openDia"
    >
      <el-row>
        <el-col :span="4">角色名：</el-col>
        <el-col :span="14">
          <el-input v-model="roleForm.rolename" placeholder="请输入角色名" />
        </el-col>
      </el-row>
      <el-row class="mgT20">
        <el-col>角色权限：</el-col>
        <div>
          <el-checkbox v-model="checkDiaAll" @change="handleCheckAllChangeDia">全选</el-checkbox>
        </div>
        <el-checkbox-group v-model="allRouterName">
          <el-checkbox v-for="(item,index) in allRouter" :key="index" :label="item.urlname" />
        </el-checkbox-group>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script >
export default {
  data() {
    return {
      // 获取角色列表
      rolesList: [],
      // 下拉框当前值
      rolesID: '',
      // 所有权限列表
      allRouter: [],
      staticALlName: [],
      roleForm: {
        rolename: '',
        route: ''
      },
      // 获取所有的路由名字
      allRouterName: [],
      // 获取选中的角色所拥有的路由名字
      selectRouterName: [],
      // 弹出框
      dialogVisible: false,
      // 下拉列表的全选按钮
      checkAll: false,
      // 弹出框的全选按钮
      checkDiaAll: false
    }
  },
  watch: {
    selectRouterName: {
      immediate: true,
      handler(newName, oldName) {
        if (this.selectRouterName.length === this.allRouter.length) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      }
    },
    allRouterName: {
      immediate: true,
      handler(newName, oldName) {
        if (this.allRouterName.length === this.allRouter.length) {
          this.checkDiaAll = true
        } else {
          this.checkDiaAll = false
        }
      }
    }
  },
  async created() {
    await this.getPowerList()
    await this.getRoles()
    this.rolesID = this.rolesList[0].role.id
    this.selectRouterName = this.setCheckList(
      this.rolesList[0].routeWebs,
      this.allRouter
    )
  },
  methods: {
    // 下拉列表的全选
    handleCheckAllChange(val) {
      if (val) {
        this.selectRouterName = [...this.staticALlName]
      } else {
        this.selectRouterName = []
      }
    },
    // 弹出框的全选
    handleCheckAllChangeDia(val) {
      if (val) {
        this.allRouterName = [...this.staticALlName]
      } else {
        this.allRouterName = []
      }
    },
    // 关闭对话框
    closeDia() {
      this.roleForm.rolename = ''
      this.allRouterName = []
    },
    // 打开对话框
    openDia() {
      this.allRouterName = [...this.staticALlName]
    },
    // select选择改变
    selectChange(value) {
      this.rolesList.forEach(item => {
        if (item.role.id === value) {
          this.selectRouterName = this.setCheckList(
            item.routeWebs,
            this.allRouter
          )
        }
      })
      this.dialogVisible = false
    },
    // 弹出新增角色框
    addRole() {
      this.dialogVisible = true
    },
    // 确认新增
    async sureAdd() {
      var arr = []
      // 获得选取的角色的id,并存放到数组中
      this.allRouter.forEach(item => {
        this.allRouterName.forEach(checkItem => {
          if (checkItem === item.urlname) {
            arr.push(item.id)
          }
        })
      })
      // 将选中的id数组拼接成字符串
      this.roleForm.route = window.toolApi.addComma(arr)
      var dataMsg = await window.common.upRoles({
        rolename: this.roleForm.rolename,
        route: this.roleForm.route,
        id: ''
      })
      if (dataMsg.code === 1) {
        this.$message.success('新增成功')
        this.getRoles()
      } else {
        this.$message.error('新增失败')
      }
    },
    // 获取权限列表
    async getPowerList() {
      var dataMsg = await window.common.getPowerList()
      if (dataMsg.code === 1) {
        this.allRouter = dataMsg.data.web
        this.allRouter.forEach(item => {
          this.staticALlName.push(item.urlname)
        })
        this.allRouterName = [...this.staticALlName]
        // 给权限列表都加上 checked属性
        // this.allRouter = this.addChecked(this.allRouter)
      } else {
        this.$message.error('获取权限列表失败')
      }
    },
    // 设置权限
    async setPower() {
      this.$confirm('确认修改用户权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          var arr = []
          this.allRouter.forEach(item => {
            this.selectRouterName.forEach(checkItem => {
              if (checkItem === item.urlname) {
                arr.push(item.id)
                return
              }
            })
          })
          // 将选中的id拼接成字符串
          var route = window.toolApi.addComma(arr)
          var dataMsg = await window.common.setPower({
            roleId: this.rolesID,
            route
          })
          if (dataMsg.code === 1) {
            this.$message.success('操作成功')
            this.getRoles()
          } else {
            this.$message.error('操作失败')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    // 获取所有角色
    async getRoles() {
      var dataMsg = await window.common.getRoles()
      if (dataMsg.code === 1) {
        this.rolesList = dataMsg.data.zmRouteWebs
      } else {
        this.$message.error('获取角色列表失败')
      }
    },
    // 获取复选框列表
    setCheckList(obj2, obj1) {
      var arr = []
      obj1.forEach(item => {
        obj2.forEach(obj_item => {
          if (obj_item.routeId === item.id) {
            arr.push(item.urlname)
            return
          }
        })
      })
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  /deep/ .el-checkbox {
    width: 20%;
  }
}
</style>
