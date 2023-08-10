import React from 'react';
import Navbar from './Navbar';
import './../index.css';

function AboutUs() {
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <h1 className="text-3xl font-bold underline">
        About Us!
      </h1>
    </div>
  );
}

export default AboutUs;