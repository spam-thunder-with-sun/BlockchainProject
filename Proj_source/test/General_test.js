//General tests

const project = artifacts.require("ElectricEngine");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract("ElectricEngine", accounts => {

  before(async () => {
    projectinstance = await project.deployed({from: accounts[0]});

    await projectinstance.addm2(accounts[1], {from: accounts[0]});

    await projectinstance.addm1(accounts[3], {from: accounts[0]});
  });

  it("Delete m1", async () => {
    


    await projectinstance.delm1({from: accounts[3]});

    
    const ism1 = await projectinstance.isM1.call({from: accounts[2]});

    
    assert.equal(ism1, false, "The engine is not certified.");
  });

});