import React from 'react';
import Navbar from './Navbar';
import './../index.css';

import stefano_foto from '../img/stefano_foto.jpg';
import guglielmo_foto from '../img/guglielmo_foto.jpg';
import riccardo_foto from '../img/riccardo_foto.jpg';

function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center my-8'>
        <h1 className="text-5xl font-semibold text-[#EEEEEE]">Our Amazing Team</h1>
      </div>
      <div className='flex items-center justify-center mb-8'>
        <div className="flex items-center gap-4 w-2/3">
          <div className="py-4 flex-1 shadow-lg rounded-lg bg-[#00ADB5]">
            <h3 className="text-center font-bold text-xl text-[#222831]">Stefano Faccio</h3> 
            <div className="p-4">
              <img src={stefano_foto}  alt="" className="rounded rounded-lg shadow border-none"></img>
            </div>
             <p className="text-center text-[#222831] font-semibold">Ideator of our project, he was mainly responsible of the frontend.</p>
          </div>

          <div className="py-4 flex-1 shadow-lg rounded-lg bg-[#00ADB5]">
            <h3 className="text-center font-bold text-xl text-[#222831]">Guglielmo Zocca</h3> 
            <div className="p-4">
              <img src={guglielmo_foto}  alt="" className="rounded rounded-lg shadow border-none"></img>
            </div>
             <p className="text-center text-[#222831] font-semibold">Created the infrastructure and also worked on the smart contracts.</p>
          </div>

          <div className="py-4 flex-1 shadow-lg rounded-lg bg-[#00ADB5]">
            <h3 className="text-center font-bold text-xl text-[#222831]">Riccardo Nicolin</h3> 
            <div className="p-4">
              <img src={riccardo_foto}  alt="" className="rounded rounded-lg shadow border-none"></img>
            </div>
             <p className="text-center text-[#222831] font-semibold">Worked on the smart contracts and to finilize the business plan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
