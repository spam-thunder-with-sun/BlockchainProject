const project = artifacts.require("ElectricEngine");

contract("ElectricEngine", accounts => {
  it("certification process", async () => {
    const projectinstance = await project.deployed();

    await projectinstance.addmF(6, {from: accounts[3]});

    await projectinstance.addG(6, {from: accounts[2]});

    await projectinstance.addm2(6, {from: accounts[1]});

    await projectinstance.addm1(6, {from: accounts[0]});

    await projectinstance.UserInfos(1,2,3,4,5, { from: accounts[0] });

    await projectinstance.UserProofs(1,2,3,4,5, { from: accounts[0] });

    await projectinstance.certificateSteels(2,"motore1",{from: accounts[3]});

    await projectinstance.certificateCoppers(3,"motore1",{from: accounts[2]});

    await projectinstance.certificateThreads(4,"motore1",{from: accounts[3]});

    await projectinstance.certificateCages(5,"motore1",{from: accounts[2]});

    await projectinstance.certificateEngines(6,"motore1",{from: accounts[0]});



    
    const ceritified_engine = await projectinstance.isCertificatedEngines.call("motore1");

    
    assert.equal(ceritified_engine, true, "The engine is not certified.");
  });
});