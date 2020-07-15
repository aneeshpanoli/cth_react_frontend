import { updateAuthData } from "../redux/actions";

export const logout = (dispatch) => {
  sessionStorage.removeItem("authData");
  dispatch(updateAuthData({ token: null, isAuthenticated: false, user: null }));
};

export const checkAuthTimeout = (expirationDate) => {
  return (dispatch) => {
    setTimeout(() => {
      logout();
    }, expirationDate * 1000);
  };
};

export const authCheck = (dispatch) => {
  const authData = JSON.parse(sessionStorage.getItem("authData"));
  if (!authData) {
    logout(dispatch);
  } else {
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
      checkAuthTimeout(newExpirationDate);
    }
  }
};
