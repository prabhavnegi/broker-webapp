import React from 'react';
import Slideshow from '../Components/Slideshow/Slideshow';
import Footer from '../Components/Footer/Footer';
import NavBar from '../Components/Navbar/Navbar';

const HomePage=()=>{

    return(
        <div>
        <div>
            <NavBar></NavBar>
            <Slideshow/>

        </div>
        <div>
            <Footer></Footer>
        </div>
        </div>
    
    );


};


export default HomePage;