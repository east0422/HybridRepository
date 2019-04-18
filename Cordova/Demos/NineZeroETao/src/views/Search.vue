<template>
  <div class="fill vcontainer search-display"
    v-loading="searching"
    element-loading-text="正在查询中......">
    <el-radio-group v-model="searchtype" class="search-radio-type">
      <el-radio :label="1">返利查询</el-radio>
      <el-radio :label="2">订单查询</el-radio>
    </el-radio-group>
    <div class="hcontainer search-container">
      <el-input
        type="textarea"
        :autosize="{minRows: 3, maxRows: 8}"
        :placeholder="searchholder"
        v-model="searchmsg">
      </el-input>
      <div class="vcontainer">
        <button class="search-btn" @click="searchClicked">查询</button>
        <button class="search-btn" @click="searchmsg=''">清空</button>
      </div>
    </div>
    <div class="hcontainer search-result-container">
      <textarea class="search-result" v-model="searchresult" disabled="disabled"></textarea>
      <div>
        <button
          class="search-btn search-copybtn"
          data-clipboard-action="copy"
          :data-clipboard-text="copymsg">
          复制
        </button>
      </div>
    </div>
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
        searchtype: 1,
        searchmsg: '',
        searchresult: '',
        copymsg: '',
        tip: '',
        searching: false
      }
    },
    computed: {
      searchholder () {
        if (this.searchtype === 1) {
          return '请输入您要查询的返利信息'
        } else {
          return '请输入您要查询的订单号'
        }
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
    padding: 10px;
  }
  .search-radio-type {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 10px;
  }
  .search-container {
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
  .search-result-container {
    justify-content: space-between;
    align-items: center;
  }
  .search-result {
    height: 170px;
    width: 100%;
    font-size: 14px;
    color: black;
    background-color: white;
    border-radius: 4px;
    border: none;
  }
  .search-btn {
    height: 30px;
    line-height: 30px;
    width: 70px;
    color: white;
    background-color: #457A2C;
    font-size: 14px;
    border-radius: 5px;
    margin: 10px;
    margin-right: 0;
  }
  .search-result-tip {
    width: 100%;
    font-size: 12px;
    color: red;
    margin-top: 10px;
  }
</style>
