import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import {createBrowserHistory} from 'history';
import { Provider } from 'mobx-react';

import stores from './stores';

import './index.css';

import App from './App';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider { ...stores }>
      <Router history={ history }>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);