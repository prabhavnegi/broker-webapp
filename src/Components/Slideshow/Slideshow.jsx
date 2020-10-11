import React from 'react';      //Import react
//Import images from specified folder
import im1 from './images/img1.jpg';        
import im2 from './images/img2.webp';
import im3 from './images/img3.jpg';
import im4 from './images/img4.jpg';
// Import pre-defined carousel API from react-bootstrap
import Carousel from 'react-bootstrap/Carousel';
// Import css file 
import './Slideshow.css';

// Create a functional component for slideshow
const Slideshow = ()=>{
    return(
      <div className='container-fluid' >
            <Carousel>  
                  <Carousel.Item style={{'height':"100%"}} > 
                  <img className="d-block w-100" src={im1} alt="First Slide"/>
                  </Carousel.Item  >
                  <Carousel.Item style={{'height':"100%"}}>
                    <img className="d-block w-100" src={im2} alt="Second Slide"/>  
                    </Carousel.Item>
                    <Carousel.Item style={{'height':"100%"}}>
                      <img className="d-block w-100" src={im3} alt="Third Slide"/>
                    </Carousel.Item>
                    <Carousel.Item style={{'height':"100%"}}>
                      <img className="d-block w-100" src={im4} alt="Fourth Slide"/>
                    </Carousel.Item>
             </Carousel>
      </div>  
    );
}

export default Slideshow;   // Export functional component
