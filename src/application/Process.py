
import numpy as np
import geopy.distance
## Angles of Receivers
angles = [305, 179, 56]
frequency = 915.0
signalstrength = [79.1, 78.10, 77.6]


## locations of receivers lat, long
receiverA = [31.464863053148537, -97.21600291602776] ## A to T 235.18 M
receiverB = [31.467848640248782, -97.21807780253233] ## B to T 206.66 M
receiverC = [31.465134511547053, -97.2197810602022] ## C to T 198.73 M

guessLocation = [31.466113402236456, -97.21804633136732]

## Calculate the distance between the transmitter and the receiver using Free Space Path Loss formula 
def calculateDistance(signalStrength, frequency):
    distance = 10 ** ((27.55 - (20 * np.log10(frequency)) + np.abs(signalStrength))/20)
    return distance

print(calculateDistance(signalstrength[2], frequency))

def calculateLocation(signalStrength, frequency, receiverA, receiverB, receiverC):
    distanceA = calculateDistance(signalStrength[0], frequency)
    distanceB = calculateDistance(signalStrength[1], frequency)
    distanceC = calculateDistance(signalStrength[2], frequency)
    distanceAx = np.cos(angles[0]) * distanceA
    distanceAy = np.sin(angles[0]) * distanceA
    distanceBx = np.cos(angles[1]) * distanceB
    distanceBy = np.sin(angles[1]) * distanceB
    distanceCx = np.cos(angles[2]) * distanceC
    distanceCy = np.sin(angles[2]) * distanceC
    locationA = [receiverA[0] + distanceAx, receiverA[1] + distanceAy]
    locationB = [receiverB[0] + distanceBx, receiverB[1] + distanceBy]
    locationC = [receiverC[0] + distanceCx, receiverC[1] + distanceCy]
    transmitterLocation = [(locationA[0] + locationB[0] + locationC[0]) / 3, (locationA[1] + locationB[1] + locationC[1]) / 3]
    return transmitterLocation

def calculateLocation2(signalStrength, frequency, receiverA, receiverB, receiverC):
    distanceA = calculateDistance(signalStrength[0], frequency)
    distanceB = calculateDistance(signalStrength[1], frequency)
    distanceC = calculateDistance(signalStrength[2], frequency)
    AtoT = geopy.distance.distance(meters=distanceA).destination((receiverA[0], receiverA[1]), bearing=angles[0])
    BtoT = geopy.distance.distance(meters=distanceB).destination((receiverB[0], receiverB[1]), bearing=angles[1])
    CtoT = geopy.distance.distance(meters=distanceC).destination((receiverC[0], receiverC[1]), bearing=angles[2])
    transmitterLocation = [(AtoT.latitude + BtoT.latitude + CtoT.latitude) / 3, (AtoT.longitude + BtoT.longitude + CtoT.longitude) / 3]
    return transmitterLocation
transmitterLocation = calculateLocation2(signalstrength, frequency, receiverA, receiverB, receiverC)

print(transmitterLocation)