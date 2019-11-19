
const mutations = {
  ExportXlsx(state, list) {
    console.log(list)
        // 这里导入的是 Export2Excel.js文件路径
        import('@/vendor/Export2Excel').then(excel => {
          excel.export_json_to_excel({
            // tHeader:标题
            header: list.header,
            // 导入的数据 一般是 [ [] ] 数组套数组
            data: list.data,
            // 下面三个固定
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
        })
  }
}

export default {
  mutations
}
