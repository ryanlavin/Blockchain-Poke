const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const m = new Map();

  const pokeContractFactory = await hre.ethers.getContractFactory('PokePortal');
  const pokeContract = await pokeContractFactory.deploy();
  await pokeContract.deployed();

  console.log("Contract deployed to:", pokeContract.address);
  console.log("Contract deployed by:", owner.address);

  let pokeCount;
  pokeCount = await pokeContract.getTotalPokes();

  let poke;
  poke = await pokeContract.poke();
  await poke.wait();

  let n = await pokeContract.getTotalPokes();
  n = n.toNumber();
  m.set(n, poke.address);

  poke = await pokeContract.connect(randomPerson).poke();
  await poke.wait();

  n = await pokeContract.getTotalsPokes();
  n = n.toNumber();
  m.set(n, randomPerson.address);

  console.log(randomPerson.address);
  console.log(await pokeContract.getLastPoker());


  n = await pokeContract.getTotalPokes();
  n = n.toNumber();
  console.log(n);
  console.log(m.get(n-1));
  console.log(m.size);

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