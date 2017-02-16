let localStorage = require("node-localstorage").JSONStorage


class IStorage {
  _storage = {}

  constructor () {
    console.log("HELLO")
  }

  get (k) {

    console.log("GET>>>", this._storage);
    return this._storage[k];
  }

  set (k, v) {
    this._storage[k] = v;
  }

  commit () {
  }

}

var keyMirror = require('key-mirror');

export class CMMC_Storage extends IStorage {
  _storage_driver = null

  static STATE = keyMirror({
    STATE_REQ_TOKEN: null,
    STATE_ACCESS_TOKEN: null,
  });

  static KEY_STATE = 0x01
  static KEY_OAUTH_REQUEST_TOKEN = 0x02
  static KEY_OAUTH_REQUEST_TOKEN_SECRET = 0x03
  static KEY_ACCESS_TOKEN = 0x04
  static KEY_ACCESS_TOKEN_SECRET = 0x05
  static KEY_REVOKE_TOKEN = 0x06
  static KEY_ENDPOINT = 0x07
  static KEY_APP_KEY = 0x08
  static KEY_APP_SECRET = 0x09
  static KEY_VERIFIER = 0x10

  constructor (name = 'tmp', open_now=true) {
    super();
    this._storage_driver = new localStorage('./' + name);
    if (open_now) {
      this.load();
    }
  }

  load() {
    this._storage = this._storage_driver.getItem("mg_cached");
  }

  commit () {
    this._storage_driver.setItem("mg_cached", this._storage);
  }
}