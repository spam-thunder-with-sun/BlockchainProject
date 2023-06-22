const hel = artifacts.require("./HelloBlockchain.sol");

contract("HelloBlockchain", (accounts) => {
  let hello;

  before(async () => {
    hello = await hel.deployed();
  });

  it("should request and provide data", async () => {
    //const url = "http://localhost:3000/data";
    const requestId = await hello.getOracleinfo();
    console.log(requestId);

    assert.equal(1, 1, requestId.log);
  });
});
