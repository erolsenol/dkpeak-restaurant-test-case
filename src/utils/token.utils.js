const VUE_APP_TOKEN_KEY = process.env.VUE_APP_ACCESS_TOKEN_KEY;
const VUE_APP_REFRESH_TOKEN_KEY = process.env.VUE_APP_REFRESH_TOKEN_KEY;

const TokenUtils = {
  getToken() {
    return localStorage.getItem(VUE_APP_TOKEN_KEY);
  },
  saveToken(accessToken) {
    let token = accessToken.replace("Bearer ", "");
    localStorage.setItem(VUE_APP_TOKEN_KEY, token);
  },
  removeToken() {
    localStorage.removeItem(VUE_APP_TOKEN_KEY);
  },
  getRefreshToken() {
    return localStorage.getItem(VUE_APP_REFRESH_TOKEN_KEY);
  },
  removeAllStorage() {
    localStorage.clear();
    sessionStorage.clear();
  },
};

export { TokenUtils };
