import axios from 'axios';
import { updateRecipeList } from '../redux/actions'


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

  
export const queryElasticsearch = (query, dispatch) =>{

  axios.get(BASE_API, 
    query
    )
   .then(response => {
      // process response.
      
      // this.setState({results: response});
      console.log(response.data.hits);
      dispatch(updateRecipeList(response.data.hits));
   })
   .catch(error => {
      // catch errors.
      console.log(error);
      return error;
   })
}

