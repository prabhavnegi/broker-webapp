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
import ImmageCropper from"./imageCropper";

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
              <Route path="/Upload" exact component={Upload}/>
              <Route path="/Upload/:id" component={Upload}/>
              <Route path="/EditProp/:id" component={EditProp}/>
              <Route path="/Clients" component={AddClient}/>
              <Route path="/EditProfile/updateProfile" exact component={ImmageCropper}/>
              <Route path="/EditProfile" render={props=>{
                return loading?"hello":user?<EditProfile {...props}/> : <SignIn/>
              }}/>
              
              <Route path="/" render={props=>{
                return loading?"hello":user?<ProfilePage {...props}/> : <SignIn/>
              }}/>
            </Switch>
          </div>
        </Router>
      
  );
}

export default App;
