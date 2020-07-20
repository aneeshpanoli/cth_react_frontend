import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { themeDict } from "./components/theme/Colors";
import { createMuiTheme } from "@material-ui/core/styles";
import CreateChallenge from "./components/pages/CreateChallenge";
import ProjectDashboard from "./components/pages/ProjectDashboard";
import HomePage from "./components/pages/Home";
import SearchProjects from "./components/pages/SearchProjects";
import ExploreProjects from "./components/pages/ExploreProjects";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { authCheck, quickAuthCheck } from "./components/auth/auth";
import { MuiThemeProvider } from "@material-ui/core/styles";
import UserProfile from "./components/pages/UserProfile";
import TermsAndConditions from "./components/pages/TermsAndCond";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import EmailSignIn from "./components/pages/EmailSignIn";
import AboutUs from "./components/pages/AboutUs";
import Feedback from "./components/pages/Feedback";
import PageNotFound from "./components/pages/PageNotFound";
import CreateProject from "./components/pages/CreateProject";
import { updateAuthData } from "./components/redux/actions";
import { logout, tabLogin } from './components/auth/auth'


//stylesheet
import "bootstrap/dist/css/bootstrap.css";
import "./Assets/css/style.css";

const App = () => {
  const theme = createMuiTheme(themeDict);
  const dispatch = useDispatch();
  const {authData} = useTrackedState()

  window.addEventListener('storage', (event) => {

    if(event.key === 'CREDENTIALS_FLUSH' && authData){
      logout(dispatch)
    }
    if(event.key === 'REQUESTING_SHARED_CREDENTIALS' && (authData && authData.user)){
    console.log('setting auth data')
    localStorage.setItem('authData', JSON.stringify(authData))
    localStorage.removeItem('authData')
    }
   
    if(event.key === 'authData' && (authData && !authData.user)){
      const newValue = JSON.parse(event.newValue)
      if (newValue&&newValue.user){
        // console.log('updating authData')
      tabLogin(dispatch, event.newValue)
      }
    }
  })

  useEffect(() => {
  
  authCheck(dispatch);
  }, []);


  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/create-challenge">
              <CreateChallenge />
            </Route>
            <Route exact path="/create-project">
              <CreateProject />
            </Route>

            <Route exact path="/search">
              <SearchProjects />
            </Route>

            <Route exact path="/explore">
              <ExploreProjects />
            </Route>

            <Route exact path="/terms-and-conditions">
              <TermsAndConditions />
            </Route>

            <Route exact path="/privacy-policy">
              <PrivacyPolicy />
            </Route>

            <Route exact path="/sign-in">
              <EmailSignIn />
            </Route>

            <Route exact path="/about-us">
              <AboutUs />
            </Route>

            <Route exact path="/feedback">
              <Feedback />
            </Route>
            {/* <Route path=":(^/@[a-z0-9]+)"> */}
            <Route exact path="/@:user">
              <UserProfile />
            </Route>
            <Route path="/:name/:id">
              <ProjectDashboard />
            </Route>
            <Route exact path={["*", "/page-not-found"]}>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
