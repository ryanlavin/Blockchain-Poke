import { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";
import abi from './utils/PokePortal.json';

function App() {
  const [currentAccount, setCurrentAccount] = useState();
  const contractAddress = "0x4096349688cb5E4CF2f17Cf55BfB6Cd37B31c1dF";
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({method: 'eth_accounts'});
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const {ethereum} = window;

      if(!ethereum) {
        alert("Go to the Google Chrome store to download Metamask!");
        return;
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"});

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const poke = async () => {
    const { ethereum } = window
    if(ethereum){
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const pokePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log(contractAddress);
        let count = await pokePortalContract.getTotalPokes();
        console.log("Retrieved the total number of waves: %s", count.toNumber());

        let pokeTx = await pokePortalContract.poke();
        console.log("Awaiting Tx: ", pokeTx.hash);

        await pokeTx.wait();
        console.log("Mined -- ", pokeTx.hash);

      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
   <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        My name's Ryan and I am a blockchain dev. Feel free to poke me and leave a message!
        </div>

        <button className="pokeButton" onClick={poke}>
          Poke Me
        </button>
        {!currentAccount && (
          <button className="pokeButton" onClick={connectWallet}>
                Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
