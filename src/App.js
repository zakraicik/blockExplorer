import { Alchemy, Network } from 'alchemy-sdk'
import { useEffect, useState, useCallback } from 'react'
import ScrollableChain from './components/ScrollableChain'
import { getBlockDetails } from './helper/blockDetails'

import './App.css'

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(settings)

function App () {
  const [blockNumbers, setBlockNumbers] = useState([])
  const [selectedBlock, setSelectedBlock] = useState(null)
  const [blockDetails, setBlockDetails] = useState(null)

  useEffect(() => {
    async function getBlockNumbers () {
      const currentBlockNumber = await alchemy.core.getBlockNumber()
      const blockNumbersArray = []
      for (let i = 0; i < 5; i++) {
        blockNumbersArray.push({ id: i, blockNumber: currentBlockNumber - i })
      }

      setBlockNumbers(blockNumbersArray.reverse())
    }

    getBlockNumbers()
  }, [])

  const fetchBlockDetails = useCallback(async () => {
    if (selectedBlock) {
      const details = await getBlockDetails(selectedBlock.title, alchemy)
      console.log('Block Details:', details)
      setBlockDetails(details)
    }
  }, [selectedBlock])

  useEffect(() => {
    fetchBlockDetails()
  }, [fetchBlockDetails])

  return (
    <div className='App'>
      <div className='container'>
        <ScrollableChain
          blockNumbers={blockNumbers}
          setSelectedBlock={setSelectedBlock}
        />
        <div className='information-container'>
          {selectedBlock ? (
            <p>Information for {selectedBlock.blockNumber}</p>
          ) : (
            <p>Select a block to see more information</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
