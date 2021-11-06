import React from 'react';
import ReactDOM from 'react-dom';
import SimpleMap from './components/Map';
import './components/Map.css';
import './components/Receiver.js';
import Receivers from './components/Receivers';

ReactDOM.render(
  <React.StrictMode>
  <SimpleMap/>
  <Receivers/>
  </React.StrictMode>,
  document.getElementById('root')
);

