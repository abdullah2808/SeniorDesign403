import React, { Component } from 'react';

export class Receiver extends Component {
    constructor(props) {
        super(props);
    this.state = {
        receiver: props.receiver,
        angle: props.angle,
        gps: props.gps,
        signalStrength: props.signalStrength,
    };
}
    render() {
        return (
            <div>
                <div>
                    <h1>Receiver: {this.state.receiver}</h1>
                </div>
                <div>
                    <p>
                        Angle: {this.state.angle}
                    </p>
                    <p>
                        GPS: {this.state.gps}
                    </p>
                    <p>
                        Signal Strength: {this.state.signalStrength}
                    </p>
                </div>
            </div>
        )
    }
}

export default Receiver;

