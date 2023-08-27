//Engine certificate tests with two producers and a testers

const project = artifacts.require("ElectricEngine");

contract("ElectricEngine", accounts => {
  it("certification process", async () => {
    const el_instance = await project.deployed({from: accounts[0]});

    await el_instance.addm2(accounts[1], {from: accounts[0]});
    await el_instance.addm1(accounts[3], {from: accounts[0]});
    await el_instance.addm1(accounts[2], {from: accounts[0]});

    await el_instance.certificateThreads(152,"TRANSIX",{from: accounts[3]});
    await el_instance.certificateCage(164,"TRANSIX",{from: accounts[3]});
    await el_instance.certificateCage(170,"TRANSIX",{from: accounts[2]});
    await el_instance.certificateThreads(140,"TRANSIX",{from: accounts[2]});

    await el_instance.certificateEngines(164, 152, 130, 230, 50, -1, "TRANSIX:12857",{from: accounts[1]});
    await el_instance.certificateEngines(170, 140 , 130, 230, 50, -1, "TRANSIX:12858",{from: accounts[1]});

    const ceritified_engine = await el_instance.isCertificatedEngines.call("TRANSIX:12857");
    const ceritified_engine2 = await el_instance.isCertificatedEngines.call("TRANSIX:12858");
 
    assert.isTrue(ceritified_engine && ceritified_engine2,"The engines aren't certified");
  });
});