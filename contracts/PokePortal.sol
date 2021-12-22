// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract PokePortal {
    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    uint256 totalPokes; // state var stored permanently in contract storage
    address public lastPoker;

    function poke() public {
        totalPokes += 1;
        console.log("%s has waved!", msg.sender);
        lastPoker = msg.sender;
    }

    function getTotalPokes() public view returns (uint256) {
        console.log("We have %d total waves!", totalPokes);
        return totalPokes;
    }

    function getLastPoker() public view returns (address) {
        return lastPoker;
    }
}