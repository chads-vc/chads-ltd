import React, { useCallback } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'

import { useWallet } from 'use-wallet'

import useModal from '../../../hooks/useModal'

import { Contract } from 'web3-eth-contract'

import useStakedBalance from '../../../hooks/useStakedBalance'

import { getDisplayBalance } from '../../../utils/formatBalance'

import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'

import StakeModal from '../../StakeModal'

interface StakeButtonProps {
  customColor?: 'purple' | 'blue' | 'pink',
  backgroundGradient?: 'first' | 'second' | 'third' | 'all',
  text?: string,
  poolContract?: Contract,
}

const StakeButton: React.FC<StakeButtonProps> = (props) => {

  const [onPresentStakeModal] = useModal(<StakeModal />)
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />, 'provider')
  
  const { account } = useWallet()

  const stakedBalance = useStakedBalance(props.poolContract)
  console.log(stakedBalance)
  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledStakeButton>
      {!account ? (
        <Button
          onClick={handleUnlockClick}
          customColor={props.customColor}
          backgroundGradient={props.backgroundGradient}
          size="sm"
          text={props.text || "Unlock Wallet"}
        />
      ) : (
        <Button
          onClick={onPresentStakeModal}
          customColor={props.customColor}
          backgroundGradient={props.backgroundGradient}
          size="sm"
          text={((stakedBalance <= new BigNumber(0)) ? "LP Tokens" : `${getDisplayBalance(stakedBalance)} LP Tokens Staked`)}
        />
      )}
    </StyledStakeButton>
  )
}

const StyledStakeButton = styled.div`
  flex: 1;
`

export default StakeButton
