import {
  NetpieAuth
} from './mg'

import {CMMC_Storage} from './storage'

let fetch = require('node-fetch');
let CryptoJS = require("crypto-js");

const appid = "Goose";
const appkey = "B245qf9iTE7tz00";
const appsecret = "LSOMysLxZSKh6CYVarL1IDPkK";

let netpie = new NetpieAuth({appid: appid, appkey: appkey, appsecret: appsecret});

let compute_hkey = (access_token_secret, app_secret) => `${access_token_secret}&${app_secret}`
let compute_mqtt_password = (access_token, mqttusername, hkey) =>
  CryptoJS.HmacSHA1(`${access_token}%${mqttusername}`, hkey).toString(CryptoJS.enc.Base64);
let compute_revoke_code = (access_token, hkey) =>
  CryptoJS.HmacSHA1(access_token, hkey).toString(CryptoJS.enc.Base64).replace(/\//g, '_');

netpie.getToken().then((token) => {
  let {oauth_token, oauth_token_secret, endpoint, flag} = token
  // let hkey = appsecret;//(oauth_token_secret, appsecret)
  let hkey = compute_hkey(oauth_token, appsecret)
  // let mqttusername = `${appkey}%${Math.floor(Date.now()/1000)}`;
  let mqttusername = `${appkey}`;
  let mqttpassword = compute_mqtt_password(oauth_token, mqttusername, hkey)
  let revoke_code = compute_revoke_code(oauth_token, hkey)

  let command_t = `mosquitto_sub -t "/${appid}/gearname/#" -h gb.netpie.io -i ${oauth_token} -u "${mqttusername}" -P "${mqttpassword}" -d`;

  console.log(`revoke code = ${revoke_code}`)
  console.log(`${command_t}`)
}).catch(function (ex) {
  console.log("CMMC_ERROR:>>", ex);
});

