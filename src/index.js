import React from 'react';
import ReactDOM from 'react-dom';
import SimpleMap from './components/Map';
import './components/Styles.css';
import './components/Receiver.js';
import Receivers from './components/Receivers';

ReactDOM.render(
  <div className = "mainstyle">
    <React.StrictMode>
    <SimpleMap/>
    <Receivers/>
    </React.StrictMode>,
  </div>,
  document.getElementById('root')
);

