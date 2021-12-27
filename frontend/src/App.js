import { useEffect, useState } from "react";
import './App.css';
import { ethers } from "ethers";
import abi from './utils/PokeContract.json';

import { Input } from 'antd';
import 'antd/dist/antd.css';
const { TextArea } = Input;

const App = () => {
  const [currentAccount, setCurrentAccount] = useState();
  const contractAddress = "0x0CD65B5a2b361e00B733A1BC42E39C1860c5Af73";
  const contractABI = abi.abi;
  const [allPokes, setAllPokes] = useState([]);
  const [text, setText] = useState("");

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
        setCurrentAccount(account);
        await getAllPokes();
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
    const { ethereum } = window;
    if(ethereum){
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const currText = text;
        console.log(currText);
        let pokeTx = await contract.poke(currText);
        setText("");
        console.log("Awaiting Tx: ", pokeTx.hash);

        await pokeTx.wait();
        console.log("Mined -- ", pokeTx.hash);
        let str = pokeTx.hash.toString();
        console.log("Link: https://rinkeby.etherscan.io/tx/" + str);
        await getAllPokes();

      } catch (error) {
        console.log(error);
      }
    }
  }

  const getAllPokes = async () => {
    const { ethereum } = window;
    try {
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        let pokes = await contract.getAllPokes();

        let pokeData = [];
        pokes.forEach(poke => {
          pokeData.push({
            address: poke.poker,
            timestamp: new Date(pokes.timestamp * 1000),
            message: poke.message
          });
        });

        setAllPokes(pokeData);
      } else {
        console.log("Ethereum object is null")
      }
    } catch (error) {
        console.log(error);
      }
  }

  const getTotalPokes = async () => {
    const {ethereum} = window;
    if(ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        let readTx = await contract.getTotalPokes();
        console.log("There have been %s pokes", readTx.toNumber());

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
        My name's Ryan and I'm a blockchain dev. Feel free to poke me and leave a message!
        </div>

        <div className="funcButtons">
          <button id="pokeButton" onClick={poke}>
            Poke Me
          </button>
          <button id="getPokesButton" onClick={getTotalPokes}>
            Get Total # of pokes!
          </button>
          </div>
        {!currentAccount && (
          <button className="walletButton" onClick={connectWallet}>
                Connect Wallet
          </button>
        )}
        {currentAccount && (
            <TextArea value={text} onChange={e => setText(e.target.value)} placeholder="Input text here before poking me to add a message!"
                      style={{marginTop: "10px"}}>
            </TextArea>
        )}
        {allPokes.map((poke, index) => {
          return (
            <div key={index} style={{ backgroundColor: "#FEF5E6", marginTop: "16px", padding: "8px" }}>
              <div>Address: {poke.address}</div>
              <div>Time: {poke.timestamp.toString()}</div>
              <div>Message: {poke.message}</div>
            </div>)
        })}
      </div>
    </div>
  );
};

export default App;
