import Receiver from './Receiver.js';
import React, { Component } from 'react';
import './Styles.css';

export class Receivers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receivers: [
                {
                    receiver: "A",
                    angle: "0",
                    gps: {lat: "0", lon: "0"},
                    signalStrength: "0"
                },
                {
                    receiver: "B",
                    angle: "0",
                    gps: {lat: "0", lon: "0"},
                    signalStrength: "0"
                },
                {
                    receiver: "C",
                    angle: "0",
                    gps: {lat: "0", lon: "0"},
                    signalStrength: "0"
                }
            ],
            lat: "0",
            lon: "0",
        };
        this.pingClick  = this.pingClick.bind(this);
    }
    pingClick() { // Function to retrieve data from the microcontroller 
        fetch("http://127.0.0.1:3001/test")
        .then(response => response.json())
        .then( responseJson=> {
            this.setState({ receivers:responseJson.data.receivers });
            localStorage.setItem('receivers', JSON.stringify(responseJson.data.receivers));
            // this.process();
        }
        );
    }
    componentDidMount() { // Making sure the data persists after refreshing the page
        if (localStorage.getItem('receivers') !== null) {
            this.setState({ receivers: JSON.parse(localStorage.getItem('receivers')) });
        }
    }
    process()   { // Function to process the retreived data from the microcontroller
        fetch("http://localhost:3001/process")
        .then(response => response.json())
        .then( responseJson=> {
            console.log(responseJson);
            this.setState({ lat:responseJson[0], lon:responseJson[1] });
            localStorage.setItem('lat', JSON.stringify(responseJson[0]));
            localStorage.setItem('lon', JSON.stringify(responseJson[1]));
        }
    );
    }
    testCommunication() { // Function to test the communication with the microcontroller 
        fetch("http://127.0.0.1:3001/test")
        .then(response => response.json())
        .then( responseJson=> {
            console.log(responseJson);
        }
    );
    }
    render() {
        return (
            <div>
            <div className="receivers">
                <div className = "receiverA">  <Receiver receiver = { this.state.receivers[0].receiver} angle = {this.state.receivers[0].angle} gps = {this.state.receivers[0].gps} signalStrength = {this.state.receivers[0].signalStrength}/> </div>
                <div className = "receiverB">  <Receiver receiver = { this.state.receivers[1].receiver} angle = {this.state.receivers[1].angle} gps = {this.state.receivers[1].gps} signalStrength = {this.state.receivers[1].signalStrength}/> </div>
                <div className = "receiverC">  <Receiver receiver = { this.state.receivers[2].receiver} angle = {this.state.receivers[2].angle} gps = {this.state.receivers[2].gps} signalStrength = {this.state.receivers[2].signalStrength}/> </div>
            </div>
            <div className = "buttons">
                    <button onClick={this.pingClick} className = "button" > Start Search</button>
                    <button onClick={this.testCommunication} className = 'button'> Test Communication </button>
            </div>
            </div>
        
        );
    }
}




export default Receivers;

