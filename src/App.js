import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import DashBoard from './components/dashBoard/dashBoard'
import HomePage from './components/content/home'

//stylesheet
import 'bootstrap/dist/css/bootstrap.css'
import './Assets/css/style.css'

const App = () => {


  const [checked] = useState(true);
  
  return (
   

      <Router >
      <div className="App"> 
      <Switch>
      <Route exact path={["/", "/dashboard/"]}>
        <HomePage />
        </Route>
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
        <Route path="/dashboard/:id">
        <DashBoard /> 
        </Route>
        </Switch>       
      </div>
      </Router>
    );
  }

export default App;
