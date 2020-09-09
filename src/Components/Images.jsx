import React from "react";
import { UserContext } from "../providers/UserProvider";


const Images = (url) => {
    console.log("wow")
    return (
            <div>
              <img src={url.url}/>
            </div>
    )
}


export default Images;