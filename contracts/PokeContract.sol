// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract PokeContract {
    uint256 totalPokes; // state var stored permanently in contract storage

    constructor() {
        console.log("Smart Contract Construction");
    }

    event NewPoke(address indexed from, uint256 timestamp, string message);

    struct Poke {
        address poker;
        uint256 timestamp;
        string message;
    }
    Poke[] pokes;

    function poke(string memory _message) public {
        totalPokes += 1;
        console.log("%s has waved! Also wanted you to know: %s", msg.sender, _message);
        pokes.push(Poke(msg.sender, block.timestamp, _message));
        //lastPoker = msg.sender;
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