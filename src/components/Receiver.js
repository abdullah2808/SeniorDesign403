import React, { Component } from 'react';
import './Styles.css';

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
    componentWillReceiveProps(nextProps) {
        this.setState({ receiver: nextProps.receiver, angle: nextProps.angle, gps: nextProps.gps, signalStrength: nextProps.signalStrength  });  
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
                        GPS: {this.state.gps.lat},  {this.state.gps.lon}
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

