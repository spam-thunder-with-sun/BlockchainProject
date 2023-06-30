const project = artifacts.require("ElectricEngine");

contract("ElectricEngine", accounts => {
  it("certification process", async () => {
    const projectinstance = await project.deployed();

    await projectinstance.addcertifier(6, {from: accounts[0]});

    //await projectinstance.UserInfos(1,2,3,4,5, { from: accounts[0] });

    //await projectinstance.addmF(6, {from: accounts[3]});

    //await projectinstance.addG(6, {from: accounts[2]});

    await projectinstance.addm2('0xCCf44CeA3140c0253D845D04973bC0D0E5eED163', {from: accounts[0]});

    await projectinstance.addm1('0x10CdeAE4C0d04aD512E017E3F7d236a463c578bB', {from: accounts[0]});

    


    await projectinstance.certificateThreads(4,"azienda1",{from: accounts[3]});

    await projectinstance.certificateCage(5,"azienda2",{from: accounts[3]});

    await projectinstance.certificateEngines(5, 4, 130, 230, 50, -1, "lotto1",{from: accounts[1]});



    
    const ceritified_engine = await projectinstance.isCertificatedEngines.call("lotto1");

    
    assert.equal(ceritified_engine, true, "The engine is not certified.");
  });
});