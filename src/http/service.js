import { DkpeakConnector } from "./clients";

/**
 *
 */
class Service {
  constructor() {
    this._api_connector = DkpeakConnector.getClient();
  }
}

export default Service;
