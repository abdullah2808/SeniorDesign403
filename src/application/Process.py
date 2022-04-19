import numpy as np
import json
import geopy.distance
import warnings
import time
import sys
import serial
from serial import Serial
import serial.tools.list_ports
from flask import Flask
from flask import request
from flask_cors import CORS

## Base frequency for Calculations
frequency = 433.0

#Finding Arduino
arduino_ports = [
    p.device
    for p in serial.tools.list_ports.comports()
    if '2341' in p.hwid # may need tweaking to match new arduinos
]
if not arduino_ports:
    raise IOError("No Arduino found")
if len(arduino_ports) > 1:
    warnings.warn('Multiple Arduinos found - using the first')
print(arduino_ports)
ser = serial.Serial(arduino_ports[0])

## Accessing Objects in this format (Data["receivers"][0]["receiver"])
Data = { ## JSON Format
	"receivers": [{
			"receiver": "A",
			"angle": "305",
			"gps": {
				"lat": "31.464863053148537",
				"lon": "-97.21600291602776"
			},
			"signalStrength": "79.1"
		},
		{
			"receiver": "B",
			"angle": "179",
			"gps": {
				"lat": "31.467848640248782",
				"lon": "-97.21807780253233"
			},
			"signalStrength": "78.10"
		},
		{
			"receiver": "C",
			"angle": "56",
			"gps": {
				"lat": "31.465134511547053",
				"lon": "-97.2197810602022"
			},
			"signalStrength": "77.6"
		}
	],
	"lat": "0",
	"lon": "0"
}
## Calculate the distance between the transmitter and the receiver using Free Space Path Loss formula 
def calculateDistance(signalStrength, frequency):
    distance = 10 ** ((27.55 - (20 * np.log10(frequency)) + np.abs(signalStrength))/20)
    return distance


## Calculate the location of the transmitter using the average of 3 receiver 
def calculateLocation(signalStrength, frequency, receiverA, receiverB, receiverC, angles):
    distanceA = calculateDistance(signalStrength[0], frequency)
    distanceB = calculateDistance(signalStrength[1], frequency)
    distanceC = calculateDistance(signalStrength[2], frequency)
    AtoT = geopy.distance.distance(meters=distanceA).destination((receiverA[0], receiverA[1]), bearing=angles[0])
    BtoT = geopy.distance.distance(meters=distanceB).destination((receiverB[0], receiverB[1]), bearing=angles[1])
    CtoT = geopy.distance.distance(meters=distanceC).destination((receiverC[0], receiverC[1]), bearing=angles[2])
    transmitterLocation = [(AtoT.latitude + BtoT.latitude + CtoT.latitude) / 3, (AtoT.longitude + BtoT.longitude + CtoT.longitude) / 3]
    return transmitterLocation

def process():
    signalstrength = [float(Data['receivers'][0]['signalStrength']), float(Data['receivers'][1]['signalStrength']), float(Data['receivers'][2]['signalStrength'])]
    angles = [float(Data['receivers'][0]['angle']), float(Data['receivers'][1]['angle']), float(Data['receivers'][2]['angle'])]
    receiverA = [float(Data['receivers'][0]['gps']['lat']), float(Data['receivers'][0]['gps']['lon'])]
    receiverB = [float(Data['receivers'][1]['gps']['lat']), float(Data['receivers'][1]['gps']['lon'])]
    receiverC = [float(Data['receivers'][2]['gps']['lat']), float(Data['receivers'][2]['gps']['lon'])]
    transmitterLocation = calculateLocation(signalstrength, frequency, receiverA, receiverB, receiverC, angles)
    Data['lat'] = transmitterLocation[0]
    Data['lon'] = transmitterLocation[1]
app = Flask(__name__)
CORS(app)
##@app.route('/process', methods=['GET'])
@app.route('/test', methods=['GET'])

def test():
    ser.write(bytes('1', 'utf-8'))
    time.sleep(150)
    data = str(ser.readline())
    print(data, file=sys.stderr)
    for i in range(5):
        print(i, file=sys.stderr)
        data = str(ser.readline())
        if len(data) >= 11:
            print(data[10], file=sys.stderr)
            if data[12] == "A":
                Data["receivers"][0]["receiver"] = "A"
                I = 14
                string = ""
                while data[I] != "|":
                    string = string + data[I]
                    I = I + 1
                Data["receivers"][0]["gps"]["lat"] = string
                string = ""
                I = I + 1
                print(data[I])
                while data[I] != "|":
                    string = string + data[I]
                    I = I + 1
                Data["receivers"][0]["gps"]["lon"] = string
                string = ""
                I = I + 1
                while data[I] != "|":
                    string = string + data[I]
                    I = I + 1
                Data["receivers"][0]["signalStrength"] = string
                string = ""
                I = I + 1
                while data[I] != ",":
                    string = string + data[I]
                    I = I + 1
                Data["receivers"][0]["angle"] = string
            elif data[12] == "B":
                Data["receivers"][1]["receiver"] = "B"
                I = 14
                string = ""
                while data[I] != "|":
                    string = string + data[I]
                    I = I + 1
                Data["receivers"][1]["gps"]["lat"] = string
                string = ""
                I = I + 1
                while data[I] != "|":
                    string = string + data[I]
                    I = I + 1
                Data["receivers"][1]["gps"]["lon"] = string
                string = ""
                I = I + 1
                while data[I] != "|":
                    string = string + data[I]
                    I = I + 1
                Data["receivers"][1]["signalStrength"] = string
                string = ""
                I = I + 1
                while data[I] != ",":
                    string = string + data[I]
                    I = I + 1
                Data["receivers"][1]["angle"] = string
            elif data[12] == "C":
                Data["receivers"][2]["receiver"] = "C"
                I = 14
                string = ""
                while data[I] != "|":
                    string = string + data[I]
                    I = I + 1
                Data["receivers"][2]["gps"]["lat"] = string
                string = ""
                I = I + 1
                while data[I] != "|":
                    string = string + data[I]
                    I = I + 1
                Data["receivers"][2]["gps"]["lon"] = string
                string = ""
                I = I + 1
                while data[I] != "|":
                    string = string + data[I]
                    I = I + 1
                Data["receivers"][2]["signalStrength"] = string
                string = ""
                I = I + 1
                while data[I] != ",":
                    string = string + data[I]
                    I = I + 1
                Data["receivers"][2]["angle"] = string
    process()
    print(Data, file=sys.stderr)
    return json.dumps(Data)



if __name__ == '__main__':
    app.run(port=3001, debug=True)