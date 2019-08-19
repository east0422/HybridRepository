<template>
  <div class="contentheader-display hcontainer ">
    <div>
      <el-button
        type="success"
        icon="el-icon-arrow-left"
        size="mini"
        v-show="showBack"
        @click="backClicked">
      </el-button>
      <span class="contentheader-title">{{title}}</span>
    </div>
    <el-button
      type="success"
      size="small"
      v-show="btnText"
      @click="$emit('btnclicked')">
      {{btnText}}
    </el-button>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'ContentHeader',
    props: {
      title: {
        type: String,
        default: ''
      },
      btnText: {
        type: String,
        default: ''
      },
      showBack: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      backClicked () {
        this.$router.back()
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .contentheader-display {
    height: 60px;
    border-bottom: 1px solid #e6eaf0;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }
  .contentheader-title {
    font-size: 18px;
  }
</style>
