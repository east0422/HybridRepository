<template>
  <div>
    <iframe
      frameborder="no"
      class="bind-demo-iframe"
      :src="iframSrc">
    </iframe>
    <div class="btn bind-demo-btn" @click="backClicked">返回</div>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'BindDemo',
    data () {
      return {
      }
    },
    computed: {
      iframSrc () {
        return 'http://yunling666.com/translate/QQ/?noCache=' + new Date().getTime()
      }
    },
    methods: {
      backClicked () {
        this.$router.push({
          name: 'query',
          params: {
            querytype: '',
            querynow: false
          }
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .bind-demo-iframe {
    height: 100%;
    width: 100%;
  }
  .bind-demo-btn {
    width: 80%;
    margin: 10px auto;
    padding: 10px 20px;
  }
</style>
