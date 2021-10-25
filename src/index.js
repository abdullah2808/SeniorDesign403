import React from 'react';
import ReactDOM from 'react-dom';
import SimpleMap from './App';
import './Map.css';
import './Receiver.js';
import Receivers from './Receivers';

ReactDOM.render(
  <React.StrictMode>
  <SimpleMap/>
  <Receivers/>
  </React.StrictMode>,
  document.getElementById('root')
);

