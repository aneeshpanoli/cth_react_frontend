import axios from 'axios';


// const BASE_API = process.env.REACT_APP_BASE_URL;
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';
const BASE_API = 'https://www.civictechhub.net/78c3b495-8369-4f1c-abf2-b6142f406b2a';
// const BASE_API = 'http://192.168.68.125:8000/api/';


axios.create({
    baseURL: BASE_API,
    headers: {
        'X-CSRFToken': document.cookie.split('=')[1],
        'X-Requested-With': 'XMLHttpRequest',
        "Content-type": "application/json"
    }
});

  
export const queryElasticsearch = (query, dispatch, actionCallback) =>{

  axios.get(BASE_API, 
    query
    )
   .then(response => {
      // process response.
      
      // this.setState({results: response});
      console.log(response.data.hits);
      dispatch(actionCallback(response.data.hits));
   })
   .catch(error => {
      // catch errors.
      console.log(error);
      return error;
   })
}

export const queryEsById = (query, dispatch, actionCallback) =>{

   axios.get(BASE_API, 
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

