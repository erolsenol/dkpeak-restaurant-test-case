<template>
  <v-col cols="10">
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="5"
      show-expand
      :single-expand="true"
      class="elevation-1"
      no-data-text="You do not have an order"
    >
      <template v-slot:[`item.number`]="{ item }">
        {{ item.number }}
      </template>
      <template v-slot:[`item.resturant`]="{ item }">
        {{ item.resturant.name }}
      </template>
      <template v-slot:expanded-item="{ item }">
        <v-data-table
          :headers="itemHeaders"
          :items="item.items"
          class="elevation-1"
          :calculate-widths="true"
        >
          <template v-slot:[`order.name`]="{ order }">
            {{ order.name }}
          </template>
          <template v-slot:[`order.price`]="{ order }">
            {{ order.price }}
          </template>
          <template v-slot:[`order.description`]="{ order }">
            {{ order.description }}
          </template>
        </v-data-table>
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "OrderList",
  data() {
    return {
      orders: [],
      headers: [
        {
          text: "Number",
          align: "start",
          value: "number",
        },
        {
          text: "Restaurant Name",
          align: "start",
          value: "resturant",
        },
        { text: "", value: "data-table-expand" },
      ],
      itemHeaders: [
        {
          text: "Order Name",
          align: "start",
          value: "name",
        },
        {
          text: "Order Price",
          align: "start",
          value: "price",
        },
        { text: "Description", value: "description" },
      ],
    };
  },
  methods: {
    async fetchItems() {
      const response = await this.$serviceContext.userService.getUserOrders();
      if (response && response.data) {
        this.orders = response.data;
      } else {
        console.log("Orders fetch error");
      }
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style></style>
