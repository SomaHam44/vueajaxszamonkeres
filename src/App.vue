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
              <button @click="deleteStatue(statue.id)">Törlés</button>
              <button @click="editStatue(statue.id)">Szerkesztés</button>
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
            <button @click="save">Mentés</button>
            <button @click="reset">Mégse</button>
          </td>
        </tr>       
        </tbody>      
    </table>
    
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      szerkeszto: false,
      uj: false,
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
    async deleteStatue(id) {
      let Response = await fetch(`http://127.0.0.1:8000/api/statues/${id}`, {
      method: 'DELETE'
      })
      console.log(Response)
      await this.betoltes()

    },
    async newStatue() {
      await fetch('http://127.0.0.1:8000/api/statues', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify(this.statue)
      })
      await this.betoltes()
      this.reset()
      this.szerkeszto = false
      this.uj = true

    },
    async saveStatue() {
     await fetch(`http://127.0.0.1:8000/api/statues/${this.statue.id}`, {
       method: 'PATCH',
       headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
       body: JSON.stringify(this.statue) 
     })
     await this.betoltes()
     this.reset()
     this.szerkeszto = false
     this.uj = false
    },
    async editStatue(id) {
      let Response = await fetch(`http://127.0.0.1:8000/api/statues/${id}`)
      let data = await Response.json()
      this.statue = {...data};
      this.szerkeszto = true
      this.uj = false
    },
    reset() {
      this.statue = {
        id: null,
        person: '',
        height: null,
        price: null
      }
      this.szerkeszto = false
    },
    save() {
      if (this.szerkeszto) {
        this.saveStatue()
      }
      else if (!this.uj) {
        this.newStatue()
      }
    },
  },
    mounted() {
      this.betoltes()
    }
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

table {
  margin-left: auto;
  margin-right: auto;
}

td {
  padding: 1em;
}
body {
  background-color: cornsilk;
}
button {
  margin-left: 1em;
}
</style>
