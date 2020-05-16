import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    'X-CSRFToken': document.cookie.split('=')[1],
    'X-Requested-With': 'XMLHttpRequest',
    "Content-type": "application/json"
  }
});