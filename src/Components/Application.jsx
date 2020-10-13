import React, {useEffect,useContext}from "react";
import { BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "../Components/Dashboard_components/ProfilePage";
import PasswordReset from "./PasswordReset";
import EditProfile from "./EditProfile"
import EditProp from "./EditProp";
import AddClient from "./AddClient"; 
import ImmageCropper from"./imageCropper";
import SignInSwitch from "./signInSwitch";
import Pdf from "./Pdf";
import {UserContext} from "../UserProvider/provider";
import ClippedDrawer from './Dashboard_components/dashboard_material';
import HomePage from './HomePage';



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
              <Route path="/EditProp/:id" component={EditProp}/>
              <Route path="/Clients"  exact component={AddClient}/>
              <Route path="/Pdf" exact component={Pdf}/>
              <Route path="/homepage" exact component={HomePage}/>
              <Route path="/EditProfile/updateProfile" exact component={ImmageCropper}/>
              <Route path="/dash" render={props=>{
                return isLoading?"":userData?<ClippedDrawer {...props}/> : <Redirect to="/"/>
              }}/>
              <Route path="/signUp" render={props=>{
                return isLoading?"hello":userData?<Redirect to="/" {...props}/> : <SignUp/>
              }}/>
              <Route path="/EditProfile" render={props=>{
                return isLoading?"":userData?<EditProfile {...props}/> : <Redirect to="/"/>
              }}/>

              <Route path="/" render={props=>{
                return isLoading?"loading":userData?<ProfilePage {...props}/> : <SignIn/>
              }}/>
            </Switch>
          </div>
        </Router>
      
  );
}

export default App;
