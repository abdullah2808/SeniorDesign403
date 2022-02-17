// Serial Information 
const express = require('express');
const cors = require('cors');
const axios = require('axios');
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

app.get("/test", (req, res) => {
    port.write("1");
    console.log("WRITE");
    parser.on('data', readSerialData);
    res.redirect("/dataTest");
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


app.get("/dataTest", (req, res) => {
  try {
    console.log("Test")
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

app.get('/process', function(req, res) {
  console.log(JSON.stringify(globalData))
  var config = {
    method: 'get',
    url: 'http://127.0.0.1:5000/process',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(globalData)
  };
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.send(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
});


function readSerialData(data) {
  var buff = data;
  var temp = JSON.parse(buff.toString());
  //var temp = buff.toString();
  globalData = temp;
  console.log(globalData);
}

