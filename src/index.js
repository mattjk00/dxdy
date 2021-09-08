import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ons from 'onsenui'
import 'onsenui/css/onsenui.css';
//import 'onsenui/css/old-onsen-css-components2.css';
import {DFT, absArray} from "./math/Transforms"
import { sinArray } from './math/Complex';

ReactDOM.render(
  /*<React.StrictMode>
    <App />
  </React.StrictMode>*/
  <App/>,
  document.getElementById('root')
);


