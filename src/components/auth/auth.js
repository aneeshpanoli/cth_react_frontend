
import { updateAuthData } from '../redux/actions'
import  { getUserInfo } from '../backend/AxiosRequest'



export const logout = (authData, dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  authData.isAuthenticated = false;
  authData.token = null;
  dispatch(updateAuthData(authData));
  
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
      setTimeout(() => {
          logout();
      }, expirationTime * 1000)
  }
}

export const quickAuthCheck = (authData, dispatch) => {
  const token = localStorage.getItem('token');
  authData.isAuthenticated = true;
  dispatch(updateAuthData(authData));
}

export const authCheck = (authData, dispatch) => {
      const token = localStorage.getItem('token');
      if (token === undefined) {
          logout(authData, dispatch);
      } else {
          const expirationDate = new Date(localStorage.getItem('expirationDate'));
          if ( expirationDate <= new Date() ) {
              logout(authData, dispatch);
          } else {
            const newExpData =  (expirationDate.getTime() - new Date().getTime()) / 1000;
            localStorage.setItem('expirationDate', newExpData);
            authData.isAuthenticated = true;
            authData.token = token;
            dispatch(updateAuthData(authData));
            checkAuthTimeout(newExpData) ;
            getUserInfo(dispatch);
          }
      }
  
}