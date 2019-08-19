<template>
  <div>
    <template v-for="item in displayMenus" v-if="!item.hidden">
      <el-submenu v-if="item.children" :index="item.path" :key="item.name">
        <template slot="title">
          <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
          <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
        </template>
        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item v-if="child.children" :menus="[child]" :key="child.path"></sidebar-item>
          <el-menu-item :index="item.path + '/' + child.path" :key="child.name" v-else>
            <i v-if="child.meta && child.meta.icon" :class="child.meta.icon"></i>
            <span v-if="child.meta && child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item :index="item.path" :key="item.name" v-else>
        <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
        <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      menus: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    computed: {
      displayMenus () {
        for (let menu of this.menus) {
          if (menu.path === '/') {
            return menu.children
          }
        }
        return this.menus
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
