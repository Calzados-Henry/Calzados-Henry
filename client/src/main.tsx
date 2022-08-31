import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import App from './app/App';
import './index.css';
import { store } from './store';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

// Redux tool-kit llamamos al componente <Provider/> y le pasamos el store
