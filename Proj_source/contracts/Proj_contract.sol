//ElectricEngine contract

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Certificate_contract.sol";


contract ElectricEngine is BaseCertContract{

    //Struct for a electric engine
    struct ElecEngine{ 
 		uint cage_fatt;
        uint thread_fatt;
        int temp;
        int ts;
        int fr;
        int Y;
        string object;
    }

    
    mapping(bytes32 => ElecEngine) private dat;


  

    
    mapping(bytes32 => bool) private cages; 
    mapping(bytes32 => bool) private engines;
    mapping(bytes32 => bool) private threads;


    event certThreads(uint indexed fatt, address indexed user,string producer);
    event certCages(uint indexed fatt, address indexed user,string producer);
    event certEngines(string indexed lot, address indexed user);
    
    constructor() public BaseCertContract(){}

   


    function certificateThreads(uint fatt, string memory producer) external ism1{ //Ask threads data (Producer and Fattura d'aquisto) to certidicate the threads
        
        require(timem1[msg.sender]>block.number, "your time of usage end");
        threads[keccak256(abi.encodePacked(fatt))] = true; //the key value for the threads is now the invoice (fattura) code.
        emit certThreads(fatt,msg.sender,producer);

    }

    function certificateCage(uint fatt, string memory producer) external ism1{ //Ask for cages data (Producer and Fattura d'aquisto) to certificate the cages
        
        require(timem1[msg.sender]>block.number, "your time of usage end");
        cages[keccak256(abi.encodePacked(fatt))] = true;//the key value for the threads is now the invoice (fattura) code.
        emit certCages(fatt,msg.sender,producer);
        //return(producer, fatt); //As above
    }

    function certificateEngines(uint cage_fatt, uint thread_fatt, int temp, int ts, int fr, int Y, string memory object) external ism2{
       
        require(timem2[msg.sender]>block.number, "your time of usage end"); 
        require(cages[keccak256(abi.encodePacked(cage_fatt))] == true, "cages not found"); //cage_fatt -> cage invoice//thread_fatt -> thread invoice id
        require(threads[keccak256(abi.encodePacked(thread_fatt))] == true, "threads not found"); //thread_fatt -> thread invoice id
        require(temp <= 135, "Temperature class error"); //check if the tested temperature class is less then or equal to teh one defined in the certificate (defiened when the cintract is created)
        if (ts != 230 && fr != 50 && Y != -1){ //check the parameter for the alimentation tension
            revert("Alimentation tension Error");
        }
        engines[keccak256(abi.encodePacked(object))] = true; //set as true an engine with ID lotto, azienda:number.
        dat[keccak256(abi.encodePacked(object))].cage_fatt = cage_fatt;
        dat[keccak256(abi.encodePacked(object))].thread_fatt = thread_fatt;
        dat[keccak256(abi.encodePacked(object))].temp = temp;
        dat[keccak256(abi.encodePacked(object))].ts = ts;
        dat[keccak256(abi.encodePacked(object))].fr = fr;
        dat[keccak256(abi.encodePacked(object))].Y = Y;
        dat[keccak256(abi.encodePacked(object))].object = object;
        emit certEngines(object,msg.sender);
    } 


    //Get info of a electric engine
    function getElectricEngineData(string memory object) view external returns(uint,uint,int,int,int,int){
       
        require(engines[keccak256(abi.encodePacked(object))] == true, "Engine isn't recorded");
        return (dat[keccak256(abi.encodePacked(object))].thread_fatt, dat[keccak256(abi.encodePacked(object))].cage_fatt, dat[keccak256(abi.encodePacked(object))].temp, dat[keccak256(abi.encodePacked(object))].ts, dat[keccak256(abi.encodePacked(object))].fr, dat[keccak256(abi.encodePacked(object))].Y);
    }

    function isCertificatedThreads(uint fatt) view external returns(bool){ 
      
        return threads[keccak256(abi.encodePacked(fatt))];
    } 

    function isCertificatedCages(uint fatt) view external returns(bool){
 
        return cages[keccak256(abi.encodePacked(fatt))];
    } 

    function isCertificatedEngines(string memory lot) view external returns(bool){
    
        return engines[keccak256(abi.encodePacked(lot))];
    } 

  
}



