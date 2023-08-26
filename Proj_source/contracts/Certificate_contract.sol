//Base certification contract

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract BaseCertContract {
    mapping(address => bool) internal m1; //producer
    mapping(address => bool) internal m2; //tester
    
    address internal certifier; //who creates, adds tester and producer.

    mapping(address => uint256) internal timem1; //block when the service ends for producer
    mapping(address => uint256) internal timem2; //block when the service ends for tester

    //Events with information goal
    event addedm1(address indexed user);
    event addedm2(address indexed user);

    constructor() public{
      certifier = msg.sender; //the certifier is who deploys the contract
    }

    //Modifier that check if the caller is a certifier
    modifier isCertifier{
      require(certifier == msg.sender, "you are not a certifier");
      _;
    }

    //Modifier that check if the caller is a producer
    modifier ism1{
      require(m1[msg.sender] == true, "you are not qualified user");
      _;
    }

    //Modifier that check if the caller is a tester
    modifier ism2{
      require(m2[msg.sender] == true, "you are not qualified user");
      _;
    }

    //delete caller as a producer
    function delm1() external ism1{ 
        delete timem1[msg.sender];
        delete m1[msg.sender];
    }  

    //Delete caller as a tester
    function delm2() external ism2{ 
        delete timem2[msg.sender];
        delete m2[msg.sender];
    }  

    //Add the ut1 as a producer
    function addm1(address  ut1) external isCertifier{ 
        require(certifier != ut1, "A ceritifier cannot be also a producer");
        require(timem1[ut1]<block.number,"you have still time");
        timem1[ut1] = SafeMath.add(block.number, 40); //Assign to the producer the block where its service ends
        m1[ut1] = true; //ut1 is a producer
        emit addedm1(ut1);
    } 

    //Add the ut2 as a producer
    function addm2(address ut2) external isCertifier{
        require(certifier != ut2, "A ceritifier cannot be also a tester");
        require(timem2[ut2]<block.number,"you have still time");
        timem2[ut2] = SafeMath.add(block.number, 40); //Assign to the tester the block where its service ends
        m2[ut2] = true; //ut2 is a tester
        emit addedm2(ut2);
    } 

    //Check if the caller is a certifier
    function isCertifier_() view external returns(bool){
        return certifier == msg.sender;
    }  

    //Check if the caller is a producer
    function isM1() view external returns(bool) {
        return m1[msg.sender];
    }   

    //Check if the caller is a tester
    function isM2() view external returns(bool){
        return m2[msg.sender];
    }  
}
