<template>
  <div class="header-display hcontainer">
    <span>系统名称：{{userinfo.name}}</span>
    <span>用户名：{{userinfo.user}}</span>
    <div @click="logoutClicked">退出</div>
  </div>
</template>

<script type="text/babel">
  import {mapState} from 'vuex'

  export default {
    name: 'Header',
    data () {
      return {
      }
    },
    computed: {
      ...mapState([
        'userinfo'
      ])
    },
    methods: {
      logoutClicked () {
        this.$store.commit('setUserinfo', {})
        this.$router.push({name: 'login'})
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .header-display {
    height: 34px;
    line-height: 34px;
    background-color: #457A2C;
    color: white;
    justify-content: space-around;
    font-size: 14px;
  }
</style>
