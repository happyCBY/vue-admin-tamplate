<template>
  <div class="container">
    <el-row>
      <el-col :span="4">
        <el-input v-model="form.userMobile" placeholder="手机号" />
      </el-col>
      <el-col :span="4" class="mgL10">
        <el-input v-model="form.mobile" placeholder="账号" />
      </el-col>
      <el-col :span="4" class="mgL10">
        <el-input v-model="form.favorKey" placeholder="推荐人" />
      </el-col>
      <el-col :span="4" class="mgL10">
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <div class="mgT10 body">
      <template>
        <el-table :data="userList" style="width: 100%" border>
          <el-table-column prop="userId" label="序号ID" />
          <el-table-column prop="mobile" label="账号" width="110" />
          <el-table-column prop="userMobile" label="手机号" width="110" />
          <el-table-column prop="favorKey" label="推荐人" />
          <el-table-column prop="userName" label="昵称" />
          <el-table-column prop="dayTotal" label="累计团队收益" width="105" />
          <el-table-column prop="usdtTotal" label="累计团队业绩" width="105" />
          <el-table-column prop="shareLevel" label="推荐等级" />
          <el-table-column prop="starLevel" label="矿机等级" />
          <el-table-column prop="communityLevel" label="社区等级">
            <template
              scope="scope"
            >{{ scope.row.communityLevel!==0?'VIP'+scope.row.communityLevel:'' }}</template>
          </el-table-column>
          <el-table-column prop="userName" label="登录冻结">
            <template scope="scope">
              <el-switch v-model="scope.row.frozenState" />
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="转账冻结">
            <template scope="scope">
              <el-switch v-model="scope.row.transferFrozenState" />
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="c2c冻结">
            <template scope="scope">
              <el-switch v-model="scope.row.c2cFrozenState" />
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="闪兑冻结">
            <template scope="scope">
              <el-switch v-model="scope.row.changeFrozenState" />
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      form: {
        userMobile: '',
        mobile: '',
        favorKey: ''
      },
      page: 1,
      size: 10,
      userList: [],
      total: 0
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      var dataMsg = await window.common.getUserList({
        page: this.page,
        size: this.size,
        userMobile: this.form.userMobile,
        mobile: this.form.mobile,
        favorKey: this.form.favorKey
      })
      if (dataMsg.code === 1) {
        this.userList = dataMsg.data.pageUser.records
        this.userList.forEach(item => {
          item.frozenState = item.frozenState === 1
          item.transferFrozenState = item.transferFrozenState === 1
          item.changeFrozenState = item.changeFrozenState === 1
          item.c2cFrozenState = item.c2cFrozenState === 1
        })
        this.total = dataMsg.data.pageUser.total
      }
    },
    handleSizeChange(size) {
      this.size = size
      this.getUserList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getUserList()
    },
    search() {
      this.getUserList()
    }
  }
}
</script>

<style lang="scss" scoped >
</style>
