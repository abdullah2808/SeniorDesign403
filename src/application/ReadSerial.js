// Serial Information 
const express = require('express');
const cors = require('cors');
const app = express();
const SerialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter')

app.use(cors());
app.listen(3001, () =>
  console.log('Example app listening on port 3000!'),
);


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
  const parser = port.pipe(new Delimiter({ delimiter: '|' }))


app.get("/ping", (req, res) => {
      //port.write("1");
      parser.on('data', readSerialData);
      res.redirect("/data");
  });
});

app.get("/data", (req, res) => {
  try {
    console.log("Ping")
    res.status(200).json({
      data: globalData
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});


function readSerialData(data) {
  var buff = data;
  var temp = JSON.parse(buff.toString());

  globalData = temp;
  console.log(globalData);
}