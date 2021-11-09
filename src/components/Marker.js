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
            style={{ backgroundColor: "blue", cursor: 'pointer'}}
            title={"A"}
        </div>
        )
    }
}

export default Marker;