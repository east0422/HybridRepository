<template>
  <div class="fill vcontainer minedetail-display"
    v-loading="loading"
    element-loading-text="正在查询中......">
    <mine-header :title="msg"></mine-header>
    <textarea class="minedetail-result" v-model="result" disabled="disabled"></textarea>
    <button
      class="minedetail-copybtn"
      data-clipboard-action="copy"
      :data-clipboard-text="copyresult">
      复制
    </button>
    <span class="minedetail-tip">{{tip}}</span>
  </div>
</template>
<script type="text/babel">
  import api from '@/api'
  import clipboard from '@/utils/clipboard'
  import mineHeader from '@/components/MineHeader'

  export default {
    name: 'MineDetail',
    data () {
      return {
        result: '',
        copyresult: '',
        tip: '',
        loading: false
      }
    },
    props: {
      msg: {
        type: String,
        default: ''
      }
    },
    components: {
      mineHeader
    },
    methods: {
      fetchData () {
        this.loading = true
        api.searchMsg(this.msg).then((resp) => {
          this.loading = false
          let respData = resp.data
          if (respData) {
            switch (parseInt(respData.type)) {
              case 2:
              case 3:
              case 8:
                this.tip = respData.tip
                this.result = respData.msg
                this.copyresult = respData.result.tkl
                break
              default:
                this.tip = ''
                this.result = respData.msg
                this.copyresult = respData.msg
                break
            }
          } else {
            this.tip = ''
            this.result = '对不起，没有找到对应的数据!'
            this.copyresult = '对不起，没有找到对应的数据!'
          }
        }).catch(error => {
          this.loading = false
          this.tip = ''
          this.result = '对不起，查询出错！'
          this.copyresult = '对不起，查询出错！'
          console.log('minedetail error:', error)
        })
      }
    },
    created () {
      this.fetchData()
      clipboard.initWithClassName('.minedetail-copybtn')
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .minedetail-display {
    padding: 10px;
  }
  .minedetail-result {
    height: 300px;
    font-size: 14px;
    color: black;
    border-radius: 4px;
    border: none;
    margin: 20px 0;
    background-color: white;
    opacity: 1;
  }
  .minedetail-copybtn {
    width: 70%;
    height: 50px;
    line-height: 50px;
    color: white;
    background-color: #457A2C;
    font-size: 18px;
    border-radius: 5px;
    margin: 0 auto;
  }
  .minedetail-tip {
    width: 100%;
    font-size: 12px;
    color: red;
    margin-top: 10px;
  }
</style>
