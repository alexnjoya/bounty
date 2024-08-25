import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ChainlinkPlugin, MainnetPriceFeeds } from '@chainsafe/web3-plugin-chainlink';
import Navbar from './components/navBar'; 
import Footer from './components/footer';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [btcPrice, setBtcPrice] = useState("0");
  const [ethPrice, setEthPrice] = useState("0");
  const [bnbPrice, setBnbPrice] = useState("0");
  const [selectedToken, setSelectedToken] = useState('BTC');
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

  const getPrices = async () => {
    const btcPriceData = await web3.chainlink.getPrice(MainnetPriceFeeds.BtcUsd);
    const ethPriceData = await web3.chainlink.getPrice(MainnetPriceFeeds.EthUsd);
    const bnbPriceData = await web3.chainlink.getPrice(MainnetPriceFeeds.BnbUsd);
    const formatPrice = btcPriceData.answer.toString().substring(0, 4);
    const formatPrice2 = ethPriceData.answer.toString().substring(0, 4);
    const formatPrice3 = bnbPriceData.answer.toString().substring(0, 4);

    setBtcPrice(formatPrice);
    setEthPrice(formatPrice2);
    setBnbPrice(formatPrice3);
  };

  const createPolicy = () => {
    const currentPrice = selectedToken === 'BTC' ? btcPrice : selectedToken === 'ETH' ? ethPrice : bnbPrice;
    if (parseFloat(currentPrice) < parseFloat(thresholdPrice)) {
      alert(`Success! Your insurance policy for ${selectedToken} has been created.`);
      setInsuranceActive(true);
      setHistory([...history, { action: 'Policy Created', token: selectedToken, amount: insuredAmount, threshold: thresholdPrice, date: new Date().toLocaleString() }]);
    } else {
      alert(`Failed! The current ${selectedToken} price is above your threshold. Policy not created.`);
    }
  };

  const checkAndPayout = () => {
    const currentPrice = selectedToken === 'BTC' ? btcPrice : selectedToken === 'ETH' ? ethPrice : bnbPrice;
    if (insuranceActive && parseFloat(currentPrice) < parseFloat(thresholdPrice)) {
      alert(`Congratulations! Payout triggered. You are insured for ${insuredAmount} ${selectedToken}.`);
      setInsuranceActive(false);
      setHistory([...history, { action: 'Payout Triggered', token: selectedToken, amount: insuredAmount, threshold: thresholdPrice, date: new Date().toLocaleString() }]);
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
      <Navbar onConnectWallet={connectWallet} />
      <h1 className="text-4xl font-bold text-center mt-2 mb-6">Crypto Insurance Dapp</h1>
      <div className="flex flex-col md:flex-row items-center justify-center flex-grow p-8 bg-gray-800 shadow-lg space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex flex-col items-center space-y-4 w-full md:w-1/2">
          <select
            className="border-2 border-gray-600 rounded-lg p-3 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
            onChange={(e) => setSelectedToken(e.target.value)}
          >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="BNB">BNB</option>
          </select>
          <input
            type="text"
            placeholder="Insured Amount"
            className="border-2 border-gray-600 rounded-lg p-3 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
            onChange={(e) => setInsuredAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Threshold Price (USD)"
            className="border-2 border-gray-600 rounded-lg p-3 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
            onChange={(e) => setThresholdPrice(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-400 transition duration-300 ease-in-out w-full transform hover:scale-105"
            onClick={createPolicy}
          >
            Create Policy
          </button>
          <button
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-green-400 transition duration-300 ease-in-out w-full transform hover:scale-105"
            onClick={checkAndPayout}
          >
            Check and Payout
          </button>
        </div>
        <div className="flex flex-col items-center space-y-4 w-full md:w-1/2">
          <h2 className="text-2xl font-bold">Current Prices:</h2>
          <div className="flex flex-col items-left space-y-4">
            <div className="flex items-center bg-gray-700  px-[220px] text-white rounded-lg px-
             py-3 cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out">
              <span className="flex items-center text-xl font-semibold">{btcPrice}</span>
              <span className="ml-2 text-lg">  <pre> USD (BTC) </pre></span>
            </div>
            <div className="flex items-center bg-gray-700 text-white rounded-lg px-[220px] py-2 cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out">
            <span className="flex items-center text-xl font-semibold">{ethPrice}</span>
              <span className="ml-2 text-lg">USD (ETH)</span>
            </div>
            <div className="flex items-center bg-gray-700 text-white rounded-lg  px-[220px] px-4 py-2 cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out">
            <span className="flex items-center text-xl font-semibold">{bnbPrice}</span>
              <span className="ml-2 text-lg">USD (BNB)</span>
            </div>
          </div>
          <button
            className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300 ease-in-out w-full transform hover:scale-105"
            onClick={getPrices}
          >
            Get Prices
          </button>
        </div>
      </div>
      <div className="p-8 bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">Insurance Policy History</h2>
        <table className="min-w-full bg-gray-700 text-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Action</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Token</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Amount</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Threshold (USD)</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-600">{entry.action}</td>
                <td className="py-2 px-4 border-b border-gray-600">{entry.token}</td>
                <td className="py-2 px-4 border-b border-gray-600">{entry.amount}</td>
                <td className="py-2 px-4 border-b border-gray-600">{entry.threshold}</td>
                <td className="py-2 px-4 border-b border-gray-600">{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default App;