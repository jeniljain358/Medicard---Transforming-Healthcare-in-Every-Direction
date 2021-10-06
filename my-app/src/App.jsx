import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Home from "./Home";
import Contact from "./Contact";
import Service from "./Service";
import UploadDoc from "./Upload";
import Register from "./Register";
import Navbar from "./Navbar";
import Dash from "./Dash";
import Search from "./Search";
import DocProfile from "./DocProfile";

import Breathe from "./Breathe";
import Chat from "./Chat";
import Data from "./Data";
import {AuthContext} from "./context/auth";
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from 'react'

const App =() => {

    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [user , setUser] = useState({});


    const login= ()=>{
      setIsLoggedIn(true);
    }
    const auth = useContext(AuthContext)
    const logout= ()=>{
      setIsLoggedIn(false);
    }

    const setLoggedInUser=(lUser)=>{
      console.log(lUser.user);
      setUser({
        id:lUser.user._id,
        name:lUser.user.name,
        age:lUser.user.age,
        allergies:lUser.user.allergies,
        email:lUser.user.email
      })
    }

    return (
        <AuthContext.Provider value={{user:user,setLoggedInUser:setLoggedInUser, isLoggedIn:isLoggedIn, login:login,logout:logout}}>
          <Router>
          <Navbar />
          <Switch>
              <Route exact path= "/" component={Home} />
              <Route exact path= "/uploadDoc" component={UploadDoc} />
              <Route exact path= "/service" component={Service} />
              <Route exact path= "/contact" component={Contact} />
              <Route exact path= "/register" component={Register} />
              <Route exact path= "/dash" component={Dash} />
              <Route exact path= "/search" component={Search} />
              <Route exact path= "/docprofile" component={DocProfile} />
              <Route exact path= "/chat" component={Chat} />
              <Route exact path= "/data" component={Data} />
              <Route exact path= "/breathe" component={Breathe} />
              <Redirect to="/" />
          </Switch>
          </Router>
        </AuthContext.Provider>
    );
};

export default App;
