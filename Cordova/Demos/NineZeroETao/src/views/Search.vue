<template>
  <div class="fill vcontainer search-display"
    v-loading="searching"
    element-loading-text="正在查询中......">
    <div class="hcontainer">
      <el-input
        type="textarea"
        placeholder="请输入商品信息或订单号"
        clearable
        v-model="searchmsg">
      </el-input>
      <button class="search-btn" @click="searchClicked">查询</button>
    </div>
    <textarea class="search-result" v-model="searchresult" disabled="disabled"></textarea>
    <button
      class="search-copybtn"
      data-clipboard-action="copy"
      :data-clipboard-text="copymsg">
      复制内容
    </button>
    <span class="search-result-tip">{{tip}}</span>
  </div>
</template>
<script type="text/babel">
  import clipboard from '@/utils/clipboard'
  import api from '@/api'
  import {Message} from 'element-ui'

  export default {
    name: 'Search',
    data () {
      return {
        searchmsg: '',
        searchresult: '',
        copymsg: '',
        tip: '',
        searching: false
      }
    },
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
  .search-display {
    padding: 20px 10px;
  }
  .search-btn {
    width: 70px;
    color: white;
    background-color: #ff4400;
    font-size: 14px;
    border: none;
  }
  .search-result {
    height: 170px;
    width: 80%;
    font-size: 14px;
    color: black;
    border: none;
    margin: 10px auto;
  }
  .search-copybtn {
    width: 150px;
    height: 40px;
    font-size: 18px;
    color: black;
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
</style>
