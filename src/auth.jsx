import React from "react"
import {useEffect,useState} from "react";
import {useHistory} from "react-router";
import {auth,getUserDocument} from "../src/firebase";
import {Route} from "react-router-dom";

 const AuthRoute = ({ component: Component, ...rest }) => {
    let history = useHistory()
    const [login, setLogin] = useState(false)
    const [loadingAuth, setLoadingAuth] = useState(true)

    useEffect(() => {
      auth.onAuthStateChanged(async user => {
        if (user) {
          const userDoc = await getUserDocument(user)
          if(userDoc)
            setLogin(true)
          else
            setLogin(false)
        } else {
          setLogin(false)
        }
        setLoadingAuth(false)
      })
    }, [])
    return loadingAuth ? "" : (
      <Route
        {...rest}
        render={props =>
          login ? (
            <Component {...props} />
          ) : (
            history.push("/signIn")
          )}
      />
    )
  }

  export default AuthRoute;