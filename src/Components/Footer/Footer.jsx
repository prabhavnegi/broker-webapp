import React from "react";
import "./Footer.css";
import 'react-bootstrap';

const Footer=()=> {
  return (
    
    <div className="main-footer">
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} THICC MEMES | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
    </div>
  );
}

export default Footer;