import React, {useEffect,useContext}from "react";
import { BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";
import EditProfile from "./EditProfile"
import Upload from "./Upload";
import EditProp from "./EditProp";
import AddClient from "./AddClient"; 
import ImmageCropper from"./imageCropper";
import SignInSwitch from "./signInSwitch";
import Pdf from "./Pdf";
import {UserContext} from "../UserProvider/provider";



function App() {

  const {userData,isLoading,err} = useContext(UserContext)
  useEffect(()=>{
    const error = err
   if(error)
    console.log(err)
  },[err])


  return (
    
        <Router>
          <div className='broker'>
            <Switch>
              <Route path="/signIn" exact component={SignInSwitch}/>
              <Route path="/passwordReset" exact component={PasswordReset}/>
              <Route path="/Upload" exact component={Upload}/>
              <Route path="/Upload/:id" component={Upload}/>
              <Route path="/EditProp/:id" component={EditProp}/>
              <Route path="/Clients" component={AddClient}/>
              <Route path="/Pdf" component={Pdf}/>
              <Route path="/EditProfile/updateProfile" exact component={ImmageCropper}/>
              <Route path="/signUp" render={props=>{
                return isLoading?"hello":userData?<Redirect to="/" {...props}/> : <SignUp/>
              }}/>
              <Route path="/EditProfile" render={props=>{
                return isLoading?"":userData?<EditProfile {...props}/> : <Redirect to="/"/>
              }}/>
              <Route path="/" render={props=>{
                return isLoading?"hello":userData?<ProfilePage {...props}/> : <SignIn/>
              }}/>
            </Switch>
          </div>
        </Router>
      
  );
}

export default App;
