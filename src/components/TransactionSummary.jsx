import React from 'react'

// import '../css/informationContainers.css'
import '../App.css'

const TransactionSummary = ({ selectedBlock }) => {
  return (
    <div className='information-container'>
      {selectedBlock ? (
        <>
          <div className='block-number'>Transaction Details</div>
        </>
      ) : (
        <p>Select a block to see more information</p>
      )}
    </div>
  )
}

export default TransactionSummary
