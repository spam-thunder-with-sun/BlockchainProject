//PROJECT FRONTEND


import ElectricEngine from './artifacts/ElectricEngine.json' //import project contract

//import drizzle components
import { DrizzleContext} from '@drizzle/react-plugin'; 
import { Drizzle } from "@drizzle/store";
import { newContextComponents } from "@drizzle/react-components";



//Set contract in drizzle option
const drizzleOptions = {
  contracts: [ElectricEngine],
};

const { AccountData, ContractData, ContractForm } = newContextComponents;

const drizzle = new Drizzle(drizzleOptions);

//Function to ask if the engines lot is certified
function lotCert(){
  var state = drizzle.store.getState();
  var lotto = document.getElementById('lot').value;
  
  // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
  if (state.drizzleStatus.initialized) {
    
    //Call contract's method
    const dataKey = drizzle.contracts.ElectricEngine.methods.isCertificatedEngines(lotto).call();
    //Visualize the answer
    dataKey.then(value => { document.getElementById('risp').innerHTML = value;})
    
    
   
  }

  

}

    

//Web app function
function App() {

  
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
        //Call contract's method
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
        //Call contract's method
        <ContractForm drizzle={drizzle} contract='ElectricEngine' method='addm2'/>
        )
      }}
  </DrizzleContext.Consumer>
  <h2>Certify threads</h2>
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
  <h2>Certify cages</h2>
  <DrizzleContext.Consumer>
    
    {drizzleContext => {
      
      //console.log(drizzleContext)
      const {drizzle, drizzleState, initialized} = drizzleContext;


      if(!initialized) {
        return "Loading..."
      }

      return (
        //Call contract's method
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
        //Call contract's method
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
