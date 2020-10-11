import React from 'react';                                      //Import react
import './Navbar.css';
import {Link} from 'react-router-dom';
import '../Footer/Footer.css';
const NavBar= ()=>{

    return(
      <div>
           
            <nav className="navbar fixed-top navbar-light bg-light">
              <a className="navbar-brand" href="/" id="title">Broker.com</a>
              <form className="form-inline">
                <Link to='/signIn' className="btn btn-outline-success" id="login" type="button">Login</Link>
                <Link to='/signUp' className="btn btn-outline-success" id="register" type="button">Register</Link>
            </form>
            </nav>

          
      </div>
    );
}

export default NavBar;
