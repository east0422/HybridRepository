<template>
  <div id="app">
    <Poem></Poem>
  </div>
</template>

<script>
  import Poem from './components/Poem'

  export default {
    name: 'App',
    components: {
      Poem,
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
