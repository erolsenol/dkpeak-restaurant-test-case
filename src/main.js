import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { store } from "@/store";
import ServiceContext from "@/http/services/servicesContect";

Vue.config.productionTip = false;

ServiceContext({ Vue });
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
