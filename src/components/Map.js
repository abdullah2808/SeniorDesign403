import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.js';

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 31.464863053148537,
        lng: -97.21600291602776
      },
      zoom: 17,
      receivers: [
        {
            receiver: "A",
            angle: "0",
            gps: {lat: "0", lon: "0"},
            signalStrength: "0",
        },
        {
            receiver: "B",
            angle: "0",
            gps: {lat: "0", lon: "0"},
            signalStrength: "0",
        },
        {
            receiver: "C",
            angle: "0",
            gps: {lat: "0", lon: "0"},
            signalStrength: "0",
        }
    ],
    lat: "0",
    lon: "0", 
    };
  }
  componentDidMount() {
    if (localStorage.getItem('receivers') !== null) {
        this.setState({ receivers: JSON.parse(localStorage.getItem('receivers')) });
    }
    if (localStorage.getItem('lat') !== null) {
      this.setState({ lat: JSON.parse(localStorage.getItem('lat')) });
  }
  if (localStorage.getItem('lon') !== null) {
    this.setState({ lon: JSON.parse(localStorage.getItem('lon')) });
}
}
    render() {
      return (
        <div style={{ height: '75vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyB_DX3OlkxiQFbRZizvRvdowx1hNFga_NE' }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
          <p
            lat={this.state.receivers[0].gps.lat} lng={this.state.receivers[0].gps.lon}>
            {this.state.receivers[0].receiver}
            </p>
            <p
            lat={this.state.receivers[1].gps.lat} lng={this.state.receivers[1].gps.lon}>
            {this.state.receivers[1].receiver}
            </p>
            <p
            lat={this.state.receivers[2].gps.lat} lng={this.state.receivers[2].gps.lon}>
            {this.state.receivers[2].receiver}
            </p>
            <p
            lat={this.state.lat} lng={this.state.lon}>
            Transmitter
            </p>
          </GoogleMapReact>
        </div>
      );
    }
  }
  

export default SimpleMap;