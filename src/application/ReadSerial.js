const SerialPort = require('serialport')
const Delimiter = require('@serialport/parser-delimiter')
var port = new SerialPort('/dev/cu.usbmodem11301', {
  baudRate: 9600
})
var globalData;

function readSerialData(data) {
  var buff = data;
  var temp = JSON.parse(buff.toString());

  globalData = temp;
  console.log(globalData);
}

const parser = port.pipe(new Delimiter({ delimiter: '|' }))
parser.on('data', readSerialData)

  


    