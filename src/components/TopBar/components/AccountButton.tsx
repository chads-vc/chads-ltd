import React, { useCallback } from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'

import useModal from '../../../hooks/useModal'

import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'

import AccountModal from './AccountModal'

interface AccountButtonProps {
  customColor?: 'purple' | 'blue' | 'pink',
  backgroundGradient?: 'first' | 'second' | 'third' | 'all',
  text?: string
}

const AccountButton: React.FC<AccountButtonProps> = (props) => {

  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />, 'provider')
  
  const { account } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledAccountButton>
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
          text={props.text || "My Wallet"}
        />
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div`
  flex: 1;
`

export default AccountButton
