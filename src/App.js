import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ChainlinkPlugin, MainnetPriceFeeds } from '@chainsafe/web3-plugin-chainlink';
import ensureImage from './assets/ensure.png'; 
import Navbar from './components/navBar';
import Footer from './components/footer';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [btcPrice, setBtcPrice] = useState("0");
  const [insuredAmount, setInsuredAmount] = useState('');
  const [thresholdPrice, setThresholdPrice] = useState('');
  const [insuranceActive, setInsuranceActive] = useState(false);
  const [message, setMessage] = useState(''); // New state for messages

  useEffect(() => {
    const initWeb3 = async () => {
      const web3Instance = new Web3(window.ethereum);
      web3Instance.registerPlugin(new ChainlinkPlugin());
      setWeb3(web3Instance);
    };
    initWeb3();
  }, []);

  const getBTCPrice = async () => {
    const btcPriceData = await web3.chainlink.getPrice(MainnetPriceFeeds.BtcUsd);
    const formattedPrice = btcPriceData.answer.toString();
    setBtcPrice(formattedPrice);
  };

  const createPolicy = () => {
    if (parseFloat(btcPrice) < parseFloat(thresholdPrice)) {
      setMessage("Insurance policy created!"); // Set message for policy creation
      setInsuranceActive(true);
    } else {
      setMessage("Current BTC price is above the threshold. Policy not created."); // Set message for policy not created
    }
  };

  const checkAndPayout = () => {
    if (insuranceActive && parseFloat(btcPrice) < parseFloat(thresholdPrice)) {
      setMessage(`Payout triggered! You are insured for ${insuredAmount} BTC.`); // Set message for payout
      setInsuranceActive(false);
    } else {
      setMessage("No payout triggered. Conditions not met."); // Set message for no payout
    }
  };

  return (
    <><Navbar />
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8 bg-gray-800 shadow-lg">
        <h1 className="text-4xl font-bold mb-6">Crypto Insurance</h1>
        <p className="text-lg mb-4">Current BTC Price: {btcPrice} USD</p>
        <input 
          type="text" 
          placeholder="Insured Amount (BTC)" 
          className="border-2 border-gray-600 rounded-lg p-3 mb-4 w-80 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105" 
          onChange={(e) => setInsuredAmount(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Threshold Price (USD)" 
          className="border-2 border-gray-600 rounded-lg p-3 mb-4 w-80 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105" 
          onChange={(e) => setThresholdPrice(e.target.value)} 
        />
        <button 
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-400 transition duration-300 ease-in-out mb-2 w-80 transform hover:scale-105" 
          onClick={createPolicy}
        >
          Create Policy
        </button>
        <button 
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-green-400 transition duration-300 ease-in-out mb-2 w-80 transform hover:scale-105" 
          onClick={checkAndPayout}
        >
          Check and Payout
        </button>
        <button 
          className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300 ease-in-out w-80 transform hover:scale-105" 
          onClick={getBTCPrice}
        >
          Get BTC Price
        </button>
        {message && <p className="text-lg text-yellow-500 mt-4 animate-pulse">{message}</p>} {/* Render message below the form */}
      </div>
      <div className="hidden md:flex items-center justify-center w-full md:w-1/2 bg-gray-800">
        <div className="w-full h-full flex items-center justify-center">
          <img src={ensureImage} alt="Ensure" className="w-3/4 h-3/4 object-cover rounded-lg" />
        </div>
      </div>
    </div>
    <Footer />
    </>
    
  );
};

export default App;