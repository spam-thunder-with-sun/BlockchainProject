
const express = require('express');
const app = express();
const PORT = 3000;
const Web3 = require('web3');
const Web3WsProvider = require('web3-providers-ws');
const providerUrl = 'wss://127.0.0.1:7545';
const web3s = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
const web3 = new Web3('http://127.0.0.1:7545');

const abi = [{"inputs": [],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "bytes32",          "name": "requestId",          "type": "bytes32"        },        {          "indexed": false,          "internalType": "string",          "name": "url",          "type": "string"        }      ],      "name": "DataRequest",      "type": "event"    },    {      "anonymous": false,      "inputs": [        {          "indexed": true,          "internalType": "bytes32",          "name": "requestId",          "type": "bytes32"        },        {          "indexed": false,          "internalType": "uint256",          "name": "result",          "type": "uint256"        }      ],      "name": "DataResponse",      "type": "event"    },    {      "inputs": [        {          "internalType": "bytes32",          "name": "",          "type": "bytes32"        }      ],      "name": "data",      "outputs": [        {          "internalType": "uint256",          "name": "",          "type": "uint256"        }      ],      "stateMutability": "view",      "type": "function",      "constant": true    },    {      "inputs": [],      "name": "owner",      "outputs": [        {          "internalType": "address",          "name": "",          "type": "address"        }      ],      "stateMutability": "view",      "type": "function",      "constant": true    },    {      "inputs": [        {          "internalType": "string",          "name": "url",          "type": "string"        }      ],      "name": "requestData",      "outputs": [        {          "internalType": "bytes32",          "name": "",          "type": "bytes32"        }      ],      "stateMutability": "nonpayable",      "type": "function"    },    {      "inputs": [        {          "internalType": "bytes32",          "name": "requestId",          "type": "bytes32"        },        {          "internalType": "uint256",          "name": "result",          "type": "uint256"        }      ],      "name": "provideData",      "outputs": [],      "stateMutability": "nonpayable",      "type": "function"    },    {      "inputs": [        {          "internalType": "bytes32",          "name": "requestId",          "type": "bytes32"        }      ],      "name": "getData",      "outputs": [        {          "internalType": "uint256",          "name": "",          "type": "uint256"        }      ],      "stateMutability": "view",      "type": "function",      "constant": true    }  ];
const address = '0x0F585F5A9f3C8c2841783679BF886D5504696A28';
const contract = new web3s.eth.Contract(abi,address);

// Define a route to handle the data request
app.get('/data', (req, res) => {
  // Generate a random data value
  const data = Math.floor(Math.random() * 100);

  // Simulate a delay before sending the response
  setTimeout(() => {
    res.json({ data });
  }, 2000); // Delay of 2 seconds
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const event = contract.events.DataRequest({ fromBlock: 0 });


event
  .on('data', function(event) {
    console.log('Event data:', event.returnValues);
  })
  .on('error', function(error) {
    console.error('Event error:', error);
  });