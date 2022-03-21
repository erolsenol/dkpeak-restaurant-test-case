import DkpeakConnector from "@/http/api/connector/DkpeakConnector";
import { TokenUtils } from "@/utils/token.utils";
import { ACCEPTED, OK, UNAUTHORIZED } from "http-status-codes";
import { NO_REFRESH_TOKEN } from "../../../response/status/idenfit/";
import store from "@/store";

const AUTH_TOKEN_PREFIX = "Bearer ";

class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

class RefreshTokenNotFoundError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

class LogOutError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const AuthService = {
  /**
   * Login the user and store the access token to TokenService.
   * @returns access_token
   * @throws AuthenticationError
   **/
  login: async function (payload) {
    return new Promise((resolve, reject) => {
      DkpeakConnector.login(payload)
        .then(({ headers, data, status }) => {
          if (status === OK) {
            const token = headers.authorization.replace(AUTH_TOKEN_PREFIX, "");
            console.log("token", token);
            if (data) {
              console.log("data", data);
            }
          } else {
            reject(false);
          }
        })
        .catch((error) => {
          reject(new AuthenticationError(-401, error.toString()));
        });
    });
  },

  loginForPassword(payload) {
    DkpeakConnector.unmount401Interceptor();
    return new Promise((resolve, reject) => {
      DkpeakConnector.client
        .post("login", null, {
          body: {
            email: payload.email,
            password: payload.password,
          },
          headers: {
            from: "mobile",
          },
        })
        .then(({ headers, data, status }) => {
          if (status === OK) {
            const token = headers.authorization.replace(AUTH_TOKEN_PREFIX, "");
            if (data.webAccess) {
              this.loginOnFirebase(token)
                .then(() =>
                  resolve({
                    token: {
                      accessToken: token,
                      refreshToken: headers["refresh-token"],
                    },
                    user: data,
                  })
                )
                .catch(reject);
            } else {
              resolve({
                token: {
                  accessToken: token,
                  refreshToken: headers["refresh-token"],
                },
                user: data,
              });
            }
          } else {
            reject(false);
          }
        })
        .catch(reject)
        .finally(() => DkpeakConnector.mount401Interceptor());
    });
  },

  refreshToken: function () {
    return new Promise(function (resolve, reject) {
      if (store.state.authToken) {
        DkpeakConnector.setRemoveHeaders();
        DkpeakConnector.refreshToken()
          .then(({ headers, status, data }) => {
            if (status === OK) {
              if (data.error && data.error.code === NO_REFRESH_TOKEN) {
                TokenUtils.removeAllStorage();
                DkpeakConnector.setRemoveHeaders();
                DkpeakConnector.unmount401Interceptor();
                reject(
                  new RefreshTokenNotFoundError(
                    null,
                    "No refresh token found in idenfit"
                  )
                );
              }
            } else if (status === UNAUTHORIZED) {
              reject(
                new AuthenticationError(
                  null,
                  "No refresh token found in idenfit"
                )
              );
            } else if (status === ACCEPTED) {
              let accessToken = headers.authorization.substring(
                AUTH_TOKEN_PREFIX.length
              );
              // firebase logout and re-login
              AuthService.logOutOnFirebase()
                .then(() => {
                  AuthService.loginOnFirebase(accessToken)
                    .then(() => {
                      resolve(accessToken);
                    })
                    .catch((e) => reject(e));
                })
                .catch((e) => reject(e));
            }
          })
          .catch((error) =>
            reject(
              new AuthenticationError(
                error.response.status,
                error.response.data
              )
            )
          );
      } else {
        reject(new AuthenticationError(null, "Refresh token is removed"));
      }
    });
  },

  /**
   * Logout the current user by removing the token from storage.
   **/
  logout: function () {
    return new Promise(function (resolve, reject) {
      DkpeakConnector.logout()
        .then(({ status }) => {
          if (status === ACCEPTED) {
            AuthService.logOutOnFirebase()
              .then(() => {
                resolve(true);
              })
              .catch((e) => {
                reject(e);
              });
          } else {
            reject(status);
          }
        })
        .catch((e) => {
          reject(new LogOutError(-20002, e.toString()));
        });
    });
  },
};

export default AuthService;
