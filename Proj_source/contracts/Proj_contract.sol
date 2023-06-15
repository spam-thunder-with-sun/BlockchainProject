pragma solidity ^0.8.0;

contract ElectricEngine {

    mapping(address => bool) public m1;
    mapping(address => bool) public m2;
    mapping(address => bool) public g;
    mapping(address => bool) public f;

    mapping(bytes32 => bool) public bubbleCopper;
    mapping(bytes32 => bool) public bubbleSteel;
    mapping(bytes32 => bool) public cages;
    mapping(bytes32 => bool) public engines;
    mapping(bytes32 => bool) public threads;

    mapping(address => uint256) public storedItems;

    event StorageFeePaid(address indexed payer, uint256 amount);
    
    int proof1;

    constructor(){
      m1[0x984765fCd218D3937E4298Dd1746b47828D5E9f8] = true;
      m2[0xCCf44CeA3140c0253D845D04973bC0D0E5eED163] = true;
      f[0x10CdeAE4C0d04aD512E017E3F7d236a463c578bB] = true;
      g[0xeaaF394C2468442eCb543d43B11326903e27e311] = true;
      proof1 = 4;
    }

    function addm1(int8 info) external {
        require(info>3,"you aren't a m1");
        m1[msg.sender] = true;
    } 

    function addm2(int8 info) external {
        require(info>3,"you aren't a m2");
        m1[msg.sender] = true;
    } 

    function addG(int8 info) external {
        require(info>3,"you aren't a G");
        m1[msg.sender] = true;
    } 

    function addmF(int8 info) external {
        require(info>3,"you aren't a F");
        m1[msg.sender] = true;
    } 


    function certificateSteels(int proof, string memory object) external {
        require(proof>proof1,"not valid Steels");
        require(f[msg.sender] == true, "you are not qualified user");
        bubbleSteel[keccak256(abi.encodePacked(object))] = true;
    }   

    function certificateCoppers(int proof, string memory object) external {
        require(proof>3,"not valid Coppers");
        require(g[msg.sender] == true, "you are not qualified user");
        bubbleCopper[keccak256(abi.encodePacked(object))] = true;
    }   

    function certificateThreads(int proof, string memory object) external {

        require(proof>5,"not valid Threads");
        require(bubbleSteel[keccak256(abi.encodePacked(object))] == true, "not found Steels");
        require(bubbleCopper[keccak256(abi.encodePacked(object))] == true, "not found Coppers");
        require(f[msg.sender] == true, "you are not qualified user");
        threads[keccak256(abi.encodePacked(object))] = true;
    } 

    function certificateCages(int proof, string memory object) external {

        require(proof>5,"not valid Cages");
        require(threads[keccak256(abi.encodePacked(object))] == true, "not found Threads");
        require(g[msg.sender] == true || m1[msg.sender] == true, "you are not qualified user");
        cages[keccak256(abi.encodePacked(object))] = true;
    } 

    function certificateEngines(int proof, string memory object) external {

        require(proof>5,"not valid Cages");
        require(cages[keccak256(abi.encodePacked(object))] == true, "not found Threads");
        require(m1[msg.sender] == true || m2[msg.sender] == true, "you are not qualified user");
        threads[keccak256(abi.encodePacked(object))] = true;
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
