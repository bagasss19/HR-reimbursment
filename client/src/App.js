
import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar'
// import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Addform from './pages/Addform'
import Profile from './pages/Profile'
import Editform from './pages/Editform'

function App() {
  const[isAutheticated] = useState(localStorage.token ? true : false)
  
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Switch>
          <PrivateRoute exact path="/" component={Home} auth={isAutheticated}/>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/add" component={Addform} /> 
          <PrivateRoute path="/profile" component={Profile} /> 
          <PrivateRoute path="/:id" component={Editform} />
        </Switch>
        {/* <Footer/> */}
      </Router>
    </div>

  )
}

export default App;
