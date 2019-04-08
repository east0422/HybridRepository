<template>
  <div class="fill vcontainer coupon-display">
    <iframe frameborder="no" class="coupon-iframe" :src="iframSrc"></iframe>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'Coupon',
    data () {
      return {
      }
    },
    computed: {
      iframSrc () {
        return 'http://quan.9gola.cn/coupon/index?cid=0&noCache=' + new Date().getTime()
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .coupon-display {
    padding-bottom: 60px;
  }
  .coupon-iframe {
    height: 100%;
    width: 100%;
  }
</style>
