//Project method

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Certificate_contract.sol";


contract ElectricPump is BaseCertContract{

   

   
    mapping(bytes32 => bool) private body; 

    mapping(bytes32 => bool) private pump;

    mapping(bytes32 => bool) private engine;


    

    event certBody(uint indexed fatt, address indexed user,string producer);


    event certEngine(uint indexed fatt, address indexed user,string producer);


    event certPump(string indexed lot, address indexed user);


    constructor() public BaseCertContract(){}


  

    function certificateEngine(uint fatt, string memory producer) external ism1{ //Ask engine data (Producer and Fattura d'aquisto) to certidicate the engine
        
        require(timem1[msg.sender]>block.number, "your time of usage end");
        engine[keccak256(abi.encodePacked(fatt))] = true; //the key value for the threads is now the invoice (fattura) code.
        emit certEngine(fatt,msg.sender,producer);
    }

    function certificateBody(uint fatt, string memory producer) external ism1{ //Ask for body data (Producer and Fattura d'aquisto) to certificate the body
       
        require(timem1[msg.sender]>block.number, "your time of usage end");
        body[keccak256(abi.encodePacked(fatt))] = true;//the key value for the threads is now the invoice (fattura) code.
        emit certBody(fatt,msg.sender,producer);
    }

    /*function certificatePump(uint body_fatt, uint engine_fatt, int power, int voltage, int maxvoltage, int t, int freq, int maxspeed, int dens, int maxdepth, int temp, string memory object) external ism2{
      
        require(timem2[msg.sender]>block.number, "your time of usage end"); 
        require(body[keccak256(abi.encodePacked(body_fatt))] == true, "cages not found"); //body_fatt -> body invoice
        require(engine[keccak256(abi.encodePacked(engine_fatt))] == true, "threads not found"); //engine_fatt -> engine invoice id
        require(temp <= 135, "Temperature class error"); //check if the tested temperature class is less then or equal to teh one defined in the certificate (defiened when the cintract is created)
        if (ts != 230 && fr != 50 && Y != -1){ //check the parameter for the alimentation tension
            revert("Alimentation tension Error");
        }
        pump[keccak256(abi.encodePacked(object))] = true; //set as true an engine with ID lotto, azienda:number.
        //segnare i due pezzi cages e thread come non certificati !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //emit certPump(lot, user);
    }*/


    function isCertificatedBodies(uint fatt) view external returns(bool){ 
      
        return body[keccak256(abi.encodePacked(fatt))];
    } 

    function isCertificatedPumps(uint fatt) view external returns(bool){
 
        return pump[keccak256(abi.encodePacked(fatt))];
    } 

    function isCertificatedEngines(string memory lot) view external returns(bool){
    
        return engine[keccak256(abi.encodePacked(lot))];
    } 

    
}