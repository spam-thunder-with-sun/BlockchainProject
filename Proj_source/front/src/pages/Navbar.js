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
                <li><Link to="/createmotor">Create motor</Link></li>
                <li><Link to="/verifycertification">Verify certification</Link></li>
                {/*<li><Link to="/admin">Admin</Link> </li>*/}
                <li><Link to="/aboutus">About Us</Link> </li>
                <li><Link to="/old" className='bg-[#EEEEEE] text-[#393E46] p-1 rounded-md'>Old Page</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;