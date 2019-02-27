<template>
  <query querytype="订单" ref="orderquery"></query>
</template>
<script type="text/babel">
  import query from '@/components/Query'

  export default {
    name: 'OrderQuery',
    data () {
      return {
      }
    },
    components: {
      query
    },
    methods: {
      reset () {
        this.$refs.orderquery.reset()
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.reset()
      })
    },
    beforeRouteLeave (to, from, next) {
      next()
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
