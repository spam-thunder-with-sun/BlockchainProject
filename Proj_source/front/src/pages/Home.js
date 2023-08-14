import React from 'react';
import Navbar from './Navbar';
import './../index.css';

function Home() {
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    <p>
    This project was born to provide a secure way to certify the process of manufacturing of multiple products to make sure that they comply with
    the European regulation and operate inside their optimal parameter. It also provides a way to track all the steps in the production, 
    from the prime materials to the final product and all eventual intermediate phases.
    </p>
    </div>
  );
}

export default Home;
