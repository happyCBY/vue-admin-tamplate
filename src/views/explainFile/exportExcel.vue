<template>
  <div class="components-container">
    <p>下载cnpm install file-saver，cnpm install xlsx -S，cnpm install script-loader -D这三个插件</p>
    <p>代码如下例：其中@/vendor/Export2Excel已准备好</p>
    <p>
      <pre>
      ExportXlsx(state, list) {
      //这里导入的是 Export2Excel.js文件路径
        import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          //tHeader:标题
          header: ['姓名','年龄'],
          //导入的数据 一般是 [ [] ] 数组套数组
          data: [['小三','18'],['小四','19']],
          //下面三个固定
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
      }
      </pre>
    </p>
    <p>
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </p>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="age"
          label="年龄"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        name: '小三',
        age: 18
      },
      {
        name: '小四',
        age: 19
      }]
    }
  },
  methods: {
    exportExcel() {
      // 这里导入的是 Export2Excel.js文件路径
        import('@/vendor/Export2Excel').then(excel => {
          excel.export_json_to_excel({
          // tHeader:标题
            header: ['姓名', '年龄'],
            // 导入的数据 一般是 [ [] ] 数组套数组
            data: [['小三', '18'], ['小四', '19']],
            // 下面三个固定
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
        })
    }
  }
}
</script>

<style>
</style>
