<template>
  <div class="container">
    <el-button type="primary" @click="add">新增</el-button>
    <template>
      <el-table class="mgT20" :data="newsList" style="width: 100%" border>
        <el-table-column prop="id" label="序号ID" width="80" align="center" />
        <el-table-column prop="newsTitle" label="标题" width="200" align="center" />
        <el-table-column prop="newsAbout" label="简介" align="center" />
        <el-table-column label="操作" width="200" align="center">
          <template scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
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
      newsList: [],
      page: 1,
      size: 10,
      total: 0
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
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
    // 添加公告
    add() {
      this.$router.push('/news/managerEdit')
    },
    //  修改公告
    edit(data) {
      this.$router.push({
        path: '/news/managerEdit',
        query: data
      })
    },
    // 删除公告
    async del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          var dataMsg = await window.common.delNews({
            SysNews_id: id
          })
          if (dataMsg.code === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getNewsList()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取公告列表
    async getNewsList() {
      var dataMsg = await window.common.getNewsList({
        page: this.page,
        size: this.size
      })
      if (dataMsg.code === 1) {
        this.newsList = dataMsg.data.sysNewsIPage.records
        this.total = dataMsg.data.sysNewsIPage.total
      } else {
        this.$message.error('获取公告列表失败')
      }

      console.log(dataMsg)
    }
  }
}
</script>

<style scoped >
</style>
