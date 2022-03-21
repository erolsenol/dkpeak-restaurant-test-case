import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import AuthService from "@/http/api/services/auth";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    login: localStorage.getItem("login")
      ? JSON.parse(localStorage.getItem("login"))
      : false,
    access_token: localStorage.getItem("access_token") || null,
    refresh_token: localStorage.getItem("refresh_token") || null,
  },
  mutations: {
    setToken(state, token) {
      state.access_token = token.access_token;
      state.refresh_token = token.refresh_token;
    },
  },
  actions: {
    async Login({ commit }) {
      console.log("login request");
      const response = AuthService.login({ email: "", password: "" });
      console.log("response", response);
      commit("setToken", { access_token: true, refresh_token: true });
    },
    async RefreshToken({ commit }) {
      try {
        console.log("refresh token request");
      } catch {
        commit("setToken", { access_token: null, refresh_token: null });
        router.push({ name: "login" });
      }
    },
    async Logout({ commit }) {
      console.log("log out request");
      commit("setToken", { access_token: null, refresh_token: null });
      router.push({ name: "login" });
    },
  },
  getters: {
    isLogin(state) {
      return state.login;
    },
    getAccessToken(state) {
      return state.access_token;
    },
    getRefreshToken(state) {
      return state.refresh_token;
    },
  },
});
