import { Alchemy, Network } from 'alchemy-sdk'
import { useEffect, useState, useCallback } from 'react'
import ScrollableChain from './components/ScrollableChain'
import BlockSummary from './components/BlockSummary'
import TransactionSummary from './components/TransactionSummary'
import Header from './components/Header'

import { getBlockDetails, getBlockTransactions } from './helper/alchemyHelpers'

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
  const [transactionDetails, setTransactionDetails] = useState(null)

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

  const fetchBlockDetails = useCallback(async () => {
    if (selectedBlock) {
      const blockDetails = await getBlockDetails(
        selectedBlock.blockNumber,
        alchemy
      )
      // console.log('Block Details:', blockDetails)
      setBlockDetails(blockDetails)
    }
  }, [selectedBlock])

  const fetchBlockTransactions = useCallback(async () => {
    if (selectedBlock) {
      const blockTransactions = await getBlockTransactions(
        selectedBlock.blockNumber,
        alchemy
      )
      console.log('Block Transactions', blockTransactions)
      setTransactionDetails(blockTransactions)
    }
  }, [selectedBlock])

  useEffect(() => {
    fetchBlockDetails()
  }, [fetchBlockDetails])

  useEffect(() => {
    fetchBlockTransactions()
  }, [fetchBlockTransactions])

  return (
    <div className='App'>
      <Header />
      <div className='scrollable-chain-parent-container'>
        <ScrollableChain
          blockNumbers={blockNumbers}
          setSelectedBlock={setSelectedBlock}
          selectedBlock={selectedBlock}
        />
      </div>
      <div className='row-container'>
        <BlockSummary
          selectedBlock={selectedBlock}
          blockDetails={blockDetails}
        />
        <TransactionSummary
        // selectedBlock={selectedBlock}
        // transactionDetails={transactionDetails}
        />
      </div>
    </div>
  )
}

export default App
