<template>
  <div id="app">
   <Statues />
   <Paintings />
  </div>
</template>

<script>

import Statues from './components/Statues.vue'
import Paintings from './components/Paintings.vue'
export default {
  name: 'App',
  components: {
    Statues, Paintings
  },
  
  }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
