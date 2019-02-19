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
    <el-tabs
      class="app-tabs"
      tab-position="bottom"
      v-model="activeName"
      @tab-click="tabChanged"
      v-show="showtab">
      <el-tab-pane v-for="tab in tabs" :name="tab.name" :key="tab.name">
        <div slot="label"><i :class="tab.icon"></i>{{tab.label}}</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/babel">

  export default {
    name: 'App',
    data () {
      return {
        effect: 'fade',
        showtab: false,
        tabs: [{
          name: 'first',
          icon: 'el-icon-search',
          label: '查看操作',
          path: 'demodisplay'
        }, {
          name: 'second',
          icon: 'el-icon-search',
          label: '订单查询',
          path: 'orderquery'
        }, {
          name: 'third',
          icon: 'el-icon-search',
          label: '余额查询',
          path: 'balancequery'
        }, {
          name: 'fourth',
          icon: 'el-icon-search',
          label: '联系客服',
          path: 'contactcustomerservice'
        }],
        activeName: 'first'
      }
    },
    watch: {
      '$route': function () {
        for (let tab of this.tabs) {
          if (tab.path === this.$route.name) {
            this.activeName = tab.name
            this.showtab = true
            break
          }
        }
      }
    },
    methods: {
      tabChanged (curtab, curevent) {
        for (let tab of this.tabs) {
          if (tab.name === this.activeName) {
            this.$router.push({name: tab.path})
          }
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .app {
    width: 100%;
    height: 100%;
  }
  .app-tabs {
    height: 64px;
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
