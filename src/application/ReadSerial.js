// Serial Information 

var SerialPort = require('serialport')
var Delimiter = require('@serialport/parser-delimiter')
var arduinoPort;
var globalData;


SerialPort.list().then(function(ports){
  ports.forEach(function(port){
    console.log("Port: ", port);
    if(port.vendorId == 2341)
    {
      console.log("Found Arduino");
      arduinoPort = port.path;

    }
  })
}).then(() => {
  var port = new SerialPort(arduinoPort, {
    baudRate: 9600
  })

  function readSerialData(data) {
    var buff = data;
    var temp = JSON.parse(buff.toString());
  
    globalData = temp;
    console.log(globalData);
  }
  
  const parser = port.pipe(new Delimiter({ delimiter: '|' }))
  parser.on('data', readSerialData)
  })
