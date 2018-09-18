import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './styles/index.css';
import 'antd/dist/antd.css';

render((
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  ), document.getElementById('root')
);
