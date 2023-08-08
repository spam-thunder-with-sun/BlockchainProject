import React from 'react';
import Navbar from '../pages/Navbar';

function MainLayout({children}) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default MainLayout;