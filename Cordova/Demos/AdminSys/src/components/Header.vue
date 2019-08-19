<template>
  <div class="header-display">
    <div class="header-collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="header-title">后台管理系统</div>
    <div class="header-userinfo">
      <el-dropdown @command="handleHeaderCommond">
        <el-button type="primary">
          {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="header-dropdown-menu">
          <el-dropdown-item command="changepwd">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog title="修改密码" :visible.sync="dialogVisibleX" width="50%" center>
        <el-form :model="form">
          <el-form-item label="请输入原密码：" :label-width="formLabelWidth">
            <el-input type="password" v-model="form.oldpwd"></el-input>
          </el-form-item>
          <el-form-item label="请输入新密码：" :label-width="formLabelWidth">
            <el-input type="password" v-model="form.modifypwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" :label-width="formLabelWidth">
            <el-input type="password" v-model="form.repeatpwd"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="changePwdConfirm">确定</el-button>
          <el-button @click="dialogVisibleX = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/babel">
  import {mapState, mapActions} from 'vuex'
  import {APP, USER} from '@/store/types.js'

  export default {
    data () {
      return {
        dialogVisibleX: false,
        form: {
          oldpwd: null,
          modifypwd: null,
          repeatpwd: null
        },
        formLabelWidth: '120px'
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    methods: {
      ...mapActions({
        collapseChage: APP.SIDEBAR_STATUS,
        logout: USER.LOGOUT
      }),
      handleHeaderCommond (command) {
        if (command === 'changepwd') {
          this.dialogVisibleX = true
        } else if (command === 'logout') {
          this.logout(this.userInfo.id).then(() => {
            this.$router.push({path: 'login'})
          })
        }
      },
      changePwdConfirm () {

      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .header-display {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    line-height: 70px;
    font-size: 22px;
    color: #fff;
    background-color: #242f42;
  }
  .header-collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
  }
  .header-title {
    float: left;
    width: 250px;
  }
  .header-userinfo {
    float: right;
    padding-right: 50px;
  }
  .header-dropdown-menu {
    border-top: none;
    box-shadow: none;
    top: 55px !important;
    padding: 0 20px;
  }
</style>
