<template>
 <v-container fluid class="max-height">
     <CoreToolbar />
     <v-row justify="center" class="max-height">
       <v-col cols="2">
         <NavigationDrawers />
       </v-col>
      <router-view />
      </v-row>
      </v-container>
</template>

<script>
import CoreToolbar from "@/components/CoreToolbar"
import NavigationDrawers from "@/components/NavigationDrawers"
export default {
    components:{ CoreToolbar, NavigationDrawers }
}
</script>

<style>
.max-height {
  min-height: 100%;
}
</style>