import { Alchemy, Network } from 'alchemy-sdk'
import { useEffect, useState, useCallback } from 'react'
import ScrollableChain from './components/ScrollableChain'
import BlockSummary from './components/BlockSummary'

import { getBlockDetails } from './helper/alchemyHelpers'

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
  // const [blockTransactionDetails, setBlockTransactionDetails] = useState(null)

  // Block numbers
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

  // Block Details
  const fetchBlockDetails = useCallback(async () => {
    if (selectedBlock) {
      const details = await getBlockDetails(selectedBlock.blockNumber, alchemy)
      console.log('Block Details:', details)
      setBlockDetails(details)
    }
  }, [selectedBlock])

  useEffect(() => {
    fetchBlockDetails()
  }, [fetchBlockDetails])

  return (
    <div className='App'>
      <div className='scrollable-chain-parent-container'>
        <ScrollableChain
          blockNumbers={blockNumbers}
          setSelectedBlock={setSelectedBlock}
          selectedBlock={selectedBlock}
        />
      </div>
      <div className='row-container'>
        <div className='information-parent-container'>
          <BlockSummary
            selectedBlock={selectedBlock}
            blockDetails={blockDetails}
          />
        </div>
        <div className='information-parent-container'>
          <BlockSummary
            selectedBlock={selectedBlock}
            blockDetails={blockDetails}
          />
        </div>
      </div>
    </div>
  )
}

export default App
