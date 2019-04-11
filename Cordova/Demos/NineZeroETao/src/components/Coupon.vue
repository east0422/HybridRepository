<template>
  <div class="fill vcontainer coupon-display"
    v-loading="loading"
    element-loading-text="正在加载中......">
    <div class="coupon-header vcontainer">
      <div class="hcontainer coupon-searchcontainer">
        <el-input v-model="couponname" class="coupon-search-input" placeholder="请输入内容" clearable></el-input>
        <button class="coupon-search-btn" @click="searchClicked">搜索</button>
      </div>
      <span class="coupon-tip">{{userinfo.notice}}</span>
    </div>
    <div class="coupon-tabs">
      <a
        v-for="item in tabs"
        :key="item.cid"
        :class="['coupon-tab', {'coupon-tab-selected': item.cid === activecid}]"
        @click="tabChanged(item)">
        {{item.title}}
      </a>
    </div>
    <pull-to
      :top-load-method="refresh"
      :bottom-load-method="loadmore">
      <coupon-item
        v-for="couponitem in couponlist"
        :key="couponitem.cid"
        :couponitem="couponitem">
      </coupon-item>
    </pull-to>
  </div>
</template>
<script type="text/babel">
  import PullTo from 'vue-pull-to'
  import CouponItem from '@/components/CouponItem'
  import {Message} from 'element-ui'
  import qs from 'qs'
  import Clipboard from 'clipboard'
  import {mapState} from 'vuex'

  export default {
    name: 'Coupon',
    components: {
      PullTo,
      CouponItem
    },
    data () {
      return {
        couponname: null,
        couponlist: [],
        tabs: [{
          index: 0,
          cid: 0,
          title: '全部'
        }, {
          index: 1,
          cid: 1,
          title: '女装'
        }, {
          index: 2,
          cid: 9,
          title: '男装'
        }, {
          index: 3,
          cid: 10,
          title: '内衣'
        }, {
          index: 4,
          cid: 2,
          title: '母婴'
        }, {
          index: 5,
          cid: 3,
          title: '化妆品'
        }, {
          index: 6,
          cid: 4,
          title: '居家'
        }, {
          index: 7,
          cid: 5,
          title: '鞋包配饰'
        }, {
          index: 8,
          cid: 6,
          title: '美食'
        }, {
          index: 9,
          cid: 7,
          title: '文体车品'
        }, {
          index: 10,
          cid: 8,
          title: '数码家电'
        }],
        activecid: 0,
        pageNum: 1,
        loading: false
      }
    },
    computed: {
      ...mapState([
        'userinfo'
      ])
    },
    methods: {
      fetchCouponList (successCallback, errorCallback) {
        let key = this.couponname === null ? '' : this.couponname
        this.loading = true
        this.$axios({
          url: 'http://quan.9gola.cn/api/taobao.ashx',
          method: 'post',
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          data: qs.stringify({
            method: 'getQuan',
            key: key,
            page: this.pageNum,
            cid: this.activecid
          })
        }).then((resp) => {
          this.loading = false
          successCallback()
          let respData = resp.data
          let msg = ''
          if (respData.message === '') {
            msg = '亲！已经到底了！！'
          } else if (respData.message.count === 0) {
            msg = '您好,暂时找不到符合您要求的数据！'
            this.couponlist = []
          }
          if (msg !== '') {
            Message({
              message: msg,
              type: 'warning',
              center: true,
              duration: 2 * 1000
            })
            return
          }
          if (this.pageNum === 1) {
            this.couponlist = []
          }
          this.$nextTick(() => {
            this.couponlist = this.couponlist.concat(respData.message)
            this.couponlist.sort((data1, data2) => { // 降序
              return data2.Quan_price - data1.Quan_price
            })
          })
        }).catch(error => {
          console.log('load coupon error:', error)
          this.loading = false
          errorCallback()
          this.couponlist = []
        })
      },
      refresh (loaded) { // 下拉刷新
        this.fetchCouponList(() => {
          loaded('done')
        }, () => {
          loaded('fail')
        })
      },
      loadmore (loaded) { // 上拉加载更多
        this.pageNum = this.pageNum + 1
        this.fetchCouponList(() => {
          loaded('done')
        }, () => {
          loaded('fail')
        })
      },
      searchClicked () {
        this.pageNum = 1
        this.activecid = this.tabs[0].cid
        this.fetchCouponList(() => {}, () => {})
      },
      tabChanged (item) {
        this.pageNum = 1
        this.activecid = item.cid
        this.couponname = null
        this.fetchCouponList(() => {}, () => {})
      }
    },
    mounted () {
      let clipboardBtn = new Clipboard('.couponitem-copybtn')
      clipboardBtn.on('success', e => {
        Message({
          message: '复制成功',
          type: 'success',
          center: true,
          duration: 2 * 1000
        })
      })
      clipboardBtn.on('error', e => {
        Message({
          message: '复制失败',
          type: 'error',
          center: true,
          duration: 2 * 1000
        })
      })
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .coupon-display {
    padding-bottom: 60px;
  }
  .coupon-header {
    height: 130px;
    background: url(../images/coupon_tip_bg.png) no-repeat center/100% 100% #fb6125;
  }
  .coupon-searchcontainer {
    align-items: center;
    padding: 10px;
    padding-top: 20px;
  }
  .coupon-search-input {
    text-align: center;
    font-size: 16px;
  }
  .coupon-search-btn{
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fb6125;
    background-color: white;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    margin-left: 10px;
  }
  .coupon-tip {
    text-align: center;
    color: white;
    font-size: 14px;
    padding: 10px;
  }
  .coupon-tabs {
    font-size: 16px;
    color: black;
    background-color: white;
    flex-flow: wrap; // auto line break
    border-bottom: 2px dotted #D0D0D0;
    z-index: 333;
  }
  .coupon-tab {
    width: 80px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    margin-left: 10px;
    text-align: center;
  }
  .coupon-tab-selected {
    color: #ff6255;
  }
</style>
