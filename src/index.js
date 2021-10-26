import React from 'react';
import ReactDOM from 'react-dom';
import SimpleMap from './components/Map';
import './components/Map.css';
import './components/Receiver.js';
import Receivers from './components/Receivers';
import Ping from './components/Ping';
import Search from './components/Search';

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

