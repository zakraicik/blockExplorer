export async function getBlockDetails (blockNumber, alchemy) {
  try {
    const blockDetails = await alchemy.core.getBlock(blockNumber)
    return blockDetails
  } catch (error) {
    console.error('Error fetching block details:', error)
    return null
  }
}

export async function getTransactionDetails (blockDetails) {
  try {
    const transactions = blockDetails.transactions
  } catch (error) {
    console.error('Error fetching block details:', error)
    return null
  }
}

export const truncateAddress = address => {
  if (!address) return ''
  const start = address.slice(0, 6)
  const end = address.slice(-4)
  return `${start}...${end}`
}

export const formatTimestamp = unixTimestamp => {
  const date = new Date(unixTimestamp * 1000) // Convert to milliseconds
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  })
}
