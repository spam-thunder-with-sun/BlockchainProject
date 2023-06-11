const Oracle = artifacts.require("Oracle");

contract("Oracle", (accounts) => {
  let oracle;

  before(async () => {
    oracle = await Oracle.deployed();
  });

  it("should request and provide data", async () => {
    const url = "http://localhost:3000/data";
    const requestId = web3.utils.soliditySha3(url); // Use soliditySha3 instead of substring
    const result = 123; // Simulated external API response

    await oracle.provideData(requestId, result);
    const data = await oracle.getData(requestId);

    assert.equal(data, result, "Provided data should match the expected result");
  });
});
