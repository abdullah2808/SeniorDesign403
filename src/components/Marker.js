import React, { Component } from 'react';
import './Styles.css';

export class Marker extends Component {
    constructor(props) {
        super(props);
    this.state = {
        receiver: props.receiver,
        gps: props.gps,
    }
};


componentWillReceiveProps(nextProps) {
    this.setState({ receiver: nextProps.receiver, gps: nextProps.gps});  
}

  render() {
    return (
        <div className = "marker">
            <p> {this.state.receiver} </p>
        </div>
    )
}
}

export default Marker;