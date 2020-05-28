import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import DashBoard from './components/content/dashBoard'
import HomePage from './components/content/home'

//stylesheet
import 'bootstrap/dist/css/bootstrap.css'
import './Assets/css/style.css'
import Fade from '@material-ui/core/Fade';




const App = () => {


  const [checked] = useState(true);
  
  return (
      <Router >
      <div className="App"> 
      <Switch>
      <Route exact path="/">
        <HomePage />
        </Route>
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
        <Route exact path="/dashboard">
        <Fade in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
        <DashBoard /> 
        </Fade>
        </Route>
        </Switch>       
      </div>
      </Router>
    );
  }

export default App;
