const hre = require("hardhat");
const { ethers } = require("hardhat");

const main = async () => {
  const pokeContractFactory = await hre.ethers.getContractFactory('PokeContract');
  const pokeContract = await pokeContractFactory.deploy();
  await pokeContract.deployed();

  console.log("Contract deployed to:", pokeContract.address);
  //console.log("Contract deployed by:", owner.address);

  let pokeTx = pokeContract.poke("Some message");
  await pokeTx.wait;
  let allPokes = await pokeContract.getAllPokes();
  console.log(allPokes);

  const [_, randomPerson] = await hre.ethers.getSigners();
  pokeTx = await pokeContract.connect(randomPerson).poke("Some other message");
  await pokeTx.wait;

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