import React,{createContext,useEffect,useState} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import { useDocument } from 'react-firebase-hooks/firestore';
import {auth,UserCheck} from "../firebase";


export const UserContext= createContext()

export const UserProvider = (props) => {

         const [user,loading,error] = useAuthState(auth)
         const [userData, setUser] = useState(null)
        const [isLoading,setLoading] = useState(true)


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
        
         useEffect(() => {
            if(!loading)
                {
                    if(user)
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