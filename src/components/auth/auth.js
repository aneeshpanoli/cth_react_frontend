
import { updateAuthData } from '../redux/actions'
import  { getUserInfoElastic } from '../backend/AxiosRequest'



export const logout = (authData, dispatch) => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('expirationDate');

  dispatch(updateAuthData({...authData, token:null, isAuthenticated:false}));
  
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
      setTimeout(() => {
          logout();
      }, expirationTime * 1000)
  }
}

export const quickAuthCheck = (authData, dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(updateAuthData({...authData, isAuthenticated:true}));
  return token? true:false
}

export const authCheck = (authData, dispatch) => {
      const token = sessionStorage.getItem('token');
      if (token === undefined) {
          logout(authData, dispatch);
      } else {
          const expirationDate = new Date(sessionStorage.getItem('expirationDate'));
          if ( expirationDate <= new Date() ) {
              logout(authData, dispatch);
          } else {
            const newExpData =  (expirationDate.getTime() - new Date().getTime()) / 1000;
            sessionStorage.setItem('expirationDate', newExpData);
            dispatch(updateAuthData({...authData, token:token, isAuthenticated:true}));
            checkAuthTimeout(newExpData) ;
            // getUserInfo(dispatch);
          }
      }
  
}