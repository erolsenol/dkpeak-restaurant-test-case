import Service from "../service";
import { ITEM } from "@/http/api/url";

const singleton = Symbol();
const singletonEnforcer = Symbol();

class ItemService extends Service {
  constructor(enforcer) {
    super(ITEM);
    if (enforcer !== singletonEnforcer)
      throw new Error("Cannot construct Shifts Service RestService");
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ItemService(singletonEnforcer);
    }
    return this[singleton];
  }

  getItems() {
    return this._api_connector.get(ITEM.uri().url);
  }

  saveItem(payload) {
    return this._api_connector.post(ITEM.uri().url, payload);
  }
}

export default ItemService;
