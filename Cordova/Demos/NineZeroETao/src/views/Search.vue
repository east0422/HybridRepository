<template>
  <div class="fill vcontainer"
    v-loading="searching"
    element-loading-text="正在查询中......">
    <div class="vcontainer search-header">
      <span style="text-align: left;">{{welcome}}</span>
      <span style="text-align: right;">九零e淘</span>
    </div>
    <div class="hcontainer search-container">
      <el-input
        placeholder="请输入商品信息或订单号"
        prefix-icon="el-icon-search"
        clearable
        v-model="searchmsg">
      </el-input>
      <button class="search-btn" @click="searchClicked">查询</button>
    </div>
    <div class="vcontainer fill" v-show="showresult">
      <textarea class="search-result" v-model="searchresult" disabled="disabled"></textarea>
      <button
        class="search-copybtn"
        data-clipboard-action="copy"
        :data-clipboard-text="copymsg">
        复制内容
      </button>
      <span class="search-result-tip">{{tip}}</span>
    </div>
    <div v-show="!showresult" class="fill search-result-none"></div>
  </div>
</template>
<script type="text/babel">
  import clipboard from '@/utils/clipboard'
  import api from '@/api'
  import {Message} from 'element-ui'
  import {mapState} from 'vuex'

  export default {
    name: 'Search',
    data () {
      return {
        searchmsg: '',
        searchresult: '',
        copymsg: '',
        tip: '',
        searching: false,
        showresult: false
      }
    },
    computed: mapState({
      welcome (state) {
        return '欢迎登录，' + state.user.user
      }
    }),
    methods: {
      searchClicked () {
        if (!this.searchmsg) {
          Message({
            message: '请在文本框中输入或粘贴内容！',
            type: 'warning',
            center: true,
            duration: 3 * 1000
          })
          return
        }

        this.searching = true
        api.searchMsg(this.searchmsg).then((resp) => {
          this.searching = false
          this.showresult = true
          this.searchmsg = ''
          let respData = resp.data
          if (respData) {
            switch (parseInt(respData.type)) {
              case 2:
              case 3:
              case 8:
                this.tip = respData.tip
                this.searchresult = respData.msg
                this.copymsg = respData.result.tkl
                break
              default:
                this.tip = ''
                this.searchresult = respData.msg
                this.copymsg = respData.msg
                break
            }
          } else {
            this.tip = ''
            this.searchresult = '对不起，没有找到对应的数据!'
            this.copymsg = '对不起，没有找到对应的数据!'
          }
        }).catch(error => {
          this.searching = false
          this.showresult = true
          this.searchmsg = ''
          this.tip = ''
          this.searchresult = '对不起，查询出错！'
          this.copymsg = '对不起，查询出错！'
          console.log('search error:', error)
        })
      }
    },
    mounted () {
      clipboard.initWithClassName('.search-copybtn')
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .search-header {
    height: 40px;
    justify-content: center;
    color: white;
    font-size: 16px;
    background-color: green;
    padding: 5px 10px;
  }
  .search-container {
    padding: 0 10px;
    margin-top: 15%;
  }
  .search-btn {
    width: 80px;
    color: white;
    background-color: #ff4400;
    font-size: 14px;
    border: none;
  }
  .search-result {
    height: 50%;
    width: 80%;
    font-size: 16px;
    color: black;
    border: 2px dotted #ff4400;
    margin: 10px auto;
  }
  .search-copybtn {
    width: 150px;
    height: 40px;
    font-size: 18px;
    color: white;
    background-color: #ff4400;
    margin: 0 auto;
    border: none;
  }
  .search-result-tip {
    width: 80%;
    font-size: 12px;
    color: red;
    margin-top: 10px;
    margin-left: 10%;
  }
  .search-result-none {
    background: url(../images/search_bg.png) no-repeat center;
    background-size: contain;
  }
</style>
