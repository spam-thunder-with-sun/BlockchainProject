//Engine certificate tests

const project = artifacts.require("ElectricEngine");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract("ElectricEngine", accounts => {

  before(async () => {
    el_instance = await project.deployed({from: accounts[0]});

    await el_instance.addm2(accounts[1], {from: accounts[0]});
    await el_instance.addm1(accounts[3], {from: accounts[0]});
  });

  it("certification process", async () => {
    
    await el_instance.certificateThreads(164,"TRANSIX",{from: accounts[3]});
    await el_instance.certificateCage(152,"TRANSIX",{from: accounts[3]});

    await el_instance.certificateEngines(152, 164, 130, 230, 55, -1, "TRANSIX:12856",{from: accounts[1]});

    const ceritified_engine = await el_instance.isCertificatedEngines.call("TRANSIX:12856");

    assert.equal(ceritified_engine, true, "The engine is not certified.");
  });

  it("m2 cannot certifiate threads and cages", async () => {

    await truffleAssert.reverts(
      el_instance.certificateThreads(164,"TRANSIX",{from: accounts[1]}),
        "you are not qualified user"
    );
  });

  it("wrong test data", async () => {

    await el_instance.certificateThreads(164,"TRANSIX",{from: accounts[3]});
    await el_instance.certificateCage(152,"TRANSIX",{from: accounts[3]});

    await truffleAssert.reverts(
      el_instance.certificateEngines(152, 164, 130, 231, 55, 6, "TRANSIX:12857",{from: accounts[1]}), 
        "Alimentation tension Error"
    );
  });
});