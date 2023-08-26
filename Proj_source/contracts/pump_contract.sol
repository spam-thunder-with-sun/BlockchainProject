//ElectricPump contract

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Certificate_contract.sol";
import "./Proj_contract.sol";

contract ElectricPump is BaseCertContract {

    //Struct for a electric pump
    struct ElePump {
        uint body_fatt;
        uint engine_fatt;
        int freq;
        int maxspeed;
        int maxdepth;
        int temp;
        string object;
        string lot; //name of electric engine that certify the pump
    }

    //ElectricEngine linked to this contract
    ElectricEngine el;

    //Map that contains all data of electric pumps certified 
    mapping(bytes32 => ElePump) private dat;

    mapping(bytes32 => bool) private body;
    mapping(bytes32 => bool) private pump;
    mapping(bytes32 => bool) private engine;

    //Events with information goal
    event certBody(uint indexed fatt, address indexed user, string producer);
    event certEngine(uint indexed fatt, address indexed user, string producer);
    event certPump(string indexed lot, address indexed user);

    constructor(address ele) public BaseCertContract() {
        el = ElectricEngine(ele); 
    }

    //Certify a lot of engines with the invoice (fatt) by a producer
    function certificateEngine(uint fatt,string memory producer) external ism1 {
        require(timem1[msg.sender] > block.number, "your time of usage end");
        engine[keccak256(abi.encodePacked(fatt))] = true; //indicate the objects with invoice fatt as engines certified 
        emit certEngine(fatt, msg.sender, producer);
    }

    //Certify a lot of bodies with the invoice (fatt) by a producer
    function certificateBody(uint fatt, string memory producer) external ism1 {
        require(timem1[msg.sender] > block.number, "your time of usage end");
        body[keccak256(abi.encodePacked(fatt))] = true; //indicate the objects with invoice fatt as bodies certified
        emit certBody(fatt, msg.sender, producer);
    }

    //Test and certify electric pumps identified by object parameter (azienda:number), in the case you have engine invoice
    function certificatePumpA(uint body_fatt,uint engine_fatt,int freq,int maxspeed,int maxdepth,int temp,string memory object) external ism2 {
        require(timem2[msg.sender] > block.number, "your time of usage end");
        require( body[keccak256(abi.encodePacked(body_fatt))] == true,"body not found"); 
        require(engine[keccak256(abi.encodePacked(engine_fatt))] == true,"engine not found"); 
        require(freq == 50, "error alimentation frequency");
        require(maxspeed == 2850, "error nominal speed full capacity");
        require(maxdepth == 15, "error maximal depth of utilization");
        require(temp <= 135, "Temperature class error"); //check if the tested temperature class is less then or equal to teh one defined in the certificate (defiened when the cintract is created)
        pump[keccak256(abi.encodePacked(object))] = true; //set as certified the pumps
        //Save the lot of pumps data
        dat[keccak256(abi.encodePacked(object))].body_fatt = body_fatt;
        dat[keccak256(abi.encodePacked(object))].engine_fatt = engine_fatt;
        dat[keccak256(abi.encodePacked(object))].freq = freq;
        dat[keccak256(abi.encodePacked(object))].maxspeed = maxspeed;
        dat[keccak256(abi.encodePacked(object))].maxdepth = maxdepth;
        dat[keccak256(abi.encodePacked(object))].temp = temp;
        dat[keccak256(abi.encodePacked(object))].object = object;
        emit certPump(object, msg.sender);
    }

    //Test and certify electric pumps identified by object parameter (azienda:number), in the case you have the code of pumps certified by ElectricEngine contract
    function certificatePumpT(uint body_fatt,string memory lott,int freq,int maxspeed,int maxdepth,int temp,string memory object) public ism2 {
        require(timem2[msg.sender] > block.number, "your time of usage end");
        require(body[keccak256(abi.encodePacked(body_fatt))] == true,"body not found");
        require(el.isCertificatedEngines(lott), "engine not found"); //call the Electric engine method to check if the lot of engines is certified
        require(freq == 50, "error alimentation frequency");
        require(maxspeed == 2850, "error nominal speed full capacity");
        require(maxdepth == 15, "error maximal depth of utilization");
        require(temp <= 135, "Temperature class error"); //check if the tested temperature class is less then or equal to teh one defined in the certificate (defiened when the cintract is created)
        pump[keccak256(abi.encodePacked(object))] = true; //set as certified the pumps
        //set as certified the pumps
        dat[keccak256(abi.encodePacked(object))].body_fatt = body_fatt;
        dat[keccak256(abi.encodePacked(object))].freq = freq;
        dat[keccak256(abi.encodePacked(object))].maxspeed = maxspeed;
        dat[keccak256(abi.encodePacked(object))].maxdepth = maxdepth;
        dat[keccak256(abi.encodePacked(object))].temp = temp;
        dat[keccak256(abi.encodePacked(object))].object = object;
        dat[keccak256(abi.encodePacked(object))].lot = lott;
        emit certPump(object, msg.sender);
    }

    //Get info of a lot of electric pumps identified by object parameter
    function getElectricPumpData(string memory object) external view returns (uint, uint, int, int, int, int, string memory) {
        require(pump[keccak256(abi.encodePacked(object))] == true,"Pump isn't recorded");
        return (
            dat[keccak256(abi.encodePacked(object))].body_fatt,
            dat[keccak256(abi.encodePacked(object))].engine_fatt,
            dat[keccak256(abi.encodePacked(object))].freq,
            dat[keccak256(abi.encodePacked(object))].maxspeed,
            dat[keccak256(abi.encodePacked(object))].maxdepth,
            dat[keccak256(abi.encodePacked(object))].temp,
            dat[keccak256(abi.encodePacked(object))].lot
        );
    }

    //Check if the objects with invoice fatt are bodies certified
    function isCertificatedBody(uint fatt) external view returns (bool) {
        return body[keccak256(abi.encodePacked(fatt))];
    }

    //Check if the objects with invoice fatt are engines certified
    function isCertificatedEngine(uint fatt) external view returns (bool) {
        return engine[keccak256(abi.encodePacked(fatt))];
    }

    //Check if the objects identified by lot are electric pumps certified
    function isCertificatedPump(string memory lot) external view returns (bool) {
        return pump[keccak256(abi.encodePacked(lot))];
    }
}
