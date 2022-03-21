const TOKEN_KEY = process.env.VUE_APP_ACCESS_TOKEN_KEY;
const REFRESH_TOKEN_KEY = process.env.VUE_APP_REFRESH_TOKEN_KEY;

const TokenUtils = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  saveToken(accessToken) {
    let token = accessToken.replace("Bearer ", "");
    localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  removeAllStorage() {
    localStorage.clear();
    sessionStorage.clear();
  },
};

export { TokenUtils };
