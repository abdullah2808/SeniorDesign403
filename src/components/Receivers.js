import Receiver from './Receiver.js';
import React, { Component } from 'react';

const receiversData = [
    {
        receiver: "A",
        angle: 12,
        gps: 0,
        signalStrength: 0,
    },
    {
        receiver: "B",
        angle: 46,
        gps: 0,
        signalStrength: 0,
    },
    {
        receiver: "C",
        angle: 32,
        gps: 0,
        signalStrength: 0,
    }
]


export class Receivers extends Component {
    render() {
        return (
            <div className="receiver">
                <div>  <Receiver receiver = { receiversData[0].receiver} angle = {receiversData[0].angle} gps = {receiversData[0].gps} signalStrength = {receiversData[0].signalStrength}/> </div>
                <div>  <Receiver receiver = { receiversData[1].receiver} angle = {receiversData[1].angle} gps = {receiversData[1].gps} signalStrength = {receiversData[1].signalStrength}/> </div>
                <div>  <Receiver receiver = { receiversData[2].receiver} angle = {receiversData[2].angle} gps = {receiversData[2].gps} signalStrength = {receiversData[2].signalStrength}/> </div>
            </div>
        );
    }
}




export default Receivers;

