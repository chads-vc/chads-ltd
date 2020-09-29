import React, { useMemo, useEffect } from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import Card from '../../components/Card'
import CardContent from '../../components/CardContent'

import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'

import useEarnings from '../../hooks/useEarnings'
import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import { getContract } from '../../utils/erc20'

import Harvest from './components/Harvest'

import { chadletsCards } from '../../yam/lib/constants.js';


const Farm: React.FC = () => {
  const { farmId } = useParams()
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const { ethereum } = useWallet()

  const tokenContract = useMemo(() => {
    return getContract(ethereum as provider, depositTokenAddress)
  }, [ethereum, depositTokenAddress])

  const { onRedeem } = useRedeem(contract)

  const earnings = useEarnings(contract)

  const depositTokenName = useMemo(() => {
    return depositToken.toUpperCase()
  }, [depositToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  const rows = chunk(chadletsCards, 3);

  return (
    <>
      <PageHeader
        icon={icon}
        subtitle={`Deposit ${depositTokenName} and earn ${earnTokenName}`}
        title={name}
      />
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest poolContract={contract} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
      </StyledFarm>

      <StyledCards>
        {rows.map((cardRow, i) => (
          (i === 0 || i === 1) && (<StyledRow key={i}>
            {cardRow.map((card, j) => (
              <React.Fragment key={j}>

              {/* TODO: Extract into its own component */ }
                <Card>
                  <CardContent>
                    <StyledContent>
                      <StyledTitle>{card.name}</StyledTitle>
                      <p>{card.description}</p>
                      {card.pool.points} Chadlets
                      <img src={card.image} />
                      </StyledContent>
                      <StyledCardActions>
                        <Button
                          onClick={() => onRedeem('1')} // TODO: add generic card ids...
                          text="Redeem Card"
                          disabled={!earnings.toNumber()}
                        />
                      </StyledCardActions>
                  </CardContent>
                </Card>

                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>)
        ))}
      </StyledCards>
    </>
  )
}

function chunk(array, size) {
  if (!array) return [];
  const firstChunk = array.slice(0, size);
  if (!firstChunk.length) {
    return array;
  }
  return [firstChunk].concat(chunk(array.slice(size, array.length), size)); 
}

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledCards = styled.div`
  width: 90%;
  margin-top: 220px;
  max-width: 980px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledRow = styled.div`
  display: flex;
  position: relative;
  margin-top: 230px;
  margin-bottom: 300px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${props => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${props => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${props => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  width: 50px;
  height: 50px;
`

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

export default Farm
