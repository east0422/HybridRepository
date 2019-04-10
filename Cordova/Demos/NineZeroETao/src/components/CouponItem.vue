<template>
  <div class="couponitem-display hcontainer">
    <div><img class="couponitem-img" :src="couponitem.Pic"></div>
    <div class="vcontainer couponitem-infos">
      <span>{{couponitem.Title}}</span>
      <div class="hcontainer couponitem-quan-container">
        <span class="couponitem-freeship">省</span>
        <span class="couponitem-red">¥</span>
        <span class="couponitem-red">{{couponitem.Quan_price}}</span>
        <span class="couponitem-red">券后:{{couponitem.Price}}</span>
        |<span class="couponitem-blue">约省:{{couponitem.Return}}</span>
        |<span class="couponitem-purple">销量:{{couponitem.Sales_num}}</span>
      </div>
      <div class="hcontainer couponitem-copys">
        <span>商品ID:{{couponitem.GoodsID}}</span>
        <button
          class="couponitem-copybtn"
          data-clipboard-action="copy"
          :data-clipboard-text="couponitem.GoodsID">
          复制
        </button>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'CouponItem',
    data () {
      return {
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
  .couponitem-quan-container {
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }
  .couponitem-red {
    color: red;
  }
  .couponitem-blue {
    color: blue;
  }
  .couponitem-purple {
    color: purple;
  }
  .couponitem-copys {
    justify-content: space-around;
  }
  img[src=""], img:not([src]) {
    opacity: 0;
  }
</style>
