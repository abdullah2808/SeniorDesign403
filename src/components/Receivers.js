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
                    gps: "0",
                    signalStrength: "0",
                },
                {
                    receiver: "B",
                    angle: "0",
                    gps: "0",
                    signalStrength: "0",
                },
                {
                    receiver: "C",
                    angle: "0",
                    gps: "0",
                    signalStrength: "0",
                }
            ]
        };
        this.pingClick  = this.pingClick.bind(this);
    }
    pingClick() {
        fetch("http://localhost:3001/ping")
        .then(response => response.json())
        .then( responseJson=> {
            this.setState({ receivers:responseJson.data });
            console.log(this.state.receivers);
            localStorage.setItem('receivers', responseJson.data);
        }
        );
    }
    componentDidMount() {
        this.pingClick();
        if (localStorage.getItem('receivers') !== null) {
            this.setState({ receivers: localStorage.getItem('receivers') });
        }
    }
    render() {
        return (
            <div>
            <div className="receiver">
                <div>  <Receiver receiver = { this.state.receivers[0].receiver} angle = {this.state.receivers[0].angle} gps = {this.state.receivers[0].gps} signalStrength = {this.state.receivers[0].signalStrength}/> </div>
                <div>  <Receiver receiver = { this.state.receivers[1].receiver} angle = {this.state.receivers[1].angle} gps = {this.state.receivers[1].gps} signalStrength = {this.state.receivers[1].signalStrength}/> </div>
                <div>  <Receiver receiver = { this.state.receivers[2].receiver} angle = {this.state.receivers[2].angle} gps = {this.state.receivers[2].gps} signalStrength = {this.state.receivers[2].signalStrength}/> </div>
            </div>
            <div className = "buttons">
                    <button onClick={this.pingClick}> Start Search</button>
                </div>
            </div>
        
        );
    }
}




export default Receivers;

