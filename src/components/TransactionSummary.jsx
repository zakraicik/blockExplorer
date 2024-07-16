import React from 'react'
import Chart from 'react-apexcharts'
import '../css/transactionSummary.css'

const TransactionSummary = ({}) => {
  let selectedBlock = true

  const chartOptions = {
    chart: {
      type: 'line'
    },
    series: [
      {
        name: 'Gas Used',
        data: [50, 75, 100, 60, 90]
      },
      {
        name: 'Gas Price',
        data: [80, 60, 120, 70, 95]
      }
    ],
    xaxis: {
      categories: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
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
        }
      }
    },
    legend: {
      show: true,
      labels: {
        colors: ['#6A6A6A', '#6A6A6A']
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
