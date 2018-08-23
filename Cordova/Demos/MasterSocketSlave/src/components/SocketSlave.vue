<template>
  <div @touchstart.prevent="anchorTouchStarted">
    <div class="fill hcontainer" v-show="showvideo">
      <video
        :src="videos[videoindex]"
        :style="videoStyle"
        playsinline
        loop="loop"
        preload="load"
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
      <button
        class="socketslave-ready"
        @click.prevent="readyClicked">
        ready
      </button>
    </div>
  </div>
</template>

<style>
  video {
    object-fit: fill !important;
  }
  .socketslave-reset {
    position: absolute;
    left: 30%;
    height: 50px;
    width: 80px;
  }
  .socketslave-ready {
    position: absolute;
    right: 30%;
    height: 50px;
    width: 80px;
  }
</style>

<script type="text/babel">
  import io from 'socket.io-client'
  const socket = io.connect('http://localhost:3000')
  const socketRandom = 'f174b966fxx29y'
  const roomid = '1#2R4_'
  const role = 'slave'
  const pageid = Math.floor((Math.random() * 10000) + 1)

  export default {
    data () {
      return {
        showvideo: false,
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
      sendReady () {
        this.showvideo = true
        socket.emit('my_event_' + socketRandom, {
          roomid: roomid,
          pageid: pageid,
          role: role,
          userid: '',
          message: 'ready',
          message_to_userid: '',
          params: {
            id: 'mockid',
          },
        })
      },
      connectSocket () {
        var that = this
        socket.on('connect', function () {
          console.log('slave connect socket server')
        })

        socket.on('my_response_' + socketRandom, function (data) {
          console.log('slave receive data: ' + JSON.stringify(data))
          if (data.role && data.role.startsWith('master')) { // master 发送过来的消息
            switch (data.message) {
              case 'play': {
                if (data.params && data.params.videoindex !== that.videoindex) {
                  if (data.params.videoindex < that.videos.length) {
                    that.videoindex = data.params.videoindex
                  } else {
                    that.videoindex = 0
                  }
                  that.$refs.video.load()
                }

                // allowed to play() without a user gesture if their source media contains no audio tracks, or if their muted property is set to true or not visible on-screen or out of the viewport
                that.$refs.video.muted = false
                setTimeout(() => {
                  that.$refs.video.play().catch((error) => {
                    console.log('slave play video error:' + error)
                  })
                }, 0)
                break
              }
              case 'pause': {
                that.$refs.video.pause()
                break
              }
              default: {

              }
            }
          }
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

        if (max === distance12) {
          x = (x1 + x2 - width) / 2
          y = (y1 + y2 - height) / 2
        } else if (max === distance13) {
          x = (x1 + x3 - width) / 2
          y = (y1 + y3 - height) / 2
        } else {
          x = (x2 + x3 - width) / 2
          y = (y2 + y3 - height) / 2
        }

        this.width = width
        this.height = height
        this.marginLeft = x
        this.marginTop = y
        return true
      },
      anchorTouchStarted (event) {
        if (this.showvideo) { // 设备已经安装上不再检测touch，避免后续误触发
          return
        }

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
            this.sendReady()
          }
        } else if (event.touches.length === 4) {
          if (this.isAppropriateFourPoint(event.touches)) {
            this.sendReady()
          }
        }
      },
      readyClicked () {
        this.width = 500
        this.height = 300
        this.marginLeft = 100
        this.marginTop = 80
        this.sendReady()
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
        this.showvideo = false
        this.width = 0
        this.height = 0
        this.marginLeft = 0
        this.marginTop = 0
      },
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.reset()
        document.addEventListener('deviceready', () => {
          vm.setFullscreen()
          if (window.device.platform === 'Android' || window.device.platform === 'iOS') {
            window.screen.orientation.lock('landscape')
          }
        })
        vm.connectSocket()
      })
    },
    beforeRouteLeave (to, from, next) {
      if (window.device.platform === 'Android' || window.device.platform === 'iOS') {
        window.screen.orientation.lock('portrait')
      }
      this.exitFullscreen()
      next()
    },
  }
</script>
