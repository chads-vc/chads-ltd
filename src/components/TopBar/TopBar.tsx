import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <StyledLogoWrapper>
            <Logo />
          </StyledLogoWrapper>
          <StyledActionsMenu>
            <StyledWalletButtonWrapper>
              <AccountButton text="Wallet" customColor="blue" />
            </StyledWalletButtonWrapper>
            <StyledSeriesButtonsWrapper>
              <AccountButton text="Series" customColor="purple" />
              <AccountButton text="Series" customColor="blue" />
              <AccountButton text="Series" customColor="pink" />
            </StyledSeriesButtonsWrapper>
            <StyledActionsButtonWrapper>
              <AccountButton text="Staked" customColor="purple" />
              <AccountButton text="Chadlets" customColor="blue" />
              <AccountButton text="Gallery" customColor="pink" />
            </StyledActionsButtonWrapper>
          </StyledActionsMenu>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

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
  max-width: 110px;
  display: block;
  margin: 8px 0 12px auto;
`

const StyledActionsMenu = styled.div`
  text-align: right;
  width: 500px;
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
  margin: 18px 0 12px auto;
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
