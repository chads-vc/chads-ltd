import React, { useCallback } from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'

import useModal from '../../../hooks/useModal'
import { formatAddress } from '../../../utils/index'

import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'

import AccountModal from './AccountModal'

interface WalletButtonProps {
  customColor?: 'purple' | 'blue' | 'pink',
  backgroundGradient?: 'first' | 'second' | 'third' | 'all',
  text?: string
}

const WalletButton: React.FC<WalletButtonProps> = (props) => {

  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />, 'provider')
  
  const { account } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledWalletButton>
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
          onClick={onPresentAccountModal}
          customColor={props.customColor}
          backgroundGradient={props.backgroundGradient}
          size="sm"
          text={formatAddress(account)}
        />
      )}
    </StyledWalletButton>
  )
}

const StyledWalletButton = styled.div`
  flex: 1;
`

export default WalletButton
