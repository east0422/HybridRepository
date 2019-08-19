<template>
  <div class="reg-container">
    <div class="reg-header hcontainer">
      <div class="reg-header-img"></div>
      <span class="reg-header-text">后台管理系统</span>
    </div>
    <div class="reg-content-container">
      <el-form
        class="reg-content"
        label-position="left"
        autoComplete="on"
        :model="regForm"
        :rules="regRules"
        ref="regForm">
        <el-form-item label="QQ" prop="username" label-width="80px">
          <el-input type="text"
            name="username"
            v-model="regForm.username"
            autoComplete="on"
            placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile" label-width="80px">
          <el-input type="number"
            name="mobile"
            v-model="regForm.mobile"
            autoComplete="on"
            placeholder="请输入手机号">
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" label-width="80px">
          <div class="hcontainer">
            <el-input type="text"
              name="code"
              v-model="regForm.code"
              autoComplete="on"
              placeholder="请输入验证码">
            </el-input>
            <el-button type="primary"
              class="reg-send-btn"
              size="mini"
              :disabled="sendDisabled"
              @click.native.prevent="sendCodeMsg">
              获取验证码{{time}}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="密 码" prop="password" label-width="80px">
          <el-input type="password"
            name="password"
            v-model="regForm.password"
            autoComplete="on"
            placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            class="reg-handle"
            :loading="loading"
            @click.native.prevent="handleReg">
            注&nbsp;&nbsp;&nbsp;册
          </el-button>
        </el-form-item>
        <el-form-item class="reg-login-text">
          <el-button type="text" @click.native.prevent="gotoLogin">已有账号，现在登录?</el-button>
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
    name: 'Reg',
    components: {
      CopyRight
    },
    data () {
      return {
        sendDisabled: false,
        time: '',
        regForm: {
          username: null,
          mobile: null,
          code: null,
          password: null
        },
        regRules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          mobile: [{required: true, message: '请输入手机号', trigger: 'blur'}],
          code: [{required: true, message: '请输入验证码', trigger: 'blur'}],
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
        sendCode: USER.SENDCODE,
        register: USER.REGISTER
      }),
      sendCodeMsg () {
        this.sendCode(this.regForm.mobile).then((resp) => {
          this.sendDisabled = true
          let timeout = 60
          let timer = setInterval(() => {
            timeout--
            this.time = '(' + timeout + 's)'
            if (timeout === 0) {
              clearInterval(timer)
              this.time = ''
              this.sendDisabled = false
            }
          }, 1000)
        })
      },
      handleReg () {
        this.$refs.regForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.register(this.regForm).then((resp) => {
              this.loading = false
              let allowRoutes = dynamicRouter.generateAllowRoutes(dynamicRouter.allRoutes, this.allowMenus)
              this.$router.addRoutes(allowRoutes)
              this.$router.push('/')
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('valid failed!')
            return false
          }
        })
      },
      gotoLogin () {
        this.$router.push({name: 'login'})
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .reg-container {
    height: 100%;
    background-color: #fff;
  }
  .reg-header {
    height: 140px;
    line-height: 140px;
    background-color: #fff;
    font-size: 26px;
    padding-left: 12%;
    justify-content: space-between;
  }
  .reg-header-img {
    width: 90px;
    margin-right: 30px;
    vertical-align: middle;
    background: url(../images/icon/logo.jpeg) no-repeat center;
    background-size: contain;
  }
  .reg-header-text{
    float: right;
    margin-right: 13%;
  }
  .reg-content-container {
    background: url(../images/login_background.jpg) no-repeat center;
    height: 640px;
    background-size: cover;
  }
  .reg-content {
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
  .reg-send-btn {
    width: 120px;
    margin-left: 5px;
    font-size: 12px;
    padding: 5px;
  }
  .reg-handle {
    height: 50px;
    width: 100%;
    font-size: 22px;
  }
  .reg-login-text {
    text-align: right;
  }
</style>
