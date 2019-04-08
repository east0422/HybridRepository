<template>
  <div class="content-display vcontainer fill">
    <div class="hcontainer content-container">
      <el-input
        class="pr10"
        type="textarea"
        :rows="13"
        placeholder="请输入内容"
        v-model="msg"
        @focus="focusTrigged"
        @blur="blurTrigged">
      </el-input>
      <div class="vcontainer btn-container">
        <button class="btn bgred" @click="fanliClicked">返利查询</button>
        <button class="btn" @click="clearClicked">清空消息</button>
        <button class="btn"
          data-clipboard-action="copy"
          :data-clipboard-text="msg"
          @click="copyClicked"
          ref="copy">
          复制
        </button>
        <span class="content-tip">{{tip}}</span>
      </div>
    </div>
    <div class="hcontainer pt30 content-order" v-show="!bottomhidden">
      <el-input
        class="pr10"
        v-model="ordernum"
        placeholder="请输入订单号">
      </el-input>
      <button class="btn" @click="submitOrder">提交订单</button>
    </div>
  </div>
</template>
<script type="text/babel">
  import {mapState} from 'vuex'
  import {Message} from 'element-ui'
  import Clipboard from 'clipboard'
  import md5 from 'js-md5'

  export default {
    name: 'Content',
    data () {
      return {
        msg: '',
        ordernum: '',
        copyBtn: null,
        tip: ''
      }
    },
    computed: {
      ...mapState([
        'userinfo',
        'bottomhidden'
      ])
    },
    methods: {
      focusTrigged () {
        if (window.device && window.device.platform === 'Android') {
          this.$store.commit('setBottomHidden', true)
        }
      },
      blurTrigged () {
        if (window.device && window.device.platform === 'Android') {
          setTimeout(() => {
            this.$store.commit('setBottomHidden', false)
          }, 300)
        }
      },
      clearClicked () {
        this.tip = ''
        this.msg = ''
        this.ordernum = ''
      },
      fanliClicked () {
        this.queryByMsg(this.msg)
      },
      copyClicked () {
        if (!this.copyBtn) {
          Message({
            message: '复制失败',
            type: 'error',
            center: true,
            duration: 2 * 1000
          })
          return
        }
        this.copyBtn.on('success', e => {
          Message({
            message: '复制成功',
            type: 'success',
            center: true,
            duration: 2 * 1000
          })
        })
        this.copyBtn.on('error', e => {
          Message({
            message: '复制失败',
            type: 'error',
            center: true,
            duration: 2 * 1000
          })
        })
      },
      submitOrder () {
        if (this.ordernum) {
          this.queryByMsg(this.ordernum)
        } else {
          Message({
            message: '请在左侧文本框中输入或粘贴订单号！',
            type: 'warning',
            center: true,
            duration: 3 * 1000
          })
        }
      },
      queryByMsg (msg) {
        if (!msg) {
          Message({
            message: '请在文本框中输入或粘贴内容！',
            type: 'warning',
            center: true,
            duration: 3 * 1000
          })
          return
        }
        this.msg = '正在处理中......'
        this.$axios({
          url: '',
          method: 'post',
          data: {
            'type': 'query',
            'msg': window.encodeURI(msg),
            'user': this.userinfo.user,
            'inviter': this.userinfo.inviter,
            'url': this.userinfo.url,
            'sign': md5('xxs' + this.userinfo.user + 'xxs')
          }
        }).then((resp) => {
          let respData = resp.data
          if (respData) {
            switch (parseInt(respData.type)) {
              case 2:
              case 3:
              case 8:
                this.tip = respData.tip
                this.msg = respData.msg
                break
              default:
                this.tip = ''
                this.msg = respData.msg
                break
            }
          } else {
            this.tip = ''
            this.msg = '对不起，没有找到对应的数据!'
          }
        }).catch(error => {
          this.tip = ''
          this.msg = '对不起，查询出错！'
          console.log('login error:', error)
        })
      }
    },
    mounted () {
      this.copyBtn = new Clipboard(this.$refs.copy)
    },
    beforeDestroy () {
      if (this.copyBtn) {
        // 释放内存
        this.copyBtn.destroy()
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .content-display {
    padding: 10px;
  }
  .content-container {
    overflow: auto;
  }
  .content-order {
    align-items: center;
  }
  .content-tip {
    font-size: 12px;
    width: 100px;
    color: red;
  }
</style>
