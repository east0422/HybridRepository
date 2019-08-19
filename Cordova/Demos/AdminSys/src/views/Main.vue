<template>
  <div>
    <header></header>
    <div class="hcontainer fill main-container">
      <sidebar></sidebar>
      <div class="vcontainer fill main-content">
        <transition name="fade" mode="out-in">
          <router-view :key="key" class="vcontainer fill main-router-view"></router-view>
        </transition>
        <copy-right></copy-right>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import Header from '@/components/Header'
  import Sidebar from '@/components/Sidebar'
  import CopyRight from '@/components/CopyRight'

  export default {
    name: 'Main',
    components: {
      Header,
      Sidebar,
      CopyRight
    },
    computed: {
      key () {
        return (this.$route.name !== undefined ? this.$route.name : this.$route) + (+new Date())
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .main-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 70px;
    bottom: 0px;
  }
  .main-content {
    z-index: 999;
  }
  .main-router-view {
    margin: 15px;
    background-color: white;
    overflow-y: scroll;
  }
</style>
