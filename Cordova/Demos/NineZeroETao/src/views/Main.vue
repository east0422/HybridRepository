<template>
  <div class="main-display fill">
    <app-header></app-header>
    <app-content v-show="curcomponent === component.content" ref="content"></app-content>
    <coupon v-show="curcomponent === component.coupon" ref="coupon"></coupon>
    <customer-service v-show="curcomponent === component.customerservice"></customer-service>
    <app-tabbar v-show="!keyboardshow" @tabchanged="tabChanged"></app-tabbar>
  </div>
</template>
<script type="text/babel">
  import appHeader from '@/components/Header'
  import appContent from '@/components/Content'
  import customerService from '@/components/CustomerService'
  import coupon from '@/components/Coupon'
  import appTabbar from '@/components/TabBar'

  export default {
    name: 'Main',
    data () {
      return {
        keyboardshow: false,
        component: {
          content: 'content',
          coupon: 'coupon',
          customerservice: 'customerservice'
        },
        curcomponent: 'content'
      }
    },
    components: {
      appHeader,
      appContent,
      coupon,
      customerService,
      appTabbar
    },
    methods: {
      tabChanged (key) {
        switch (key) {
          case 'home':
            this.curcomponent = this.component.content
            this.$refs.content.clearClicked()
            break
          case 'menu':
            this.curcomponent = this.component.content
            break
          case 'material':
            this.curcomponent = this.component.content
            this.$refs.content.queryByMsg('资料')
            break
          case 'invite':
            this.curcomponent = this.component.content
            this.$refs.content.queryByMsg('邀请')
            break
          case 'order':
            this.curcomponent = this.component.content
            this.$refs.content.queryByMsg('订单')
            break
          case 'balance':
            this.curcomponent = this.component.content
            this.$refs.content.queryByMsg('余额')
            break
          case 'tixian':
            this.curcomponent = this.component.content
            this.$refs.content.queryByMsg('提现')
            break
          case 'coupon':
            this.curcomponent = this.component.coupon
            this.$refs.coupon.fetchCouponList(() => {}, () => {})
            break
          case 'customerservice':
            this.curcomponent = this.component.customerservice
            break
          default:
            break
        }
      },
      listenKeyboard () {
        window.addEventListener('keyboardDidShow', (event) => {
          this.keyboardshow = true
          if (document.activeElement.tagName === 'INPUT') {
            window.scrollTo(0, event.keyboardHeight)
          } else if (document.activeElement.tagName === 'TEXTAREA') {
            this.$store.commit('setBottomHidden', true)
          }
        })
        window.addEventListener('keyboardDidHide', () => {
          this.keyboardshow = false
          this.$store.commit('setBottomHidden', false)
          window.scrollTo(0, 0)
        })
      }
    },
    mounted () {
      document.addEventListener('deviceready', () => {
        if (window.device && window.device.platform === 'Android') {
          this.listenKeyboard()
        }
      })
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .main-display {
    height: 100%;
    width: 100%;
  }
</style>
