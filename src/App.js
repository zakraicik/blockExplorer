import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import ScrollableChain from './components/ScrollableChain';

import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


const alchemy = new Alchemy(settings);

function App() {
  // const [blockNumber, setBlockNumber] = useState();

  // useEffect(() => {
  //   async function getBlockNumber() {
  //     setBlockNumber(await alchemy.core.getBlockNumber());
  //   }

  //   getBlockNumber();
  // });

  return (
    <div className="App">
      {/* <h1>Block Number: {blockNumber}</h1> */}
        <ScrollableChain />
    </div>
  );
}

export default App;
