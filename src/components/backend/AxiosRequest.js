import axios from "axios";
import {
  updateProgress,
  updateFilterProject,
  updateSelectedProject,
} from "../redux/actions";
import { saveSessionStore, retriveSessionStore } from "../localStore/session";
import { MATCH_USER } from "./EsQueries";

// switch API url based on environment
let development = process.env.NODE_ENV !== "production";
// const BASE_URL = development?'http://13.52.80.115':'https://www.civictechhub.org';

// const BASE_URL = "http://54.215.249.143";
const BASE_URL = "https://www.civictechhub.org";

// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.xsrfCookieName = 'csrftoken';

// const BASE_API = 'https://www.civictechhub.net/q';
// const BASE_API = 'http://192.168.68.125:8000/api/';
//   require('axios').get(
//   'https://upload.wikimedia.org/wikipedia/commons/f/fe/A_Different_Slant_on_Carina.jpg',
//   { maxContentLength: 2000 }
// )

export const esAxios = axios.create({
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

// use for POST request that require user authentication
const postPostAuthAxios = (token) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "X-CSRFTOKEN": document.cookie.split("=")[1],
      "X-Requested-With": "XMLHttpRequest",
      "Content-type": "multipart/form-data",
      Authorization: token,
    },
  });

const postPreAuthAxios = () =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "X-CSRFTOKEN": document.cookie.split("=")[1],
      "X-Requested-With": "XMLHttpRequest",
      "Content-type": "application/json",
    },
  });

export const queryElasticsearch = (
  userInput,
  query,
  dispatch,
  actionCallback,
  history
) => {
  if (history && history === "home") {
    dispatch(updateProgress(false));
  } else {
    dispatch(updateProgress(true));
  }
  // update the search project list
  let proceed =
    userInput &&
    retriveSessionStore(userInput + "query", dispatch, actionCallback);
  if (proceed) {
    // update filter project list
    retriveSessionStore(userInput + "query", dispatch, updateFilterProject);
    if (history && history !== "home") {
      history();
    }
    return;
  }

  esAxios
    .get(`/q/`, query)
    .then((response) => {
      // process response.

      // this.setState({results: response});
      console.log(response.data.hits.hits);
      dispatch(actionCallback(response.data.hits.hits));
      dispatch(updateFilterProject(response.data.hits.hits));
      proceed && saveSessionStore(userInput + "query", response.data.hits.hits);
      if (history && history !== "home") {
        history();
      }
    })
    .catch((error) => {
      // catch errors.
      console.log(error);
      return error;
    });
};

export const simpleQueryElasticsearch = (query, dispatch, actionCallback) => {
  // update the search project list

  esAxios
    .get(`/q/`, query)
    .then((response) => {
      // process response.

      // this.setState({results: response});
      // console.log(response.data.hits);
      dispatch(actionCallback(response.data.hits.hits));
    })
    .catch((error) => {
      // catch errors.
      console.log(error);
      return error;
    });
};

export const queryEsById = (query, dispatch, actionCallback, history) => {
  esAxios
    .get(`/q/`, query)
    .then((response) => {
      // process response.
      // console.log(response.data.hits);
      if (response.data.hits.hits[0]) {
        dispatch(actionCallback(response.data.hits.hits[0]));
      } else {
        history.push("/page-not-found");
      }
    })
    .catch((error) => {
      // catch errors.
      console.log(error);
      return error;
    });
};

export const createDoc = (doc, token, getUpdatedData) => {
  const userInfoAxios = postAuthAxios(`Token ${token}`);
  // console.log(doc);
  userInfoAxios
    .get(`/create/`, doc)
    .then((response) => {
      console.log(response.data);
      setTimeout(() => {
        // get updated data back from server after a second
        if (getUpdatedData) {
          getUpdatedData();
        }
      }, 1000);

      return true;
    })
    .catch((error) => {
      // catch errors.
      console.log(error);
      return false;
    });
};

export const postProject = (formData, token, history, title) => {
  const postpostAuthAxios = postPostAuthAxios(`Token ${token}`);
  postpostAuthAxios
    .post(`/post/`, formData)
    .then((response) => {
      // console.log(response.data);
      setTimeout(() => {
        history.push(
          "/" + title.replace(/\s+/g, "-") + "/" + response.data._id
        );
      }, 1000);
    })
    .catch((error) => {
      // catch errors.
      console.log(error);
    });
};

export const updateProject = (
  formData,
  token,
  history,
  title,
  getUpdatedData
) => {
  const postpostAuthAxios = postPostAuthAxios(`Token ${token}`);
  postpostAuthAxios
    .post(`/post/`, formData)
    .then((response) => {
      console.log(response.data);
      if (getUpdatedData) {
        getUpdatedData({
          _index: response.data._index,
          _type: response._type,
          _id: response.data._id,
          _source: response.data.get._source,
        });
      }
        if (history) {
          history.push(
            "/" + title.replace(/\s+/g, "-") + "/" + response.data._id
          );
        }
    })
    .catch((error) => {
      // catch errors.
      console.log(error);
    });
};

export const updateUser = (
  formData,
  token,
  history,
  username,
  getUpdatedData
) => {
  const postpostAuthAxios = postPostAuthAxios(`Token ${token}`);
  postpostAuthAxios
    .post(`/post/`, formData)
    .then((response) => {
      setTimeout(() => {
        if (getUpdatedData) {
          getUpdatedData();
        }
        history.push("/@" + username);
      }, 1000);
    })
    .catch((error) => {
      // catch errors.
      console.log(error);
    });
};

export const updateUserInterests = (formData, token, getUpdatedData) => {
  const postpostAuthAxios = postPostAuthAxios(`Token ${token}`);
  postpostAuthAxios
    .post(`/post/`, formData)
    .then((response) => {
      console.log(response.data.get);
     getUpdatedData(response.data.get)

    })
    .catch((error) => {
      // catch errors.
      console.log(error);
    });
};

export const createDocFeedback = (doc) => {
  // console.log(doc);
  preAuthAxios
    .get(`/create/`, doc)
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

export const fbSignin = (fbData, authData, dispatch, actionCallback) => {
  const postpreAuthAxios = postPreAuthAxios();
  postpreAuthAxios
    .post(`/rest-auth/facebook/`, {
      access_token: fbData._token.accessToken,
    })
    .then((response) => {
      // console.log(response.data);
      response.data.user.image =
        "https://graph.facebook.com/" + fbData._profile.id + "/picture";
      getUserInfoElastic(response.data, dispatch, actionCallback);
    })
    .catch((error) => {
      // catch errors.
      dispatch(
        actionCallback({
          ...authData,
          error: error.response.data.non_field_errors[0],
        })
      );
      console.log(error.response.data);
    });
};

export const googleSignin = (socialData, authData, dispatch, actionCallback) => {
  const postpreAuthAxios = postPreAuthAxios();
  postpreAuthAxios
    .post(`/rest-auth/google/`, {
      access_token: socialData._token.accessToken,
    })
    .then((response) => {
      // console.log(response.data);
      response.data.user.image =
        socialData._profile.profilePicURL;
      getUserInfoElastic(response.data, dispatch, actionCallback);
    })
    .catch((error) => {
      // catch errors.
      dispatch(
        actionCallback({
          ...authData,
          error: error.response.data.non_field_errors[0],
        })
      );
      console.log(error.response.data);
    });
};

export const twitterSignin = (socialData, authData, dispatch, actionCallback) => {
  const postpreAuthAxios = postPreAuthAxios();
  postpreAuthAxios
    .post(`/rest-auth/twitter/`, {
      access_token: socialData.oauth_token,
      token_secret: socialData.oauth_token_secret
    })
    .then((response) => {
      // console.log(response.data);
      // response.data.user.image =
      //   "https://twitter.com/"+socialData.screen_name+"/profile_image?size=original";
      getUserInfoElastic(response.data, dispatch, actionCallback);
    })
    .catch((error) => {
      // catch errors.
      console.log(error.response.data);
      dispatch(
        actionCallback({
          ...authData,
          error: error.response.data.non_field_errors[0],
        })
      );
      
    });
};

export const getUserInfoElastic = (loginData, dispatch, actionCallback) => {
  const userInfoAxios = postAuthAxios(`Token ${loginData.key}`);
  let query = MATCH_USER(loginData.user.id, "id");
  userInfoAxios
    .get(`/q/`, query)
    .then((response) => {
      console.log(response.data)
      if (!response.data.hits.hits[0]) {
        // create a new entry in the elasticsearch db
        const updateData = () => {
          setTimeout(() => {
            getUserInfoElastic(loginData, dispatch, actionCallback);
          }, 2000);
        };
        createDoc(
          {
            params: {
              index: "user",
              q: loginData.user,
            },
          },
          loginData.key,
          updateData
        );
      } else {
        // console.log(response.data.hits[0]._source);
        const authData = {
          ...loginData,
          ...response.data.hits.hits[0],
          isAuthenticated: true,
        };
        dispatch(actionCallback(authData));
      }
      dispatch(updateProgress(false));
    })
    .catch((error) => {
      // catch errors.
      console.log(error.response.data);
    });
};

export const getAnotherUserInfoElastic = (
  loginData,
  field,
  otherUserId,
  dispatch,
  actionCallback
) => {
  const userInfoAxios = postAuthAxios(`Token ${loginData.key}`);
  let query = MATCH_USER(otherUserId, field);
  // console.log(query)
  userInfoAxios
    .get(`/q/`, query)
    .then((response) => {
      // console.log(response.data);

      dispatch(actionCallback(response.data.hits.hits[0]));
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
      // comes from rest-auth not elastic
      // console.log(res.data);
      getUserInfoElastic(res.data, dispatch, actionCallback);
    })
    .catch((err) => {
      // catch errors.
      dispatch(
        actionCallback({
          ...authData,
          error: err.response.data.non_field_errors[0],
        })
      );
      // console.log(err.response.data.non_field_errors);
    });
};

export const resetPwdEmail = (email, authData, dispatch, actionCallback) => {
  preAuthAxios
    .post(`/rest-auth/password/reset/`, {
      email: email,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      // catch errors.
      dispatch(
        actionCallback({
          ...authData,
          error: err.response.data.non_field_errors[0],
        })
      );
      console.log(err.response.data);
    });
};

export const resetPwdForm = (data, authData, dispatch, actionCallback) => {
  console.log(data);
  preAuthAxios
    .post(`/rest-auth/password/confirm/reset/`, data)
    .then((res) => {
      console.log(res.data);
      dispatch(
        actionCallback({
          ...authData,
          resetPwd: true,
        })
      );
    })
    .catch((err) => {
      // catch errors.
      console.log(err.response.data);
      dispatch(
        actionCallback({
          ...authData,
          resetPwd: false,
        })
      );
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
      dispatch(actionCallback({ ...authData, signUp: true }));
      return res;
    })
    .catch((err) => {
      console.log(err.response.data);
      authData.error = err.response.data.email
        ? err.response.data.email[0]
        : err.response.data.password1[0];
      dispatch(actionCallback(authData));
    });
};
