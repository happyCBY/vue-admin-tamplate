<template>
  <div class="components-container">
    <p>导入表格使用element-admin封装的组件 在使用的地方导入 @/components/UploadExcel/index.vue 注意该组件有使用到xlsx插件 </p>
    <p>导入样式可自行在 @/components/UploadExcel/index.vue 文件里面更改</p>
    <p>
      <pre>
组件传递两个方法 on-success 和 before-upload
on-success 是导入成功时的函数 回调参数 data里面包含了导入的表格的数据和 头部，以此来制作表格
before-upload 是将要导入时执行的方法，可以省略
          </pre>
    </p>
    <p>代码事例：</p>
    <p>html部分</p>
    <p v-text="msg" />
    <p>
      script部分
    </p>
    <p>
      <pre>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeUpload(file) {
      // 判断文件是否小于一M，如果小于则允许上传
      const isLt1M = file.size / 1024 / 1024 &lt; 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1Mb in size.',
        type: 'warning'
      })
      return false
    },
    //上传成功返回 data 解构出 results(表格数据) 和 header()表格头部
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  }
}
          </pre>
    </p>
    <p>运用事例</p>
    <div>
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
      </el-table>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      msg: `
                    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
                    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
                        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
                    </el-table>
            `,
      tableData: [],
      tableHeader: []

    }
  },
  methods: {
    beforeUpload(file) {
      // 判断文件是否小于一M，如果小于则允许上传
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1Mb in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>

<style>

</style>
