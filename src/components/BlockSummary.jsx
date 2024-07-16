import React from 'react'
import { Utils } from 'alchemy-sdk'
import { formatTimestamp, formatAddress } from '../helper/formatHelpers'

import '../css/blockSummary.css'

const BlockSummary = ({ selectedBlock, blockDetails }) => {
  return (
    <div className='information-container'>
      {selectedBlock ? (
        <>
          <div className='block-number'>Block #{selectedBlock.blockNumber}</div>
          <p className='block-timestamp'>
            {blockDetails
              ? formatTimestamp(blockDetails.timestamp)
              : 'Loading...'}
          </p>
          {blockDetails && (
            <table className='table'>
              <tbody>
                <tr>
                  <td className='block-label'>Mined By:</td>
                  <td className='block-value'>
                    {formatAddress(blockDetails.miner)}
                  </td>
                </tr>
                <tr>
                  <td className='block-label'>Number Transactions:</td>
                  <td className='block-value'>
                    {blockDetails.transactions.length.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className='block-label'>Gas Limit:</td>
                  <td className='block-value'>
                    {Number(blockDetails.gasLimit._hex).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className='block-label'>Gas Used:</td>
                  <td className='block-value'>
                    {Number(blockDetails.gasUsed._hex).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className='block-label'>Base Fee Per Gas:</td>
                  <td className='block-value'>
                    {Utils.formatUnits(
                      Number(blockDetails.baseFeePerGas._hex),
                      'ether'
                    )}
                  </td>
                </tr>
                <tr>
                  <td className='block-label'>Burnt Fees:</td>
                  <td className='block-value'>
                    {Utils.formatUnits(
                      Number(blockDetails.baseFeePerGas._hex),
                      'ether'
                    ) * Number(blockDetails.gasUsed._hex)}
                  </td>
                </tr>
                <tr>
                  <td className='block-label'>Nonce:</td>
                  <td className='block-value'>{Number(blockDetails.nonce)}</td>
                </tr>
              </tbody>
            </table>
          )}
        </>
      ) : (
        <p>Select a block to see more information</p>
      )}
    </div>
  )
}

export default BlockSummary
