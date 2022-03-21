<template>
  <v-snackbar v-model="innerValue" :color="color" :timeout="timeout">
    {{ text }}
  </v-snackbar>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
    color: { type: String, required: false, default: () => "red" },
    value: { type: Boolean },
  },
  data() {
    return {
      timeout: 5000,
    };
  },
  computed: {
    innerValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style></style>
