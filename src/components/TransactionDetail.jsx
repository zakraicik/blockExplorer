import React from 'react'
import { Utils } from 'alchemy-sdk'
import { formatTimestamp, formatAddress } from '../helper/formatHelpers'
import '../App.css'

const TransactionDetail = ({ selectedBlock, transactionDetails }) => {
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
                  <th className='block-label'>From</th>
                  <th className='block-label'>To</th>
                  <th className='block-label'>Effective Gas Price</th>
                  <th className='block-label'>Gas Used</th>
                  <th className='block-label'>Status</th>
                </tr>
              </thead>
              <tbody className='block-value'>
                {transactionDetails.receipts.map((transaction, index) => (
                  <tr key={index}>
                    <td>{formatAddress(transaction.transactionHash)}</td>
                    <td>{formatAddress(transaction.from)}</td>
                    <td>{formatAddress(transaction.to)}</td>
                    <td>
                      {Utils.formatUnits(
                        Number(transaction.effectiveGasPrice),
                        'ether'
                      )}
                    </td>
                    <td>{Number(transaction.gasUsed).toLocaleString()}</td>
                    <td>{Number(transaction.status)}</td>
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

export default TransactionDetail
