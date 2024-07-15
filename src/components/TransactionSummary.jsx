import React from 'react'
import { Utils } from 'alchemy-sdk'
import { formatTimestamp, formatAddress } from '../helper/formatHelpers'
import '../App.css'

const TransactionSummary = ({ selectedBlock, transactionDetails }) => {
  return (
    <div className='information-container'>
      {selectedBlock ? (
        <>
          <div className='block-number'>Transaction Details</div>
          <p className='block-timestamp'> </p>
          <hr className='divider'></hr>
          {transactionDetails && transactionDetails.receipts ? (
            <div className='dummy-graph'>
              {/* Dummy graph content */}
              <div className='bar' style={{ height: '50%' }}></div>
              <div className='bar' style={{ height: '75%' }}></div>
              <div className='bar' style={{ height: '100%' }}></div>
              <div className='bar' style={{ height: '60%' }}></div>
              <div className='bar' style={{ height: '90%' }}></div>
            </div>
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
