import { Alchemy, Network, Utils } from 'alchemy-sdk'
import { useEffect, useState, useCallback } from 'react'
import ScrollableChain from './components/ScrollableChain'
import {
  getBlockDetails,
  formatTimestamp,
  truncateAddress
} from './helper/alchemyHelpers'

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
      <div>
        <ScrollableChain
          blockNumbers={blockNumbers}
          setSelectedBlock={setSelectedBlock}
          selectedBlock={selectedBlock} // Pass selectedBlock as a prop
        />
        <div className='row-container'>
          <div className='information-parent-container'>
            <div className='information-container'>
              {selectedBlock ? (
                <>
                  <div className='block-number'>
                    Block #{selectedBlock.blockNumber}
                  </div>
                  {blockDetails ? (
                    <>
                      <p className='block-timestamp'>
                        {formatTimestamp(blockDetails.timestamp)}
                      </p>

                      <p className='block-details'>
                        <span className='block-label'>Mined By:</span>
                        <span className='block-value'>
                          {truncateAddress(blockDetails.miner)}
                        </span>
                      </p>

                      <p className='block-details'>
                        <span className='block-label'>
                          Number Transactions:
                        </span>
                        <span className='block-value'>
                          {blockDetails.transactions.length.toLocaleString()}
                        </span>
                      </p>

                      <p className='block-details'>
                        <span className='block-label'>Gas Limit:</span>
                        <span className='block-value'>
                          {Number(blockDetails.gasLimit._hex).toLocaleString()}
                        </span>
                      </p>
                      <p className='block-details'>
                        <span className='block-label'>Gas Used:</span>
                        <span className='block-value'>
                          {Number(blockDetails.gasUsed._hex).toLocaleString()}
                        </span>
                      </p>

                      <p className='block-details'>
                        <span className='block-label'>Base Fee Per Gas:</span>
                        <span className='block-value'>
                          {Utils.formatUnits(
                            Number(blockDetails.baseFeePerGas._hex),
                            'ether'
                          )}
                        </span>
                      </p>

                      <p className='block-details'>
                        <span className='block-label'>Nonce: </span>
                        <span className='block-value'>
                          {Number(blockDetails.nonce)}
                        </span>
                      </p>
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
          <div className='extra-container'></div>
        </div>
      </div>
    </div>
  )
}

export default App
