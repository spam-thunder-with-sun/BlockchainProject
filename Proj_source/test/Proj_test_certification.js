//Test to certificate a lotto of engines with a producer and a tester

const project = artifacts.require("ElectricEngine");


contract("ElectricEngine", accounts => {
  it("certification process", async () => {
    const projectinstance = await project.deployed();

    await projectinstance.addcertifier(6, {from: accounts[0]});

    //await projectinstance.UserInfos(1,2,3,4,5, { from: accounts[0] });

    //await projectinstance.addmF(6, {from: accounts[3]});

    //await projectinstance.addG(6, {from: accounts[2]});

    await projectinstance.addm2(accounts[1], {from: accounts[0]});

    await projectinstance.addm1(accounts[3], {from: accounts[0]});

    


    await projectinstance.certificateThreads(4,"azienda1",{from: accounts[3]});

    await projectinstance.certificateCage(5,"azienda2",{from: accounts[3]});

    await projectinstance.certificateEngines(5, 4, 130, 230, 50, -1, "lotto1",{from: accounts[1]});



    
    const ceritified_engine = await projectinstance.isCertificatedEngines.call("lotto1");

    
    assert.equal(ceritified_engine, true, "The engine is not certified.");
  });
});