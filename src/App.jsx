import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import DashBoard from "./components/dashBoard/dashBoard";
import HomePage from "./components/content/Home";
import SearchProjects from "./components/pages/SearchProjects";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { authCheck, quickAuthCheck } from "./components/auth/auth";
//stylesheet
import "bootstrap/dist/css/bootstrap.css";
import "./Assets/css/style.css";

const App = () => {
  const { authData } = useTrackedState();
  const dispatch = useDispatch();
  quickAuthCheck(authData, dispatch);

  useEffect(() => {
    authCheck(authData, dispatch);
    // console.log(authData);
  }, []);

  const [checked] = useState(true);

  return (
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

        </Switch>
      </div>
    </Router>
  );
};

export default App;
