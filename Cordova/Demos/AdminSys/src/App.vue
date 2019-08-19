<template>
  <div class="app fill vcontainer">
    <transition :name="effect" mode="out-in">
      <keep-alive>
        <router-view
          id="view"
          class="view fill vcontainer">
        </router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script type="text/babel">
  import {mapGetters} from 'vuex'
  import dynamicRouter from '@/router/dynamicRouter.js'

  export default {
    name: 'App',
    data () {
      return {
        effect: 'fade'
      }
    },
    computed: {
      ...mapGetters([
        'token',
        'allowMenus'
      ])
    },
    created () {
      if (this.token && this.$route.name !== 'login') {
        let allowRoutes = dynamicRouter.generateAllowRoutes(dynamicRouter.allRoutes, this.allowMenus)
        this.$router.addRoutes(allowRoutes)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .app {
    width: 100%;
    height: 100%;
  }
  [v-cloak] {
    display: none;
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
