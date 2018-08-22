<template>
  <div @touchstart.prevent="anchorTouchStarted">
    <div class="fill hcontainer" v-show="showvideo">
      <video
        :src="videos[videoindex]"
        :style="videoStyle"
        playsinline
        loop="loop"
        preload="auto"
        ref="video">
      </video>
      <button
        class="socketslave-reset"
        @touchstart.prevent="reset">
        清屏
      </button>
    </div>
    <div class="fill vcontainer" v-show="!showvideo">
      <span>{{touchesmsg}}</span>
      <span>{{targetmsg}}</span>
      <span>{{changedmsg}}</span>
    </div>
  </div>
</template>

<style>
  video {
    object-fit: fill !important;
  }
  .socketslave-reset {
    position: absolute;
    left: 50%;
    height: 50px;
    width: 80px;
  }
</style>

<script type="text/babel">
  import io from 'socket.io-client'
  let socket = io.connect('http://localhost:3000')

  export default {
    data () {
      return {
        showvideo: true,
        width: 0,
        height: 0,
        marginLeft: 0,
        marginTop: 0,
        touchesmsg: '',
        targetmsg: '',
        changedmsg: '',
        videos: [require('@/video/demo1.mp4'),
          require('@/video/demo2.mp4'),
          require('@/video/demo3.mp4')],
        videoindex: 0,
      }
    },
    computed: {
      videoStyle () {
        return {
          width: this.width + 'px',
          height: this.height + 'px',
          marginLeft: this.marginLeft + 'px',
          marginTop: this.marginTop + 'px',
          backgroundColor: 'lightblue',
        }
      },
    },
    methods: {
      connectSocket () {
        socket.emit('ready', {id: 'mockid'})
        var that = this
        socket.on('play', function (data) {
          console.log('slave play')
          if (data.videoindex && data.videoindex >= 0) {
            if (data.videoindex < that.videos.length) {
              that.videoindex = data.videoindex
            } else {
              that.videoindex = 0
            }
            that.$refs.video.load()
          }
          that.$refs.video.play()
        })
        socket.on('pause', function () {
          console.log('slave pause')
          that.$refs.video.pause()
        })
        socket.on('volumechanged', function (data) {
          console.log('slave volumechanged')
          that.$refs.video.volume = data.volume
        })
        socket.on('ontimeupdate', function (data) {
          console.log('slave ontimeupdate')
          that.$refs.video.currentTime = data.currentTime
        })
        socket.on('disconnect', function () {
          console.log('slave disconnect socket server')
        })
      },
      isAppropriateFourPoint (touches) {
        let x1 = touches[0].pageX
        let y1 = touches[0].pageY
        let x2 = touches[1].pageX
        let y2 = touches[1].pageY
        let x3 = touches[2].pageX
        let y3 = touches[2].pageY
        let x4 = touches[3].pageX
        let y4 = touches[3].pageY

        let centerX = (x1 + x2 + x3 + x4) / 4
        let centerY = (y1 + y2 + y3 + y4) / 4
        let x = Math.min(x1, x2, x3, x4)
        let y = Math.min(y1, y2, y3, y4)
        this.width = (centerX - x) * 2
        this.height = (centerY - y) * 2
        this.marginLeft = x
        this.marginTop = y
        this.showvideo = true
        console.log('four touch x:' + x + ',y:' + y + ',height:' + this.height + ',width:' + this.width)
        return true
      },
      isAppropriateThreePoint (touches) {
        let x1 = touches[0].pageX
        let y1 = touches[0].pageY
        let x2 = touches[1].pageX
        let y2 = touches[1].pageY
        let x3 = touches[2].pageX
        let y3 = touches[2].pageY

        let distance12 = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
        let distance13 = Math.sqrt((x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3))
        let distance23 = Math.sqrt((x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3))

        let x = Math.min(x1, x2, x3)
        let y = Math.min(y1, y2, y3)
        let max = Math.max(distance12, distance13, distance23)
        let height = Math.min(distance12, distance13, distance23)
        let width = distance12 + distance13 + distance23 - max - height

        console.log('three touch x:' + x + ',y:' + y + ',height:' + height + ',width:' + width)
        this.width = width
        this.height = height
        this.marginLeft = x
        this.marginTop = y
        this.showvideo = true
        return true
      },
      anchorTouchStarted (event) {
        this.touchesmsg = 'touches-- '
        for (let touch of event.touches) {
          this.touchesmsg += '(x:' + touch.pageX + ',y:' + touch.pageY + ')'
        }
        this.targetmsg = 'targets-- '
        for (let touch of event.targetTouches) {
          this.targetmsg += '(x:' + touch.pageX + ',y:' + touch.pageY + ')'
        }
        this.changedmsg = 'changed-- '
        for (let touch of event.changedTouches) {
          this.changedmsg += '(x:' + touch.pageX + ',y:' + touch.pageY + ')'
        }

        if (event.touches.length === 3) {
          if (this.isAppropriateThreePoint(event.touches)) {

          }
        } else if (event.touches.length === 4) {
          if (this.isAppropriateFourPoint(event.touches)) {
          }
        }
      },
      setFullscreen () {
        if (window.device.platform === 'Android') {
          window.AndroidFullScreen.immersiveMode(() => {}, () => {})
        } else if (window.device.platform === 'iOS') {
          window.StatusBar.hide()
        }
      },
      exitFullscreen () {
        if (window.device.platform === 'Android') {
          window.AndroidFullScreen.showSystemUI(() => {}, () => {})
        } else if (window.device.platform === 'iOS') {
          window.StatusBar.show()
        }
      },
      reset () {
        this.showvideo = true
        this.width = 0
        this.height = 0
        this.marginLeft = 0
        this.marginTop = 0
      },
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.setFullscreen()
        vm.reset()
        window.screen.orientation.lock('landscape')
        vm.connectSocket()
      })
    },
    beforeRouteLeave (to, from, next) {
      window.screen.orientation.lock('portrait')
      this.exitFullscreen()
      next()
    },
  }
</script>
