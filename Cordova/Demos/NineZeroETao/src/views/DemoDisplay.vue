<template>
  <div>
    <iframe frameborder="no" class="demo-iframe" :src="iframSrc"></iframe>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'DemoDisplay',
    data () {
      return {
      }
    },
    computed: {
      iframSrc () {
        return 'http://yunling666.com/step/QQ/?noCache=' + new Date().getTime()
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .demo-iframe {
    height: 100%;
    width: 100%;
  }
</style>
