import React from 'react';
import Application from "./Components/Application";
import {UserProvider} from "./UserProvider/provider";
const App = () => {
  return(
    <UserProvider>
         <Application/>
    </UserProvider>
   
  )
}

export default App;