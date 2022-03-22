<template>
  <v-row>
    <v-col cols="12">
      <v-row align="center" justify="center" class="pt-5">
        <v-col cols="8" md="6" lg="5">
          <v-select
            :items="restaurants"
            label="Restaurant"
            item-text="text"
            item-value="value"
            v-model="order.resturantId"
          ></v-select>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="8" md="6" lg="5">
          <v-select
            :items="items"
            label="Items"
            item-text="text"
            item-value="value"
            v-model="order.items"
            multiple
          ></v-select>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="4">
          <v-btn outlined @click="saveOrder"> Save Order </v-btn>
        </v-col>
        <SnackBar v-model="bar.value" :color="bar.color" :text="bar.text" />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import SnackBar from "@/components/SnackBar";
export default {
  name: "OrderCreate",
  components: {
    SnackBar,
  },
  data() {
    return {
      restaurants: [],
      items: [],
      order: {
        resturantId: null,
        items: [],
      },
      bar: {
        color: "red",
        text: "",
        value: false,
      },
    };
  },
  methods: {
    async saveOrder() {
      if (this.order.resturantId && this.order.items.length > 0) {
        const response = await this.$serviceContext.userService.saveUserOrder(
          this.order
        );
        if (response.status === 200) {
          this.snackBarShow("success", `Order created`);
        } else {
          this.snackBarShow("error", `could not be created`);
        }
        this.clearData();
      } else {
        this.snackBarShow("error", `Restaurant or items not null`);
        console.log("Restaurant or items not null");
      }
    },
    clearData() {
      this.order = {
        resturantId: null,
        items: [],
      };
    },
    snackBarShow(color, text) {
      this.bar = {
        color,
        text,
        value: true,
      };
    },
    async fetchRestaurants() {
      const response =
        await this.$serviceContext.restaurantService.getRestaurants();
      if (response && response.data) {
        this.restaurants = response.data.map((item) => {
          return { value: item.id, text: item.name };
        });
      }
    },
    async fetchItems() {
      const response = await this.$serviceContext.itemService.getItems();
      if (response && response.data) {
        this.items = response.data.map((item) => {
          return { value: item.id, text: item.name };
        });
      }
    },
  },
  created() {
    this.fetchRestaurants();
    this.fetchItems();
  },
};
</script>

<style></style>
