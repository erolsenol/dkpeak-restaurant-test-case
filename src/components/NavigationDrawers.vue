<template>
  <v-card class="mx-auto navigation-drawers">
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-group
        class="py-0"
        sub-group
        v-for="({ name, cruds }, i) in menus"
        :key="i"
      >
        <template v-slot:activator>
          <v-list-item-content class="py-0 px-0">
            <v-list-item-title>{{ name }}</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="([title, icon, link], i) in cruds"
          :key="i"
          @click="pageGo(link)"
        >
          <v-list-item-title v-text="title"></v-list-item-title>
          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          name: "Restaurant",
          cruds: [
            ["List", "mdi-view-list-outline", "restaurant_list"],
            ["Create", "mdi-plus-outline", "restaurant_create"],
          ],
        },
        {
          name: "Item",
          cruds: [
            ["List", "mdi-view-list-outline", "items_list"],
            ["Create", "mdi-plus-outline", "item_create"],
          ],
        },
      ],
    };
  },
  methods: {
    pageGo(link) {
      if (this.$router.history.current.name !== link)
        this.$router.push({ name: link });
    },
  },
};
</script>

<style scoped>
.navigation-drawers {
  height: 100%;
}
</style>
