import React from 'react';
import Navbar from './Navbar';
import './../index.css';

function AboutUs() {
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <h1 className="text-3xl font-bold underline">
        Our Team:
      </h1>
        <p>
          <strong>Faccio Stefano</strong>, the ideator of our project, he was mainly responsible of the frontend.
      </p>
      <p>
          <strong>Nicolin Riccardo</strong>, worked on the smart contracts and to finilize the business plan.
      </p>
      <p>
          <strong>Zocca Guglielmo</strong>, who created the infrastructure and also worked on the smart contracts.
      </p>
    </div>
  );
}

export default AboutUs;
