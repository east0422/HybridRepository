<template>
  <el-menu
    :default-active="activeIndex"
    class="tabbar-display hcontainer"
    mode="horizontal"
    @select="handleSelect"
    menu-trigger="click"
    background-color="#ffffff"
    text-color="#000000"
    active-text-color="#457A2C">
    <el-menu-item index="home" class="fill vcontainer tabbar-item tabbar-border-right">
      <template slot="title">
        <i class="el-icon-view"></i>
        <span class="tabbar-item-title">首页</span>
      </template>
    </el-menu-item>
    <el-submenu index="menu" :show-timeout="0" :hide-timeout="0"
      class="fill hcontainer tabbar-item tabbar-border-right">
      <template slot="title">
        <div class="vcontainer tabbar-item" :style="{color: menuselected ? '#457A2C' : '#909399'}">
          <i class="el-icon-menu"></i>
          <span class="tabbar-item-title">{{menutitle}}</span>
        </div>
      </template>
      <el-menu-item index="material">资料</el-menu-item>
      <el-menu-item index="invite">邀请</el-menu-item>
      <el-menu-item index="order">订单</el-menu-item>
      <el-menu-item index="balance">余额</el-menu-item>
      <el-menu-item index="tixian">提现</el-menu-item>
    </el-submenu>
    <el-menu-item index="coupon" class="fill vcontainer tabbar-item tabbar-border-right">
      <template slot="title">
        <i class="el-icon-goods"></i>
        <span class="tabbar-item-title">优惠券</span>
      </template>
    </el-menu-item>
    <el-menu-item index="customerservice" class="fill vcontainer tabbar-item">
      <template slot="title">
        <i class="el-icon-service"></i>
        <span class="tabbar-item-title">客服中心</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script type="text/babel">
  export default {
    name: 'App',
    data () {
      return {
        activeIndex: 'home',
        menutitle: '菜单',
        menuselected: false
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        switch (key) {
          case 'home':
            this.menuselected = false
            break
          case 'menu':
            this.menuselected = true
            this.menutitle = '菜单'
            break
          case 'material':
            this.menuselected = true
            this.menutitle = '资料'
            break
          case 'invite':
            this.menuselected = true
            this.menutitle = '邀请'
            break
          case 'order':
            this.menuselected = true
            this.menutitle = '订单'
            break
          case 'balance':
            this.menuselected = true
            this.menutitle = '余额'
            break
          case 'tixian':
            this.menuselected = true
            this.menutitle = '提现'
            break
          case 'coupon':
            this.menuselected = false
            break
          case 'customerservice':
            this.menuselected = false
            break
          default:
            this.menuselected = false
            break
        }
        this.$emit('tabchanged', key)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .tabbar-display {
    position: fixed;
    width: 100%;
    height: 60px;
    bottom: 0;
    left: 0;
    text-align: center;
    justify-content: space-between;
    overflow: hidden;
  }
  .tabbar-item {
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 0px !important;
  }
  .tabbar-border-right {
    border-right: 2px solid lightgray;
  }
  .tabbar-item-title {
    height: 30px;
    line-height: 30px;
  }
  /* override */
  .el-submenu__title {
    width: 100%;
  }
  .el-submenu__title i {
    color: inherit;
  }
  .el-menu--popup {
    min-width: 100px;
  }
</style>
