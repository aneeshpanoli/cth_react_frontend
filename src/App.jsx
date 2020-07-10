import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { themeDict } from './components/theme/Colors'
import { createMuiTheme } from '@material-ui/core/styles';
import CreateChallenge from './components/pages/CreateChallenge'
import ProjectDashboard from "./components/pages/ProjectDashboard";
import HomePage from "./components/pages/Home";
import SearchProjects from "./components/pages/SearchProjects";
import ExploreProjects from './components/pages/ExploreProjects'
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { authCheck, quickAuthCheck } from "./components/auth/auth";
import { MuiThemeProvider } from '@material-ui/core/styles';
import UserProfile from './components/pages/UserProfile'
import TermsAndConditions  from './components/pages/TermsAndCond'
import PrivacyPolicy from './components/pages/PrivacyPolicy'
//stylesheet
import "bootstrap/dist/css/bootstrap.css";
import "./Assets/css/style.css";

const App = () => {
  const theme = createMuiTheme(themeDict);
  const { authData } = useTrackedState();
  const dispatch = useDispatch();
  quickAuthCheck(authData, dispatch);

  useEffect(() => {
    authCheck(authData, dispatch);
    // console.log(authData);
  }, []);

  const [checked] = useState(true);

  return (
    <MuiThemeProvider theme={theme}>
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={["/", "/dashboard/"]}>
            <HomePage />
          </Route>

          <Route exact path="/create">
              <CreateChallenge />
            </Route>

          <Route path="/dashboard/:id">
            <ProjectDashboard />
          </Route>

          <Route exact path="/solve">
            <SearchProjects />
          </Route>

          <Route exact path="/me">
              <UserProfile />
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

        </Switch>
      </div>
    </Router>
    </MuiThemeProvider>
  );
};

export default App;
