class RestUrl {
  constructor(service = "", endpoint, api_version = "v1") {
    this.api = [service, api_version, endpoint];
    this.api_uri = [];
  }

  get url() {
    let api_url = this.api.concat(this.api_uri).join("/");
    this.api_uri = [];
    return api_url;
  }

  uri(uri) {
    this.api_uri.push(uri);
    return this;
  }
}

export default RestUrl;
