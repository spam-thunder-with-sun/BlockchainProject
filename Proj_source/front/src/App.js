//import React, { useEffect } from 'react'
//import HelloBlockchain from './artifacts/HelloBlockchain.json'
import ElectricEngine from './artifacts/ElectricEngine.json'
import { DrizzleContext} from '@drizzle/react-plugin';
import { Drizzle } from "@drizzle/store";
import { newContextComponents } from "@drizzle/react-components";




const drizzleOptions = {
  contracts: [ElectricEngine],
  events: {
    MyContract: ["addedm1"],
  },
};

const { AccountData, ContractData, ContractForm } = newContextComponents;

const drizzle = new Drizzle(drizzleOptions);

function App() {
/*
NELLA FUNZIONE PER CERTIFICAR I MOTORI ELETTRICI BISOGNA DARE PROOFO COME INPUT,
COS'è? 

INOLTRE TESTARE SE COMPAIONO NEL POSTO GIUSTO ( E IDEALMENTE SOLO SE L?UTENTE PUO ESEGUIRE LE FUNZIONI)

*/
  
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <h2>INSERT THREAD DATA:</h2>
      <ContractForm contract="ElectricalEngine" method="certificateThreads" labels={['Invoice number', 'producer']} />
      <h2>INSERT CAGE DATA</h2>
      <ContractForm contract="ElectricalEngine" method="certificateCages" labels={['Invoice number', 'producer']} />
      <h2>INSERT ENGINE DATA</h2>
      <ContractForm contract="ElectricalEngine" method="certificateEngines" labels={['proofo', 'cage invoice', 'thread invoice', 'tested temperature', 'tested tension', 'tested frequency', 'Y', 'batch id']} />

    <DrizzleContext.Consumer>
    {drizzleContext => {
      
      
      const {drizzle, drizzleState, initialized} = drizzleContext;
      
      if(!initialized) {
        return "Loading..."
      }

      /*const myEvent = drizzle.contracts.ElectricEngine.events.addedm1()
      .on("data", (event) => {
        console.log("Event Data:", event.returnValues);
        // Perform further actions with the event data
      })
      .on("error", (error) => {
        console.error("Event Error:", error);
        // Handle event error
      });
      console.log(myEvent);
      //const events = drizzleState.events[myEvent];
      //if (events) {
        //events.forEach((event) => {
          //console.log("Event Data:", event.returnValues);
          // Perform further actions with the event data
        //});
     // }*/

      return (
        
          <ContractData contract='ElectricEngine' method='isM1' drizzle={drizzle} drizzleState={drizzleState}/>
        )
      }}
  </DrizzleContext.Consumer>
  <h2>Set infos</h2>
  <DrizzleContext.Consumer>
    
    {drizzleContext => {
      
      console.log(drizzleContext)
      const {drizzle, drizzleState, initialized} = drizzleContext;


      if(!initialized) {
        return "Loading..."
      }

      return (
        
        <ContractForm drizzle={drizzle} contract='ElectricEngine' method='UserInfos'/>
        )
      }}
  </DrizzleContext.Consumer>

  <h2>Set you as m1</h2>
  <DrizzleContext.Consumer>
    
    {drizzleContext => {
      
      console.log(drizzleContext)
      const {drizzle, drizzleState, initialized} = drizzleContext;


      if(!initialized) {
        return "Loading..."
      }

      return (
        
        <ContractForm drizzle={drizzle} contract='ElectricEngine' method='addm1'/>
        )
      }}
  </DrizzleContext.Consumer>
    

  </DrizzleContext.Provider>
  );
}

export default App;
