const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const m = new Map();

  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let wave;
  wave = await waveContract.wave();
  await wave.wait();

  let n = await waveContract.getTotalWaves();
  n = n.toNumber();
  m.set(n, wave.address);

  //waveCount = await waveContract.getTotalWaves();

  wave = await waveContract.connect(randomPerson).wave();
  await wave.wait();

  n = await waveContract.getTotalWaves();
  n = n.toNumber();
  m.set(n, randomPerson.address);
  console.log("------------------");
  console.log(randomPerson.address);
  console.log(await waveContract.getLastWaver());

    console.log("------------------");

  n = await waveContract.getTotalWaves();
  n = n.toNumber();
  console.log(n);
  console.log(m.get(n-1));
  console.log(m.size);

  //waitCount = await waveContract.getTotalWaves();

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