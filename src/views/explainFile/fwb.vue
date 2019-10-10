<template>
  <div class="components-container">
    <p>导入Tinymce组件，import Tinymce from '@/components/Tinymce'</p>
    <p>代码事例：</p>
    <p>html部分</p>
    <p v-text="msg" />
    <p>
      其中content就是你在文本框里面输入的内容，可以给Tinymce组件传递 height和width，设置文本框的高度和宽度
    </p>
    <p>
      实例：
    </p>
    <div>
      <Tinymce v-model="content" :height="100" :width="'80%'" />
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      msg: ` <Tinymce v-model="content" :height="100" :width="'80%'" ></Tinymce>`,
      content: ''
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
