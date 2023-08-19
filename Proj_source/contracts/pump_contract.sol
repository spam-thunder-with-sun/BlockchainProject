//Project method

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ElectricPump {

    mapping(address => bool) private m1; //producer that certifies bodyworks and engines
    mapping(address => bool) private m2; //user that test pump
    address private certifier; //who specified the parameter for the verification.

    mapping(address => uint256) private timem1;//block when the service ends for m1
    mapping(address => uint256) private timem2;//block when the service ends for m1

    mapping(bytes32 => bool) private body; 
    mapping(bytes32 => bool) private pump;
    mapping(bytes32 => bool) private engine;


    //Events with information goal
    event addedm1(address indexed user);
    event addedm2(address indexed user);
    event certBody(uint indexed fatt, address indexed user,string producer);
    event certEngine(uint indexed fatt, address indexed user,string producer);
    event certPump(string indexed lot, address indexed user);


    constructor(){
      certifier = msg.sender;     
    }


    function addcertifier(int infop) external{
        require(infop>3,"you aren't a cetifier");
        certifier = msg.sender;
    }

    function addm1(address  ut1) external { 
        require(certifier == msg.sender, "you are not a certifier");
        require(certifier != ut1, "A ceritifier cannot be also a M1");
        require(timem1[ut1]<block.number,"you have still time");
        timem1[ut1] = SafeMath.add(block.number, 40); //Assign to the producer the block where its service ends
        m1[ut1] = true; //ut1 is a producer of engine and bodywork
        emit addedm1(ut1);
    } 

    function addm2(address ut2) external {
        require(certifier == msg.sender, "you are not a certifier");
        require(certifier != ut2, "A ceritifier cannot be also a M1");
        require(timem2[ut2]<block.number,"you have still time");
        timem2[ut2] = SafeMath.add(block.number, 40); //Assign to the producer the block where its service ends
        m2[ut2] = true; //ut2 is a pump tester
        emit addedm2(ut2);
    } 

    function certificateEngine(uint fatt, string memory producer) external { //Ask engine data (Producer and Fattura d'aquisto) to certidicate the engine
        require(m1[msg.sender] == true, "you are not qualified user");
        require(timem1[msg.sender]>block.number, "your time of usage end");
        engine[keccak256(abi.encodePacked(fatt))] = true; //the key value for the threads is now the invoice (fattura) code.
        emit certEngine(fatt,msg.sender,producer);
    }

    function certificateBody(uint fatt, string memory producer) external { //Ask for body data (Producer and Fattura d'aquisto) to certificate the body
        require(m1[msg.sender] == true, "you are not qualified user");
        require(timem1[msg.sender]>block.number, "your time of usage end");
        body[keccak256(abi.encodePacked(fatt))] = true;//the key value for the threads is now the invoice (fattura) code.
        emit certBody(fatt,msg.sender,producer);
    }

    function certificatePump(uint body_fatt, uint engine_fatt,int freq, int maxspeed, int dens, maxdepth, int temp, string memory object) external {
        require(m2[msg.sender] == true, "you are not qualified user");
        require(timem2[msg.sender]>block.number, "your time of usage end"); 
        require(body[keccak256(abi.encodePacked(body_fatt))] == true, "body not found"); //body_fatt -> body invoice
        require(engine[keccak256(abi.encodePacked(engine_fatt))] == true, "engine not found"); //engine_fatt -> engine invoice id
        require(freq == 50, "error alimentation frequency");
        require (maxspeed == 2850, "error nominal speed full capacity");
        require(maxdepth == 15, "error maximal depth of utilization");
        require(temp <= 135, "Temperature class error"); //check if the tested temperature class is less then or equal to teh one defined in the certificate (defiened when the cintract is created)
        if (ts != 230 && fr != 50 && Y != -1){ //check the parameter for the alimentation tension
            revert("Alimentation tension Error");
        }
        pump[keccak256(abi.encodePacked(object))] = true; //set as true an engine with ID lotto, azienda:number.
        emit certPump(lot, user);(object,msg.sender);
    } 


    function isCertificatedBody(uint fatt) view external returns(bool){ 
      
        return body[keccak256(abi.encodePacked(fatt))];
    } 

    function isCertificatedEngine(uint fatt) view external returns(bool){
 
        return engine[keccak256(abi.encodePacked(fatt))];
    } 

    function isCertificatedPump(string memory lot) view external returns(bool){
    
        return pump[keccak256(abi.encodePacked(lot))];
    } 

   function isM1() view external returns(bool) {
        return m1[msg.sender];
    }   

    function isM2() view external returns(bool){
   
        return m2[msg.sender];
    }   

}