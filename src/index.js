import React from 'react';
import ReactDOM from 'react-dom';
import SimpleMap from './App';
import './Map.css';
import './Receiver.js';
import Receiver from './Receiver.js';

ReactDOM.render(
  <React.StrictMode>

 <SimpleMap/>
  <div className = "receiver">
    <div>
      <Receiver />
    </div>
    <div>
      <Receiver />
    </div>
    <div>
      <Receiver />
    </div>
  </div>
  </React.StrictMode>,
  document.getElementById('root')
);

