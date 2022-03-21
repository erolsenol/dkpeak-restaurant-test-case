import Service from "../service";
import { RESTAURANT } from "@/http/api/url";

const singleton = Symbol();
const singletonEnforcer = Symbol();

class RestaurantService extends Service {
  constructor(enforcer) {
    super(RESTAURANT);
    if (enforcer !== singletonEnforcer)
      throw new Error("Cannot construct Shifts Service RestService");
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new RestaurantService(singletonEnforcer);
    }
    return this[singleton];
  }

  getRestaurants() {
    return this._api_connector.get(RESTAURANT.uri().url);
  }

  saveRestaurant(payload) {
    return this._api_connector.post(RESTAURANT.uri().url, payload);
  }
}

export default RestaurantService;
