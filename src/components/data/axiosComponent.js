import axios from 'axios';
import updateRecipeList from '../redux/actions'
import { useDispatch } from 'reactive-react-redux';


// const BASE_API = process.env.REACT_APP_BASE_URL;
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';
const BASE_API = 'http://localhost:8000/api/';


axios.create({
    baseURL: BASE_API,
    headers: {
        'X-CSRFToken': document.cookie.split('=')[1],
        'X-Requested-With': 'XMLHttpRequest',
        "Content-type": "application/json"
    }
});

  
export const searchRecipeTitle = (searchValue, callback) =>{
  axios.get(BASE_API, {
      'params': {
          'q':{
              'query':{
                  'match_phrase_prefix':{
                      'title': searchValue
                  }
              }
          }
      }
  })
   .then(response => {
      // process response.
      
      // this.setState({results: response});
      // console.log(response.data.hits);
      callback(response);
      
   })
   .catch(error => {
      // catch errors.
      console.log(error);
      return error;
   })
}

