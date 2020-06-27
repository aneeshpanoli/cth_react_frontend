import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'reactive-react-redux';
import store from './components/redux/store'
import { SnackbarProvider } from 'notistack';



ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider>
 <App />
 </SnackbarProvider>
 </Provider>,
  document.getElementById('root')
);
