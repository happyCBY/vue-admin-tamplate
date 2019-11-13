<template>
  <div class="container">
    <el-row>
      <el-col :span="6">
        <el-input
          v-model="mobile"
          placeholder="请输入用户账号"
          class="input-with-select"
          width="300"
          @change="mobileChange"
        >
          <el-button slot="append" icon="el-icon-search" @click="search" />
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="reset">重置</el-button>
      </el-col>
    </el-row>
    <el-tree v-if="show" :props="props1" :load="loadNode1" lazy />
  </div>
</template>

<script >
export default {
  data() {
    return {
      mobile: '',
      props1: {
        children: 'children',
        label: 'label'
      },
      show: false
    }
  },
  methods: {
    mobileChange() {
      console.log(1)

      this.show = false
    },
    reset() {
      this.show = false
      this.mobile = ''
    },
    async search() {
      this.show = true
    },
    async loadNode1(node, resolve) {
      var dataMsg
      if (node.level === 0) {
        dataMsg = await window.common.referUser({
          mobile: this.mobile
        })
      } else {
        dataMsg = await window.common.referUser({
          mobile: this.mobile,
          favorUserId: node.data.favorUserId
        })
      }
      if (dataMsg.code === 1) {
        var data = dataMsg.data.map(item => {
          return {
            favorUserId: item.userId,
            label: this.concatenateString(item)
          }
        })
        resolve(data)
      } else {
        resolve([])
      }
    },
    // 拼接字符串
    concatenateString(data) {
      return `${data.userName}(用户Id： ${data.userId}, 用户账号：${
        data.mobile
      }) ，社区等级：${
        data.communityLevel !== 0 ? 'VIP' + data.communityLevel : 0
      },推荐等级：${data.shareLevel}，矿机等级：${data.starLevel}， 收益：${
        data.dayProfit
      },矿机金额：${data.dayUsdt}, 团队昨天收益：${
        data.dayTotal
      }, 团队昨天业绩：${data.usdtTotal}`
    }
  }
}
</script>

<style scoped >
</style>
