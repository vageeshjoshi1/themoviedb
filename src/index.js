import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import ComponentRoutes from './routes';
import configureStore from './store';

import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ComponentRoutes />
  </Provider>
);

reportWebVitals();
