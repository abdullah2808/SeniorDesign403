const SerialPort = require('serialport')
const port = new SerialPort('/dev/tty-usbserial1', {
  baudRate: 9600
})

port.on('readable', function () {
    console.log('Data:', port.read())
  })

