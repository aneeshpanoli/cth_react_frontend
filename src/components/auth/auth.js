import { updateAuthData } from "../redux/actions";

export const logout = (dispatch) => {
  sessionStorage.removeItem("authData");
  dispatch(updateAuthData({ token: null, isAuthenticated: false, user: null }));
};

export const tabLogin = (dispatch, credFromOtherTab) => {
  dispatch(updateAuthData(JSON.parse(credFromOtherTab)));
  sessionStorage.setItem("authData", credFromOtherTab);
};

export const checkAuthTimeout = (expirationDate) => {
  return (dispatch) => {
    setTimeout(() => {
      logout();
    }, expirationDate * 1000);
  };
};

export const authCheckExp = (dispatch) => {
  const authData = JSON.parse(sessionStorage.getItem("authData"));
  if (authData) {
    console.log(authData);
    const expirationDate = new Date(authData.expirationDate);
    if (expirationDate <= new Date()) {
      logout(dispatch);
    } else {
      const newExpirationDate =
        (expirationDate.getTime() - new Date().getTime()) / 1000;
      dispatch(
        updateAuthData({
          ...authData,
          isAuthenticated: true,
          expirationDate: newExpirationDate,
        })
      );
      checkAuthTimeout(newExpirationDate, dispatch);
    }
  } else {
    localStorage.setItem(
      "REQUESTING_SHARED_CREDENTIALS",
      Date.now().toString()
    );
    localStorage.removeItem("REQUESTING_SHARED_CREDENTIALS");
    // console.log("requesting token");
  }
};

export const authCheck = (dispatch) => {
  const authData = JSON.parse(sessionStorage.getItem("authData"));
  if (!authData) {
    localStorage.setItem(
      "REQUESTING_SHARED_CREDENTIALS",
      Date.now().toString()
    );
    localStorage.removeItem("REQUESTING_SHARED_CREDENTIALS");
    // console.log("requesting token");
  } else {
    dispatch(
      updateAuthData({
        ...authData,
      })
    );
  }
};
