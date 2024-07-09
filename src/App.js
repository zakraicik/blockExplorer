import { Alchemy, Network } from 'alchemy-sdk'
import { useEffect, useState } from 'react'
import ScrollableChain from './components/ScrollableChain'

import './App.css'

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(settings)

function App () {
  const [blockNumbers, setBlockNumbers] = useState([])
  const [selectedBlock, setSelectedBlock] = useState(null)

  useEffect(() => {
    async function getBlockNumbers () {
      const currentBlockNumber = await alchemy.core.getBlockNumber()
      const blockNumbersArray = []
      for (let i = 0; i < 5; i++) {
        blockNumbersArray.push({ id: i, title: currentBlockNumber - i })
      }

      setBlockNumbers(blockNumbersArray.reverse())
    }

    getBlockNumbers()
  }, [])

  return (
    <div className='App'>
      <div className='container'>
        <ScrollableChain
          blockNumbers={blockNumbers}
          setSelectedBlock={setSelectedBlock}
        />
        <div className='information-container'>
          {selectedBlock ? (
            <p>Information for {selectedBlock.title}</p>
          ) : (
            <p>Select a block to see more information</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
