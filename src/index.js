import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'reactive-react-redux';
import store from './components/redux/store'
import { SnackbarProvider } from 'notistack';


function noop() {}

if (process.env.NODE_ENV !== 'development') {
    console.log = noop;
    console.error = noop;
    console.warn = noop;
} 

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider>
   
 <App />
 </SnackbarProvider>
 </Provider>,
  document.getElementById('root')
);
