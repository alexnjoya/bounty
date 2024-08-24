import logo from "./logo.svg";
import "./App.css";
import { Web3 } from "web3";
import { ChainlinkPlugin, MainnetPriceFeeds } from "@chainsafe/web3-plugin-chainlink";
import { useState } from "react";

function App() {
  const [btcPrice, setBtcPrice] = useState("0");
  const [ethPrice, setEthPrice] = useState("0");

  // Initialize RPC/injected provider
  const web3 = new Web3(window.ethereum);

  // Register the plugin
  web3.registerPlugin(new ChainlinkPlugin());

  async function getBTCPrice() {
    // use plugin
    //calling the plugin
    const btcprice = await web3.chainlink.getPrice(MainnetPriceFeeds.BtcUsd);
    //formating the variable
    const formattedPrice = btcprice.answer.toString().substring(0, 5);
    //updating front end
    setBtcPrice(formattedPrice);
  }

  async function getETHPrice() {
    // use plugin
    //calling the plugin
    const ethPrice = await web3.chainlink.getPrice(MainnetPriceFeeds.EthUsd);
    //formating the variable
    const formattedPrice = ethPrice.answer.toString().substring(0, 4);
    //updating front end
    setEthPrice(formattedPrice);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getBTCPrice}>Get BTC Price</button>
        <p>BTC price is: {btcPrice} </p>

        <button onClick={getETHPrice}>Get ETH Price</button>
        <p>ETH price is: {ethPrice} </p>
      </header>
    </div>
  );
}

export default App;
