import React,{createContext,useEffect,useState} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";

import {auth,UserCheck} from "../firebase";


export const UserContext= createContext()

export const UserProvider = (props) => {

         const [user,loading,error] = useAuthState(auth)
         const [userData, setUser] = useState(null)
        const [isLoading,setLoading] = useState(true)


        
         useEffect(() => {
            const fun = async () => {
                const x = await UserCheck(user)
                if(x)
                 {  
                    console.log("yes doc")
                    setUser(x)
                    setLoading(false)
                }
                else
                {  
                    console.log("no doc")
                   setUser(null)
                   setLoading(false)
                }
            }
            
            if(!loading)
                {
                    if(user && user.emailVerified)
                        fun()
                    else
                        {
                            console.log("no user")
                            setUser(null)
                            setLoading(false)
                        }
                }
         }, [user,loading]);

    return(
        <UserContext.Provider value={{userData,isLoading,error}}>
            {props.children}
        </UserContext.Provider>
    )
}