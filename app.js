const Obniz = require("obniz");
const Env = require('dotenv').config();
const fs = require('fs');
const jsonObject = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
const result = {};
var masterData = [];
var express = require("express");
var app = express();

var obniz = new Obniz(process.env.PASSWORD);
obniz.onconnect = async function () {
  obniz.display.clear();
  var tempsens = obniz.wired("LM35DZ", { gnd: 7, output: 8, vcc: 9 });
  var temp = await tempsens.getWait();
  console.log(temp);
  obniz.display.print(temp);
  var module = obniz.wired('IRModule', { vcc: 0, send: 1, recv: 2, gnd: 3 });

  jsonObject.Data.forEach((obj) => {
    result[obj.Data] = obj;
    console.log(obj.turnOn, obj.turnOff)
    module.send(obj.turnOn)
    module.duration = 10000;
    module.send(obj.turnOff)
  });
}
