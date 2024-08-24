import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ChainlinkPlugin, MainnetPriceFeeds } from '@chainsafe/web3-plugin-chainlink';
import Navbar from './components/navBar'; // Import the Navbar component

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [btcPrice, setBtcPrice] = useState("0");
  const [insuredAmount, setInsuredAmount] = useState('');
  const [thresholdPrice, setThresholdPrice] = useState('');
  const [insuranceActive, setInsuranceActive] = useState(false);
  const [history, setHistory] = useState([]); // State to keep track of policy history

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
      alert("Success! Your insurance policy has been created.");
      setInsuranceActive(true);
      setHistory([...history, { action: 'Policy Created', amount: insuredAmount, threshold: thresholdPrice, date: new Date().toLocaleString() }]);
    } else {
      alert("Failed! The current BTC price is above your threshold. Policy not created.");
    }
  };

  const checkAndPayout = () => {
    if (insuranceActive && parseFloat(btcPrice) < parseFloat(thresholdPrice)) {
      alert(`Congratulations! Payout triggered. You are insured for ${insuredAmount} BTC.`);
      setInsuranceActive(false);
      setHistory([...history, { action: 'Payout Triggered', amount: insuredAmount, threshold: thresholdPrice, date: new Date().toLocaleString() }]);
    } else {
      alert("No payout triggered. Conditions not met.");
    }
  };

  const connectWallet = () => {
    // Implement wallet connection logic here
    console.log("Wallet connected");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white font-lato">
      <Navbar onConnectWallet={connectWallet} /> {/* Include the Navbar component */}
      <div className="flex flex-col items-center justify-center flex-grow p-8 bg-gray-800 shadow-lg">
        <h1 className="text-4xl font-bold mb-6">Crypto Insurance</h1>
        <div className="flex items-center mb-4">
          <p className="text-lg mr-2">Current BTC Price:</p>
          <div className="flex items-center bg-gray-700 text-white rounded-lg px-4 py-2">
            <span className="text-2xl font-semibold">{btcPrice}</span>
            <span className="ml-2 text-lg">USD</span>
          </div>
        </div>
        <input 
          type="text" 
          placeholder="Insured Amount (BTC)" 
          className="border-2 border-gray-600 rounded-lg p-3 mb-4 w-96 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105" 
          onChange={(e) => setInsuredAmount(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Threshold Price (USD)" 
          className="border-2 border-gray-600 rounded-lg p-3 mb-4 w-96 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105" 
          onChange={(e) => setThresholdPrice(e.target.value)} 
        />
        <button 
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-400 transition duration-300 ease-in-out mb-2 w-96 transform hover:scale-105" 
          onClick={createPolicy}
        >
          Create Policy
        </button>
        <button 
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-green-400 transition duration-300 ease-in-out mb-2 w-96 transform hover:scale-105" 
          onClick={checkAndPayout}
        >
          Check and Payout
        </button>
        <button 
          className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300 ease-in-out w-96 transform hover:scale-105" 
          onClick={getBTCPrice}
        >
          Get BTC Price
        </button>
      </div>
      <div className="p-8 bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">Insurance Policy History</h2>
        <table className="min-w-full bg-gray-700 text-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Action</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Amount (BTC)</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Threshold (USD)</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-600">{entry.action}</td>
                <td className="py-2 px-4 border-b border-gray-600">{entry.amount}</td>
                <td className="py-2 px-4 border-b border-gray-600">{entry.threshold}</td>
                <td className="py-2 px-4 border-b border-gray-600">{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;