<template>
  <v-row>
    <v-col>
      <v-row align="center" justify="center" class="pt-3">
        <v-col cols="8" md="6" lg="5">
          <v-text-field label="Name" v-model="name"></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="8" md="6" lg="5">
          <v-text-field
            label="Price"
            type="number"
            hide-spin-buttons
            v-model="price"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="8" md="6" lg="5">
          <v-text-field
            label="Description"
            v-model="description"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="4">
          <v-btn outlined @click="saveRestaurant"> Save Item </v-btn>
        </v-col>
      </v-row>
      <SnackBar v-model="bar.value" :color="bar.color" :text="bar.text" />
    </v-col>
  </v-row>
</template>

<script>
import SnackBar from "@/components/SnackBar";
export default {
  name: "ItemCreate",
  components: {
    SnackBar,
  },
  data() {
    return {
      name: null,
      description: null,
      price: null,
      bar: {
        color: "red",
        text: "",
        value: false,
      },
    };
  },
  methods: {
    async saveRestaurant() {
      if (this.name && this.price) {
        const response = await this.$serviceContext.itemService.saveItem({
          name: this.name,
          price: this.price,
          description: this.description,
        });
        console.log("response", response);
        if (response.status === 201) {
          this.snackBarShow("success", `${response.data.name} created`);
        } else {
          this.snackBarShow("error", `could not be created`);
        }
        this.clearData();
      } else {
        console.log("name or price not null");
      }
    },
    clearData() {
      this.name = null;
      this.description = null;
      this.price = null;
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
