const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic = "glimpse mixture adjust mammal clean virus unaware radar asthma twenty simple feel"
module.exports = {
  contracts_build_directory: './front/src/artifacts/',
  networks: {
    development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "5777"
    },
    dashboard: {
    }
  },
  /*networks: {
    sepolia: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "wss://sepolia.infura.io/ws/v3/db79a4096ed3445abe8dfe83ef54da6e")
      },
      network_id: 11155111
    }
  },*/
  compilers: {
    solc: {
      version: "0.8.13",
    }
  },
  db: {
    enabled: false,
    host: "127.0.0.1",
  }
};
