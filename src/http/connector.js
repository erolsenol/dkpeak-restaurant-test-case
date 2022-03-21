import axios from "axios";
import { store } from "@/store";
import { UNAUTHORIZED } from "http-status-codes";

const TIMEOUT = 60000;
const AUTHORIZATION_HEADER_KEY = "Authorization";

export default class Connector {
  constructor(BASE_URL) {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
    });
    this._401interceptor = null;
    this.isAlreadyFetchingAccessToken = false;
    this.subscribers = [];

    this.unmount401Interceptor();
    this.mount401Interceptor();
    this.mountRequestInterceptor();
  }

  create(BASE_URL) {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
    });
  }

  getClient() {
    return this;
  }

  setHeader(field, value) {
    this.client.defaults.headers.common[field] = value;
  }

  setAuthorizationHeader(header) {
    let token = header || `Bearer ${store.state.access_token}`;
    this.setHeader(AUTHORIZATION_HEADER_KEY, token);
  }

  setRemoveHeaders() {
    this.client.defaults.common = {};
    this.client.defaults.headers.common = {};
  }

  get(resource, config = {}) {
    return this.client.get(resource, config);
  }

  post(resource, data, config = {}) {
    return this.client.post(resource, data, config);
  }

  put(resource, data, config = {}) {
    return this.client.put(resource, data, config);
  }

  patch(resource, data, config = {}) {
    return this.client.patch(resource, data, config);
  }

  delete(resource, config = {}) {
    return this.client.delete(resource, config);
  }

  async customRequest(config) {
    return this.client(config);
  }

  async login(data) {
    return await this.client.post("v1/auth/local/signin", data, {});
  }

  async logout() {
    return this.client.get("v1/auth/logout");
  }

  async getRestaurants() {
    return this.client.get("v1/resturant");
  }

  async refreshToken() {
    return this.client.post("/v1/auth/refresh", null, {
      headers: {
        "Refresh-Token": store.state.refresh_token,
      },
    });
  }

  mountRequestInterceptor() {
    this.client.interceptors.request.use(
      function (config) {
        config.headers.Authorization = `Bearer ${store.state.access_token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  mount401Interceptor() {
    let pointer = this;
    this._401interceptor = this.client.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        console.log("error", error);
        if (!error.response) {
          return error;
        }
        const errorResponse = error.response;
        if (pointer.isTokenExpired(errorResponse))
          return pointer.resetTokenAndReattemptRequest(error);
        return Promise.reject(error);
      }
    );
  }

  unmount401Interceptor() {
    this.client.interceptors.response.eject(this._401interceptor);
  }

  isTokenExpired(errorResponse) {
    return (
      (errorResponse &&
        errorResponse.request &&
        errorResponse.request.status) === UNAUTHORIZED
    );
  }

  resetTokenAndReattemptRequest(error) {
    let pointer = this;
    try {
      const { response: errorResponse } = error;
      const refreshToken = store.state.refresh_token;
      if (!refreshToken) return Promise.reject(error);
      const retryOriginalRequest = new Promise((resolve) => {
        pointer.addSubscriber((access_token) => {
          errorResponse.config.headers.Authorization = "Bearer " + access_token;
          resolve(pointer.customRequest(errorResponse.config));
        });
      });
      if (!this.isAlreadyFetchingAccessToken) {
        this.isAlreadyFetchingAccessToken = true;
        store
          .dispatch("refreshToken")
          .then((newToken) => {
            pointer.onAccessTokenFetched(newToken);
          })
          .catch((e) => console.log("refresh error: ", e.toString()))
          .finally(() => (this.isAlreadyFetchingAccessToken = false));
      }
      return retryOriginalRequest;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  onAccessTokenFetched(access_token) {
    // retrying the requests one by one and empty the queue
    this.subscribers.forEach((callback) => callback(access_token));
    this.subscribers = [];
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }
}
