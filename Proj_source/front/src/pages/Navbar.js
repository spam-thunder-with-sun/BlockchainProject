import React from 'react';
import { Link } from 'react-router-dom';
import './../css/navbar.css';

function Navbar() {
    return (
        <div className='navbar'>
            <div className='navbar-logo'>
                Certification Engine Group
            </div>
            <ul className='navbar-menu'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/verify">Verify certification</Link></li>
                <li><Link to="/old">Old</Link> </li>
                <li><Link to="/aboutus">About Us</Link> </li>
            </ul>
        </div>
    )
}

export default Navbar;