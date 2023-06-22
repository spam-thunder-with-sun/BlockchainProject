// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ElectricEngine {

    mapping(address => bool) private m1;
    mapping(address => bool) private m2;
    mapping(address => bool) private g;
    mapping(address => bool) private f;
    address private certifier; //who specified the parameter for the verification.

    mapping(address => uint256) private timem1;
    mapping(address => uint256) private timem2;
    mapping(address => uint256) private timeg;
    mapping(address => uint256) private timef;

    address private owner;

    mapping(bytes32 => bool) private bubbleCopper;
    mapping(bytes32 => bool) private bubbleSteel;
    mapping(bytes32 => bool) private cages;
    mapping(bytes32 => bool) private engines;
    mapping(bytes32 => bool) private threads;

 
    mapping(address => uint256) private storedItems;

    event StorageFeePaid(address indexed payer, uint256 amount);
    
    int[5] private proof;
    int[5] private info;

    constructor(){

      m1[0x984765fCd218D3937E4298Dd1746b47828D5E9f8] = true;
      m2[0xCCf44CeA3140c0253D845D04973bC0D0E5eED163] = true;
      f[0x10CdeAE4C0d04aD512E017E3F7d236a463c578bB] = true;
      g[0xeaaF394C2468442eCb543d43B11326903e27e311] = true;
      uint256 time = SafeMath.add(block.timestamp, 40);
      timem1[0x984765fCd218D3937E4298Dd1746b47828D5E9f8] = time;
      timem2[0xCCf44CeA3140c0253D845D04973bC0D0E5eED163] = time;
      timeg[0x10CdeAE4C0d04aD512E017E3F7d236a463c578bB] = time;
      timef[0xeaaF394C2468442eCb543d43B11326903e27e311] = time;
      certifier = 0x984765fCd218D3937E4298Dd1746b47828D5E9f8;
      owner = msg.sender;


     
    }

    
    
    

    function UserInfos( int8 info1, int8 info2, int8 info3, int8 info4, int8 info5) external{
        require(msg.sender == certifier, "you are not a certifier");
        info[0] = info1;
        info[1] = info2;
        info[2] = info3;
        info[3] = info4;
        info[4] = info5;

    }

    function UserProofs(int8 proof1, int8 proof2, int8 proof3, int8 proof4, int proof5) external{
        require(msg.sender == certifier, "you are not a certifier");
        proof[0] = proof1;
        proof[1] = proof2;
        proof[2] = proof3;
        proof[3] = proof4;
        proof[4] = proof5;

    }

    function addcertifier(int infop) external{
        require(infop>3,"you aren't a cetifier");
        certifier = msg.sender;

    }

    function addm1(int8 infop) external {
        require(infop>info[0],"you aren't a m1");
        timem1[msg.sender] = SafeMath.add(block.timestamp, 40);
        m1[msg.sender] = true;
    } 

    function addm2(int8 infop) external {
        require(infop>info[1],"you aren't a m2");
        timem2[msg.sender] = SafeMath.add(block.timestamp, 40);
        m1[msg.sender] = true;
    } 

    function addG(int8 infop) external {
        require(infop>info[2],"you aren't a G");
        timeg[msg.sender] = SafeMath.add(block.timestamp, 40);
        m1[msg.sender] = true;
    } 

    function addmF(int8 infop) external {
        require(infop>info[4],"you aren't a F");
        timef[msg.sender] = SafeMath.add(block.timestamp, 40);
        m1[msg.sender] = true;
    } 


    function certificateSteels(int proofo, string memory object) external {
      
        require(proofo>proof[0],"not valid Steels");
        require(f[msg.sender] == true, "you are not qualified user");
        require(timef[msg.sender]>block.timestamp, "your time of usage end");
        bubbleSteel[keccak256(abi.encodePacked(object))] = true;
    }   

    function certificateCoppers(int proofo, string memory object) external {
        require(proofo>proof[1],"not valid Coppers");
        require(g[msg.sender] == true, "you are not qualified user");
        require(timeg[msg.sender]>block.timestamp, "your time of usage end");
        bubbleCopper[keccak256(abi.encodePacked(object))] = true;
    }   

    function certificateThreads(int proofo, string memory object) external {
        require(proofo>proof[2],"not valid Threads");
        require(bubbleSteel[keccak256(abi.encodePacked(object))] == true, "not found Steels");
        require(bubbleCopper[keccak256(abi.encodePacked(object))] == true, "not found Coppers");
        require(f[msg.sender] == true, "you are not qualified user");
        require(timef[msg.sender]>block.timestamp, "your time of usage end");
        threads[keccak256(abi.encodePacked(object))] = true;
    } 

    function certificateCages(int proofo, string memory object) external {
        require(proofo>proof[3],"not valid Cages");
        require(threads[keccak256(abi.encodePacked(object))] == true, "not found Threads");
        require(g[msg.sender] == true || m1[msg.sender] == true, "you are not qualified user"); //sistemare
        require(timeg[msg.sender]>block.timestamp || timem1[msg.sender]>block.timestamp, "your time of usage end"); //sistemare
        cages[keccak256(abi.encodePacked(object))] = true;
    } 

    function certificateEngines(int proofo, string memory object) external {
        require(proofo>proof[4],"not valid Cages");
        require(cages[keccak256(abi.encodePacked(object))] == true, "not found Threads");
        require(m1[msg.sender] == true || m2[msg.sender] == true, "you are not qualified user");//sistemare
        require(timem1[msg.sender]>block.timestamp || timem2[msg.sender]>block.timestamp, "your time of usage end"); //sistemare
        threads[keccak256(abi.encodePacked(object))] = true;
    } 

    function isCertificatesSteels(string memory object) view external returns(bool) {
        return bubbleSteel[keccak256(abi.encodePacked(object))];
    }   

    function isCertificatedCoppers(string memory object) view external returns(bool){
   
        return bubbleCopper[keccak256(abi.encodePacked(object))];
    }   

    function isCertificatedThreads(string memory object) view external returns(bool){
      
        return threads[keccak256(abi.encodePacked(object))];
    } 

    function isCertificatedCages(string memory object) view external returns(bool){
 
        return cages[keccak256(abi.encodePacked(object))];
    } 

    function isCertificatedEngines(string memory object) view external returns(bool){
    
        return threads[keccak256(abi.encodePacked(object))];
    } 

   function isM1() view external returns(bool) {
        return m1[msg.sender];
    }   

    function isM2() view external returns(bool){
   
        return m2[msg.sender];
    }   

    function isF() view external returns(bool){
      
        return f[msg.sender];
    } 

    function isG() view external returns(bool){
 
        return g[msg.sender];
    } 






    /*function payStorageFee() external payable {
        require(msg.sender == customer, "Only the customer can pay the storage fee");
        require(msg.value > 0, "Storage fee should be greater than zero");
        balances[storageProvider] += msg.value;
        emit StorageFeePaid(msg.sender, msg.value);
    }

    function storeItems(uint256 _amount) external {
        require(msg.sender == customer, "Only the customer can store items");
        require(balances[customer] >= _amount, "Insufficient balance to store items");
        balances[customer] -= _amount;
        storedItems[customer] += _amount;
        emit ItemsStored(msg.sender, _amount);
    }

    function retrieveItems(uint256 _amount) external {
        require(msg.sender == customer, "Only the customer can retrieve items");
        require(storedItems[customer] >= _amount, "Insufficient stored items to retrieve");
        storedItems[customer] -= _amount;
        balances[customer] += _amount;
        emit ItemsRetrieved(msg.sender, _amount);
    }*/
}

