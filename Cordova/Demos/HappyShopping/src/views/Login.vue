<template>
  <div class="fill vcontainer login-display">
    <div class="logo"></div>
    <span class="login-text">返利系统</span>
    <span class="login-text">Dream management system</span>
    <div class="fill vcontainer login-container">
      <el-input
        v-model="account"
        placeholder="请输入账号"
        @keyup.enter.native="loginClicked">
      </el-input>
      <el-button class="login-btn" @click="loginClicked">登录</el-button>
      <el-button class="login-register" @click="gotoRegister">没有账号，开始注册</el-button>
    </div>
  </div>
</template>
<script type="text/babel">
  import {Message} from 'element-ui'

  export default {
    name: 'Login',
    data () {
      return {
        account: ''
      }
    },
    methods: {
      loginClicked () {
        if (!this.account || this.account.length === 0) {
          Message({
            message: '请输入账号',
            type: 'warning',
            duration: 3 * 1000
          })
          return
        }
        this.$axios({
          url: '?type=login&user=' + this.account,
          method: 'get'
        }).then((resp) => {
          let respData = resp.data.data
          if (respData.exesis === 0) {
            Message({
              message: respData.msg,
              type: 'warning',
              duration: 3 * 1000
            })
          } else {
            this.$store.commit('setUserinfo', respData)
            this.$store.commit('setType', resp.data.type)
            this.$router.push({
              name: 'query',
              params: {
                querytype: '订单',
                querynow: false
              }
            })
          }
        }).catch(error => {
          console.log('login error:', error)
          Message({
            message: '对不起，登录出错',
            type: 'warning',
            duration: 3 * 1000
          })
        })
      },
      gotoRegister () {
        this.$router.push('register')
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .login-display {
    color: red;
    text-align: center;
  }
  .login-text {
    border: 1px solid lightgray;
    height: 40px;
    line-height: 40px;
    font-size: 24px;
  }
  .login-container {
    padding: 30px 10px;
    background-color: white;
  }
  .login-btn {
    background-color: red;
    color: white;
    margin: 10px 0;
  }
  .login-register {
    background-color: lightgray;
    color: white;
    margin-left: 0px !important;
  }
</style>
