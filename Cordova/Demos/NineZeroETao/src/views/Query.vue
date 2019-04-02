<template>
  <div class="query-display">
    <div class="hcontainer query-container">
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
        <div class="btn query-btn" @click="fanliClicked">返利查询</div>
        <div class="btn query-btn" @click="clearClicked">清空消息</div>
        <div class="btn query-btn" @click="tixianClicked">提现</div>
      </div>
    </div>
    <div class="hcontainer pt30 query-order" v-show="!bottomhidden">
      <el-input
        class="pr10"
        v-model="ordernum"
        placeholder="请把订单号粘贴在这里并提交">
      </el-input>
      <div class="btn query-btn" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>
<script type="text/babel">
  import {mapState} from 'vuex'
  import {Message, MessageBox} from 'element-ui'

  export default {
    name: 'OrderQuery',
    data () {
      return {
        msg: '',
        ordernum: '',
        querytype: ''
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
        if (window.device.platform === 'Android') {
          this.$store.commit('setBottomHidden', true)
        }
      },
      blurTrigged () {
        if (window.device.platform === 'Android') {
          setTimeout(() => {
            this.$store.commit('setBottomHidden', false)
          }, 300)
        }
      },
      clearClicked () {
        this.msg = ''
        this.ordernum = ''
      },
      fanliClicked () {
        if (this.msg) {
          let oldmsg = this.msg
          this.msg = '正在处理中......'
          this.$axios({
            url: '',
            method: 'post',
            data: {
              'type': 'query',
              'user': this.userinfo.mobile,
              'msg': window.encodeURI(oldmsg),
              'sign': this.userinfo.sign
            }
          }).then((resp) => {
            let result = '没有查询结果'
            if (resp.data.data && resp.data.data.msg) {
              result = resp.data.data.msg
            }
            this.$router.push({name: 'fanliquery', params: {result: result}})
          }).catch(error => {
            this.msg = '对不起，返利查询出错！'
            console.log('fanliquery error:', error)
          })
        } else {
          Message({
            message: '请在文本框中输入或粘贴内容！',
            type: 'warning',
            center: true,
            duration: 3 * 1000
          })
        }
      },
      tixianClicked () {
        this.msg = '正在处理中......'
        this.$axios({
          url: '',
          method: 'post',
          data: {
            'type': 'query',
            'user': this.userinfo.mobile,
            'msg': window.encodeURI('提现'),
            'sign': this.userinfo.sign
          }
        }).then((resp) => {
          if (resp.data.data && resp.data.data.msg === 'no-openid') {
            MessageBox.confirm('未绑定收款账号，是否查看如何绑定？', '提现', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              customClass: 'query-messagebox',
              showClose: false,
              center: true
            }).then(() => {
              this.$router.push({name: 'binddemo'})
            }).catch(() => {
              this.msg = '对不起，您还未绑定收款账号，请先绑定账号再提现！'
            })
          } else {
            this.msg = resp.data.data.msg
          }
        }).catch(error => {
          this.msg = '对不起，提现出错！'
          console.log('login error:', error)
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
        this.msg = '正在处理中......'
        this.$axios({
          url: '',
          method: 'post',
          data: {
            'type': 'query',
            'user': this.userinfo.mobile,
            'msg': window.encodeURI(msg),
            'sign': this.userinfo.sign
          }
        }).then((resp) => {
          if (resp.data.data && resp.data.data.msg) {
            this.msg = resp.data.data.msg
          } else {
            this.msg = '对不起，没有找到对应的数据!'
          }
        }).catch(error => {
          this.msg = '对不起，查询出错！'
          console.log('login error:', error)
        })
      },
      reset () {
        if (this.querytype) {
          this.queryByMsg(this.querytype)
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.querytype = to.params.querytype
        vm.msg = ''
        if (to.params.querynow) {
          vm.reset()
        }
      })
    },
    beforeRouteUpdate (to, from, next) {
      this.querytype = to.params.querytype
      this.msg = ''
      if (to.params.querynow) {
        this.reset()
      }
      next()
    },
    beforeRouteLeave (to, from, next) {
      next()
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .query-display {
    margin: 30px 10px;
  }
  .query-container {
    overflow: auto;
  }
  .query-order {
    align-items: center;
  }
  .query-btn {
    margin: 10px 0;
    padding: 10px 20px;
  }
  .query-messagebox {
    margin-top: 30%;
    width: 100%;
  }
</style>
