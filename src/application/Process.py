
import numpy as np

## Angles of Receivers
angles = [0, 0, 0]
frequency = 915.0
signalstrength = [80, 80, 80]

## locations of receivers lat, long
receiverA = [0,0]
receiverB = [0,0]
receiverC = [0,0]

## Calculate the distance between the transmitter and the receiver using Free Space Path Loss formula 
def calculateDistance(signalStrength, frequency):
    distance = 10 ** ((27.55 - (20 * np.log10(frequency)) + np.abs(signalStrength))/20)
    return distance

print(calculateDistance(signalstrength[0], frequency))

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

transmitterLocation = calculateLocation(signalstrength, frequency, receiverA, receiverB, receiverC)
