import axios from 'axios';
import { updateUserInfo, updateAuthData } from "../redux/actions";
import { saveSessionStore } from "../localStore/session";


// const BASE_API = process.env.REACT_APP_BASE_URL;
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';
const BASE_API = 'http://54.177.114.14/q/';
// const BASE_API = 'https://www.civictechhub.net/q';
// const BASE_API = 'http://192.168.68.125:8000/api/';


axios.create({
    baseURL: BASE_API,
    headers: {
        'X-CSRFToken': document.cookie.split('=')[1],
        'X-Requested-With': 'XMLHttpRequest',
        "Content-type": "application/json"
    }
});

const esAxios = axios.create({
  baseURL: 'http://54.177.114.14',
  headers: {
    "X-CSRFTOKEN": document.cookie.split("=")[1],
    "X-Requested-With": "XMLHttpRequest",
    "Content-type": "application/json",
  },
});

const preAuthAxios = axios.create({
  baseURL: 'http://54.177.114.14',
  headers: {
    "X-CSRFTOKEN": document.cookie.split("=")[1],
    "X-Requested-With": "XMLHttpRequest",
    "Content-type": "application/json",
  },
});


const postAuthAxios = (token) =>
  axios.create({
    baseURL: "http://54.177.114.14",
    headers: {
      "X-CSRFTOKEN": document.cookie.split("=")[1],
      "X-Requested-With": "XMLHttpRequest",
      "Content-type": "application/json",
      Authorization: token,
    },
  });

  
export const queryElasticsearch = (query, dispatch, actionCallback) =>{

  axios.get(BASE_API, 
    query
    )
   .then(response => {
      // process response.
      
      // this.setState({results: response});
      // console.log(response.data.hits);
      dispatch(actionCallback(response.data.hits));
   })
   .catch(error => {
      // catch errors.
      console.log(error);
      return error;
   })
}

export const queryEsById = (query, dispatch, actionCallback) =>{

   esAxios.get(`/q/`, 
     query
     )
    .then(response => {
       // process response.
       
       // this.setState({results: response});
       console.log(response.data.hits);
       dispatch(actionCallback(response.data.hits[0]));
    })
    .catch(error => {
       // catch errors.
       console.log(error);
       return error;
    })
 }

 export const getUserInfo = (dispatch) => {
   const userInfoAxios = postAuthAxios(`Token ${localStorage.getItem("token")}`);
   userInfoAxios
     .get(`/rest-auth/user/`)
     .then((response) => {
       
       saveSessionStore("userInfo", response.data);
      //  console.log(response.data);
       dispatch(updateUserInfo(response.data));
     })
     .catch((error) => {
       // catch errors.
       console.log(error.response.data);
     });
 };
 
 export const createChallenge = (challenge) => {
  esAxios
    .get(
      `/add/`, //change to `/add/` tom make it working
      {
        params: {
          q: challenge,
        },
      }
    )
    .then((response) => {
      // console.log(response.data);
      return true;
    })
    .catch((error) => {
      // catch errors.
      console.log(error);
      return false;
    });
};



 export const authSignIn = (
   email,
   password,
   authData,
   dispatch,
   actionCallback
 ) => {
  preAuthAxios
     .post(`/rest-auth/login/`, {
       email: email,
       password: password,
     })
     .then((res) => {
       const token = res.data.key;
       // console.log(res.data);
       const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
       localStorage.setItem("token", token);
       localStorage.setItem("expirationDate", expirationDate);
       authData.token = token;
       authData.isAuthenticated = true;
       dispatch(actionCallback(authData));
       getUserInfo(dispatch);
       // dispatch(authSuccess(token));
       // dispatch(checkAuthTimeout(3600));
     })
     .catch((err) => {
       // catch errors.
       authData.error = err.response.data.non_field_errors[0];
       dispatch(actionCallback(authData));
       console.log(err.response.data.non_field_errors);
     });
 };



 export const authSignup = (
  firstName,
  lastName,
  email,
  password1,
  password2,
  authData,
  dispatch,
  actionCallback

) => {
  preAuthAxios
    .post(`/rest-auth/registration/`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password1: password1,
      password2: password2,
    })
    .then((res) => {
      
      const token = res.data.key;
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationDate", expirationDate);
      authData.token = token;
      authData.isAuthenticated = true;
      dispatch(actionCallback(authData));
      getUserInfo(dispatch);
      //   dispatch(authSuccess(token));
      //   dispatch(checkAuthTimeout(3600));
    })
    .catch((err) => {
      // console.log(err.response.data);
      authData.error = err.response.data.email? err.response.data.email[0]
      :err.response.data.password1[0];
      dispatch(actionCallback(authData));
      
    });
};
