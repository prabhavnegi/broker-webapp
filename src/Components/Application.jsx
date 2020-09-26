import React, {useState,useEffect,useContext}from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";
import EditProfile from "./EditProfile"
import Upload from "./Upload";
import EditProp from "./EditProp";
import AddClient from "./AddClient"; 
import Hiya from "./hiya";

import {UserContext} from "../UserProvider/provider";


function App() {

  const {user,loading,err} = useContext(UserContext)
  useEffect(()=>{
    const error = err
   if(error)
    console.log(err)
  },[err])


  return (
    
        <Router>
          <div className='broker'>
            <Switch>
              <Route path="/signIn" exact component={SignIn}/>
              <Route path="/signUp" exact component={SignUp}/>
              <Route path="/passwordReset" exact component={PasswordReset}/>
              {/*<AuthRoute path="/" exact component={ProfilePage}/>*/}
              <Route path="/" render={props=>{
                return loading?"":user?<ProfilePage {...props}/> : <SignIn/>
              }}/>
              {/*<Route path="/doom" exact component={Hiya}/>*/}
              <Route path="/Upload" exact component={Upload}/>
              <Route path="/Upload/:id" component={Upload}/>
              <Route path="/EditProp/:id" component={EditProp}/>
              <Route path="/EditProfile" render={props=>{
                return loading?"":user?<EditProfile {...props}/> : <SignIn/>
              }}/>
              <Route path="/Clients" component={AddClient}/>
            </Switch>
          </div>
        </Router>
      
  );
}

export default App;
