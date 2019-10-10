<template>
  <div class="components-container">
    <el-card>
      <p>
        实际应用请在@/router/index里面的 asyncRoutes中注释掉该router以及另外几个router
      </p>
      <p>
        要添加菜单栏的话请参照 @/router/index 中的样本，其中mate:{ title是显示在菜单栏的文字，icon是菜单栏的图标，hidden为true时在菜单栏隐藏该路由 }
      </p>
      <p>
        请自行配置(或删除) @/util/request中 axios的baseURL，配置时注意开发环境和生产环境的不同
      </p>
      <p>
        请根据实际情况配置请求和响应拦截器，在@/util/request中
      </p>
      <p>
        请根据实际情况配置路由拦截，在@/permission.js中,如果没有设置权限管理请将const accessRoutes = await store.dispatch('permission/generateRoutes', roles)里的roles这个参数替换成 'admin'，或者自行修改 store里面的函数
      </p>
      <p>
        生产环境时请注释main中的mock数据
      </p>
      <p>
        原vue-element-admin里面所拥有的功能需要的插件或者函数都没有删除，有需要者请下载完整版的从里面copy代码
      </p>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style>

</style>
