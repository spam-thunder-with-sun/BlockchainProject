//ElectricEngine contract

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Certificate_contract.sol";


contract ElectricEngine is BaseCertContract{

    //Struct for a electric engine
    struct EleEngine{ 
 		uint cage_fatt; // invoice efor the cage
        uint thread_fatt; // invoice for the thread
        int temp; // max temperature tested - must be less the 135
        int ts; // tension tested - must be 230
        int fr; // frequency tested - must be 50
        int Y;  // motor configuration - should be -1
        string object; // lot number of the engine
    }

    //Map that contains all data of electric engines certified
    mapping(bytes32 => EleEngine) private dat;

    mapping(bytes32 => bool) private cages; 
    mapping(bytes32 => bool) private engines;
    mapping(bytes32 => bool) private threads;

    //Events with information goal
    event certThreads(uint indexed fatt, address indexed user,string producer);
    event certCages(uint indexed fatt, address indexed user,string producer);
    event certEngines(string indexed lot, address indexed user);
    
    constructor() public BaseCertContract(){}

    //Certify a lot of threads with the invoice (fatt) by a producer
    function certificateThreads(uint fatt, string memory producer) external ism1{ 
        require(timem1[msg.sender]>block.number, "your time of usage end");
        threads[keccak256(abi.encodePacked(fatt))] = true; //indicate the objects with invoice fatt as threads certified
        emit certThreads(fatt,msg.sender,producer);
    }

    //Certify a lot of cages with the invoice (fatt) by a producer
    function certificateCage(uint fatt, string memory producer) external ism1{
        require(timem1[msg.sender]>block.number, "your time of usage end");
        cages[keccak256(abi.encodePacked(fatt))] = true; //indicate the objects with invoice fatt as cages certified
        emit certCages(fatt,msg.sender,producer);
    }

    //Test and certify electric engines identified by object parameter (azienda:number)
    function certificateEngines(uint cage_fatt, uint thread_fatt, int temp, int ts, int fr, int Y, string memory object) external ism2{
        require(timem2[msg.sender]>block.number, "your time of usage end"); 
        require(cages[keccak256(abi.encodePacked(cage_fatt))] == true, "cages not found"); 
        require(threads[keccak256(abi.encodePacked(thread_fatt))] == true, "threads not found"); 
        require(temp <= 135, "Temperature class error"); //check if the tested temperature class is less then or equal to teh one defined in the certificate (defiened when the cintract is created)
        if (ts != 230 && fr != 50 && Y != -1){ //check the parameter for the alimentation tension
            revert("Alimentation tension Error");
        }
        engines[keccak256(abi.encodePacked(object))] = true; //set as certified the engines
        //Save the lot of engines data
        dat[keccak256(abi.encodePacked(object))].cage_fatt = cage_fatt;
        dat[keccak256(abi.encodePacked(object))].thread_fatt = thread_fatt;
        dat[keccak256(abi.encodePacked(object))].temp = temp;
        dat[keccak256(abi.encodePacked(object))].ts = ts;
        dat[keccak256(abi.encodePacked(object))].fr = fr;
        dat[keccak256(abi.encodePacked(object))].Y = Y;
        dat[keccak256(abi.encodePacked(object))].object = object;
        emit certEngines(object,msg.sender);
    } 


    //Get info of a lot of electric engines identified by object parameter
    function getElectricEngineData(string memory object) view external returns(uint,uint,int,int,int,int){
        require(engines[keccak256(abi.encodePacked(object))] == true, "Engine isn't recorded");
        return (dat[keccak256(abi.encodePacked(object))].thread_fatt, dat[keccak256(abi.encodePacked(object))].cage_fatt, dat[keccak256(abi.encodePacked(object))].temp, dat[keccak256(abi.encodePacked(object))].ts, dat[keccak256(abi.encodePacked(object))].fr, dat[keccak256(abi.encodePacked(object))].Y);
    }

    //Check if the objects with invoice fatt are threads certified
    function isCertificatedThreads(uint fatt) view external returns(bool){ 
      
        return threads[keccak256(abi.encodePacked(fatt))];
    } 

    //Check if the objects with invoice fatt are cages certified
    function isCertificatedCages(uint fatt) view external returns(bool){
 
        return cages[keccak256(abi.encodePacked(fatt))];
    } 

    //Check if the objects identified by lot are electric engines certified
    function isCertificatedEngines(string memory lot) view external returns(bool){
    
        return engines[keccak256(abi.encodePacked(lot))];
    } 
}



