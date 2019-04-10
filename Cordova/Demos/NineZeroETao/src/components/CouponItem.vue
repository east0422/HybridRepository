<template>
  <div class="couponitem-display hcontainer"
    v-loading="loading"
    element-loading-text="正在查询中......">
    <div><img class="couponitem-img" :src="couponitem.Pic"></div>
    <div class="vcontainer couponitem-infos">
      <span>{{couponitem.Title}}</span>
      <div class="hcontainer couponitem-container">
        <span class="couponitem-freeship">省</span>
        <span class="couponitem-red">优惠券:{{couponitem.Quan_price}} 券后价:{{couponitem.Price}}</span>
        |<span class="couponitem-purple">销量:{{couponitem.Sales_num}}</span>
      </div>
      <div class="hcontainer couponitem-container">
        <span>商品ID:{{couponitem.GoodsID}}</span>
        <button @click="queryOffer(couponitem.GoodsID)">查询优惠</button>
      </div>
    </div>
    <el-dialog
      title="优惠查询结果"
      :visible="couponItemDialogVisible"
      :show-close="false"
      :modal="false"
      append-to-body
      fullscreen
      center>
      <textarea class="couponitem-couponmsg" v-model="couponmsg" disabled="disabled"></textarea>
      <span slot="footer" class="hcontainer couponitem-dialog-footer">
        <el-button @click="couponItemDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          class="couponitem-copybtn"
          data-clipboard-action="copy"
          :data-clipboard-text="couponmsg"
          @click="couponItemDialogVisible = false">
          复 制
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/babel">
  import md5 from 'js-md5'
  import {mapState} from 'vuex'
  import {Message} from 'element-ui'

  export default {
    name: 'CouponItem',
    data () {
      return {
        loading: false,
        couponItemDialogVisible: false,
        couponmsg: ''
      }
    },
    props: {
      couponitem: {
        require: true,
        type: Object,
        default: function () {
          return {
          }
        }
      }
    },
    computed: {
      ...mapState([
        'userinfo'
      ])
    },
    methods: {
      queryOffer (goodsid) { // 查询优惠
        this.loading = true
        this.$axios({
          url: '',
          method: 'post',
          data: {
            'type': 'query',
            'msg': window.encodeURI('https://detail.tmall.com/item.htm?id=' + goodsid),
            'user': this.userinfo.user,
            'inviter': this.userinfo.inviter,
            'url': this.userinfo.url,
            'sign': md5('xxs' + this.userinfo.user + 'xxs')
          }
        }).then((resp) => {
          this.loading = false
          this.couponmsg = resp.data ? resp.data.msg : '对不起，没有找到对应的数据!'
          this.couponItemDialogVisible = true
        }).catch(error => {
          this.loading = false
          this.couponItemDialogVisible = false
          this.couponmsg = ''
          console.log('login error:', error)
          Message({
            message: '对不起，查询出错！',
            type: 'error',
            center: true,
            duration: 2 * 1000
          })
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .couponitem-display {
    width: 100%;
    height: 150px;
    background-color: white;
    align-items: center;
    border-bottom: 2px dotted #D0D0D0;
  }
  .couponitem-img {
    width: 100px;
    height: 100px;
    background-size: contain;
    background-repeat: no-repeat;
    padding-left: 5px;
  }
  .couponitem-infos {
    height: 100%;
    font-size: 14px;
    color: black;
    padding-left: 10px;
    padding-right: 5px;
    justify-content: space-around;
  }
  .couponitem-freeship {
    color: white;
    background-color: #cc3333;
  }
  .couponitem-container {
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
  }
  .couponitem-red {
    color: red;
  }
  .couponitem-purple {
    color: purple;
  }
  .couponitem-couponmsg {
    display: inline-block;
    height: 260px;
    width: 100%;
    font-size: 14px;
    color: black;
    background-color: white;
    border: 1px solid gray;
    border-radius: 4px;
    opacity: 1;
  }
  .couponitem-dialog-footer {
    justify-content: space-around;
  }
  img[src=""], img:not([src]) {
    opacity: 0;
  }
</style>
