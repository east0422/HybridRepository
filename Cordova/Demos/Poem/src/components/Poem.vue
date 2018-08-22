<template>
  <div>
    <div class="poem-display" :style="bg_image_class">
      <span class="poem-title">{{msg}}</span>
      <Container @drop="handleDrop" :orientation="'horizontal'" :drag-begin-delay='0'>
        <Draggable style="padding: 10px 30px">
          <div :class="start_class">{{draggable}}</div>
        </Draggable>
        <Draggable style="padding: 10px"
          v-for="(word, index) in poems[which_poem][which_sentence]"
          :key="index">
          <div :class="target_class">
            <span v-if="index === target_index">{{poem_target}}</span>
            <span v-if="index !== target_index">{{word}}</span>
          </div>
        </Draggable>
      </Container>
      <div :class="bg_class"></div>
    </div>
  </div>
</template>

<style>
  .poem-display {
    height: 100%;
    width: 100%;
    text-align: center;
  }
  .poem-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: blue;
    padding: 30px 0;
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
  import {Container, Draggable} from 'vue-smooth-dnd'
  import 'csshake'

  export default {
    data () {
      return {
        msg: '欢迎来到拼古诗游戏',
        poem_target: '?',
        start_class: 'drag',
        target_class: 'drop',
        bg_class: '',
        poems: [['白日依山尽', '黄河入海流', '欲穷千里目', '更上一层楼'],
          ['空山不见人', '但闻人语响', '返景入深林', '复照青苔上']],
        which_poem: 0,
        which_sentence: 0,
      }
    },
    components: {
      Container,
      Draggable,
    },
    computed: {
      bg_image_class () {
        return {
          backgroundImage: 'url(' + require('@/image/poem_bg' + this.which_poem + '.png') + ')',
        }
      },
      sentence_per_peom () {
        return this.poems[this.which_poem].length
      },
      poem_sentence_len () {
        if (this.which_sentence <= this.sentence_per_peom) {
          return this.poems[this.which_poem][this.which_sentence].length
        } else {
          return 0
        }
      },
      target_index () {
        return Math.floor(Math.random() * this.poem_sentence_len)
      },
      draggable () {
        if (this.which_sentence <= this.sentence_per_peom) {
          return this.poems[this.which_poem][this.which_sentence][this.target_index]
        } else {
          return null
        }
      },
    },
    methods: {
      handleDrop (index) {
        if (index.addedIndex - 1 === this.target_index || index.addedIndex === this.target_index) {
          this.poem_target = this.draggable
          this.target_class = 'drop_finish shake-slow shake-constant'
          this.start_class = 'drag drag_finish'
          var that = this
          setTimeout(() => {
            that.target_class = 'drop_finish'
            that.bg_class = 'fullscreenMask'
          }, 1000)
          setTimeout(() => {
            that.bg_class = ''
            if (that.which_sentence < that.sentence_per_peom - 1) {
              that.which_sentence += 1
            } else {
              // 一首诗结束
              if (that.which_poem < that.poems.length - 1) {
                that.which_poem += 1
                that.which_sentence = 0
              }
            }
            that.poem_target = '?'
            that.target_class = 'drop'
            that.start_class = 'drag'
          }, 4000)
        }
      },
    },
  }
</script>
