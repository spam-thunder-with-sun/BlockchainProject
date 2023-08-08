import React from 'react';
import { Link } from 'react-router-dom';

function Navbar()
{
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/verify">Verify</Link></li>
                    <li><Link to="/old">Old</Link> </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;