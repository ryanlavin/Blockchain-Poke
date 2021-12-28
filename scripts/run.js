const hre = require("hardhat");
const { ethers } = require("hardhat");

const main = async () => {
  const pokeContractFactory = await hre.ethers.getContractFactory('PokeContract');
  const pokeContract = await pokeContractFactory.deploy({value: hre.ethers.utils.parseEther("0.1")});
  await pokeContract.deployed();

  console.log("Contract deployed to:", pokeContract.address);

  let contractBal = await hre.ethers.provider.getBalance(pokeContract.address);
  console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBal));

  let pokeTx = pokeContract.poke("Some message");
  await pokeTx.wait;

  const [_, randomPerson] = await hre.ethers.getSigners();
  pokeTx = await pokeContract.connect(randomPerson).poke("Some other message");
  await pokeTx.wait;
  contractBal = await hre.ethers.provider.getBalance(pokeContract.address);
  console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBal));

  console.log(await pokeContract.getAllPokes());
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();