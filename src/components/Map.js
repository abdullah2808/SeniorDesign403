import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.js';

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 30.6099,
        lng: -96.3404
      },
      zoom: 13,
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
  }
  componentDidMount() {
    if (localStorage.getItem('receivers') !== null) {
        this.setState({ receivers: JSON.parse(localStorage.getItem('receivers')) });
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
            lat={30.6099} lng={-96.3404}>
            hi
            </p>
          </GoogleMapReact>
        </div>
      );
    }
  }
  

export default SimpleMap;