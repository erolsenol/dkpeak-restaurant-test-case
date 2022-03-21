import axios from "axios";

const token = localStorage.getItem("access_token");

const instance = axios.create({
  baseURL: process.env.VUE_APP_URL_API,
});
