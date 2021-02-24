const Obniz = require("obniz");
const Env = require('dotenv').config();

var obniz = new Obniz(process.env.PASSWORD);
obniz.onconnect = async function () {
  obniz.display.clear();
  var tempsens = obniz.wired("LM35DZ", { gnd: 7, output: 8, vcc: 9 });
  var temp = await tempsens.getWait();
  console.log(temp);
  obniz.display.print(temp);
}