'use strict';

var _mg = require('./mg');

var fetch = require('node-fetch');

console.log('fetch');
console.log(fetch);

var appid = "goose";
var appkey = "5vendgEVsO1ivas";
var appsecret = "DyPBQ8TVzuE4mqWTtyuSXrFbE";

console.log("HELLO");
var netpie = new _mg.NetpieOAuth({ appid: appid, appkey: appkey, appsecret: appsecret });
console.log("NETPIE", netpie);

netpie.OAuthGetRequestToken().then(function (text) {
  // let accesstoken = netpie.extract(text);
  console.log("text", text);
  // console.log(accesstoken);
  // var hkey = accesstoken.oauth_token_secret + '&' + appsecret;
  // var mqttusername = appkey + '%' + Math.floor(Date.now() / 1000);
  // var mqttpassword = CryptoJS.HmacSHA1(accesstoken.oauth_token + '%' +
  //   mqttusername, hkey).toString(CryptoJS.enc.Base64);
  // var b = accesstoken.endpoint.substr(6).split(':');
  // // console.log(hkey, mqttusername, b);
  // let command_t = `mosquitto_sub -t "/${appid}/gearname/#" -h gb.netpie.io -i ${accesstoken.oauth_token} -u "${mqttusername}" -P "${mqttpassword}" -d`;
  // console.log(command_t);
}).catch(function (ex) {

  console.log("ex", ex);
});