const hre = require("hardhat");
const { ethers } = require("hardhat");

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    const deployerAddress = await deployer.getAddress();

    console.log('Deploying contracts with account: ', deployerAddress);
    console.log('Account balance: ', accountBalance.toString());

    const Token = await hre.ethers.getContractFactory('PokeContract');
    const portal = await Token.deploy();
    await portal.deployed();
    console.log("PokeContract address: ", portal.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();