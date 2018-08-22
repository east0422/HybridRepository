<template>
  <div>
    <div class="fill hcontainer">
      <video
        class="socket-master-video"
        :src="videos[videoindex]"
        playsinline
        controls
        loop="loop"
        preload="auto"
        ref="mastervideo"
        @volumechange="videoVolumeChanged"
        @timeupdate="videoOntimeUpdate"
        @play="videoPlay"
        @pause="videoPause">
      </video>
      <button
        class="socketslave-change"
        @click.prevent="changeVideo">
        切换视频
      </button>
    </div>
  </div>
</template>

<style>
  .socket-master-video {
    background-color: lightblue;
  }
  .socketslave-change {
    position: absolute;
    left: 50%;
    height: 50px;
    width: 80px;
  }
  video {
    object-fit: fill !important;
  }
</style>

<script type="text/babel">
  import io from 'socket.io-client'
  let socket = io.connect('http://localhost:3000')

  export default {
    data () {
      return {
        videos: [require('@/video/demo1.mp4'),
          require('@/video/demo2.mp4'),
          require('@/video/demo3.mp4')],
        videoindex: 2,
      }
    },
    methods: {
      connectSocket () {
        var that = this
        socket.on('ready', function (data) {
          socket.emit('play', {videoindex: 2})

          that.videoindex = 2
          that.$refs.mastervideo.load()
          that.$refs.mastervideo.play()
        })
        socket.on('disconnect', function () {
          console.log('master disconnect socket server')
        })
      },
      changeVideo () {
        console.log('changeVideo')
        let index = Math.floor(Math.random() * this.videos.length)
        while (index === this.videoindex) {
          index = Math.floor(Math.random() * this.videos.length)
        }
        socket.emit('play', {videoindex: index})
        this.videoindex = index
        this.$refs.mastervideo.pause()
        this.$refs.mastervideo.load()
        this.$refs.mastervideo.play()
      },
      videoVolumeChanged () {
        console.log('videoVolumeChanged')
        socket.emit('volumechanged', {volume: this.$refs.mastervideo.volume})
      },
      videoOntimeUpdate () {
        console.log('videoOntimeUpdate')
        socket.emit('ontimeupdate', {currentTime: this.$refs.mastervideo.currentTime})
      },
      videoPlay () {
        console.log('videoPlay')
        this.$refs.mastervideo.play()
        socket.emit('play', {videoindex: -1})
      },
      videoPause () {
        console.log('videoPause')
        this.$refs.mastervideo.pause()
        socket.emit('pause')
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
