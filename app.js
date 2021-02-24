const Obniz = require("obniz");
const Env = require('dotenv').config();

var obniz = new Obniz(process.env.PASSWORD);
obniz.onconnect = async function () {
  obniz.display.clear();
  obniz.display.print("Hello!");
}