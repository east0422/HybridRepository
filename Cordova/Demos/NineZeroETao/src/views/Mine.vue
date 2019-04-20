<template>
  <div class="fill vcontainer mine-display">
    <div class="hcontainer">
      <div class="mine-avatar"><img src="../images/avatar.png"></div>
      <div class="vcontainer mine-infos">
        <span>{{user.user}}</span>
        <span>{{user.name}}</span>
      </div>
    </div>
    <div class="mine-blank"></div>
    <mine-item
      v-for="item in mineItems"
      :key="item.name"
      :item="item"
      :showdividing="item.showdividing"
      :showblank="item.showblank"
      @itemclick="itemClicked">
    </mine-item>
    <div class="fill vcontainer mine-btn-container">
      <button class="mine-logout-btn" @click="logoutClicked">退出登录</button>
    </div>
  </div>
</template>
<script type="text/babel">
  import {mapState} from 'vuex'
  import mineItem from '@/components/MineItem'

  export default {
    name: 'Mine',
    data () {
      return {
        mineItems: [{
          msg: '资料',
          name: 'material',
          type: 'query',
          title: '个人资料',
          showdividing: false,
          showblank: false
        }, {
          msg: '邀请',
          name: 'invite',
          type: 'query',
          title: '邀请列表',
          showdividing: true,
          showblank: false
        }, {
          msg: '余额',
          name: 'balance',
          type: 'query',
          title: '余额信息',
          showdividing: true,
          showblank: false
        }, {
          msg: '订单',
          name: 'order',
          type: 'query',
          title: '我的订单',
          showdividing: true,
          showblank: false
        }, {
          msg: '提现',
          name: 'tixian',
          type: 'query',
          title: '我要提现',
          showdividing: true,
          showblank: true
        }, {
          msg: '新人引导',
          name: 'noviceguide',
          type: 'guide',
          title: '新人引导',
          showdividing: false,
          showblank: false
        }, {
          msg: '邀请引导',
          name: 'inviteguide',
          type: 'guide',
          title: '邀请引导',
          showdividing: true,
          showblank: true
        }, {
          msg: '客服中心',
          name: 'customerservice',
          type: 'display',
          title: '客服中心',
          showdividing: false,
          showblank: true
        }]
      }
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
    components: {
      mineItem
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
    font-size: 16px;
    color: #606060;
    margin-top: 10px;
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
  .mine-blank {
    height: 10px;
    background-color: #f3f1f1;
  }
  .mine-btn-container {
    align-items: center;
    justify-content: center;
  }
  .mine-logout-btn {
    width: 70%;
    color: white;
    background-color: red;
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    border: none;
    border-radius: 10px;
  }
</style>
