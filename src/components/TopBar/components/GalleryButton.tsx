import React, { useCallback } from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'

import useModal from '../../../hooks/useModal'

import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'

import AccountModal from './AccountModal'

interface GalleryButtonProps {
  customColor?: 'purple' | 'blue' | 'pink',
  backgroundGradient?: 'first' | 'second' | 'third' | 'all',
  text?: string,
}

const GalleryButton: React.FC<GalleryButtonProps> = (props) => {

  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />, 'provider')
  
  const { account } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledGalleryButton>
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
	  href={`https://opensea.io/accounts/${account}`}
          customColor={props.customColor}
          backgroundGradient={props.backgroundGradient}
          size="sm"
          text={props.text || "My Wallet"}
        />
      )}
    </StyledGalleryButton>
  )
}

const StyledGalleryButton = styled.div`
  flex: 1;
`

export default GalleryButton
