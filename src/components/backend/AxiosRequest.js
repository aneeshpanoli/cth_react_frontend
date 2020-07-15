import axios from 'axios';
import { updateUserInfo, updateProgress, updateFilterProject } from "../redux/actions";
import { saveSessionStore, retriveSessionStore } from "../localStore/session";
import { MATCH_USER } from './EsQueries'


// switch API url based on environment
let development = process.env.NODE_ENV !== 'production'
// const BASE_URL = development?'http://54.193.134.135':'https://www.civictechhub.org';

const BASE_URL = 'http://54.193.134.135'

// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.xsrfCookieName = 'csrftoken';



// const BASE_API = 'https://www.civictechhub.net/q';
// const BASE_API = 'http://192.168.68.125:8000/api/';
//   require('axios').get(
//   'https://upload.wikimedia.org/wikipedia/commons/f/fe/A_Different_Slant_on_Carina.jpg',
//   { maxContentLength: 2000 }
// )



const esAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-CSRFTOKEN": document.cookie.split("=")[1],
    "X-Requested-With": "XMLHttpRequest",
    "Content-type": "application/json",
  },
});

// without token. This is the same as esAxios
const preAuthAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-CSRFTOKEN": document.cookie.split("=")[1],
    "X-Requested-With": "XMLHttpRequest",
    "Content-type": "application/json",
  },
});


// use for accessing pages that require user authentication
const postAuthAxios = (token) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "X-CSRFTOKEN": document.cookie.split("=")[1],
      "X-Requested-With": "XMLHttpRequest",
      "Content-type": "application/json",
      Authorization: token,
    },
  });

  
export const queryElasticsearch = (userInput, query, dispatch, actionCallback) =>{
  dispatch(updateProgress(true));
  // update the search project list
  let proceed = userInput && retriveSessionStore(userInput+"query", dispatch, actionCallback);
  if (proceed){
    // update filter project list
    retriveSessionStore(userInput+"query", dispatch, updateFilterProject)
    return
  }
  
  esAxios.get(`/q/`, 
    query,
    )
   .then(response => {
      // process response.
      
      // this.setState({results: response});
      // console.log(response.data.hits);
      dispatch(actionCallback(response.data.hits));
      dispatch(updateFilterProject(response.data.hits));
      proceed && saveSessionStore(userInput+"query", response.data.hits)
   })
   .catch(error => {
      // catch errors.
      console.log(error);
      return error;
   })
}



export const queryEsById = (query, dispatch, actionCallback, history) =>{

   esAxios.get(`/q/`, 
     query
     )
    .then(response => {
       // process response.
       
       // this.setState({results: response});
       console.log(response.data.hits);
       if(response.data.hits[0]){
       dispatch(actionCallback(response.data.hits[0]));
       }else{history.push('/page-not-found')}
    })
    .catch(error => {
       // catch errors.
       console.log(error);
       return error;
    })
 }

//  export const getUserInfo = (dispatch) => {
//    const userInfoAxios = postAuthAxios(`Token ${localStorage.getItem("token")}`);
//    userInfoAxios
//      .get(`/rest-auth/user/`)
//      .then((response) => {
       
//        saveSessionStore("userInfo", response.data);
//        console.log(response.data);
//        dispatch(updateUserInfo(response.data));
//      })
//      .catch((error) => {
//        // catch errors.
//        console.log(error.response.data);
//      });
//  };

 export const createDocUser = (doc) => {
  const userInfoAxios = postAuthAxios(`Token ${localStorage.getItem("token")}`);
   console.log(doc)
   userInfoAxios
    .get(
      `/create/`,
      {
        params: {
          index: 'user',
          q: doc
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      return true;
    })
    .catch((error) => {
      // catch errors.
      console.log(error);
      return false;
    });
};


 export const getUserInfoElastic = (user, dispatch, authData, actionCallback) => {
  const userInfoAxios = postAuthAxios(`Token ${localStorage.getItem("token")}`);
  let query = MATCH_USER(user.id, 'id')
  userInfoAxios
    .get(`/q/`, query)
    .then((response) => {
      
     if(!response.data.hits[0]){
       createDocUser(user)
       sessionStorage.setItem("authData", user);
      console.log(response.data);
     }else{
      console.log(response.data.hits[0]._source);
      dispatch(actionCallback({...authData, user:response.data.hits[0]._source}));
      sessionStorage.setItem("authData", {...authData, user:response.data.hits[0]._source});
     }
    })
    .catch((error) => {
      // catch errors.
      console.log(error.response.data);
    });
};
 


export const socialSignIn = (endpoint) => {
  preAuthAxios
     .post(endpoint)
     .then((res) => {
       // console.log(res.data);
      
     })
     .catch((err) => {
       // catch errors.
   
       console.log(err.response.data);
     });
}

 export const authSignIn = (
   email,
   password,
   authData,
   dispatch,
   actionCallback,
   history
 ) => {
  preAuthAxios
     .post(`/rest-auth/login/`, {
       email: email,
       password: password,
     })
     .then((res) => {
       const token = res.data.key;
       console.log(res.data);
       const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
       sessionStorage.setItem("token", token);
       sessionStorage.setItem("expirationDate", expirationDate);
       getUserInfoElastic(res.data.user, dispatch, 
        {...authData, token:token, isAuthenticated:true}, actionCallback);
      //  history.push('/')
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
      return res
    })
    .catch((err) => {
      // console.log(err.response.data);
      authData.error = err.response.data.email? err.response.data.email[0]
      :err.response.data.password1[0];
      dispatch(actionCallback(authData));
      
    });
};
