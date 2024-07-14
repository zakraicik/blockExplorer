import React from 'react'
import { formatTimestamp, formatAddress } from '../helper/formatHelpers'
import '../App.css'

const TransactionSummary = ({ selectedBlock, transactionDetails }) => {
  return (
    <div className='information-container'>
      {selectedBlock ? (
        <>
          <div className='block-number'>Transaction Details</div>
          <p className='block-timestamp'>
            Thursday, July 11, 2024 at 07:08:47 PM PDT
          </p>
          <hr className='divider'></hr>
          {transactionDetails && transactionDetails.receipts ? (
            <table className='transaction-summary-table'>
              <thead>
                <tr>
                  <th className='block-label'>Transaction Hash</th>
                  {/* <th className='block-label'>Block Number</th>
                  <th className='block-label'>Gas Used</th>
                  <th className='block-label'>Status</th>
                  <th className='block-label'>Logs Count</th> */}
                </tr>
              </thead>
              <tbody className='block-value'>
                {transactionDetails.receipts.map((transaction, index) => (
                  <tr key={index}>
                    <td>{formatAddress(transaction.transactionHash)}</td>
                    {/* <td>{parseInt(transaction.blockNumber, 16)}</td>
                    <td>{parseInt(transaction.gasUsed, 16)}</td>
                    <td>{transaction.status === '0x1' ? 'Success' : 'Failed'}</td>
                    <td>{transaction.logs.length}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading transaction details...</p>
          )}
        </>
      ) : (
        <p>Select a block to see more information</p>
      )}
    </div>
  )
}

export default TransactionSummary
