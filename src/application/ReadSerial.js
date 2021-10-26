const SerialPort = require('serialport')
const port = new SerialPort('/dev/cu.usbmodem1201', {
  baudRate: 9600
})

port.on('readable', function () {
    console.log('Data:', port.read())
  })

