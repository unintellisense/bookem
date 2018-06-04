import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './custom.css'

ReactDOM.render(
  <App />,
  document.getElementById('root'));