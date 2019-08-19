<template>
  <div class="login-container">
    <div class="login-header hcontainer">
      <div class="login-header-img"></div>
      <span class="login-header-text">后台管理系统</span>
    </div>
    <div class="login-content-container">
      <el-form
        class="login-content"
        label-position="left"
        autoComplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm">
        <el-form-item label="用户名" prop="username" label-width="80px">
          <el-input type="text"
            name="username"
            v-model="loginForm.username"
            autoComplete="on"
            placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password" label-width="80px">
          <el-input type="password"
            name="password"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autoComplete="on"
            placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            class="login-handle"
            :loading="loading"
            @click.native.prevent="handleLogin">
            登&nbsp;&nbsp;&nbsp;录
          </el-button>
        </el-form-item>
        <el-form-item class="login-forget-text">
          <el-button type="text" @click.native.prevent="forgetPwd">忘记密码</el-button>
        </el-form-item>
        <el-form-item class="login-reg-text">
          <el-button type="text" @click.native.prevent="gotoReg">还没有账号，现在注册?</el-button>
        </el-form-item>
      </el-form>
    </div>
    <copy-right></copy-right>
  </div>
</template>

<script type="text/babel">
  import CopyRight from '@/components/CopyRight'
  import {mapGetters, mapActions} from 'vuex'
  import {USER} from '@/store/types.js'
  import dynamicRouter from '@/router/dynamicRouter.js'

  export default {
    name: 'Login',
    components: {
      CopyRight
    },
    data () {
      return {
        loginForm: {
          username: null,
          password: null
        },
        loginRules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 5, message: '密码长度不得少于5位', trigger: 'blur'}
          ]
        },
        loading: false
      }
    },
    computed: {
      ...mapGetters([
        'allowMenus'
      ])
    },
    methods: {
      ...mapActions({
        login: USER.LOGIN
      }),
      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.login(this.loginForm).then((resp) => {
              console.log('login resp:', resp)
              this.loading = false
              let allowRoutes = dynamicRouter.generateAllowRoutes(dynamicRouter.allRoutes, this.allowMenus)
              this.$router.addRoutes(allowRoutes)
              this.$router.push('/')
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      forgetPwd () {
        this.$router.push({name: 'forgetpwd'})
      },
      gotoReg () {
        this.$router.push('/reg')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .login-container {
    height: 100%;
    background-color: #fff;
  }
  .login-header {
    height: 140px;
    line-height: 140px;
    background-color: #fff;
    font-size: 26px;
    padding-left: 12%;
    justify-content: space-between;
  }
  .login-header-img {
    width: 90px;
    margin-right: 30px;
    vertical-align: middle;
    background: url(../images/icon/logo.jpeg) no-repeat center;
    background-size: contain;
  }
  .login-header-text{
    float: right;
    margin-right: 13%;
  }
  .login-content-container {
    background: url(../images/login_background.jpg) no-repeat center;
    height: 640px;
    background-size: cover;
  }
  .login-content {
    padding: 25px;
    width: 300px;
    height: 340px;
    margin-top: 60px;
    float: right;
    margin-right: 10%;
    box-shadow: 0px 0px 8px #666;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 10px;
  }
  .login-handle {
    height: 50px;
    width: 100%;
    font-size: 22px;
  }
  .login-forget-text {
    text-align: right;
  }
  .login-reg-text {
    text-align: right;
    margin-top: -20px;
  }
</style>
