import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { themeDict } from './components/theme/Colors'
import { createMuiTheme } from '@material-ui/core/styles';

import DashBoard from "./components/dashBoard/dashBoard";
import HomePage from "./components/content/Home";
import SearchProjects from "./components/pages/SearchProjects";
import ExploreProjects from './components/pages/ExploreProjects'
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { authCheck, quickAuthCheck } from "./components/auth/auth";
import { MuiThemeProvider } from '@material-ui/core/styles';

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

          <Route path="/dashboard/:id">
            <DashBoard />
          </Route>

          <Route exact path="/solve">
            <SearchProjects />
          </Route>

          <Route exact path="/explore">
            <ExploreProjects />
          </Route>

        </Switch>
      </div>
    </Router>
    </MuiThemeProvider>
  );
};

export default App;
