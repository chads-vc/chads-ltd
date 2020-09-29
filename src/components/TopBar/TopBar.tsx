import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import StakeButton from './components/StakeButton'
import WalletButton from './components/WalletButton'
import GalleryButton from './components/GalleryButton'

import ChadletButton from './components/ChadletsButton'
import Nav from './components/Nav'

import useFarm from '../../hooks/useFarm'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {

  const farmId = "chads_eth_uni_lp";
  const {
    contract,
    depositToken,
    depositTokenAddress,
    earnToken,
    name,
    icon,
  } = useFarm(farmId) || {
    depositToken: '',
    depositTokenAddress: '',
    earnToken: '',
    name: '',
    icon: ''
  }


  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <StyledLogoWrapper>
            <Logo logotypeIndex={Math.floor(Math.random() * Math.floor(5))} />
          </StyledLogoWrapper>
          <StyledActionsMenu>
            <StyledWalletButtonWrapper>
              <WalletButton text="Unlock" backgroundGradient="all" customColor="blue" />
            </StyledWalletButtonWrapper>
            <StyledActionsButtonWrapper>
              <StakeButton text="Stake LP Tokens" backgroundGradient="first" customColor="purple" poolContract={contract}/>
              <ChadletButton text="0.00 Chadlets" backgroundGradient="second" customColor="blue" poolContract = {contract}/>
              <GalleryButton text="My NFTs" backgroundGradient="third" customColor="pink" />
            </StyledActionsButtonWrapper>
          </StyledActionsMenu>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledButton = styled.div`
  flex: 1;
`

const StyledLogoWrapper = styled.div`
  width: 377px;
  @media (max-width: 400px) {
    width: auto;
  }
`

const StyledTopBar = styled.div`
`
const StyledWalletButtonWrapper = styled.div`
  width: 100%;
  max-width: 170px;
  display: block;
  margin: 8px 0 12px auto;
`

const StyledActionsMenu = styled.div`
  text-align: right;
  width: 500px;
  padding-top: 25px;
  display: block;
`

const StyledSeriesButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 280px;
  margin: 8px 0 12px auto;
`
const StyledActionsButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  max-width: 420px;
  margin: 35px 0 12px auto;
  transform: scale(1.15);
  transform-origin: 100% 50%;
`

const StyledTopBarInner = styled.div`
  align-items: start;
  display: flex;
  height: ${props => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${props => props.theme.siteWidth}px;
  width: 100%;
`
const StyledNavWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 400px) {
    display: none;
  }
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 320px;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`

const StyledMenuButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: none;
  @media (max-width: 400px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 44px;
  }
`

export default TopBar
