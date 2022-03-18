<template>
  <v-container>
     <CoreToolbar />
      <router-view />
    </v-container>
</template>

<script>
import CoreToolbar from "@/components/CoreToolbar"
export default {
    components:{ CoreToolbar }
}
</script>

<style>

</style>