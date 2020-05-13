// eslint-disable-next-line
import * as $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';
import 'nouislider/distribute/nouislider.min.css';
import 'react-image-lightbox/style.css';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Cookie from "./cookie";

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <Cookie />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
