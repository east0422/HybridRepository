<template>
  <div class="fill vcontainer customerservice-display">
    <div class="fill customerservice-img" :style="{backgroundImage: 'url(' + userinfo.gzh_img + ')'}"></div>
    <span class="customerservice-msg">{{userinfo.gzh}}</span>
  </div>
</template>
<script type="text/babel">
  import {mapState} from 'vuex'

  export default {
    name: 'CustomerService',
    data () {
      return {
      }
    },
    computed: {
      ...mapState([
        'userinfo'
      ])
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .customerservice-display {
    padding-bottom: 60px;
  }
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
