//Base certification contract

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract BaseCertContract {
    mapping(address => bool) internal m1; //producer that certifies bodyworks and engines

    mapping(address => bool) internal m2; //user that test pump
    address internal certifier; //who specified the parameter for the verification.

    mapping(address => uint256) internal timem1;//block when the service ends for m1

    mapping(address => uint256) internal timem2;//block when the service ends for m1

    //Events with information goal
    event addedm1(address indexed user);
    event addedm2(address indexed user);

    constructor() public{
      certifier = msg.sender;     
    }

    function addcertifier(int infop) external{
        require(infop>3,"you aren't a cetifier");
        certifier = msg.sender;
    }

    modifier isCertifier{
      require(certifier == msg.sender, "you are not a certifier");
      _;


    }

    modifier ism1{
      require(m1[msg.sender] == true, "you are not qualified user");
      _;


    }

    modifier ism2{
      require(m2[msg.sender] == true, "you are not qualified user");
      _;


    }

    function delm1(address  ut1) external ism1{ 

        delete timem1[ut1];
        delete m1[ut1];
    }  

    function delm2(address  ut2) external ism2{ 

        delete timem2[ut2];
        delete m2[ut2];
    }  

    function addm1(address  ut1) external isCertifier{ 
        
        require(certifier != ut1, "A ceritifier cannot be also a M1");
        require(timem1[ut1]<block.number,"you have still time");
        timem1[ut1] = SafeMath.add(block.number, 40); //Assign to the producer the block where its service ends
        m1[ut1] = true; //ut1 is a producer of engine and bodywork
        emit addedm1(ut1);
    } 

    function addm2(address ut2) external isCertifier{
        require(certifier != ut2, "A ceritifier cannot be also a M1");
        require(timem2[ut2]<block.number,"you have still time");
        timem2[ut2] = SafeMath.add(block.number, 40); //Assign to the producer the block where its service ends
        m2[ut2] = true; //ut2 is a pump tester
        emit addedm2(ut2);
    } 

    function isCertifier_() view external returns(bool){
   
        return certifier == msg.sender;
    }  

   function isM1() view external returns(bool) {
        return m1[msg.sender];
    }   

    function isM2() view external returns(bool){
   
        return m2[msg.sender];
    }  


}