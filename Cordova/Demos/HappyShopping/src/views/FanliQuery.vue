<template>
  <div class="fanli-display vcontainer">
    <div class="fanli-header hcontainer">
      <div></div>
      <span>返利查询结果</span>
      <div></div>
    </div>
    <span class="fanli-result">{{result}}</span>
    <div class="vcontainer btn-container fanli-btns">
      <button class="btn"
        data-clipboard-action="copy"
        :data-clipboard-text="result"
        @click="copyClicked"
        ref="fanlicopy">
        点击复制
      </button>
      <div class="btn" @click="backHome">返回首页</div>
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
        copyBtn: null
      }
    },
    props: {
      result: {
        type: String,
        required: true,
        default: '没有查询结果'
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
          // 释放内存
          this.copyBtn.destroy()
        })
        this.copyBtn.on('error', e => {
          Message({
            message: '复制失败',
            type: 'error',
            duration: 2 * 1000
          })
          // 释放内存
          this.copyBtn.destroy()
        })
      },
      backHome () {
        this.$router.push({name: 'demodisplay'})
      }
    },
    mounted () {
      this.copyBtn = new Clipboard(this.$refs.fanlicopy)
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
    height: 150px;
    width: 80%;
    margin: 20px auto;
    vertical-align: bottom;
    font-size: 14px;
    color: #606266;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
  .fanli-btns {
    width: 80%;
    margin: auto;
  }
</style>
