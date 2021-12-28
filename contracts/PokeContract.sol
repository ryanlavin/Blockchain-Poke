pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract PokeContract {
    uint256 totalPokes; // state var stored permanently in contract storage
    uint256 private seed;

    event NewPoke(address indexed from, uint256 timestamp, string message);

    struct Poke {
        address poker;
        uint256 timestamp;
        string message;
    }

    Poke[] pokes;

    mapping(address => uint256) public lastPokedAt;

    constructor() payable {
        console.log("Smart Contract Construction");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function poke(string memory _message) public {

        require (
            lastPokedAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait at least 15 minutes before trying again"
        );

        lastPokedAt[msg.sender] = block.timestamp;

        totalPokes += 1;
        console.log("%s has waved! Also wanted you to know: %s", msg.sender, _message);
        pokes.push(Poke(msg.sender, block.timestamp, _message));
        //lastPoker = msg.sender;

        seed = (block.timestamp + block.difficulty) % 100;
        console.log("Random Seed %s generated", seed);

        if (seed <= 50) {
            console.log("%s won: ", msg.sender);
            uint256 prize = 0.0001 ether;
            require(
                prize <= address(this).balance,
                "The address funding the prize ether is not sufficiently funded, sorry."
            );
            (bool success, ) = (msg.sender).call{value: prize}("SUCCESS!");
            require(success, "Failed to withdraw money.");
        }

        emit NewPoke(msg.sender, block.timestamp, _message);
    }

    function getFrontAddress() public view returns (address) {
        if(pokes.length > 0) {
            return pokes[0].poker;
        }
        return address(0);
    }

    function getAllPokes() public view returns (Poke[] memory) {
        return pokes;
    }

    function getTotalPokes() public view returns (uint256) {
        console.log("We have %d total waves!", totalPokes);
        return totalPokes;
    }

//    function getLastPoker() public view returns (address) {
//        return lastPoker;
//    }
}