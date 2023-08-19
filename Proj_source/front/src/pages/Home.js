import React from 'react';
import Navbar from './Navbar';
import './../index.css';

function Home() {
  return (



    <div>
    <Navbar />
    <div className='flex items-center justify-center my-8'>
      <h1 className="text-3xl font-bold text-[#EEEEEE]">Homepage</h1>
    </div>
    <div className='flex items-center justify-center mb-8'>
      <div className="flex items-center gap-4 w-2/3">
        This project was born to provide a secure way to certify the process of manufacturing of multiple products to make sure that they comply with
        the European regulation and operate inside their optimal parameter. It also provides a way to track all the steps in the production, 
from the prime materials to the final product and all eventual intermediate phases.
      </div>
    </div>
  </div>
  );
}

export default Home;
