<template>
<v-container>
 
    <v-col cols="12" md="10">
      <v-data-table
      :headers="headers"
      :items="restaurants"
      :items-per-page="5"
      class="elevation-1"
      >
        <template v-slot:[`item.calories`]="{ item }">
           {{ item.calories }}
        </template>
         <template v-slot:[`item.phone`]="{ item }">
           {{ item.phone }}
        </template>
      </v-data-table>
    </v-col>
 
  </v-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Restaurant",
  data(){
    return {
      restaurants: [],
      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
        },
        { 
          text: 'Phone', 
          align: 'start', 
          value: 'phone' 
        },
      ],
    }
  },
  methods: {
    async fetchItems(){
      console.log("fetch Items restaurant")
      const accessToken = localStorage.getItem("access_token")
      if(accessToken) {
         const response = fetch('http://164.92.154.153:4001/v1/resturant', {
         method: 'GET',
             headers: {
               'Content-Type': 'application/json',
               'authorization': `Bearer ${JSON.parse(accessToken)}`
               },
        })
        this.restaurants = await response.json()
      }
    }
  },
  created(){
    this.fetchItems()
  }
}
</script>

<style>

</style>