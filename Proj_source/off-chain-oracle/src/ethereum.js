require("dotenv").config();

import Web3 from "web3";


const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER_ADDRESS));
const abi = JSON.parse(process.env.ABI);
const address = process.env.CONTRACT_ADDRESS;
const contract = web3.eth.contract(abi).at(address);


const account = () => {
  console.log("ciaoooo7")
  return new Promise((resolve, reject) => {
    console.log("ciaoooo8")
    web3.eth.getAccounts((err, accounts) => {
      if (err === null) {
        resolve(accounts[process.env.ACCOUNT_NUMBER]);
      } else {
        console.log("ciaoooo9")
        reject(err);
      }
    });
  });
};

export const createRequest = ({
  urlToQuery,
  attributeToFetch
}) => {
  return new Promise((resolve, reject) => {
    console.log("ciaoooo6");
    account().then(account => {
      console.log(account)
      console.log("ciaoooo5");
      contract.requestData(urlToQuery, {
        from: account,
        gas: 600000
      }, (err, res) => {
        
        if (err === null) {
          resolve(res);
        } else {
          console.log("ciaoooo7");
          reject(err);
        }
      });
    }).catch(error => reject(console.log("ciaoooo4")));
  });
};

export const updateRequest = ({
  id,
  valueRetrieved
}) => {
  return new Promise((resolve, reject) => {
    account().then(account => {
      contract.provideData(id, valueRetrieved, {
        from: account,
        gas: 60000000
      }, (err, res) => {
        if (err === null) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    }).catch(error => reject(error));
  });
};

export const newRequest = (callback) => {
  contract.DataRequest((error, result) => callback(error, result));
};

export const updatedRequest = (callback) => {
  contract.DataResponse((error, result) => callback(error, result));
};