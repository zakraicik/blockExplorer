import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import ScrollableChain from './components/ScrollableChain';

import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const numberBlocks = 5;

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumbers, setBlockNumbers] = useState([])

  useEffect(() => {
    async function getBlockNumbers() {
      const currentBlockNumber = await alchemy.core.getBlockNumber();
      const blockNumbersArray = [];
      for (let i = 0; i < numberBlocks; i++) {
        blockNumbersArray.push({ id: numberBlocks-1-i, blockNumber: currentBlockNumber - i });
      }

      console.log(blockNumbersArray.reverse());
      setBlockNumbers(blockNumbersArray);
    }

    getBlockNumbers();
  }, []);

  return (
    <div className="App">
        <ScrollableChain blockNumbers={blockNumbers}/>
    </div>
  );
}

export default App;
