.<template>
    <div>
   <h1>Statues</h1>
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
            <button v-if="mod_new" @click="newStatue" :disabled="saving">Létrehozás</button>
            <button v-if="!mod_new" @click="saveStatue" :disabled="saving">Mentés</button>
            <button v-if="!mod_new" @click="cancelEdit" :disabled="saving">Mégse</button>
          </td>
        </tr>       
        </tbody>      
    </table>
    </div>
</template>

<script>
export default {
    data() {
    return {
     mod_new: true, 
     saving: false,
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
       this.saving='disabled'
      await fetch('http://127.0.0.1:8000/api/statues', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify(this.statue)
      })
      await this.betoltes()
      this.saving=false
      this.reset()
    

    },
    async saveStatue() {
       this.saving='disabled'
     await fetch(`http://127.0.0.1:8000/api/statues/${this.statue.id}`, {
       method: 'PATCH',
       headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
       body: JSON.stringify(this.statue) 
     })
     await this.betoltes()
     this.saving=false
     this.reset()
    },
    async editStatue(id) {
      let Response = await fetch(`http://127.0.0.1:8000/api/statues/${id}`)
      let data = await Response.json()
      this.statue = {...data};
      this.mod_new = false
    },
    cancelEdit() {
      this.reset()
    },
    reset() {
      this.statue = {
        id: null,
        person: '',
        height: null,
        price: null
      }
      this.mod_new = true
    },
  },
    mounted() {
      this.betoltes()
    }

}
</script>

<style>
table {
  margin-left: auto;
  margin-right: auto;
  border: 1px solid blue;
  border-collapse: collapse;
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