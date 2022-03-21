<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="8" md="6" lg="5">
        <v-text-field label="Name" v-model="name"></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="8" md="6" lg="5">
        <v-text-field label="Phone" v-model="phone"></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="4">
        <v-btn outlined @click="saveRestaurant"> Save Restaurant </v-btn>
      </v-col>
    </v-row>
    <SnackBar v-model="bar.value" :color="bar.color" :text="bar.text" />
  </v-container>
</template>

<script>
import SnackBar from "@/components/SnackBar";
export default {
  name: "RestaurantCreate",
  components: {
    SnackBar,
  },
  data() {
    return {
      name: null,
      phone: null,
      bar: {
        color: "red",
        text: "",
        value: false,
      },
    };
  },
  methods: {
    async saveRestaurant() {
      if (this.name && this.phone) {
        const response =
          await this.$serviceContext.restaurantService.saveRestaurant({
            name: this.name,
            phone: this.phone,
          });
        if (response.status === 201) {
          this.snackBarShow("success", `${response.data.name} created`);
        } else {
          this.snackBarShow("error", `could not be created`);
        }
        this.clearData();
      } else {
        console.log("name or phone not null");
      }
    },
    clearData() {
      this.name = null;
      this.phone = null;
    },
    snackBarShow(color, text) {
      this.bar = {
        color,
        text,
        value: true,
      };
    },
  },
};
</script>

<style></style>
