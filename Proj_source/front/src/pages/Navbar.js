import React from 'react';
import { Link } from 'react-router-dom';
import './../css/navbar.css';

function Navbar() {
    return (
        <div className='navbar'>
            <div className='navbar-logo'>
                Funestovento
            </div>
            <ul className='navbar-menu'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/verify">Verify</Link></li>
                <li><Link to="/old">Old</Link> </li>
            </ul>
        </div>
    )
}

export default Navbar;