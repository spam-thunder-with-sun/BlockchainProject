//Project method

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ElectricEngine {

    mapping(address => bool) private m1; //producer that certifies threads and cages
    mapping(address => bool) private m2; //user that test engine
    //mapping(address => bool) private g;
    //mapping(address => bool) private f;
    address private certifier; //who specified the parameter for the verification.

    mapping(address => uint256) private timem1;//block when the service ends for m1
    mapping(address => uint256) private timem2;//block when the service ends for m1
    //mapping(address => uint256) private timeg;
    //mapping(address => uint256) private timef;

    //address private owner;

    //mapping(bytes32 => bool) private bubbleCopper;
    //mapping(bytes32 => bool) private bubbleSteel;
    mapping(bytes32 => bool) private cages; 
    mapping(bytes32 => bool) private engines;
    mapping(bytes32 => bool) private threads;


    //Events with information goal
    event addedm1(address indexed user);
    event addedm2(address indexed user);
    //event addedf(address indexed user);
    //event addedg(address indexed user);
    event certThreads(uint indexed fatt, address indexed user,string producer);
    event certCages(uint indexed fatt, address indexed user,string producer);
    event certEngines(string indexed lot, address indexed user);
    
    //int[5] private proof;
    //int[5] private info;


    constructor(){

      /*m1[0x984765fCd218D3937E4298Dd1746b47828D5E9f8] = true;
      m2[0xCCf44CeA3140c0253D845D04973bC0D0E5eED163] = true;
      f[0x10CdeAE4C0d04aD512E017E3F7d236a463c578bB] = true;
      g[0xeaaF394C2468442eCb543d43B11326903e27e311] = true;
      timem1[0x984765fCd218D3937E4298Dd1746b47828D5E9f8] = SafeMath.add(block.number, 40);
      timem2[0xCCf44CeA3140c0253D845D04973bC0D0E5eED163] = SafeMath.add(block.number, 40);
      timeg[0x10CdeAE4C0d04aD512E017E3F7d236a463c578bB] = SafeMath.add(block.number, 40);
      timef[0xeaaF394C2468442eCb543d43B11326903e27e311] = SafeMath.add(block.number, 40);
      certifier = 0x984765fCd218D3937E4298Dd1746b47828D5E9f8;*/
      //owner = msg.sender;
      certifier = msg.sender;
      

      // DOMANDA -- Facciamo creare i certificati europei agli utenti certificatori oppure usiamo i certificatori solo come gli utenti che controllano i singoli lotti?


     
    }

    

    /*function UserInfos( int8 info1, int8 info2, int8 info3, int8 info4, int8 info5) external{
        require(msg.sender == certifier, "you are not a certifier");
        info[0] = info1;
        info[1] = info2;
        info[2] = info3;
        info[3] = info4;
        info[4] = info5;

    }*/

    /*function UserProofs(int8 proof1, int8 proof2, int8 proof3, int8 proof4, int proof5) external{
        require(msg.sender == certifier, "you are not a certifier");
        proof[0] = proof1;
        proof[1] = proof2;
        proof[2] = proof3;
        proof[3] = proof4;
        proof[4] = proof5;

    }*/

    function addcertifier(int infop) external{
        require(infop>3,"you aren't a cetifier");
        certifier = msg.sender;
        

    }

    function addm1(address  ut1) external { 

        //require(infop>info[0],"you aren't a m1");
        require(certifier == msg.sender, "you are not a certifier");
        require(certifier != ut1, "A ceritifier cannot be also a M1");
        require(timem1[ut1]<block.number,"you have still time");
        timem1[ut1] = SafeMath.add(block.number, 40); //Assign to the producer the block where its service ends
        m1[ut1] = true; //ut1 is a producer of cages and threads
        emit addedm1(ut1);
    } 

    function addm2(address ut2) external {

        //require(infop>info[1],"you aren't a m2");
        require(certifier == msg.sender, "you are not a certifier");
        require(certifier != ut2, "A ceritifier cannot be also a M1");
        require(timem2[ut2]<block.number,"you have still time");
        timem2[ut2] = SafeMath.add(block.number, 40); //Assign to the producer the block where its service ends
        m2[ut2] = true; //ut2 is a engine tester
        emit addedm2(ut2);
    } 

    /*function addG(int8 infop) external {
        require(infop>info[2],"you aren't a G");
        require(timeg[msg.sender]<block.timestamp,"you have still time");
        timeg[msg.sender] = SafeMath.add(block.timestamp, 40);
        m1[msg.sender] = true;
        emit addedg(msg.sender);
    } 

    function addmF(int8 infop) external {
        require(infop>info[4],"you aren't a F");
        require(timef[msg.sender]<block.timestamp,"you have still time");
        timef[msg.sender] = SafeMath.add(block.timestamp, 40);
        m1[msg.sender] = true;
        emit addedf(msg.sender);

    } */

    /*

    FOR NOW CERTIFY ONLY THREADS, CAGES AND ENGINES

    function certificateSteels(int proofo, string memory object) external { 
      
        require(proofo>proof[0],"not valid Steels");
        require(f[msg.sender] == true, "you are not qualified user");
        require(timef[msg.sender]>block.number, "your time of usage end");
        bubbleSteel[keccak256(abi.encodePacked(object))] = true;
    } 

    function certificateCoppers(int proofo, string memory object) external {
        require(proofo>proof[1],"not valid Coppers");
        require(g[msg.sender] == true, "you are not qualified user");
        require(timeg[msg.sender]>block.number, "your time of usage end");
        bubbleCopper[keccak256(abi.encodePacked(object))] = true;
    }  

    */

    function certificateThreads(uint fatt, string memory producer) external { //Ask threads data (Producer and Fattura d'aquisto) to certidicate the threads
        require(m1[msg.sender] == true, "you are not qualified user");
        require(timem1[msg.sender]>block.number, "your time of usage end");
        threads[keccak256(abi.encodePacked(fatt))] = true; //the key value for the threads is now the invoice (fattura) code.
        emit certThreads(fatt,msg.sender,producer);
        //return(producer, fatt); //this function return the producer and the invoice code - if useful
    }

    function certificateCage(uint fatt, string memory producer) external { //Ask for cages data (Producer and Fattura d'aquisto) to certificate the cages
        require(m1[msg.sender] == true, "you are not qualified user");
        require(timem1[msg.sender]>block.number, "your time of usage end");
        cages[keccak256(abi.encodePacked(fatt))] = true;//the key value for the threads is now the invoice (fattura) code.
        emit certCages(fatt,msg.sender,producer);
        //return(producer, fatt); //As above
    }

    function certificateEngines(uint cage_fatt, uint thread_fatt, int temp, int ts, int fr, int Y, string memory object) external {
        require(m2[msg.sender] == true, "you are not qualified user");
        require(timem2[msg.sender]>block.number, "your time of usage end"); 
        require(cages[keccak256(abi.encodePacked(cage_fatt))] == true, "cages not found"); //cage_fatt -> cage invoice//thread_fatt -> thread invoice id
        require(threads[keccak256(abi.encodePacked(thread_fatt))] == true, "threads not found"); //thread_fatt -> thread invoice id
        require(temp <= 135, "Temperature class error"); //check if the tested temperature class is less then or equal to teh one defined in the certificate (defiened when the cintract is created)
        if (ts != 230 && fr != 50 && Y != -1){ //check the parameter for the alimentation tension
            revert("Alimentation tension Error");
        }
        engines[keccak256(abi.encodePacked(object))] = true; //set as true an engine with ID lotto, azienda:number.
        //segnare i due pezzi cages e thread come non certificati !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        emit certEngines(object,msg.sender);
    } 

   /* function isCertificatesSteels(string memory object) view external returns(bool) {
        return bubbleSteel[keccak256(abi.encodePacked(object))];
    }   

    function isCertificatedCoppers(string memory object) view external returns(bool){
   
        return bubbleCopper[keccak256(abi.encodePacked(object))];
    }   */

    function isCertificatedThreads(uint fatt) view external returns(bool){ 
      
        return threads[keccak256(abi.encodePacked(fatt))];
    } 

    function isCertificatedCages(uint fatt) view external returns(bool){
 
        return cages[keccak256(abi.encodePacked(fatt))];
    } 

    function isCertificatedEngines(string memory lot) view external returns(bool){
    
        return engines[keccak256(abi.encodePacked(lot))];
    } 

   function isM1() view external returns(bool) {
        return m1[msg.sender];
    }   

    function isM2() view external returns(bool){
   
        return m2[msg.sender];
    }   

    /*function isF() view external returns(bool){
      
        return f[msg.sender];
    } 

    function isG() view external returns(bool){
 
        return g[msg.sender];
    } */






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



