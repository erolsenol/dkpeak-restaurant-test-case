import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
// import AuthService from "@/http/api/services/auth";
import { DkpeakConnector } from "@/http/clients";

const TOKEN_KEY = process.env.VUE_APP_ACCESS_TOKEN_KEY || "access_token";
const REFRESH_TOKEN_KEY =
  process.env.VUE_APP_REFRESH_TOKEN_KEY || "refresh_token";

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
      state.login = token.login;
    },
  },
  actions: {
    async Login({ commit }, data) {
      console.log("login request body", data);
      const response = await DkpeakConnector.login(data);
      console.log("response", response);
      if (
        response.status === 200 &&
        response.data &&
        response.data.access_token &&
        response.data.refresh_token
      ) {
        localStorage.setItem(TOKEN_KEY, response.data.access_token);
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh_token);
        localStorage.setItem("login", JSON.stringify(true));
        commit("setToken", {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          login: true,
        });
        DkpeakConnector.mount401Interceptor();
        DkpeakConnector.setAuthorizationHeader();
        router.push({ name: "restaurant" });
      }
    },
    async RefreshToken({ commit }) {
      try {
        const response = await DkpeakConnector.refreshToken();
        console.log("refresh token response", response);
      } catch {
        commit("setToken", {
          access_token: null,
          refresh_token: null,
          login: false,
        });
        router.push({ name: "login" });
      }
    },
    async Logout({ commit }) {
      const response = await DkpeakConnector.logout();
      console.log("response", response);
      if (response.data) {
        //logout completed
        console.log("logout completed");
      }
      DkpeakConnector.setRemoveHeaders();
      localStorage.setItem(TOKEN_KEY, "");
      localStorage.setItem(REFRESH_TOKEN_KEY, "");
      localStorage.setItem("login", JSON.stringify(false));
      commit("setToken", {
        access_token: null,
        refresh_token: null,
        login: false,
      });
      router.push({ name: "sign_in" });
    },
  },
  getters: {
    isLogin(state) {
      return (
        state.login &&
        state.access_token !== null &&
        state.refresh_token !== null
      );
    },
    getAccessToken(state) {
      return state.access_token;
    },
    getRefreshToken(state) {
      return state.refresh_token;
    },
  },
});
