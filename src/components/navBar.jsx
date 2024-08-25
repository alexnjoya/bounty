import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const Navbar = ({ onConnectWallet }) => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        onConnectWallet(web3);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  return (
    <nav className="bg-black pl-[40px] pt-[10px] mb-[30px] pb-[30px] shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-xl ml-10px font-bold">Ensure</span>
        </div>
        <button 
          className="bg-blue-600 mr-[50px] text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-500 transition duration-300 ease-in-out"
          onClick={connectWallet}
        >
          {account ? `Connected: ${account.substring(0, 6)}...${account.substring(account.length - 4)}` : 'Connect Wallet'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;