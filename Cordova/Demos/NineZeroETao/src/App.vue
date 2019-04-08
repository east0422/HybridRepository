<template>
  <div class="app fill">
    <transition :name="effect" mode="out-in">
      <router-view
        id="view"
        class="view fill vcontainer">
      </router-view>
    </transition>
  </div>
</template>

<script type="text/babel">

  export default {
    name: 'App',
    data () {
      return {
        effect: 'fade'
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  [v-cloak] {
    display: none;
  }
  .app {
    width: 100%;
    height: 100%;
  }
  .view {
    transition: all .3s ease;
  }
  .fade-enter {
    opacity: 1;
    transform: translate3d(100%, 0, 0);
  }
  .fade-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  .back-enter {
    opacity: 1;
    -webkit-transform: translate3d(-110%, 0, 0);
    transform: translate3d(-110%, 0, 0);
  }
  .back-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
</style>
