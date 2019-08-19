<template>
  <div>
    <content-header
      :title="title"
      :btn-text="addText"
      @btnclicked="$emit('addclicked')">
    </content-header>
    <div class="m30">
      <slot name="search"></slot>
      <el-table
        :data="datalist"
        style="width: 100%"
        v-loading="loading">
        <slot name="columns"></slot>
        <el-table-column label="状态" v-show="shows.status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="$emit('statuschanged', scope.row.status, scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期" sortable v-show="shows.createtime"></el-table-column>
        <el-table-column prop="updateTime" label="更新日期" sortable v-show="shows.updatetime"></el-table-column>
        <el-table-column label="操作" v-if="userInfo.adminStatus === 1" v-show="shows.operate">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="resetPwd(scope.row)" v-show="$route.name === 'userlist'">重置密码</el-button>
            <el-button type="text" size="small" @click="$emit('editclicked', scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="$emit('deleteclicked', scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="center"
      @size-change="pageSizeChange"
      @current-change="curPageChange"
      :current-page="pageNum"
      :page-sizes="[10, 15, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      v-if="showPagination">
    </el-pagination>
  </div>
</template>
<script>
  import ContentHeader from '@/components/ContentHeader'
  import {mapState} from 'vuex'

  export default {
    name: 'List',
    components: {
      ContentHeader
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      addText: {
        type: String,
        default: ''
      },
      datalist: {
        type: Array,
        default: () => {
          return []
        }
      },
      loading: {
        type: Boolean,
        default: false
      },
      shows: {
        type: Object,
        default: () => {
          return {
            status: true,
            createtime: true,
            updatetime: true,
            operate: true
          }
        }
      },
      pageNum: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        default: 0
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
      showPagination () {
        return (this.datalist && this.datalist.length > 0)
      }
    },
    methods: {
      pageSizeChange (newpageSize) {
        this.$emit('searchclicked', this.pageNum, newpageSize)
      },
      curPageChange (newpageNum) {
        this.$emit('searchclicked', newpageNum, this.pageSize)
      },
      resetPwd (user) { // 重置密码
        // TODO
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .rolelist-container {
    margin: 10px 20px;
  }
</style>
