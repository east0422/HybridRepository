<template>
  <div class="fill vcontainer socket-master-display">
    <div class="hcontainer fill socket-master-container"
      v-for="(videosrc, index) in videoSrcs">
      <div class="vcontainer socket-master-video-container">
        <video
          class="socket-master-video"
          :src="videosrc"
          playsinline
          loop="loop"
          preload="load"
          muted="true">
        </video>
      </div>
      <div class="vcontainer socket-master-btn-container">
        <button
          class="socket-master-btn"
          :style="{backgroundImage: 'url(' + (playindex !== index ? playSrc : pauseSrc) + ')'}"
          @click.prevent="videoClicked(index)">
        </button>
      </div>
    </div>
  </div>
</template>

<style>
  video {
    object-fit: fill !important;
  }
  .socket-master-display {
    justify-content: space-around;
  }
  .socket-master-container {
    justify-content: center;
    padding: 10px 5px;
    border-bottom: 1px solid #d9d9d9;
  }
  .socket-master-video-container {
    flex: 5;
    background-color: lightblue;
  }
  .socket-master-video {
    width: 100%;
    height: 100%;
  }
  .socket-master-btn-container {
    flex: 1;
    align-items: center;
    justify-content: center;
  }
  .socket-master-btn {
    background: no-repeat center;
    border-radius: 10px;
    background-size: contain;
    height: 80px;
    width: 80px;
    border: 1px solid transparent;
  }
</style>

<script type="text/babel">
  import io from 'socket.io-client'
  const socket = io.connect('http://localhost:3000')
  const socketRandom = 'f174b966fxx29y'
  const roomid = '1#2R4_'
  const role = 'master'
  const pageid = Math.floor((Math.random() * 10000) + 1)

  export default {
    data () {
      return {
        videoSrcs: [require('@/video/demo1.mp4'),
          require('@/video/demo2.mp4'),
          require('@/video/demo3.mp4')],
        playSrc: require('@/image/play.png'),
        pauseSrc: require('@/image/pause.png'),
        videos: [],
        playindex: -1, // 播放视频索引
        preplayindex: -1, // 前一个播放视频索引
      }
    },
    methods: {
      videoClicked (index) {
        if (index === this.playindex) { // 当前为播放状态，点击切换为暂停状态
          this.videos[index].pause()
          this.socketEmitEventAndParam('pause', '')
          this.preplayindex = this.playindex
          this.playindex = -1
        } else { // 点击视频当前为暂停状态
          this.playindex = index
          for (var i = 0; i < this.videos.length; i++) {
            if (!this.videos[i].paused) { // 有其它视频在播放，则当前视频重头开始播放
              this.videos[i].pause()
              this.preplayindex = i
            }
          }
          if (this.preplayindex !== this.playindex) { // 当前播放视频和前一个不一致需要重新开始播放和slave端保持同步
            this.videos[index].load()
          }
          this.videos[index].play().catch((error) => {
            this.playindex = -1
            console.log('videoClicked play video error:' + error)
          })
          this.socketEmitEventAndParam('play', {
            videoindex: index,
          })
        }
      },
      socketEmitEventAndParam (eventname, params) {
        socket.emit('my_event_' + socketRandom, {
          roomid: roomid,
          pageid: pageid,
          role: role,
          userid: '',
          message: eventname,
          message_to_userid: '',
          params: params,
        })
      },
      connectSocket () {
        var that = this
        socket.on('connect', () => {
          console.log('master connect server')
        })
        socket.on('my_response_' + socketRandom, function (data) {
          console.log('master receive data: ' + JSON.stringify(data))
          if (data.role && data.role.startsWith('slave')) { // slave 发送过来的消息
            switch (data.message) {
              case 'ready': {
                setTimeout(() => {
                  that.playindex = 0
                  for (let video of that.videos) {
                    video.pause()
                  }
                  that.videos[0].load()
                  that.videos[0].play().catch((error) => {
                    that.playindex = -1
                    console.log('master play video error:' + error)
                  })
                }, 0)

                that.socketEmitEventAndParam('play', {
                  videoindex: 0,
                })
                break
              }
              default: {

              }
            }
          }
        })
        socket.on('disconnect', function () {
          console.log('master disconnect socket server')
        })
      },
      reset () {
        this.videos = document.getElementsByTagName('video')
        for (let video of this.videos) {
          setTimeout(() => {
            video.load()
          }, 100)
        }
      },
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.reset()
        vm.connectSocket()
      })
    },
    beforeRouteLeave (to, from, next) {
      next()
    },
  }
</script>
