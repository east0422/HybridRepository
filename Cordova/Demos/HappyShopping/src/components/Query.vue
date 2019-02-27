<template>
  <div class="query-display">
    <div class="hcontainer">
      <el-input
        class="pr10"
        type="textarea"
        :rows="15"
        placeholder="请输入内容"
        v-model="msg">
      </el-input>
      <div class="vcontainer btn-container">
        <div class="btn" @click="fanliClicked">返利查询</div>
        <div class="btn" @click="msg=''">清空消息</div>
        <div class="btn" @click="tixianClicked">提现</div>
      </div>
    </div>
    <div class="hcontainer pt30 query-order">
      <el-input
        class="pr10"
        v-model="ordernum"
        placeholder="请把订单号粘贴在这里并提交">
      </el-input>
      <div class="btn" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>
<script type="text/babel">
  import {mapState} from 'vuex'
  import {Message} from 'element-ui'

  export default {
    name: 'OrderQuery',
    data () {
      return {
        msg: '',
        ordernum: ''
      }
    },
    props: {
      querytype: {
        require: true,
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapState([
        'userinfo'
      ])
    },
    methods: {
      fanliClicked () {
        if (this.msg) {
          this.$axios({
            url: '?type=query&user=' + this.userinfo.mobile + '&msg=' + window.encodeURI(this.msg) + '&sign=' + this.userinfo.sign,
            method: 'get'
          }).then((resp) => {
            console.log('resp:', resp)
            let result = resp.data.data.msg
            this.$router.push({name: 'fanliquery', params: {result: result}})
          }).catch(error => {
            console.log('login error:', error)
          })
        } else {
          Message({
            message: '请在文本框中输入或粘贴内容！',
            type: 'warning',
            duration: 3 * 1000
          })
        }
      },
      tixianClicked () {
        this.queryByMsg('提现')
      },
      submitOrder () {
        if (this.ordernum) {
          this.queryByMsg(this.ordernum)
        }
      },
      queryByMsg (msg) {
        this.$axios({
          url: '?type=query&user=' + this.userinfo.mobile + '&msg=' + window.encodeURI(msg) + '&sign=' + this.userinfo.sign,
          method: 'get'
        }).then((resp) => {
          console.log('resp:', resp)
          this.msg = resp.data.data.msg
        }).catch(error => {
          console.log('login error:', error)
        })
      },
      reset () {
        console.log('initMsg querytype:', this.querytype)
        if (this.querytype) {
          this.queryByMsg(this.querytype)
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .query-display {
    margin: 30px 10px;
  }
  .query-order {
    align-items: center;
  }
</style>
