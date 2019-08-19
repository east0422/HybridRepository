<template>
  <div class="forget-container">
    <div class="forget-header hcontainer">
      <div class="forget-header-img"></div>
      <span class="forget-header-text">后台管理系统</span>
    </div>
    <div class="forget-content-container">
      <el-form
        class="forget-content"
        label-position="left"
        autoComplete="on"
        :model="forgetForm"
        :rules="forgetRules"
        ref="forgetForm">
        <el-form-item label="用户名" prop="username" label-width="80px">
          <el-input type="text"
            name="username"
            v-model="forgetForm.username"
            autoComplete="on"
            placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile" label-width="80px">
          <el-input type="number"
            name="mobile"
            v-model="forgetForm.mobile"
            autoComplete="on"
            placeholder="请输入绑定手机号">
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" label-width="80px">
          <div class="hcontainer">
            <el-input type="text"
              name="code"
              v-model="forgetForm.code"
              autoComplete="on"
              placeholder="请输入验证码">
            </el-input>
            <el-button type="primary"
              class="forget-send-btn"
              size="mini"
              :disabled="sendDisabled"
              @click.native.prevent="sendCodeMsg">
              获取验证码{{time}}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            class="forget-handle"
            :loading="loading"
            @click.native.prevent="handleForget">
            找回密码
          </el-button>
        </el-form-item>
        <el-form-item class="forget-login">
          <el-button type="text" @click.native.prevent="gotoLogin">登录</el-button>
        </el-form-item>
        <el-form-item class="forget-reg">
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
    name: 'Forget',
    components: {
      CopyRight
    },
    data () {
      return {
        sendDisabled: false,
        time: '',
        forgetForm: {
          username: null,
          mobile: null,
          code: null
        },
        forgetRules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'}
          ],
          code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
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
        sendCode: USER.SENDCODE,
        forgetPassword: USER.FORGETPWD
      }),
      sendCodeMsg () {
        // this.sendCode(this.regForm.mobile).then((resp) => {
        //   console.log('bbbbb')
        this.sendDisabled = true
        let timeout = 60
        let timer = setInterval(() => {
          console.log('timeout:', timeout)
          timeout--
          this.time = '(' + timeout + 's)'
          if (timeout === 0) {
            clearInterval(timer)
            this.time = ''
            this.sendDisabled = false
          }
        }, 1000)
        // })
      },
      handleForget () {
        this.$refs.forgetForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.forgetPassword(this.forgetForm).then(() => {
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
      gotoLogin () {
        this.$router.push('/login')
      },
      gotoReg () {
        this.$router.push('/reg')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .forget-container {
    height: 100%;
    background-color: #fff;
  }
  .forget-header {
    height: 140px;
    line-height: 140px;
    background-color: #fff;
    font-size: 26px;
    padding-left: 12%;
    justify-content: space-between;
  }
  .forget-header-img {
    width: 90px;
    margin-right: 30px;
    vertical-align: middle;
    background: url(../images/icon/logo.jpeg) no-repeat center;
    background-size: contain;
  }
  .forget-header-text{
    float: right;
    margin-right: 13%;
  }
  .forget-content-container {
    background: url(../images/login_background.jpg) no-repeat center;
    height: 640px;
    background-size: cover;
  }
  .forget-content {
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
  .forget-send-btn {
    width: 120px;
    margin-left: 5px;
    font-size: 12px;
    padding: 5px;
  }
  .forget-handle {
    height: 50px;
    width: 100%;
    font-size: 22px;
  }
  .forget-login {
    text-align: right;
  }
  .forget-reg {
    text-align: right;
    margin-top: -20px;
  }
</style>
