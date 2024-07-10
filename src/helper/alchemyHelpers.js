import { Utils } from 'alchemy-sdk'

export async function getBlockDetails (blockNumber, alchemy) {
  try {
    const blockDetails = await alchemy.core.getBlock(blockNumber)
    return blockDetails
  } catch (error) {
    console.error('Error fetching block details:', error)
    return null
  }
}

export async function getBlockTransactions (blockNumber, alchemy) {
  try {
    const params = {
      blockNumber: Utils.hexlify(blockNumber)
    }

    const transactionDetails = await alchemy.core.getTransactionReceipts(params)

    return transactionDetails
  } catch (error) {
    console.error('Error fetching block transactions:', error)
    return null
  }
}

export async function getGasPrice (alchemy) {
  try {
    const gasPrice = await alchemy.core.getGasPrice()
    return gasPrice
  } catch (error) {
    console.error('Error fetching gas price', error)
    return null
  }
}
