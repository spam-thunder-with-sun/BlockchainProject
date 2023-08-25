import React from 'react';
import Navbar from './Navbar';
import './../index.css';

function Home() {
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center my-8'>
        <h1 className="text-5xl font-semibold text-[#EEEEEE]">Homepage</h1>
      </div>
      <div className='flex items-center justify-center mb-8'>
        <div className="items-center gap-4 w-4/5">
          <p className='mb-8 font-medium text-lg'> Welcome to our innovative project focused on enhancing industrial product certification through cutting-edge blockchain technology. Our initiative centers around establishing a private blockchain tailored for certifying industrial products, with a primary example being the production of electrical motors and also the production of electric pumps.</p>
          <div className='flex items-center gap-4'>
            <div className="w-1/4 flex-1 shadow-lg rounded-lg bg-[#00ADB5] border-8 p-4">
              <h2 className='text-2xl font-bold text-center text-[#222831] mb-4'>Key Objectives</h2>
              <p className='text-[#222831] font-semibold'> Our primary goal is to leverage blockchain's power to ensure meticulous certification at every stage of the manufacturing process. By capturing and securely recording each step within individual blocks, we enable comprehensive verification of product batches through our blockchain. This guarantees traceability across the entire supply chain, enhancing transparency and accountability.</p>
            </div>
            <div className="w-1/4 flex-1 shadow-lg rounded-lg bg-[#00ADB5] border-8 p-4 mt-4">
              <h2 className='text-2xl font-bold text-center text-[#222831] mb-4'>Core Concept</h2>
              <p className='text-[#222831] font-semibold'>Our approach simplifies the rigorous certification process that accompanies industrial production. As manufacturers complete production batches, they can test and cross-reference their results against preset parameters in the European Certifications. Successful outcomes trigger the creation of blockchain blocks, safeguarding the conformity of each batch.</p>
            </div>
            <div className="w-1/4 flex-1 shadow-lg rounded-lg bg-[#00ADB5] border-8 p-4 mt-8">
              <h2 className='text-2xl font-bold text-center text-[#222831] mb-4'>Private Blockchain Advantage</h2>
              <p className='text-[#222831] font-semibold'>Our system operates on a private blockchain architecture, eliminating the need for cryptocurrency to facilitate functionality. This design choice optimizes usability for smaller industries seeking supply chain transparency without the complexity of starting a blockchain from scratch.</p>
            </div>
            <div className="w-1/4 flex-1 shadow-lg rounded-lg bg-[#00ADB5] border-8 p-4 mt-16">
              <h2 className='text-2xl font-bold text-center text-[#222831] mb-4'>User-Friendly Certification</h2>
              <p className='text-[#222831] font-semibold'>Users of our blockchain can easily verify the certification status of specific batches using unique codes. This feature empowers stakeholders to ensure the legitimacy of products promptly and confidently.</p>
            </div>
          </div>
        </div>
      </div>




    </div>
  );
}

export default Home;
