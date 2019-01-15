pragma solidity ^0.5.0;

contract Homegrow {
    //based on subcurrency example from solidity docs --> since we intend to have this be local currency basically 
    address public minter; 
    mapping (address => uint) public balances; 

    event Sent(address from, address to, uint amount); 

    //this is the constructor whose code is only run when the contract is created
    constructor() public {
        minter = msg.sender; 
    }

    function mint(address _receiver, uint _amount) public {
        if (msg.sender != minter) return; 
        balances[_receiver] += _amount; 
    }

    function sendMoney(address _sender, address _receiver, uint _amount) public {
        if (balances[_sender] < _amount) return; 
        balances[_sender] -= _amount;
        balances[_receiver] += _amount; 
        emit Sent(_sender, _receiver, _amount); 
    }

    function getBalance(address _balancee) public view returns (uint) {
        return balances[_balancee];
    }
    
    //is it possible to get all the balances for all the accounts? 
        //ie iterate through the mapping? 
        //i think so, but would require either having the mapping stored by sequential integers 
        //or storing the addresses somewhere outside the contract and passing them in (either individually or all together[ie array]?)

}
