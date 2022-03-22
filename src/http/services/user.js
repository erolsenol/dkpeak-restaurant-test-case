import Service from "../service";
import { USER } from "@/http/api/url";

const singleton = Symbol();
const singletonEnforcer = Symbol();

class UserService extends Service {
  constructor(enforcer) {
    super(USER);
    if (enforcer !== singletonEnforcer)
      throw new Error("Cannot construct Shifts Service RestService");
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new UserService(singletonEnforcer);
    }
    return this[singleton];
  }

  getUserOrders() {
    return this._api_connector.get(USER.uri("orders").url);
  }

  saveUserOrder(payload) {
    return this._api_connector.post(USER.uri("order").url, payload);
  }
}

export default UserService;
