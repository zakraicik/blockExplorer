import { Alchemy, Network, Utils } from 'alchemy-sdk'
import { useEffect, useState, useCallback } from 'react'
import ScrollableChain from './components/ScrollableChain'
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
  const [blockTransactionDetails, setBlockTransactionDetails] = useState(null)

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
      <div className='container'>
        <ScrollableChain
          blockNumbers={blockNumbers}
          setSelectedBlock={setSelectedBlock}
          selectedBlock={selectedBlock} // Pass selectedBlock as a prop
        />
        <div class='parent-container'>
          <div className='information-container'>
            {selectedBlock ? (
              <>
                <div className='block-number'>
                  Block #{selectedBlock.blockNumber}
                </div>
                {blockDetails ? (
                  <>
                    <p>Timestamp: {blockDetails.timestamp}</p>
                    <p>Gas Limit: {Number(blockDetails.gasLimit._hex)}</p>
                    <p>Gas Used: {Number(blockDetails.gasUsed._hex)}</p>
                    <p>
                      Base Fee Per Gas:{' '}
                      {Utils.formatUnits(
                        Number(blockDetails.baseFeePerGas._hex),
                        'ether'
                      )}
                    </p>
                    <p>
                      Number Transactions: {blockDetails.transactions.length}
                    </p>
                    <p>Nonce: {Number(blockDetails.nonce)}</p>
                  </>
                ) : (
                  <p>Loading block details...</p>
                )}
              </>
            ) : (
              <p>Select a block to see more information</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
