const SerialPort = require('serialport')
const port = new SerialPort('/dev/cu.usbmodem1201', {
  baudRate: 9600
})

var getPortsList = (callback) => {
  var portsList = [];

  SerialPort.list((err, ports) => {
    ports.forEach((port) => {
      portsList.push(port.comName);
    });

    callback(null, portsList);
  });
};

    