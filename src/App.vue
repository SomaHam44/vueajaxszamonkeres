<template>
  <div id="app">
    <table>
      <thead>
        <tr>
        <th>Személy</th>
        <th>Magasság</th>
        <th>Ár</th>
        <th>Műveletek</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="statue in statues" v-bind:key="statue.id">
            <td>{{ statue.person }}</td>
            <td>{{ statue.height }}</td>
            <td>{{ statue.price }}</td>
            <td>
              <button>Törlés</button>
              <button>Szerkesztés</button>
            </td>
          </tr>
          <tr>
          <td>
            <input type="text"  v-model="statue.person">
          </td>
          <td>
            <input type="number"  v-model="statue.height">
          </td>
          <td>
            <input type="number"  v-model="statue.price">
          </td>
          <td>
            <button>Mentés</button>
            <button>Mégse</button>
          </td>
        </tr>       
        </tbody>      
    </table>
    <button @click="betoltes">Betöltés</button>
    
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  },
  data() {
    return {
     statue: {
        id: null,
        person: '',
        height: null,
        price: null
      },
        statues: []
    }
  },
  methods: {
    async betoltes() {
      let Response = await fetch('http://127.0.0.1:8000/api/statues')
      let adat = await Response.json()
      this.statues = adat

    },
    mounted() {
      this.betoltes()
    }
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
