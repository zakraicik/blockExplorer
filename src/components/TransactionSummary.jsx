import React from 'react'
import Chart from 'react-apexcharts'
import { Utils } from 'alchemy-sdk'

import '../css/transactionSummary.css'

const TransactionSummary = ({ selectedBlock, transactionDetails }) => {
  // Add a check to ensure transactionDetails is available before processing
  if (!transactionDetails || !transactionDetails.receipts) {
    return <div>Loading...</div>
  }

  const gasPriceData = transactionDetails.receipts.map(transaction =>
    Utils.formatUnits(
      Number(transaction.effectiveGasPrice),
      'gwei'
    ).toLocaleString()
  )

  const transactionIndexData = transactionDetails.receipts.map(transaction =>
    Number(transaction.transactionIndex)
  )

  const toAddresses = transactionDetails.receipts.map(
    transaction => transaction.to
  )

  const fromAddresses = transactionDetails.receipts.map(
    transaction => transaction.from
  )

  const transactionHashes = transactionDetails.receipts.map(
    transaction => transaction.transactionHash
  )

  const chartOptions = {
    chart: {
      type: 'line'
    },
    series: [
      {
        name: 'Gas Price',
        data: gasPriceData
      }
    ],
    xaxis: {
      type: 'numeric',
      stepSize: 10,

      axisBorder: {
        show: true,
        color: '#6A6A6A'
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#6A6A6A'
        },
        rotate: -90
      },
      title: {
        text: 'Transaction Index (Ordered Chronologically)',
        style: {
          color: '#6A6A6A',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 600
        }
      }
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      show: false
    },
    colors: ['#72f491', '#DE6E51'],
    yaxis: {
      axisBorder: {
        show: true,
        color: '#6A6A6A'
      },
      labels: {
        style: {
          colors: '#6A6A6A'
        },
        formatter: value => Math.round(value)
      },
      title: {
        text: 'Gas Price (Gwei)',
        style: {
          color: '#6A6A6A',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 600
        }
      }
    },
    legend: {
      show: true,
      labels: {
        colors: ['#6A6A6A', '#6A6A6A']
      }
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const to = toAddresses[dataPointIndex]
        const from = fromAddresses[dataPointIndex]
        const transactionHash = transactionHashes[dataPointIndex]
        const gasPrice = series[seriesIndex][dataPointIndex]

        return (
          '<div class="tooltip-container">' +
          '<div><strong>Transaction Index:</strong> ' +
          transactionIndexData[dataPointIndex] +
          '</div>' +
          '<div><strong>Gas Price:</strong> ' +
          gasPrice +
          ' Gwei</div>' +
          '<div><strong>From:</strong> ' +
          from +
          '</div>' +
          '<div><strong>To:</strong> ' +
          to +
          '</div>' +
          '<div><strong>Transaction Hash:</strong> ' +
          transactionHash +
          '</div>' +
          '</div>'
        )
      }
    }
  }

  return (
    <div className='transaction-summary-information-container'>
      {selectedBlock ? (
        <>
          <div className='h1'>Transaction Details</div>
          <div className='apex-chart'>
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type='line'
              height='250'
            />
          </div>
        </>
      ) : (
        <p>Select a block to see more information</p>
      )}
    </div>
  )
}

export default TransactionSummary
