<template>
  <div class="vcontainer">
    <div
      :class="['hcontainer mine-item-display', {'mine-item-dividing': showdividing}]"
      @click="itemClicked">
      <span>{{item.title}}</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="mine-item-blank" v-show="showblank"></div>
  </div>
</template>
<script type="text/babel">

  export default {
    name: 'MineItem',
    data () {
      return {
      }
    },
    props: {
      item: {
        require: true,
        type: Object,
        default: function () {
          return {
          }
        }
      },
      showdividing: {
        type: Boolean,
        default: false
      },
      showblank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      itemClicked () {
        this.$emit('itemclick', this.item)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .mine-item-display {
    height: 40px;
    line-height: 40px;
    margin: 0 20px;
    justify-content: space-between;
    align-items: center;
  }
  .mine-item-dividing {
    border-top: 1px solid #f1f1f3;
  }
  .mine-item-blank {
    height: 10px;
    background-color: #f3f1f1;
  }
</style>
