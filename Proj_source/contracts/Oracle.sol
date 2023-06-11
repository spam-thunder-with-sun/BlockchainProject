// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Oracle {
    address public owner;
    mapping(bytes32 => uint256) public data;

    event DataRequest(bytes32 indexed requestId, string url);
    event DataResponse(bytes32 indexed requestId, uint256 result);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    function requestData(string memory url) public returns (bytes32) {
        bytes32 requestId = keccak256(abi.encodePacked(url));
        data[requestId] = 0;
        emit DataRequest(requestId, url);
        return requestId;
    }

    function provideData(bytes32 requestId, uint256 result) public onlyOwner {
        require(data[requestId] == 0, "Data for the request already provided");
        data[requestId] = result;
        emit DataResponse(requestId, result);
    }

    function getData(bytes32 requestId) public view returns (uint256) {
        return data[requestId];
    }
}
