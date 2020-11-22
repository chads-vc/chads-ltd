import React from 'react'
import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom'
import { useWallet } from 'use-wallet'

import styled from 'styled-components'

import farmer from '../../assets/img/farmer.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import ArtistFarms from './ArtistFarms'


const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
      {!!account ? (
        <>
          <Route exact path={path}>
            <ArtistFarms />
          </Route>
          {false && <Route path={`${path}/:farmId`}>
            <ArtistFarms />
          </Route>}
        </>
      ) : (
        <StyledDiv>
          <Button
            onClick={onPresentWalletProviderModal}
            customColor="pink"
            text="Unlock Wallet"
          />
        </StyledDiv>
      )}
      </Page>
    </Switch>
  )
}

const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 1024px) {
    margin-top: 80px;
  }
  @media (max-width: 768px) {
    margin-top: 120px;
  }
`

export default Farms
