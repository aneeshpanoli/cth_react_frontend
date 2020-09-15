import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { themeDict } from "./components/theme/Colors";
import { createMuiTheme } from "@material-ui/core/styles";
import CreateChallenge from "./components/pages/CreateChallenge";
import ProjectHome from "./components/pages/ProjectHome";
import HomePage from "./components/pages/Home";
import SearchProjects from "./components/pages/SearchProjects";
import ExploreProjects from "./components/pages/ExploreProjects";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { authCheck } from "./components/auth/auth";
import { MuiThemeProvider } from "@material-ui/core/styles";
import UserProfile from "./components/pages/UserProfile";
import TermsAndConditions from "./components/pages/TermsAndCond";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import Auth from "./components/pages/Auth";
import AboutUs from "./components/pages/AboutUs";
import Feedback from "./components/pages/Feedback";
import PageNotFound from "./components/pages/PageNotFound";
import CreateProject from "./components/pages/CreateProject";
import EditProject from "./components/pages/EditProject";
import ClaimProject from "./components/pages/ClaimProject";
import { logout, tabLogin } from './components/auth/auth'
import PwdResetForm from './components/pages/PwdReset'
import { updateAuthData } from './components/redux/actions'
import Loading from "./components/pages/Loading";
import MTHome from './components/pages/MTHome';
import SolutionHome from './components/pages/SolutionHome';

//stylesheet
//DO NOT REMOVE BOOTSTRAP
import "./Assets/css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'swiper/swiper.less';

const App = () => {
  const theme = createMuiTheme(themeDict);
  const dispatch = useDispatch();
  const localAuth = JSON.parse(sessionStorage.getItem("authData"))
  React.useEffect(()=>{
    if(localAuth){
      dispatch(updateAuthData(localAuth))}}, [])
  const {authData} = useTrackedState()

  window.addEventListener('storage', (event) => {

    if(event.key === 'CREDENTIALS_FLUSH' && authData){
      logout(dispatch)
    }
    if(event.key === 'REQUESTING_SHARED_CREDENTIALS' && (authData && authData.user)){
    // console.log('setting auth data')
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

            <Route exact path="/loading">
              <Loading />
            </Route>

            <Route exact path="/create-challenge">
              <CreateChallenge />
            </Route>
            <Route exact path="/create-project">
              <CreateProject />
            </Route>

            <Route exact path="/edit-project">
              <EditProject />
            </Route>

            <Route exact path="/claim-project">
              <ClaimProject />
            </Route>

            <Route exact path="/search/:query">
              <SearchProjects />
            </Route>

            <Route exact path="/explore">
              <ExploreProjects />
            </Route>

            <Route exact path="/terms-and-conditions">
              <TermsAndConditions />
            </Route>

            <Route exact path="/rest-auth/password/reset/confirm/:uid/:token">
              <PwdResetForm />
            </Route>

            <Route exact path="/privacy-policy">
              <PrivacyPolicy />
            </Route>

            <Route exact path="/sign-in">
              <Auth />
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
            <Route path="/:name/:mt/:mtsol/:id">
              <SolutionHome />
            </Route>
            <Route path="/:name/:mt/:id">
              <MTHome />
            </Route>
            <Route path="/:name/:id">
              <ProjectHome />
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
