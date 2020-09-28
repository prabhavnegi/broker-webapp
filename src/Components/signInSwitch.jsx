import React,{useEffect} from "react";

import { useHistory } from "react-router";


const SignInSwitch = () => {

    
    const history=useHistory();
    
    useEffect(() => {
    console.log("switched to / ")
     history.push("/")
    },[])

    return (
        <div>
        </div>
    )


}

export default SignInSwitch ;
