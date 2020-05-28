import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'reactive-react-redux';
import store from './components/redux/store'



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
