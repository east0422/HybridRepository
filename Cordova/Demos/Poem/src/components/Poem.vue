<template>
  <div>
    <div class="fill vcontainer poem-display" :style="poembgstyle">
      <span class="poem-title">{{msg}}</span>
      <draggable class="fill hcontainer poem-words"
        :move="onMove"
        :list="words">
        <div style="padding: 10px 30px">
          <div :class="['drag', start_class]">{{dragword}}</div>
        </div>
        <div style="padding: 10px"
          v-for="(word, index) in words"
          :key="index">
          <div :class="target_class">
            <span v-if="index === targetindex">{{targetword}}</span>
            <span v-if="index !== targetindex">{{word}}</span>
          </div>
        </div>
      </draggable>
      <div class="fullscreenMask" v-show="showFullscreenMask"></div>
      <audio :src="poemAudioSrc" preload="auto" ref="poem" loop="loop"></audio>
    </div>
  </div>
</template>

<style>
  .fill {
    flex: 1;
  }
  .vcontainer {
    display: flex;
    flex-direction: column;
  }
  .hcontainer {
    display: flex;
    flex-direction: row;
  }
  .poem-display {
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .poem-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: blue;
    padding: 30px 0;
  }
  .poem-words {
    align-self: center;
    justify-content: center;
  }
  .drag,
  .drop {
    font-size: 18pt;
    font-weight: bold;
    display: inline-block;
    border-radius: 10px;
    background: #ccc;
    position: relative;
    padding: 15px;
    text-align: center;
    vertical-align: top;
  }
  .drop_finish {
    font-size: 18pt;
    font-weight: bold;
    display: inline-block;
    border-radius: 10px;
    background: pink;
    position: relative;
    padding: 15px;
    text-align: center;
    vertical-align: top;
  }
  .drag_finish {
    opacity: 0.01;
  }
  .drag {
    color: #fff;
    cursor: move;
    background: #777;
    border-right: 2px solid #555;
    border-bottom: 2px solid #555;
  }
  .drop {
    background: #eee;
    border-top: 2px solid #ccc;
    border-left: 2px solid #ccc;
  }
  .fullscreenMask {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    background: gray !important;
  }
</style>

<script>
  import draggable from 'vuedraggable'
  import 'csshake'

  export default {
    data () {
      return {
        msg: '欢迎来到拼古诗游戏',
        targetword: '?',
        start_class: '',
        target_class: 'drop',
        showFullscreenMask: false,
        poems: [
          [
            ['白', '日', '依', '山', '尽'],
            ['黄', '河', '入', '海', '流'],
            ['欲', '穷', '千', '里', '目'],
            ['更', '上', '一', '层', '楼'],
          ], [
            ['空', '山', '不', '见', '人'],
            ['但', '闻', '人', '语', '响'],
            ['返', '景', '入', '深', '林'],
            ['复', '照', '青', '苔', '上'],
          ],
        ],
        poemIndex: 0,
        sentenceIndex: 0,
        timeoutStart: false,
        poemAudioSrc: require('@/audio/poem1.m4a'),
      }
    },
    components: {
      draggable,
    },
    computed: {
      poembgstyle () {
        return {
          backgroundImage: 'url(' + require('@/image/poem_bg' + this.poemIndex + '.png') + ')',
        }
      },
      words () {
        return this.poems[this.poemIndex][this.sentenceIndex]
      },
      targetindex () {
        if (this.sentenceIndex <= this.poems[this.poemIndex].length) {
          return Math.floor(Math.random() * this.words.length)
          return 0
        }
      },
      dragword () {
        if (this.sentenceIndex <= this.poems[this.poemIndex].length) {
          return this.words[this.targetindex]
        } else {
          return null
        }
      },
    },
    methods: {
      onMove ({relatedContext, draggedContext}) {
        if (draggedContext.index !== 0 || this.timeoutStart) {
          return false // cancel move
        }

        if (relatedContext.index - 2 === this.targetindex) {
          this.targetword = this.dragword
          this.target_class = 'drop_finish shake-slow shake-constant'
          this.start_class = 'drag_finish'
          var that = this
          this.timeoutStart = true
          setTimeout(() => {
            that.target_class = 'drop_finish'
            that.showFullscreenMask = true
          }, 1000)

          setTimeout(() => {
            that.showFullscreenMask = false
            if (that.sentenceIndex < that.poems[that.poemIndex].length - 1) {
              that.sentenceIndex += 1
            } else {
              // 一首诗结束
              if (that.poemIndex < that.poems.length - 1) {
                that.poemIndex += 1
                that.sentenceIndex = 0
                that.$refs.poem.src = require('@/audio/poem' + (that.poemIndex + 1) + '.m4a')
                that.playPoemAudio()
              } else {
                // 诗词训练完成
                that.$refs.poem.pause()
              }
            }
            that.targetword = '?'
            that.target_class = 'drop'
            that.start_class = ''
            that.timeoutStart = false
          }, 4000)
        }
        return false
      },
      async playPoemAudio () {
        try {
          this.$refs.poem.load()
          await this.$refs.poem.play()
        } catch (error) {
          console.log('play audio error:' + error)
          // some browser requires the user explicitly start media play,eg: Safari
          let handler = () => {
            document.removeEventListener('touchstart', handler)
            this.$refs.poem.play()
          }
          document.addEventListener('touchstart', handler)
        }
      },
      reset () {
        this.targetword = '?'
        this.start_class = ''
        this.target_class = 'drop'
        this.showFullscreenMask = false
        this.poemIndex = 0
        this.sentenceIndex = 0
        this.timeoutStart = false
      },
    },
    mounted () {
      document.addEventListener('deviceready', () => {
        window.screen.orientation.lock('landscape')
        this.reset()
        this.playPoemAudio()
      })
    },
    beforeDestroy () {
      this.$refs.poem.pause()
    }
  }
</script>
