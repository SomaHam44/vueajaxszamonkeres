<template>
    <div>
   <h1>Paintings</h1>
    <table>
      <thead>
        <tr>
        <th>Cím</th>
        <th>Év</th>
        <th>Kiállítva (piros lap)</th>
        <th>Műveletek</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="painting in paintings" v-bind:key="painting.id">
            <td>{{ painting.title }}</td>
            <td>{{ painting.year }}</td>
            <td>{{ painting.on_display }}</td>
            <td>
              <button @click="deletePainting(painting.id)">Törlés</button>
              <button @click="editPainting(painting.id)">Szerkesztés</button>
            </td>
          </tr>
          <tr>
          <td>
            <input type="text"  v-model="painting.title">
          </td>
          <td>
            <input type="number"  v-model="painting.year">
          </td>
          <td>
            <input type="checkbox"  v-model="painting.on_display">
          </td>
          <td>
            <button v-if="mod_new" @click="newPainting" :disabled="saving">Létrehozás</button>
            <button v-if="!mod_new" @click="savePainting" :disabled="saving">Mentés</button>
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
    painting: {
        id: null,
        title: '',
        year: null,
        on_display: false
      },
        paintings: []
    }
  },
  methods: {
    async betoltes() {
      let Response = await fetch('http://127.0.0.1:8000/api/paintings')
      let adat = await Response.json()
      this.paintings = adat

    },
    async deletePainting(id) {
      let Response = await fetch(`http://127.0.0.1:8000/api/paintings/${id}`, {
      method: 'DELETE'
      })
      console.log(Response)
      await this.betoltes()

    },
    async newPainting() {
       this.saving='disabled'
      await fetch('http://127.0.0.1:8000/api/paintings', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify(this.painting)
      })
      await this.betoltes()
      this.saving=false
      this.reset()
    

    },
    async saveStatue() {
       this.saving='disabled'
     await fetch(`http://127.0.0.1:8000/api/paintings/${this.painting.id}`, {
       method: 'PATCH',
       headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
       body: JSON.stringify(this.painting) 
     })
     await this.betoltes()
     this.saving=false
     this.reset()
    },
    async editStatue(id) {
      let Response = await fetch(`http://127.0.0.1:8000/api/paintings/${id}`)
      let data = await Response.json()
      this.painting = {...data};
      this.mod_new = false
    },
    cancelEdit() {
      this.reset()
    },
    reset() {
      this.painting = {
        id: null,
        title: '',
        year: null,
        on_display: false
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