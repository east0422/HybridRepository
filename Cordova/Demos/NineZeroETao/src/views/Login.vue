<template>
  <div class="login-container vcontainer">
    <div class="login-logo"></div>
    <div class="login-content">
      <div class="login-btn-container hcontainer">
        <el-button type="text"
          :class="[{'login-btn-active': active === 1}, 'login-btn']"
          @click="active = 1">
          登录
        </el-button>
        <el-button type="text"
          :class="[{'login-btn-active': active === 2}, 'login-btn']"
          @click="active = 2">
          注册
        </el-button>
      </div>
      <el-form v-show="active === 1"
        label-position="left"
        autoComplete="on"
        :model="loginForm"
        :rules="loginRules"
        v-loading="logining"
        element-loading-text="正在登录中......"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        ref="loginForm">
        <el-form-item prop="loginaccount">
          <el-input type="text"
            v-model.number="loginForm.loginaccount"
            @keyup.enter.native="handleLogin"
            autoComplete="on"
            placeholder="请输入用户账号">
            <i slot="prefix" class="el-input__icon el-icon-login-account"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-handle"
            @click.native.prevent="handleLogin">
            登&nbsp;&nbsp;&nbsp;录
          </el-button>
        </el-form-item>
      </el-form>
      <el-form v-show="active === 2"
        label-position="left"
        autoComplete="on"
        :model="regForm"
        :rules="regRules"
        v-loading="registering"
        element-loading-text="正在注册中......"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        ref="regForm">
        <el-form-item prop="regaccount">
          <el-input
            v-model.number="regForm.regaccount"
            @click.native.prevent="handleRegister"
            autoComplete="on"
            placeholder="请输入用户账号">
            <i slot="prefix" class="el-input__icon el-icon-login-account"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="inviteaccount">
          <el-input
            v-model.number="regForm.inviteaccount"
            @click.native.prevent="handleRegister"
            autoComplete="on"
            placeholder="请输入邀请人账号">
            <i slot="prefix" class="el-input__icon el-icon-login-invite"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-handle"
            @click.native.prevent="handleRegister">
            注&nbsp;&nbsp;&nbsp;册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-copyright">copyright ©2019 九零E淘</div>
  </div>
</template>

<script type="text/babel">
  import {Message} from 'element-ui'

  export default {
    name: 'Login',
    data () {
      return {
        active: 1,
        loginForm: {
          loginaccount: null
        },
        loginRules: {
          loginaccount: [
            {required: true, message: '登录用户账号不能为空', trigger: 'blur'},
            {type: 'number', message: '登录用户账号必须为数字值', trigger: 'blur'},
            {pattern: /^\d{7,11}$/, message: '登录用户账号长度在7到11个数字', trigger: 'blur'}
          ]
        },
        regForm: {
          regaccount: null,
          inviteaccount: null
        },
        regRules: {
          regaccount: [
            {required: true, message: '注册用户不能为空', trigger: 'blur'},
            {type: 'number', message: '注册用户必须为数字值', trigger: 'blur'},
            {pattern: /^\d{7,11}$/, message: '注册用户长度在7到11个数字', trigger: 'blur'}
          ],
          inviteaccount: [
            {required: true, message: '邀请人账号不能为空', trigger: 'blur'},
            {type: 'number', message: '邀请人账号必须为数字值', trigger: 'blur'},
            {pattern: /^\d{7,11}$/, message: '邀请人账号长度在7到11个数字', trigger: 'blur'}
          ]
        },
        logining: false,
        registering: false
      }
    },
    methods: {
      login () { // 登录请求
        this.logining = true
        this.$axios({
          url: '',
          method: 'post',
          data: {
            'type': 'login',
            'user': this.loginForm.loginaccount
          }
        }).then((resp) => {
          console.log('login:', resp.data)
          this.logining = false
          let respData = resp.data
          if (!respData.login) { // 登录失败
            Message({
              message: respData.err,
              type: 'error',
              duration: 3 * 1000
            })
          } else {
            this.$store.commit('setUserinfo', respData.data)
            this.$router.push({
              name: 'query',
              params: {
                querytype: '',
                querynow: false
              }
            })
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
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.login()
          } else {
            return false
          }
        })
      },
      register () {
        this.registering = true
        this.$axios({
          url: '',
          method: 'post',
          data: {
            'type': 'reg',
            'user': this.regForm.regaccount,
            'inviter': this.regForm.inviteaccount
          }
        }).then((resp) => {
          console.log('reg:', resp.data)
          this.registering = false
          let respData = resp.data.data
          if (respData.mobile && respData.mobile.length > 0) {
            Message({
              message: '恭喜你，注册成功！',
              type: 'success',
              duration: 3 * 1000
            })
            // this.$router.push({name: 'login'})
          } else {
            Message({
              message: '对不起，该邀请人不存在！',
              type: 'error',
              center: true,
              duration: 3 * 1000
            })
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
        this.$refs.regForm.validate(valid => {
          if (valid) {
            this.register()
          } else {
            return false
          }
        })
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
  .login-btn {
    font-size: 20px;
    color: #ffffff;
  }
  .login-btn-active {
    color: #409eff !important;
    border-bottom: 3px solid #409eff !important;
  }
  .login-handle {
    height: 50px;
    width: 100%;
    font-size: 22px;
    color: #ffffff;
    background-color: #80CE6B;
    border-color: #80CE6B;
    border-radius: 10px;
  }
  .login-copyright {
    text-align: center;
    font-size: 14px;
    color: #ffffff;
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
