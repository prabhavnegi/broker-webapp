import React, {useState,useEffect}from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import ProfilePage from "./Components/ProfilePage";
import PasswordReset from "./Components/PasswordReset";
import EditProfile from "./Components/EditProfile"
import Upload from "./Components/Upload";
import AuthRoute from "./auth"
import AddClient from "./Components/AddClient";
import SearchClient from "./Components/SearchClient"; 
import Hiya from "./Components/hiya"
import {auth} from "./firebase"
function App() {
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user)
        setFlag(true) 
      else
        setFlag(false)

    setLoading(false)
    })
  
  },[])
  return (
    
        <Router>
          <div className='broker'>
            <Switch>
              <Route path="/signIn" exact component={SignIn}/>
              <Route path="/signUp" exact component={SignUp}/>
              <Route path="/passwordReset" exact component={PasswordReset}/>
              <AuthRoute path="/" exact component={ProfilePage}/>
              {/*<Route path="/doom" exact component={Hiya}/>*/}
              <Route path="/Upload" exact component={Upload}/>'
              <Route path="/Upload/:id" component={Upload}/>
              <Route path="/EditProfile" render={props=>{
                return loading?"":flag?<EditProfile {...props}/> : <SignIn/>
              }}/>
              <Route path="/Clients" component={AddClient}/>
              <Route path="/Search" component={SearchClient}/>
            </Switch>
          </div>
        </Router>
      
  );
}

export default App;
