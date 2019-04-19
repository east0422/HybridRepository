<template>
  <div class="app fill vcontainer">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <ninezero-tabbar></ninezero-tabbar>
  </div>
</template>

<script type="text/babel">
  import ninezeroTabbar from '@/components/TabBar'

  export default {
    name: 'App',
    data () {
      return {
      }
    },
    components: {
      ninezeroTabbar
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  [v-cloak] {
    display: none;
  }
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: white;
  }
  .fill {
    flex: 1;
  }
  .vcontainer {
    display: flex;
    flex-direction: column;
  }
  .hcontainer {
    display: flex;
    flex-direction: row;
  }
  .app {
    width: 100%;
    height: 100%;
  }
  .app-view {
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
</style>
