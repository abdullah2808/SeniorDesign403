import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


class SimpleMap extends Component {
    static defaultProps = {
      center: {
        lat: 30.6099,
        lng: -96.3404
      },
      zoom: 11
    };
  
    render() {
      return (
        <div style={{ height: '75vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyB_DX3OlkxiQFbRZizvRvdowx1hNFga_NE' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
          </GoogleMapReact>
        </div>
      );
    }
  }
  

export default SimpleMap;