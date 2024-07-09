export async function getBlockDetails (blockNumber, alchemy) {
  try {
    const blockDetails = await alchemy.core.getBlock(blockNumber)
    return blockDetails
  } catch (error) {
    console.error('Error fetching block details:', error)
    return null
  }
}
