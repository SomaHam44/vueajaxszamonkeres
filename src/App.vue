<template>
  <div id="app">
    <nav>
      <router-link to="/paintings">Paintings</router-link>
      <router-link to="/">Statues</router-link>
    </nav>
    <hr/>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
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

nav {
  text-decoration: none;
  color: white;
}

nav a.router-link-exact-active {
  background-color: cadetblue;
}
</style>
