<template>
  <div class="fill hcontainer socketview-display">
    <button
      @click.prevent="serverClicked">
      主控设备
    </button>
    <button
      @click.prevent="clientClicked">
      客户端
    </button>
  </div>
</template>

<style>
  .socketview-display {
    justify-content: space-around;
  }
</style>

<script type="text/babel">
  export default {
    data () {
      return {
      }
    },
    methods: {
      serverClicked () {
        console.log('serverClicked')
        this.$router.push({name: 'socketmaster'})
      },
      clientClicked () {
        console.log('clientClicked')
        this.$router.push({name: 'socketslave'})
      },
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
      })
    },
    beforeRouteLeave (to, from, next) {
      next()
    },
  }
</script>
