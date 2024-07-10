export async function getBlockDetails (blockNumber, alchemy) {
  try {
    const blockDetails = await alchemy.core.getBlockWithTransactions(
      blockNumber
    )
    return blockDetails
  } catch (error) {
    console.error('Error fetching block details:', error)
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
