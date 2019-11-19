<template>
  <div class="container">
    <div class="mgT10 mgB10">通告标题</div>
    <el-input v-model="form.newsTitle" placeholder="请输入内容" />
    <div class="mgT10 mgB10">通告简介</div>
    <el-input v-model="form.newsAbout" placeholder="请输入内容" />
    <div class="mgT10 mgB10">通告内容</div>
    <Tinymce v-model="form.newsContent" :height="100" :width="'100%'" />
    <el-button type="primary" class="mgT20" @click="submit">提交</el-button>
  </div>
</template>

<script >
import Tinymce from '@/components/Tinymce'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      form: {
        newsTitle: '',
        newsAbout: '',
        newsContent: ''
      }
    }
  },
  created() {
    // 判断是修改还是添加
    if (this.$route.query.id) {
      this.form.newsTitle = this.$route.query.newsTitle
      this.form.newsAbout = this.$route.query.newsAbout
      this.form.newsContent = this.$route.query.newsContent
      this.form.id = this.$route.query.id
    }
  },
  methods: {
    async submit() {
      var dataMsg
      if (this.$route.query.id) {
        dataMsg = await window.common.updataNews(this.form)
        if (dataMsg.code === 1) {
          this.$message.success('操作成功')
        }
      } else {
        dataMsg = await window.common.addNews(this.form)
        if (dataMsg.code === 1) {
          this.$message.success('操作成功')
        }
      }
    }
  }
}
</script>

<style scoped >
</style>
