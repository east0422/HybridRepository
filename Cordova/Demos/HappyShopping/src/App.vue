<template>
  <div class="app fill vcontainer">
    <div class="app-header hcontainer" v-show="showtab">
      <span>[服务器：{{userinfo.sign}}]</span>
      <span>用户名：{{userinfo.mobile}}</span>
      <div @click="logoutClicked">退出</div>
    </div>
    <transition :name="effect" mode="out-in">
      <keep-alive>
        <router-view
          id="view"
          class="view fill vcontainer">
        </router-view>
      </keep-alive>
    </transition>
    <div
      class="app-tab-container hcontainer"
      v-show="showtab && !keyboardshow">
      <div v-for="tab in tabs"
        :key="tab.name"
        :class="['fill vcontainer app-tab', {'app-tab-selected': tab.name === curTabName}]"
        @click="tabChanged(tab.name)">
        <div :class="tab.icon"></div>
        <span>{{tab.label}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import {mapState} from 'vuex'
  // import {Message} from 'element-ui'

  export default {
    name: 'App',
    data () {
      return {
        effect: 'fade',
        showtab: false,
        tabs: [{
          name: 'first',
          icon: 'el-icon-warning',
          label: '查看操作',
          path: {
            name: 'demodisplay'
          }
        }, {
          name: 'second',
          icon: 'el-icon-search',
          label: '订单查询',
          path: {
            name: 'query',
            params: {
              querytype: '订单',
              querynow: true
            }
          }
        }, {
          name: 'third',
          icon: 'el-icon-question',
          label: '余额查询',
          path: {
            name: 'query',
            params: {
              querytype: '余额',
              querynow: true
            }
          }
        }, {
          name: 'fourth',
          icon: 'el-icon-service',
          label: '联系客服',
          path: {
            name: 'contactcustomerservice'
          }
        }],
        curTabName: 'first',
        keyboardshow: false
      }
    },
    computed: {
      ...mapState([
        'userinfo'
      ])
    },
    watch: {
      '$route': function () {
        for (let tab of this.tabs) {
          if (tab.path.name === this.$route.name) {
            if (tab.path.name !== 'query' || this.$route.params.querytype === tab.path.params.querytype) {
              this.curTabName = tab.name
              this.showtab = true
              return
            }
          }
        }
        this.showtab = false
      }
    },
    methods: {
      tabChanged (tabname) {
        for (let tab of this.tabs) {
          if (tab.name === tabname) {
            this.curTabName = tabname
            this.$router.push(tab.path)
            break
          }
        }
      },
      logoutClicked () {
        this.$router.push({name: 'login'})
      },
      listenKeyboard () {
        window.addEventListener('keyboardDidShow', (event) => {
          this.keyboardshow = true
          if (document.activeElement.tagName === 'INPUT') {
            window.scrollTo(0, event.keyboardHeight)
          }
        })
        window.addEventListener('keyboardDidHide', () => {
          this.keyboardshow = false
          window.scrollTo(0, 0)
        })
      }
    },
    mounted () {
      document.addEventListener('deviceready', () => {
        if (window.device.platform === 'Android') {
          this.listenKeyboard()
        }
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .app {
    width: 100%;
    height: 100%;
  }
  .app-header {
    height: 44px;
    line-height: 44px;
    background-color: red;
    color: white;
    justify-content: space-between;
    font-size: 18px;
    padding: 0 5px;
  }
  .app-tab-container {
    height: 64px;
    text-align: center;
    justify-content: space-between;
    font-size: 14px;
    overflow: hidden;
  }
  .app-tab {
    justify-content: center;
    border: 1px solid lightgray;
  }
  .app-tab-selected {
    color: #00a4ce;
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
