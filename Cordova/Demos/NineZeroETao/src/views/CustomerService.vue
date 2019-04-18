<template>
  <div class="fill vcontainer">
    <mine-header title="客服中心"></mine-header>
    <div class="fill customerservice-img" :style="{backgroundImage: 'url(' + user.gzh_img + ')'}"></div>
    <span class="customerservice-msg">{{user.gzh}}</span>
  </div>
</template>
<script type="text/babel">
  import {mapState} from 'vuex'
  import mineHeader from '@/components/MineHeader'

  export default {
    name: 'CustomerService',
    data () {
      return {
      }
    },
    components: {
      mineHeader
    },
    computed: {
      ...mapState([
        'user'
      ])
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .customerservice-img {
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .customerservice-msg {
    text-align: center;
    font-size: 20px;
    margin: 10px 0;
  }
</style>
