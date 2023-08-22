//Project method

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Certificate_contract.sol";
import "./Proj_contract.sol";

contract ElectricPump is BaseCertContract {
    //Struct for a electric pump
    struct ElecPump {
        uint body_fatt;
        uint engine_fatt;
        int freq;
        int maxspeed;
        int maxdepth;
        int temp;
        string object;
        string lot; //name of electric engine that certify the pump
    }

    ElectricEngine el;

    mapping(bytes32 => ElecPump) private dat;

    mapping(bytes32 => bool) private body;
    mapping(bytes32 => bool) private pump;
    mapping(bytes32 => bool) private engine;

    event certBody(uint indexed fatt, address indexed user, string producer);
    event certEngine(uint indexed fatt, address indexed user, string producer);
    event certPump(string indexed lot, address indexed user);

    constructor(address ele) public BaseCertContract() {
        el = ElectricEngine(ele);
    }

    function certificateEngine(
        uint fatt,
        string memory producer
    ) external ism1 {
        //Ask engine data (Producer and Fattura d'aquisto) to certidicate the engine

        require(timem1[msg.sender] > block.number, "your time of usage end");
        engine[keccak256(abi.encodePacked(fatt))] = true; //the key value for the threads is now the invoice (fattura) code.
        emit certEngine(fatt, msg.sender, producer);
    }

    function certificateBody(uint fatt, string memory producer) external ism1 {
        //Ask for body data (Producer and Fattura d'aquisto) to certificate the body

        require(timem1[msg.sender] > block.number, "your time of usage end");
        body[keccak256(abi.encodePacked(fatt))] = true; //the key value for the threads is now the invoice (fattura) code.
        emit certBody(fatt, msg.sender, producer);
    }

    //Cetificate Pump with instert engine
    function certificatePumpA(
        uint body_fatt,
        uint engine_fatt,
        int freq,
        int maxspeed,
        int maxdepth,
        int temp,
        string memory object
    ) external ism2 {
        require(timem2[msg.sender] > block.number, "your time of usage end");
        require(
            body[keccak256(abi.encodePacked(body_fatt))] == true,
            "body not found"
        ); //body_fatt -> body invoice
        require(
            engine[keccak256(abi.encodePacked(engine_fatt))] == true,
            "engine not found"
        ); //engine_fatt -> engine invoice id
        require(freq == 50, "error alimentation frequency");
        require(maxspeed == 2850, "error nominal speed full capacity");
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
        emit certPump(object, msg.sender);
    }

    //Cetificate Pump with Conttact EletricEngine
    function certificatePumpT(
        uint body_fatt,
        string memory lott,
        int freq,
        int maxspeed,
        int maxdepth,
        int temp,
        string memory object
    ) public ism2 {
        require(timem2[msg.sender] > block.number, "your time of usage end");
        require(
            body[keccak256(abi.encodePacked(body_fatt))] == true,
            "body not found"
        ); //body_fatt -> body invoice
        require(el.isCertificatedEngines(lott), "engine not found"); //engine_fatt -> engine invoice id
        require(freq == 50, "error alimentation frequency");
        require(maxspeed == 2850, "error nominal speed full capacity");
        require(maxdepth == 15, "error maximal depth of utilization");
        require(temp <= 135, "Temperature class error"); //check if the tested temperature class is less then or equal to teh one defined in the certificate (defiened when the cintract is created)
        pump[keccak256(abi.encodePacked(object))] = true; //set as true an engine with ID lotto, azienda:number.
        dat[keccak256(abi.encodePacked(object))].body_fatt = body_fatt;
        dat[keccak256(abi.encodePacked(object))].freq = freq;
        dat[keccak256(abi.encodePacked(object))].maxspeed = maxspeed;
        dat[keccak256(abi.encodePacked(object))].maxdepth = maxdepth;
        dat[keccak256(abi.encodePacked(object))].temp = temp;
        dat[keccak256(abi.encodePacked(object))].object = object;
        dat[keccak256(abi.encodePacked(object))].lot = lott;
        emit certPump(object, msg.sender);
    }

    //Get info of a electric pump
    function getElectricPumpData(
        string memory object
    ) external view returns (uint, uint, int, int, int, int, string memory) {
        require(
            pump[keccak256(abi.encodePacked(object))] == true,
            "Pump isn't recorded"
        );
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

    function isCertificatedBody(uint fatt) external view returns (bool) {
        return body[keccak256(abi.encodePacked(fatt))];
    }

    function isCertificatedEngine(uint fatt) external view returns (bool) {
        return engine[keccak256(abi.encodePacked(fatt))];
    }

    function isCertificatedPump(
        string memory lot
    ) external view returns (bool) {
        return pump[keccak256(abi.encodePacked(lot))];
    }
}
