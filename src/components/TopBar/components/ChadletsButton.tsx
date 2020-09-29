import React, { useCallback } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'

import { useWallet } from 'use-wallet'

import useModal from '../../../hooks/useModal'

import { Contract } from 'web3-eth-contract'

import { getDisplayBalance } from '../../../utils/formatBalance'

import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'

import useEarnings from '../../../hooks/useEarnings'

interface ChadletButtonProps {
  customColor?: 'purple' | 'blue' | 'pink',
  backgroundGradient?: 'first' | 'second' | 'third' | 'all',
  text?: string,
  poolContract?: Contract,
}

const ChadletButton: React.FC<ChadletButtonProps> = (props) => {

  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />, 'provider')
  
  const { account } = useWallet()

  const earnings = useEarnings(props.poolContract)

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledChadletButton>
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
          customColor={props.customColor}
          backgroundGradient={props.backgroundGradient}
          size="sm"
          text={`${getDisplayBalance(earnings)} Chadlets`}
        />
      )}
    </StyledChadletButton>
  )
}

const StyledChadletButton = styled.div`
  flex: 1;
`

export default ChadletButton
