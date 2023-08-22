//Engine certificate tests with two producers and a testers

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

    await projectinstance.addm1(accounts[2], {from: accounts[0]});


    await projectinstance.certificateThreads(4,"azienda1",{from: accounts[3]});

    await projectinstance.certificateCage(5,"azienda1",{from: accounts[3]});

    await projectinstance.certificateCage(7,"azienda2",{from: accounts[2]});
    
    await projectinstance.certificateThreads(8,"azienda2",{from: accounts[2]});



    await projectinstance.certificateEngines(5, 4, 130, 230, 50, -1, "azienda:12",{from: accounts[1]});

    await projectinstance.certificateEngines(7, 8 , 130, 230, 50, -1, "azienda1:13",{from: accounts[1]});

    


    
    const ceritified_engine = await projectinstance.isCertificatedEngines.call("azienda1:13");
    const ceritified_engine2 = await projectinstance.isCertificatedEngines.call("azienda:12");
 
    assert.isTrue(ceritified_engine && ceritified_engine2,"The engines aren't certified");
  });
});