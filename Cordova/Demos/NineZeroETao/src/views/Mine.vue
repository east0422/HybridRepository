<template>
  <div class="fill vcontainer mine-display">
    <div class="hcontainer">
      <div class="mine-avatar"><img src="../images/avatar.png"></div>
      <div class="vcontainer mine-infos">
        <span>{{user.user}}</span>
        <span>{{user.name}}</span>
      </div>
    </div>
    <div class="search-blank"></div>
    <div
      v-for="(item, index) in mineList"
      :key="index"
      class="hcontainer mine-item mine-dividing"
      @click="itemClicked(item)">
      <span>{{item.title}}</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <button class="mine-logout-btn" @click="logoutClicked">退出登录</button>
  </div>
</template>
<script type="text/babel">
  import {mapState} from 'vuex'

  export default {
    name: 'Mine',
    data () {
      return {
        mineList: [{
          msg: '资料',
          name: 'material',
          type: 'query',
          title: '个人资料'
        }, {
          msg: '邀请',
          name: 'invite',
          type: 'query',
          title: '邀请列表'
        }, {
          msg: '余额',
          name: 'balance',
          type: 'query',
          title: '余额信息'
        }, {
          msg: '订单',
          name: 'order',
          type: 'query',
          title: '我的订单'
        }, {
          msg: '提现',
          name: 'tixian',
          type: 'query',
          title: '我要提现'
        }, {
          msg: '客服中心',
          name: 'customerservice',
          type: 'display',
          title: '客服中心'
        }, {
          msg: '新人引导',
          name: 'noviceguide',
          type: 'guide',
          title: '新人引导'
        }, {
          msg: '邀请引导',
          name: 'inviteguide',
          type: 'guide',
          title: '邀请引导'
        }]
      }
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
    methods: {
      itemClicked (item) {
        if (item.type === 'query') {
          this.$router.push({name: 'minedetail', params: {msg: item.msg}})
        } else if (item.type === 'display') {
          this.$router.push({name: item.name})
        } else if (item.type === 'guide') {
          this.$router.push({name: 'guide', params: {guidename: item.msg}})
        }
      },
      logoutClicked () {
        this.$store.commit('setUser', {})
        this.$router.push({name: 'login'})
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .mine-display {
    padding: 10px;
    font-size: 16px;
    color: #606060;
    margin-top: 10%;
  }
  .mine-avatar {
    height: 70px;
    width: 70px;
    text-align: center;
  }
  .mine-infos {
    font-size: 20px;
    justify-content: space-around;
    padding: 10px;
  }
  .search-blank {
    height: 5%;
    border-top: 2px solid #f1f1f3;
    border-bottom: 2px solid #f1f1f3;
  }
  .mine-dividing {
    border-bottom: 2px solid #f1f1f3;
  }
  .mine-item {
    height: 40px;
    line-height: 40px;
    margin: 0 10px;
    justify-content: space-between;
    align-items: center;
  }
  .mine-logout-btn {
    width: 70%;
    color: white;
    background-color: red;
    font-size: 20px;
    margin: 10px auto;
    height: 50px;
    border: none;
    border-radius: 10px;
  }
</style>
