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
              <StakeButton text="Stake LP" backgroundGradient="first" customColor="purple" poolContract={contract}/>
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
  @media (max-width: 450px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    max-width: 377px;
    margin: auto;
  }
`

const StyledTopBar = styled.div`
`
const StyledWalletButtonWrapper = styled.div`
  width: 100%;
  max-width: 170px;
  display: block;
  margin: 8px 0 12px auto;
  @media (max-width: 768px) {
    max-width: 100%;
    margin: 30px 0 0 0;
  }
  @media (max-width: 450px) {
    margin-top: 50px;
  }
`

const StyledActionsMenu = styled.div`
  text-align: right;
  width: 500px;
  padding-top: 25px;
  display: block;
  @media (max-width: 768px) {
    padding-top: 80px;
    display: flex;
    margin: auto;
    flex-wrap: wrap;
  }
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
  @media (max-width: 768px) {
    transform: scale(1);
    display: flex;
    margin: 80px auto;
    max-width: 100%;
    margin-top: 30px;
    flex-wrap: wrap;
  }
`

const StyledTopBarInner = styled.div`
  align-items: start;
  display: flex;
  height: ${props => props.theme.topBarSize}px;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 768px) {
    flex-wrap: wrap
  }
`
const StyledNavWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 320px;
  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`

const StyledMenuButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: none;
  @media (max-width: 768px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 44px;
  }
`

export default TopBar
