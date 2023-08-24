//Pump certificate tests

const el = artifacts.require("ElectricEngine");
const pu = artifacts.require("ElectricPump");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract("ElectricEngine", accounts => {

  before(async () => {
    el_instance = await el.deployed({from: accounts[0]});

    pu_instance = await pu.deployed({from: accounts[0]});

    await el_instance.addm2(accounts[1], {from: accounts[0]});

    await el_instance.addm1(accounts[3], {from: accounts[0]});

    await pu_instance.addm2(accounts[1], {from: accounts[0]});

    await pu_instance.addm1(accounts[3], {from: accounts[0]});
  });

  it("certification process with engine invoice", async () => {
    


    await el_instance.certificateThreads(4,"azienda1",{from: accounts[3]});

    await el_instance.certificateCage(5,"azienda2",{from: accounts[3]});

    await el_instance.certificateEngines(5, 4, 130, 230, 55, -1, "lotto1",{from: accounts[1]});



    await pu_instance.certificateBody(5,"azienda4",{from: accounts[3]});
    await pu_instance.certificateEngine(4,"azienda3",{from: accounts[3]});

    await pu_instance.certificatePumpA(5,4, 50, 2850, 15, 135, "lotto3",{from: accounts[1]});

    
    const ceritified_pump = await pu_instance.isCertificatedPump.call("lotto3");

    
    assert.equal(ceritified_pump, true, "The engine is not certified.");

  });

  it("certification process with ElectricEngine contract", async () => {
    


    await el_instance.certificateThreads(4,"azienda1",{from: accounts[3]});

    await el_instance.certificateCage(5,"azienda2",{from: accounts[3]});

    await el_instance.certificateEngines(5, 4, 130, 230, 55, -1, "lotto1",{from: accounts[1]});



    await pu_instance.certificateBody(5,"azienda2",{from: accounts[3]});

    await pu_instance.certificatePumpT(5,"lotto1", 50, 2850, 15, 135, "lotto3",{from: accounts[1]});

    
    const ceritified_pump = await pu_instance.isCertificatedPump.call("lotto3");

    
    assert.equal(ceritified_pump, true, "The engine is not certified.");

  });
  });