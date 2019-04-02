<template>
  <div class="fill vcontainer register-display"
    v-loading="registering"
    element-loading-text="正在注册中......"
    element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="logo"></div>
    <span class="register-text">用户注册</span>
    <div class="fill vcontainer register-container">
      <el-input
        v-model="account"
        placeholder="请输入QQ号码或手机号码">
      </el-input>
      <el-input
        class="register-invite"
        v-model="inviteaccount"
        placeholder="请输入邀请人账号">
      </el-input>
      <div class="btn register-btn" @click="registerClicked">注册</div>
      <div class="btn register-back" @click="backtoLogin">已有账号，返回登录</div>
    </div>
  </div>
</template>
<script type="text/babel">
  import {Message} from 'element-ui'

  export default {
    name: 'Login',
    data () {
      return {
        account: '',
        inviteaccount: '',
        registering: false
      }
    },
    methods: {
      registerClicked () {
        if (!this.account || this.account.length === 0) {
          Message({
            message: '请输入注册账号！',
            type: 'warning',
            center: true,
            duration: 2 * 1000
          })
          return
        }
        if (!this.inviteaccount || this.inviteaccount.length === 0) {
          Message({
            message: '请输入邀请人账号！',
            type: 'warning',
            center: true,
            duration: 2 * 1000
          })
          return
        }
        if (this.registering) {
          return
        }
        this.registering = true
        this.$axios({
          url: '',
          method: 'post',
          data: {
            'type': 'reg',
            'user': this.account,
            'inviter': this.inviteaccount
          }
        }).then((resp) => {
          this.registering = false
          let respData = resp.data.data
          if (respData.mobile && respData.mobile.length > 0) {
            Message({
              message: '恭喜你，注册成功！',
              type: 'success',
              duration: 3 * 1000
            })
            this.$router.push({name: 'login'})
          } else {
            Message({
              message: '对不起，该邀请人不存在！',
              type: 'error',
              center: true,
              duration: 3 * 1000
            })
          }
        }).catch(error => {
          this.registering = false
          console.log('register error:', error)
          Message({
            message: '对不起，注册出错！',
            type: 'error',
            center: true,
            duration: 3 * 1000
          })
        })
      },
      backtoLogin () {
        this.$router.push('login')
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .register-display {
    color: red;
    text-align: center;
  }
  .register-text {
    border: 1px solid lightgray;
    height: 35px;
    line-height: 35px;
    font-size: 20px;
  }
  .register-container {
    padding: 0 10px;
    padding-top: 20px;
    background-color: white;
  }
  .register-invite {
    margin-top: 10px;
  }
  .register-btn {
    height: 40px;
    line-height: 40px;
    margin: 10px 0;
  }
  .register-back {
    height: 40px;
    line-height: 40px;
    background-color: lightgray;
    border-color: lightgray;
  }
</style>
