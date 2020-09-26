import React,{createContext} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";


export const UserContext= createContext()

export const UserProvider = (props) => {

         const [user, loading, error] = useAuthState(auth)

    return(
        <UserContext.Provider value={{user,loading,error}}>
            {props.children}
        </UserContext.Provider>
    )
}