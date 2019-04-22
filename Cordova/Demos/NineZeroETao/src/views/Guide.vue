<template>
  <div class="fill vcontainer">
    <mine-header :title="guidename"></mine-header>
    <iframe frameborder="no" scrolling="no" class="guide-iframe" :src="iframSrc"></iframe>
  </div>
</template>
<script type="text/babel">
  import mineHeader from '@/components/MineHeader'

  export default {
    name: 'NoviceGuide',
    data () {
      return {
      }
    },
    props: {
      guidename: {
        type: String,
        default: ''
      }
    },
    components: {
      mineHeader
    },
    computed: {
      iframSrc () {
        let prefixUrl = ''
        if (this.guidename === '新人引导') {
          prefixUrl = 'http://step.9gola.cn/help/fl/app/'
        } else if (this.guidename === '邀请引导') {
          prefixUrl = 'http://step.9gola.cn/inviter/app/'
        }
        return prefixUrl + '?noCache=' + new Date().getTime()
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .guide-iframe {
    height: 100%;
    width: 100%;
  }
</style>
