<template>
  <div class="fanli-display vcontainer">
    <div class="fanli-header hcontainer">
      <div></div>
      <span>返利查询结果</span>
      <div></div>
    </div>
    <textarea class="fanli-result" v-model="result" disabled="disabled"></textarea>
    <div class="vcontainer btn-container fanli-btns">
      <button class="btn fanli-btn"
        data-clipboard-action="copy"
        :data-clipboard-text="result"
        @click="copyClicked"
        ref="fanlicopy">
        点击复制
      </button>
      <div class="btn fanli-btn" @click="backHome">返回首页</div>
    </div>
  </div>
</template>
<script type="text/babel">
  import Clipboard from 'clipboard'
  import {Message} from 'element-ui'

  export default {
    name: 'OrderQuery',
    data () {
      return {
        copyBtn: null,
        result: '没有查询结果'
      }
    },
    methods: {
      copyClicked () {
        if (!this.copyBtn) {
          Message({
            message: '复制失败',
            type: 'error',
            duration: 2 * 1000
          })
          return
        }
        this.copyBtn.on('success', e => {
          Message({
            message: '复制成功',
            type: 'success',
            duration: 2 * 1000
          })
        })
        this.copyBtn.on('error', e => {
          Message({
            message: '复制失败',
            type: 'error',
            duration: 2 * 1000
          })
        })
      },
      backHome () {
        this.$router.push({
          name: 'query',
          params: {
            querytype: '',
            querynow: false
          }
        })
      }
    },
    mounted () {
      this.copyBtn = new Clipboard(this.$refs.fanlicopy)
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.result = to.params.result
      })
    },
    beforeRouteLeave (to, from, next) {
      if (this.copyBtn) {
        // 释放内存
        this.copyBtn.destroy()
      }
      next()
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .fanli-display {
    background-color: #e7e7e7;
  }
  .fanli-header {
    justify-content: space-between;
    align-items: center;
    height: 44px;
    background-color: white;
    font-size: 18px;
  }
  .fanli-result {
    display: inline-block;
    height: 260px;
    width: 80%;
    margin: 20px auto;
    vertical-align: bottom;
    font-size: 14px;
    color: black;
    background-color: white;
    border: 1px solid white;
    border-radius: 4px;
    opacity: 1;
  }
  .fanli-btns {
    width: 80%;
    margin: auto;
  }
  .fanli-btn {
    margin: 10px 0;
    padding: 10px 20px;
  }
</style>
