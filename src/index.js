import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store, { fetchJobs } from './store';

store.dispatch(fetchJobs());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} stabilityCheck='never'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
