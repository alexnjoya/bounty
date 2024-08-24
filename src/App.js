import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ChainlinkPlugin, MainnetPriceFeeds } from '@chainsafe/web3-plugin-chainlink';

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
    <div>
      <h1>Crypto Insurance</h1>
      <p>Current BTC Price: {btcPrice} USD</p>
      <input type="text" placeholder="Insured Amount (BTC)" onChange={(e) => setInsuredAmount(e.target.value)} />
      <input type="text" placeholder="Threshold Price (USD)" onChange={(e) => setThresholdPrice(e.target.value)} />
      <button onClick={createPolicy}>Create Policy</button>
      <button onClick={checkAndPayout}>Check and Payout</button>
      <button onClick={getBTCPrice}>Get BTC Price</button>
      {message && <p>{message}</p>} {/* Render message below the form */}
    </div>
  );
};

export default App;