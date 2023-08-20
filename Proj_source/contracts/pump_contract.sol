//Project method

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Certificate_contract.sol";


contract ElectricPump is BaseCertContract{

    //Struct for a electric pump
    struct ElecPump{ 
 		uint body_fatt; 
        uint engine_fatt;
        int freq; 
        int maxspeed; 
        int maxdepth; 
        int temp; 
        string object;
    }

    mapping(bytes32 => ElecPump) private dat;
   
    mapping(bytes32 => bool) private body; 
    mapping(bytes32 => bool) private pump;
    mapping(bytes32 => bool) private engine;

    
    

    event certBody(uint indexed fatt, address indexed user,string producer);
    event certEngine(uint indexed fatt, address indexed user,string producer);
    event certPump(string indexed lot, address indexed user);

   

    constructor() public BaseCertContract(){}




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

    function certificatePump(uint body_fatt, uint engine_fatt,int freq, int maxspeed, int maxdepth, int temp, string memory object) external {
        require(m2[msg.sender] == true, "you are not qualified user");
        require(timem2[msg.sender]>block.number, "your time of usage end"); 
        require(body[keccak256(abi.encodePacked(body_fatt))] == true, "body not found"); //body_fatt -> body invoice
        require(engine[keccak256(abi.encodePacked(engine_fatt))] == true, "engine not found"); //engine_fatt -> engine invoice id
        require(freq == 50, "error alimentation frequency");
        require (maxspeed == 2850, "error nominal speed full capacity");
        require(maxdepth == 15, "error maximal depth of utilization");
        require(temp <= 135, "Temperature class error"); //check if the tested temperature class is less then or equal to teh one defined in the certificate (defiened when the cintract is created)
        pump[keccak256(abi.encodePacked(object))] = true; //set as true an engine with ID lotto, azienda:number.
        dat[keccak256(abi.encodePacked(object))].body_fatt = body_fatt;
        dat[keccak256(abi.encodePacked(object))].engine_fatt = engine_fatt;
        dat[keccak256(abi.encodePacked(object))].freq = freq;
        dat[keccak256(abi.encodePacked(object))].maxspeed = maxspeed;
        dat[keccak256(abi.encodePacked(object))].maxdepth = maxdepth;
        dat[keccak256(abi.encodePacked(object))].temp = temp;
        dat[keccak256(abi.encodePacked(object))].object = object;
        emit certPump(object,msg.sender);
    } 

    //Get info of a electric pump
    function getElectricEngineData(string memory object) external view returns(uint,uint,int,int,int,int){
       
        require(pump[keccak256(abi.encodePacked(object))] == true, "Pump isn't recorded");
        return (dat[keccak256(abi.encodePacked(object))].body_fatt, dat[keccak256(abi.encodePacked(object))].engine_fatt, dat[keccak256(abi.encodePacked(object))].freq, dat[keccak256(abi.encodePacked(object))].maxspeed, dat[keccak256(abi.encodePacked(object))].maxdepth, dat[keccak256(abi.encodePacked(object))].temp);
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

}
