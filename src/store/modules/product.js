const Oss = window.oss
const uploadImg = {
  store: {},
  mutations: {
    // 清除obj里面属性的值
    clearObj(store, obj) {
      setTimeout(() => {
        for (var item in obj) {
          obj[item] = ''
        }
      }, 200)
    }
  },
  actions: {
    // 上传图片到阿里云
    async uploadImg(store, file) {
      var client = new Oss({
        region: 'oss-cn-hangzhou',
        // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
        accessKeyId: 'LTAI4FbhgL3cwb2GNGonZx2Z',
        accessKeySecret: 'DDLAkvvYSoYvdICJEVdm8b9eHPpDNq',
        bucket: 'zm-market'
      })
      try {
        const resule = await client.put(
          '/oss/' + new Date().getTime() + '/' + file.name,
          file
        )
        return resule
      } catch (e) {
        console.log(e)
      }
    }
  }
}
export default uploadImg
