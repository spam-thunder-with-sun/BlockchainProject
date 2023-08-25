import React from 'react';
import { Link } from 'react-router-dom';
import './../css/navbar.css';

function Navbar() {
    return (
        <div className='navbar'>
            <div className='navbar-logo'>
                CERTICHAIN
            </div>
            <ul className='navbar-menu'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/createmotor">Certificate Engine</Link></li>
                <li><Link to="/createpump">Certificate Pump</Link></li>
                <li><Link to="/verifycertification">Verify Certification</Link></li>
                <li><Link to="/aboutus">About Us</Link> </li>
            </ul>
        </div>
    )
}

export default Navbar;