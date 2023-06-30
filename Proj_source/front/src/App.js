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

function lotCert(lotto){
  var state = drizzle.store.getState();

  // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
  if (state.drizzleStatus.initialized) {
    
    // Declare this call to be cached and synchronized. We'll receive the store key for recall.
    const dataKey = drizzle.contracts.ElectricEngine.methods.isCertificatedEngines(lotto).call();
    dataKey.then(value => { document.getElementById('risp').innerHTML = value;})
    
    // Use the dataKey to display data from the store.
   
  }

// If Drizzle isn't initialized, display some loading indication.


}


function App() {
/*
NELLA FUNZIONE PER CERTIFICAR I MOTORI ELETTRICI BISOGNA DARE PROOFO COME INPUT,
COS'è? 

INOLTRE TESTARE SE COMPAIONO NEL POSTO GIUSTO ( E IDEALMENTE SOLO SE L?UTENTE PUO ESEGUIRE LE FUNZIONI)

*/
  
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
    
    <h2>Set you as certifier</h2>
    <DrizzleContext.Consumer>
    
    {drizzleContext => {
      
      
      const {drizzle, drizzleState, initialized} = drizzleContext;
      
      if(!initialized) {
        return "Loading..."
      }

      return (
        
        <ContractForm drizzle={drizzle} contract='ElectricEngine' method='addcertifier'/>
        
      )

      //console.log(drizzle.contracts.ElectricEngine)
     //const { returnVariable } = drizzle.contracts.ElectricEngine.methods.isM1.cacheCallFunction();
     //console.log(returnVariable)// Replace "functionName" with the actual name of the function
      //return returnVariable;
      }}
  </DrizzleContext.Consumer>
  <h2>Add m1</h2>
  <DrizzleContext.Consumer>
    
    {drizzleContext => {
      
      //console.log(drizzleContext)
      const {drizzle, drizzleState, initialized} = drizzleContext;


      if(!initialized) {
        return "Loading..."
      }

      return (
        
        <ContractForm drizzle={drizzle} contract='ElectricEngine' method='addm1'/>
        )
      }}
  </DrizzleContext.Consumer>

  <h2>Add m2</h2>
  <DrizzleContext.Consumer>
    
    {drizzleContext => {
      
      //console.log(drizzleContext)
      const {drizzle, drizzleState, initialized} = drizzleContext;


      if(!initialized) {
        return "Loading..."
      }

      //const myEvent = drizzle.contracts.ElectricEngine.events.addedm1()
      //.on("change", (event) => {
       // console.log("Event Data:", event.returnValues);
        
        // Perform further actions with the event data
     // })
      //.on("error", (error) => {
        //console.error("Event Error:", error);
        // Handle event error
      //});
      //console.log(myEvent);
      //const events = drizzleState.events[myEvent];
      //if (events) {
        //events.forEach((event) => {
          //console.log("Event Data:", event.returnValues);
          // Perform further actions with the event data
        //});
     // }

      return (
        
        <ContractForm drizzle={drizzle} contract='ElectricEngine' method='addm2'/>
        )
      }}
  </DrizzleContext.Consumer>
  <h2>Certificate threads</h2>
  <DrizzleContext.Consumer>
    
    {drizzleContext => {
      
      //console.log(drizzleContext)
      const {drizzle, drizzleState, initialized} = drizzleContext;


      if(!initialized) {
        return "Loading..."
      }

      return (
        
        <ContractForm drizzle={drizzle} contract='ElectricEngine' method='certificateThreads'/>
        )
      }}
  </DrizzleContext.Consumer>
  <h2>Certificate cages</h2>
  <DrizzleContext.Consumer>
    
    {drizzleContext => {
      
      //console.log(drizzleContext)
      const {drizzle, drizzleState, initialized} = drizzleContext;


      if(!initialized) {
        return "Loading..."
      }

      return (
        
        <ContractForm drizzle={drizzle} contract='ElectricEngine' method='certificateCage'/>
        )
      }}
  </DrizzleContext.Consumer>

  <h2>Test engine</h2>
  <DrizzleContext.Consumer>
    
    {drizzleContext => {
      
      //console.log(drizzleContext)
      const {drizzle, drizzleState, initialized} = drizzleContext;


      if(!initialized) {
        return "Loading..."
      }

      return (
        
        <ContractForm drizzle={drizzle} contract='ElectricEngine' method='certificateEngines'/>
        )
      }}
  </DrizzleContext.Consumer>
  <h2>Verify if your lotto is certified</h2>
  <form>
      <input id="lot" type="text" name="lott" placeholder="lott" ></input>
      <button type="button" onClick={lotCert}>Submit</button>
  </form>
  <p id="risp"></p>
 
  </DrizzleContext.Provider>
  );
}

export default App;
