<template>
  <div class="login-container vcontainer">
    <div class="login-logo"></div>
    <div class="login-content">
      <div class="login-btn-container hcontainer">
        <div
          :class="[active === 1 ? 'login-btn-active' : 'login-btn-inactive']"
          @click="active = 1">
          登录
        </div>
        <div
          :class="[active === 2 ? 'login-btn-active' : 'login-btn-inactive']"
          @click="active = 2">
          注册
        </div>
      </div>
      <div v-show="active === 1"
        class="vcontainer"
        v-loading="logining"
        element-loading-text="正在登录中......"
        element-loading-background="rgba(0, 0, 0, 0.6)">
        <el-input type="text"
          v-model.number="loginForm.loginaccount"
          @keyup.enter.native="handleLogin"
          placeholder="请输入用户账号">
          <i slot="prefix" class="el-input__icon el-icon-login-account"></i>
        </el-input>
        <span class="login-validate-error">
          <a v-show="loginerror">请输入7到11位数字用户账号登录！</a>
        </span>
        <el-button
          class="login-handle"
          @click.native.prevent="handleLogin">
          登&nbsp;&nbsp;&nbsp;录
        </el-button>
      </div>
      <div v-show="active === 2"
        class="vcontainer"
        v-loading="registering"
        element-loading-text="正在注册中......"
        element-loading-background="rgba(0, 0, 0, 0.6)">
        <el-input
          v-model.number="regForm.regaccount"
          @keyup.enter.native="handleRegister"
          placeholder="请输入用户账号">
          <i slot="prefix" class="el-input__icon el-icon-login-account"></i>
        </el-input>
        <span class="login-validate-error"><a v-show="regerror">请输入7到11位数字！</a></span>
        <el-input
          v-model.number="regForm.inviteaccount"
          @keyup.enter.native="handleRegister"
          placeholder="请输入邀请人账号">
          <i slot="prefix" class="el-input__icon el-icon-login-invite"></i>
        </el-input>
        <span class="login-validate-error">
          <a v-show="reginviteerror">请输入7到11位数字邀请人账号！</a>
        </span>
        <el-button
          class="login-handle"
          @click.native.prevent="handleRegister">
          注&nbsp;&nbsp;&nbsp;册
        </el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import {Message} from 'element-ui'
  import api from '@/api'
  const userreg = /^\d{7,11}$/

  export default {
    name: 'Login',
    data () {
      return {
        active: 1,
        loginForm: {
          loginaccount: null
        },
        regForm: {
          regaccount: null,
          inviteaccount: null
        },
        logining: false,
        registering: false,
        loginerror: false,
        regerror: false,
        reginviteerror: false
      }
    },
    methods: {
      login () { // 登录请求
        this.logining = true
        api.login(this.loginForm.loginaccount).then((resp) => {
          this.logining = false
          let respData = resp.data
          if (!respData.login) { // 登录失败
            Message({
              message: respData.err,
              type: 'error',
              duration: 3 * 1000
            })
          } else {
            this.$store.commit('setUser', respData.data)
            this.$router.push({name: 'search'})
          }
        }).catch(error => {
          console.log('login error:', error)
          this.logining = false
          Message({
            message: '对不起，登录出错',
            type: 'error',
            duration: 3 * 1000
          })
        })
      },
      handleLogin () {
        if (!userreg.test(this.loginForm.loginaccount)) {
          this.loginerror = true
        } else {
          this.loginerror = false
          this.login()
        }
      },
      register () {
        this.registering = true
        api.register(this.regForm.regaccount, this.regForm.inviteaccount).then((resp) => {
          this.registering = false
          let respData = resp.data
          if (!respData.login) { // 注册失败
            Message({
              message: respData.err,
              type: 'error',
              duration: 3 * 1000
            })
          } else {
            this.$store.commit('setUser', respData.data)
            this.$router.push({name: 'search'})
          }
        }).catch(error => {
          console.log('register error:', error)
          this.registering = false
          Message({
            message: '对不起，注册出错！',
            type: 'error',
            center: true,
            duration: 3 * 1000
          })
        })
      },
      handleRegister () {
        if (!userreg.test(this.regForm.regaccount)) {
          this.regerror = true
        } else if (!userreg.test(this.regForm.inviteaccount)) {
          this.regerror = false
          this.reginviteerror = true
        } else {
          this.regerror = false
          this.reginviteerror = false
          this.register()
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .login-container {
    height: 100%;
    background-color: #B4D2AE;
  }
  .login-logo {
    position: relative;
    height: 100px;
    width: 100px;
    margin: 10px auto;
    background: url(../images/logo.png) no-repeat center;
    background-size: contain;
    border-radius: 20px;
  }
  .login-content {
    padding: 10px 20px;
  }
  .login-btn-container {
    height: 50px;
    line-height: 50px;
    justify-content: center;
    padding-bottom: 20px;
  }
  .login-btn-inactive {
    font-size: 20px;
    margin: 0 5px;
    color: #ffffff;
  }
  .login-btn-active {
    font-size: 20px;
    margin: 0 5px;
    color: #409eff;
    border-bottom: 3px solid #409eff;
  }
  .login-validate-error {
    font-size: 10px;
    color: red;
    height: 10px;
    line-height: 10px;
    padding: 5px;
  }
  .login-handle {
    height: 50px;
    width: 100%;
    font-size: 22px;
    color: #409eff;
    background-color: #80CE6B;
    border-color: #80CE6B;
    border-radius: 10px;
  }
  .el-icon-login-account {
    background: url(../images/account.png) no-repeat center;
    background-size: contain;
  }
  .el-icon-login-invite {
    background: url(../images/invite.png) no-repeat center;
    background-size: contain;
  }
</style>
