import React from 'react';
import ReactDOM from 'react-dom';
import SimpleMap from './App';
import './Map.css';
import './Receiver.js';
import Receivers from './Receivers';
import Ping from './Ping';
import Search from './Search';

ReactDOM.render(
  <React.StrictMode>
  <SimpleMap/>
  <Receivers/>
  <div className = 'buttons'>
    <Ping/>
    <Search/>
  </div>
  </React.StrictMode>,
  document.getElementById('root')
);

