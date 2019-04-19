<template>
  <el-menu
    :default-active="activeIndex"
    class="tabbar-display hcontainer"
    mode="horizontal"
    @select="handleSelect"
    menu-trigger="click"
    background-color="#f1f1f3"
    text-color="#000000"
    active-text-color="#457A2C"
    v-show="showtab">
    <el-menu-item index="search" class="fill vcontainer tabbar-item">
      <template slot="title">
        <i class="el-icon-search"></i>
        <span class="tabbar-item-title">查询</span>
      </template>
    </el-menu-item>
    <el-menu-item index="coupon" class="fill vcontainer tabbar-item">
      <template slot="title">
        <i class="el-icon-goods"></i>
        <span class="tabbar-item-title">优惠券</span>
      </template>
    </el-menu-item>
    <el-menu-item index="mine" class="fill vcontainer tabbar-item">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span class="tabbar-item-title">个人中心</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script type="text/babel">
  export default {
    name: 'Tabbar',
    data () {
      return {
        activeIndex: 'search'
      }
    },
    computed: {
      showtab () {
        return this.activeIndex === 'search' || this.activeIndex === 'coupon' || this.activeIndex === 'mine'
      }
    },
    watch: {
      '$route': function () {
        if (this.$route.name === 'search' || this.$route.name === 'coupon' || this.$route.name === 'mine') {
          this.activeIndex = this.$route.name
        } else {
          this.activeIndex = ''
        }
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        this.activeIndex = key
        switch (key) {
          case 'search':
            this.$router.push({name: 'search'})
            break
          case 'coupon':
            this.$router.push({name: 'coupon'})
            break
          case 'mine':
            this.$router.push({name: 'mine'})
            break
          default:
            break
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .tabbar-display {
    position: fixed;
    width: 100% !important;
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
  .tabbar-item-title {
    height: 30px;
    line-height: 30px;
  }
</style>
