<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:[`item.name`]="{ item }">
            {{ item.name }}
          </template>
          <template v-slot:[`item.price`]="{ item }">
            {{ item.price }}
          </template>
          <template v-slot:[`item.description`]="{ item }">
            {{ item.description }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Item",
  data() {
    return {
      items: [],
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        {
          text: "Price",
          align: "start",
          value: "price",
        },
        {
          text: "Description",
          align: "start",
          value: "description",
        },
      ],
    };
  },
  methods: {
    async fetchItems() {
      const response = await this.$serviceContext.itemService.getItems();
      if (response && response.data) {
        this.items = response.data;
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
