<template>
  <div class="home-display">
    <div class="home-content hcontainer">
      <div class="fill home-content-item">日历</div>
      <div class="fill home-margin-left">今日概况</div>
      <div class="fill home-margin-left">最新更新</div>
      <div class="fill home-margin-left">待办事项</div>
    </div>
    <el-collapse accordion class="home-collapse">
      <el-collapse-item title="一致性 Consistency" name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'Home',
    data () {
      return {
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .home-display {
    background-color: #f1f1f3 !important;;
  }
  .home-banner-image {
    width: 100%;
  }
  .home-content {
    height: 450px;
    margin: 15px 0;
    text-align: center;
    justify-content: space-around;
  }
  .home-content-item {
    background-color: white;
    padding-top: 10px;
  }
  .home-margin-left {
    @extend .home-content-item;
    margin-left: 10px;
  }
  .home-collapse {
    padding: 0 30px;
    background-color: white;
  }
</style>
