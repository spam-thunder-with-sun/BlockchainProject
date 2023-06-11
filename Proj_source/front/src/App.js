import React from 'react'
import HelloBlockchain from './artifacts/HelloBlockchain.json'
import { DrizzleContext } from '@drizzle/react-plugin'
import { Drizzle } from "@drizzle/store";
import { newContextComponents } from "@drizzle/react-components";


const drizzleOptions = {
  contracts: [HelloBlockchain] 
}

const { AccountData, ContractData, ContractForm } = newContextComponents;

const drizzle = new Drizzle(drizzleOptions);

function App() {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
       <DrizzleContext.Consumer>
    {drizzleContext => {
      console.log(drizzleContext)
      const {drizzle, drizzleState, initialized} = drizzleContext;


      if(!initialized) {
        return "Loading..."
      }

      return (
          <ContractData contract='HelloBlockchain' method='SendResponse' drizzle={drizzle} drizzleState={drizzleState}/>
        )
      }}
  </DrizzleContext.Consumer>
      <h2>HELLLOOOOO</h2>

    </DrizzleContext.Provider>
  );
}

export default App;
