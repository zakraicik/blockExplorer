import React from 'react'
import { Utils } from 'alchemy-sdk'
import { formatTimestamp, formatAddress } from '../helper/formatHelpers'

import '../App.css'

const BlockSummary = ({ selectedBlock, blockDetails }) => {
  return (
    <div className='information-container'>
      {selectedBlock ? (
        <>
          <div className='block-number'>Block #{selectedBlock.blockNumber}</div>
          {blockDetails ? (
            <>
              <p className='block-timestamp'>
                {formatTimestamp(blockDetails.timestamp)}
              </p>

              <p className='block-details'>
                <span className='block-label'>Mined By:</span>
                <span className='block-value'>
                  {formatAddress(blockDetails.miner)}
                </span>
              </p>

              <p className='block-details'>
                <span className='block-label'>Number Transactions:</span>
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
  )
}

export default BlockSummary
