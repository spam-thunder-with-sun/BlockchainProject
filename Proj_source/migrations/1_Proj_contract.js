const ElectricEngine = artifacts.require("ElectricEngine");
const ElectricPump = artifacts.require("ElectricPump");

module.exports = function (deployer) {
 

deployer.deploy(ElectricEngine).then(async () => {
  // get JS instance of deployed contract
  const cEE = await ElectricEngine.deployed(); 
  // pass its address as argument for ElectricPump's constructor
  await deployer.deploy(ElectricPump, cEE.address);} )

};