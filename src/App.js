import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import DashBoard from './components/dashBoard/dashBoard'
import HomePage from './components/content/home'
import { Provider } from 'reactive-react-redux';
import store from './components/redux/store'
//stylesheet
import 'bootstrap/dist/css/bootstrap.css'
import './Assets/css/style.css'

const App = () => {


  const [checked] = useState(true);
  
  return (
    <Provider store={store}>

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
      </Provider>
    );
  }

export default App;
