<template>
  <div class="hcontainer mineheader-display">
    <div class="fill"><span @click="backClicked"><i class="el-icon-arrow-left"></i>返回</span></div>
    <span class="mineheader-title fill">{{title}}</span>
    <span class="fill"></span>
  </div>
</template>
<script type="text/babel">

  export default {
    name: 'MineHeader',
    data () {
      return {
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      backClicked () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .mineheader-display {
    height: 50px;
    line-height: 50px;
  }
  .mineheader-title {
    font-size: 24px;
  }
</style>
