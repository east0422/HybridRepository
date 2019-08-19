<template>
  <div class="error404-container">
    <div class="error404-content hcontainer">
      <div class="error404-pic">
        <img :src="img_404" style="width: 100%;">
      </div>
      <div class="error404-tips vcontainer">
        <div class="error404-tips-oops error404-animation">OOPS!</div>
        <div class="error404-tips-info error404-animation">
          版权所有©2019
          <a class="link-type" href="#" target="_blank"></a>
        </div>
        <div class="error404-tips-headline error404-animation">{{message}}</div>
        <div class="error404-tips-info error404-animation">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
        <a href="#" class="error404-tips-return-home error404-animation">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    data () {
      return {
        img_404: require('@/images/error_404.png'),
        message: '恭喜你发现了新大陆......'
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .error404-container {
    background: #f0f2f5;
  }
  .error404-content {
    position: relative;
    width: 1200px;
    margin: 0 auto 60px;
    padding: 0 100px;
    overflow: hidden;
  }
  .error404-pic {
    position: relative;
    float: left;
    width: 600px;
    padding: 150px 0;
    overflow: hidden;
  }
  .error404-tips {
    position: relative;
    float: left;
    width: 300px;
    padding: 150px 0;
    overflow: hidden;
  }
  .error404-tips-oops {
    font-size: 32px;
    font-weight: bold;
    line-height: 40px;
    color: #1482f0;
    margin-bottom: 20px;
  }
  .error404-tips-info {
    font-size: 13px;
    line-height: 21px;
    color: grey;
    margin-bottom: 30px;
    animation-delay: 0.2s;
  }
  .error404-tips-headline {
    font-size: 20px;
    line-height: 24px;
    color: #1482f0;
    margin-bottom: 10px;
    animation-delay: 0.1s;
  }
  .error404-tips-return-home {
    display: block;
    float: left;
    width: 110px;
    height: 36px;
    background: #1482f0;
    border-radius: 100px;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    line-height: 36px;
    cursor: pointer;
    animation-delay: 0.3s;
  }
  .error404-animation {
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }
  @keyframes slideUp {
    0% {
      transform: translateY(60px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
