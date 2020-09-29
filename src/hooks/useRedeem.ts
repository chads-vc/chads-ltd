import { useCallback } from 'react'

import { useWallet } from 'use-wallet'
import { Contract } from "web3-eth-contract"

import { redeem } from '../yamUtils'

const useRedeem = (poolContract: Contract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async (cardId: string) => {
    const txHash = await redeem(poolContract, account, cardId)
    console.log(txHash)
    return txHash
  }, [account, poolContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem