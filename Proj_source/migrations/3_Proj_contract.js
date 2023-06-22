const ElectricEngine = artifacts.require("ElectricEngine");

module.exports = function (deployer) {
  deployer.deploy(ElectricEngine);
};