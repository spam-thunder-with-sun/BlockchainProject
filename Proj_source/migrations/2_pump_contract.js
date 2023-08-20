const ElectricPump = artifacts.require("ElectricPump");

module.exports = function (deployer) {
  deployer.deploy(ElectricPump);
};