// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    uint256 totalWaves; // state var stored permanently in contract storage
    address public lastWaver;

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
        lastWaver = msg.sender;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getLastWaver() public view returns (address) {
        return lastWaver;
    }
}