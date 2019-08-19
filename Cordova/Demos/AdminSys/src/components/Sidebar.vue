<template>
  <el-menu class="sidebar-el-menu"
    :default-active="$route.path"
    :collapse="sidebarOpened"
    background-color="#424550"
    text-color="#e9eef5"
    active-text-color="#ffd04b"
    unique-opened router>
    <sidebar-item :menus="menus"></sidebar-item>
  </el-menu>
</template>

<script>
  import SidebarItem from './SidebarItem'
  import {mapState, mapGetters} from 'vuex'
  import dynamicRouter from '@/router/dynamicRouter.js'

  export default {
    data () {
      return {
      }
    },
    components: {
      SidebarItem
    },
    computed: {
      ...mapState([
        'sidebarOpened'
      ]),
      ...mapGetters([
        'allowMenus'
      ]),
      menus () {
        return dynamicRouter.generateAllowRoutes(dynamicRouter.allRoutes, this.allowMenus)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
  }
  /* override*/
  .el-menu--collapse {
    width: 54px;
  }
</style>
