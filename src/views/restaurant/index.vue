<template>
  <v-container>
    <v-row>
      <v-col cols="12">
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
    </v-row>
  </v-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Restaurant",
  data() {
    return {
      restaurants: [],
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        {
          text: "Phone",
          align: "start",
          value: "phone",
        },
      ],
    };
  },
  methods: {
    async fetchItems() {
      const response =
        await this.$serviceContext.restaurantService.getRestaurants();
      if (response && response.data) {
        this.restaurants = response.data;
      } else {
        console.log("restaurant fetch error");
      }
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style></style>
